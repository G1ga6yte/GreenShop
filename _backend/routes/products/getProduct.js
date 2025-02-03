import {Router} from "express";
import db from "../../mongoConnect.js";

const router = Router();

(async function (){
    const productsCollection = await db.Products()
    const usersCollection = await db.Users()

    router.get("/getProduct", async (req,res)=>{
       const {productID} = req.query;

        try {
            const foundedProduct = await productsCollection.findOne({productID: Number(productID)});

            if (foundedProduct){

                const foundedUser = await usersCollection.findOne({userID: Number(foundedProduct.userID)});

                if (foundedUser){
                    res.status(200).send({status: true, productInfo: foundedProduct, companyInfo: foundedUser.userCompany});
                } else {
                    res.status(200).send({status: true, productInfo: foundedProduct});
                }
            } else {
                res.status(200).send({status: false});
            }

        } catch(err){
            console.log(err)
            res.status(500).send({error:"Error with getting product info"});
        }

    });

})()

export const GetProduct = router