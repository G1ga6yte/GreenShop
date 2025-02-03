import express from "express";
import db from "../../../mongoConnect.js"
import bcrypt from "bcryptjs";

const router = express.Router();
(async function () {
    const usersCollection = await db.Users();

    router.post("/verifyCode", async (req, res) => {
        const {username, code} = req.body
        const foundedByUsername = await usersCollection.findOne({username: username});

        try {



            if (foundedByUsername){
                const codeStatus = await bcrypt.compare(code, foundedByUsername.verificationCodes[0]);


                if (codeStatus){
                    await usersCollection.updateOne(
                        { userID: foundedByUsername.userID },
                        { $set: { verificationCodes: [] }}
                    )
                    res.status(200).send({status: 0, username: username});
                } else {
                    res.status(200).send({status: 16});
                }
            } else {
                res.status(200).send({status: 2});
            }

        } catch {
            res.status(500).send({message: "Error with sending code!"});
        }

    })
})()

export const VerifyCode = router
