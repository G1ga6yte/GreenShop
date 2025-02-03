import {Router} from 'express';
import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';

const router = Router();

const loginValidation = (req, res, next) => {
    const {username, password} = req.body;

    if (username.length < 6 || password.length < 8 || password.length > 16) {
        res.status(200).send({status: 6})
    } else {
        next()
    }
}

(async function () {
    router.post('/login', loginValidation, async (req, res) => {
        const {username, password} = req.body;
        const usersCollection = await db.Users();
        const foundedUser = await usersCollection.findOne({
            $or: [
                {email: username},
                {username: username}
            ]
        });

        try {
            if (foundedUser) {
                if (await bcrypt.compare(password, foundedUser.password)) {

                    if (foundedUser.admin) {
                        // req.session.admin = foundedUser.admin;
                        res.cookie("sessionAdmin", foundedUser.admin, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            maxAge: 1000 * 60 * 60 * 24, // 1 day
                        });
                    }

                    res.cookie("sessionUser", username, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24, // 1 day
                    });
                    // req.session.username = foundedUser.username;
                    res.status(200).send({status: 4, userData: foundedUser});
                } else {
                    res.status(200).send({status: 6});
                }
            } else {
                res.status(200).send({status: 6});
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to log in with error'});
        }
    });

})()


export const LoginRouter = router;