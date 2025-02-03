import {Router} from 'express';
import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';

const router = Router();

(async function () {
    const usersCollection = await db.Users();

    const passwordValidation = (req, res, next) => {
        const {oldPassword, password1, password2} = req.body.userInfo;

        if (password1 !== password2) {
            res.status(200).send({status: 3});
        } else if (password1.length < 8 || password1.length > 16) {
            res.status(200).send({status: 4});
        } else {
            next()
        }
    }



////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.post('/userPasswordChange', passwordValidation, async (req, res) => {
        const {userInfo, userID} = req.body;

        try {
            let foundedUser = await usersCollection.findOne({
                userID: userID,
            })

            if (foundedUser) {

                if (await bcrypt.compare(userInfo.oldPassword, foundedUser.password)) {
                    const hashedPassword = await bcrypt.hash(userInfo.password1, 12);

                    const result = await usersCollection.updateOne(
                        { userID },
                        { $set: { password: hashedPassword } }
                    );

                    if (result.modifiedCount > 0) {
                        res.status(200).send({Status: 24})
                    } else {
                        res.status(200).send({ Status: 25 });
                    }

                } else {
                    res.status(200).send({Status: 25 });
                }

            } else {
                res.status(200).send({Status: 2});
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to save password with error'});
        }
    });


})()

export const UserPasswordChange = router;