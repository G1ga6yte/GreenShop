import express from "express";
import db from "../../../mongoConnect.js"
import sendVerificationEmail from "../../../mailer.js";
import bcrypt from "bcryptjs";

const router = express.Router();
(async function (){
    const usersCollection = await db.Users();

    router.post("/codeSender", async (req,res)=>{
        const {username} = req.body
        const foundedByEmail = await usersCollection.findOne({email: username});
        const foundedByUsername = await usersCollection.findOne({username: username});


        try{
            const code = String(Math.floor(Math.random() * 900000) + 100000);
            const hashedCode = await bcrypt.hash(code, 12);

            if (foundedByEmail){
                await usersCollection.updateOne(
                    {userID: foundedByEmail.userID},
                    {$set: {verificationCodes: [hashedCode]}}
                )
                console.log(code)
                await sendVerificationEmail(username, code)
                res.status(200).send({status: 0, email: foundedByEmail.email, username: foundedByEmail.username, message: "Successfully sent"})
            } else if (foundedByUsername){
                await usersCollection.updateOne(
                    {userID: foundedByUsername.userID},
                    {$set: {verificationCodes: [hashedCode]}}
                )
                console.log(code)
                await sendVerificationEmail(foundedByUsername.email, code)
                res.status(200).send({status: 0, email: foundedByUsername.email, username: username, message: "Successfully sent"})
            } else if (username.includes("@")){
                res.status(200).send({status: 34});
            } else {
                res.status(200).send({status: 35});
            }

        } catch {
            res.status(500).send({message: "Error with sending code!"});
        }

    })
})()

export const CodeSender = router
