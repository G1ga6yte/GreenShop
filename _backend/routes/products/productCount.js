import  {Router} from 'express';
import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';

const router = Router();

(async function (){
    const productsCollection = await db.Products();

    router.post('/productCount', async (req, res)=>{
        const {productID, newCount} = req.body;
        try {
            const foundedProduct = await productsCollection.findOne({productID: Number(productID)});

            if (foundedProduct){
                const result = await productsCollection.updateOne(
                    {productID: Number(productID)},
                    { $set: { productCount: Number(newCount) } }
                )
                foundedProduct.productCount = Number(newCount);

                if (result.modifiedCount > 0){
                    res.status(200).send({
                        product: foundedProduct,
                        status: 30
                    })
                } else {
                    res.status(200).send({
                        message: "Error with saving"
                    })
                }

            } else {
                res.status(200).send({message: "Product not found"})
            }


        } catch (error) {
            console.log(error)
            res.status(500).send({ error: 'Failed to change count' });
        }
    });

})()


export const ProductCount = router;