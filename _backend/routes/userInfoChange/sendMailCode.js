import {Router} from 'express';
import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';
import sendVerificationEmail from "../../mailer.js";

const router = Router();


const validation = (req, res, next) => {
    const {email, username} = req.body.userInfo;

    if (email.length > 0 && email.length <= 15) {
        res.status(401).json({message: 'Email is incorrect.', status: 1});
    } else {
        next()
    }

}

(async function () {
    const usersCollection = await db.Users();


////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.post('/sendMailCode', async (req, res) => {
        const {email, userID} = req.body;

        try {
            let foundedUser = await usersCollection.findOne({
                userID: userID,
            })

            if (foundedUser) {
                const code = String(Math.floor(Math.random() * 900000) + 100000);
                const hashedCode = await bcrypt.hash(code, 12);
                await usersCollection.updateOne(
                    {userID: foundedUser.userID},
                    {$set: {verificationCodes: [hashedCode]}}
                )
                console.log(code)

                if (email.length === 0 || email === foundedUser.email) {
                    await sendVerificationEmail(foundedUser.email, code)
                    res.status(200).send({message: 'Verification code sent!', status: 1});
                } else {
                    await sendVerificationEmail(email, code)
                    await usersCollection.updateOne(
                        {userID: foundedUser.userID},
                        {$set: {email: email}},
                    )
                    res.status(200).send({message: 'Verification code sent!', status: 2});
                }


            } else {
                res.status(401).send({message: 'User not found!'});

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to send code with error'});
        }
    });


})()

export const SendMailCode = router;