import express from "express";
import db from "../../../mongoConnect.js"
import bcrypt from "bcryptjs";

const router = express.Router();
(async function () {
    const usersCollection = await db.Users();


    router.post("/changePassword", async (req, res) => {
        const {username, password1, password2} = req.body
        const foundedByUsername = await usersCollection.findOne({username: username});

        try {

            if (foundedByUsername) {

                const hashedPassword = await bcrypt.hash(password1, 12);

                await usersCollection.updateOne(
                    { userID: foundedByUsername.userID },
                    { $set: { password: hashedPassword }}
                )
                res.status(200).send({status: 0});
            } else {
                res.status(200).send({status: 2});
            }


        } catch {
            res.status(500).send({message: "Error with changing password!"});
        }

    })
})()

export const ChangePassword = router
