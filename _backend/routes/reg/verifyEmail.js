import  {Router} from 'express';
import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';
const router = Router();



(async function () {
    const usersCollection = await db.Users();
    ////////////////////////////////////// Verify Route ///////////////////////////////////////////////////////
    router.post('/verify', async (req, res)=>{
        let {email, verifyCode} = req.body;
        console.log(email)
        console.log(verifyCode)
        const foundedUser = await usersCollection.findOne({email: email});

        try {
            if(foundedUser){

                // const isVerified = await Promise.all(foundedUser.verificationCodes.map(async (code) => {
                //     return bcrypt.compare(String(verifyCode), code);
                // }));
                const isVerified = await bcrypt.compare(String(verifyCode), foundedUser.verificationCodes[0])
                console.log(isVerified)
                if (isVerified){
                    await usersCollection.updateOne(
                        { userID: foundedUser.userID },
                        { $set: { verified: true } }
                    );
                    await usersCollection.updateOne(
                        { userID: foundedUser.userID },
                        { $set: { verificationCodes: [] }}
                    )


                    if (foundedUser.newUsername){
                        if (foundedUser.newUsername.length > 0){

                            await usersCollection.updateOne(
                                { userID: foundedUser.userID },
                                { $set: { username: foundedUser.newUsername} },
                            )
                            await usersCollection.updateOne(
                                { userID: foundedUser.userID },
                                { $set: { newUsername: "" }}
                            )
                            res.cookie("sessionUser", foundedUser.username, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                maxAge: 1000 * 60 * 60 * 24, // 1 day
                            });
                            res.status(200).send({status: 26});
                            return;
                        }
                    }

                    res.cookie("sessionUser", foundedUser.username, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24, // 1 day
                    });
                    res.status(200).send({status: 15});
                } else {
                    res.status(200).send({status: 16})
                }
            } else {
                res.status(200).send({status: 2});
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ error: 'Failed to verify account with error' });
        }
    })

})()

export const VerifyRouter = router;