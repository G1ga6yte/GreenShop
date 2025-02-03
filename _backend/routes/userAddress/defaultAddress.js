import {Router} from 'express';
import db from "../../mongoConnect.js";


const router = Router();

(async function () {
    const usersCollection = await db.Users();


    router.post('/defaultAddress', async (req, res) => {
        const {userID, addressID} = req.body;

        let foundedUser = await usersCollection.findOne({
            userID: Number(userID),
        })

        try{
            if (foundedUser){
                let newAddresses = foundedUser.address.map((el)=>{
                    if (el.addressID === addressID){
                        el.active = true
                        return el
                    } else {
                        el.active = false
                        return el
                    }
                })

                const result = await usersCollection.updateOne(
                    {userID: Number(userID)},
                    { $set: { address: newAddresses} }
                )
                if (result.modifiedCount > 0){
                    res.status(200).send({status: 0, addresses: newAddresses, message: "Successfully added"})
                } else {
                    res.status(200).send({message: "error with adding"})
                }

            }else {
                res.status(200).send({message: "User not found!"});
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to set default address'});
        }


    });


})()

export const DefaultAddress = router;