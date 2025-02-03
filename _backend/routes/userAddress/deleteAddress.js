import {Router} from 'express';
import db from "../../mongoConnect.js";


const router = Router();

(async function () {
    const usersCollection = await db.Users();


    router.post('/deleteAddress', async (req, res) => {
        const {userID, addressID} = req.body;

        let foundedUser = await usersCollection.findOne({
            userID: Number(userID),
        })

        try{
            if (foundedUser){
                let newAddresses = await foundedUser.address.filter((el)=> el.addressID !== addressID)
                let activeAddress = await foundedUser.address.filter((el)=> {
                    if (el.active) return el
                })

                if (activeAddress[0].addressID === addressID){
                    newAddresses[0].active = true
                }

                const result = await usersCollection.updateOne(
                    {userID: Number(userID)},
                    { $set: { address: newAddresses} }
                )
                if (result.modifiedCount > 0){
                    res.status(200).send({status: 0, addresses: newAddresses, message: "Successfully deleted"})
                } else {
                    res.status(200).send({message: "error with deleting"})
                }

            }else {
                res.status(200).send({message: "User not found!"});
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to delete Address'});
        }


    });


})()

export const DeleteAddress = router;