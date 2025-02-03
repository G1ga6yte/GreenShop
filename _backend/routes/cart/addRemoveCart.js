import  {Router} from 'express';
import db from "../../mongoConnect.js";

const router = Router();

(async function (){
    const usersCollection = await db.Users();

    router.post('/addRemoveCart', async (req, res)=>{
        const {userID, product} = req.body;
        try {
            const foundedUser = await usersCollection.findOne({userID: Number(userID)});

            if (foundedUser){

                if (foundedUser.cartProducts.includes(product)){
                    let products = foundedUser.cartProducts;
                    products = products.filter(item => item !== product)

                    const result = await usersCollection.updateOne(
                        {userID: Number(userID)},
                        { $set: { cartProducts: products } }
                    )

                    if (result.modifiedCount > 0){
                        res.status(200).send({
                            status: 32
                        })
                    } else {
                        res.status(200).send({
                            status: "error with saving data"
                        })
                    }

                } else {
                    foundedUser.cartProducts.push(product);
                    const result = await usersCollection.updateOne(
                        {userID: Number(userID)},
                        { $set: { cartProducts: foundedUser.cartProducts } }
                    )

                    if (result.modifiedCount > 0){
                        res.status(200).send({
                            status: 31
                        })
                    } else {
                        res.status(200).send({
                            status: "error with saving data"
                        })
                    }
                }




            } else {
                res.status(200).send({
                    status: "User not found"
                })
            }


        } catch (error) {
            console.log(error)
            res.status(500).send({ error: 'Failed to handle cart items' });
        }
    });

})()


export const AddRemoveCart = router;