import {Router} from 'express';
import db from "../../mongoConnect.js";

const router = Router();

(async function () {
    const usersCollection = await db.Users();
    const productsCollection = await db.Products();



////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.get('/userProducts', async (req, res) => {
        const userID = req.query.userID

        let foundedUser = await usersCollection.findOne({
            userID: Number(userID),
        })


        try {
            if (foundedUser) {

                let foundedProducts = await productsCollection.find({
                    userID: Number(userID)
                }).toArray()

                if (foundedProducts.length > 0) {
                    res.status(200).send({products: foundedProducts})
                }

            } else {
                res.status(200).send({message: 'User not found!'});
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to save with error'});
        }
    });


})()

export const UserProducts = router;