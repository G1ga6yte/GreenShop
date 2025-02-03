import {Router} from 'express';
import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';
import sendVerificationEmail from "../../mailer.js";

const router = Router();


const validation = (req, res, next) => {
    const {newUsername, oldUsername, userID} = req.body;

    if (newUsername === oldUsername){
        res.status(200).send({status: 22})
    } else if (newUsername.length<6 || newUsername.length > 16){
        res.status(200).send({status: 9})
    } else {
        next()
    }
}

(async function () {
    const usersCollection = await db.Users();


////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.post('/usernameChange', validation, async (req, res) => {
        const {newUsername, oldUsername, userID} = req.body;

        try {
            let foundedUser = await usersCollection.findOne({
                userID: userID,
            })

            if (foundedUser) {

                if (foundedUser.username === oldUsername){
                    const code = String(Math.floor(Math.random() * 900000) + 100000);
                    const hashedCode = await bcrypt.hash(code, 12);

                    await usersCollection.updateOne(
                        { userID: foundedUser.userID },
                        { $set: { verificationCodes: [hashedCode]}}
                    )
                    await usersCollection.updateOne(
                        { userID: foundedUser.userID },
                        { $set: { newUsername: newUsername}}
                    )
                    await sendVerificationEmail(foundedUser.email, code)
                    console.log(code)
                    res.status(200).send({Status: 7})
                } else {
                    res.status(200).send({Status: 22})
                }
            } else {
                res.status(200).send({Status: 2});

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to send with error'});
        }
    });


})()

export const UsernameChange = router;