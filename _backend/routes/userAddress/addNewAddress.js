import {Router} from 'express';
import db from "../../mongoConnect.js";


const router = Router();

(async function () {
    const usersCollection = await db.Users();


    router.post('/newAddress', async (req, res) => {
        const {userID, formData} = req.body;

        let foundedUser = await usersCollection.findOne({
            userID: Number(userID),
        })

        try{
            if (foundedUser){
                if (foundedUser.address && foundedUser.address.length > 0){
                    const address = foundedUser.address.find((item) => item.addressID === formData.addressID);
                    if (address){

                        let addresses = foundedUser.address.filter((address) => {
                            return address.addressID !== formData.addressID;
                        });
                        await addresses.push(formData)

                        const result = await usersCollection.updateOne(
                            {userID: Number(userID)},
                            { $set: { address: addresses} }
                        )
                        if (result.modifiedCount > 0){
                            res.status(200).send({status: 0, addresses: addresses, message: "Successfully added"})
                        } else {
                            res.status(200).send({message: "error with adding"})
                        }
                    } else {
                        formData.addressID = Date.now()
                        formData.active = true;
                        foundedUser.address.forEach((address) => {
                            address.active = false
                        })
                        foundedUser.address.push(formData);

                        const result = await usersCollection.updateOne(
                            {userID: Number(userID)},
                            { $set: { address: foundedUser.address} }
                        )
                        if (result.modifiedCount > 0){
                            res.status(200).send({status: 0, addresses: foundedUser.address, message: "Successfully added"})
                        } else {
                            res.status(200).send({message: "error with adding"})
                        }
                    }
                } else {
                    let addresses = []
                    formData.addressID = Date.now()
                    formData.active = true;
                    addresses.push(formData);

                    const result = await usersCollection.updateOne(
                        {userID: Number(userID)},
                        { $set: { address: addresses} }
                    )
                    if (result.modifiedCount > 0){
                        res.status(200).send({status: 0, addresses: addresses, message: "Successfully added"})
                    } else {
                        res.status(200).send({message: "error with adding"})
                    }
                }
            }else {
                res.status(200).send({message: "User not found!"});
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to add new address with error'});
        }


    });


})()

export const AddNewAddress = router;