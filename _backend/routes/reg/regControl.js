import  {Router} from 'express';
import db from "../../mongoConnect.js";
import sendVerificationEmail from "../../mailer.js";
import CreateUser from "./createUser.js";
import bcrypt from 'bcryptjs';

const router = Router();

const rightValidation = (req, res, next) =>{
    const {username, email, password1, password2} = req.body;

    if (username.length < 6 || username.length > 16) {
        res.status(200).send({status: 9})
    } else if (email.length < 15) {
        res.status(200).send({status: 10})
    } else if (password1.length < 8 || password1.length >16) {
        res.status(200).send({status: 12})
    } else if (password1 !== password2) {
        res.status(200).send({status: 23})
    } else {
        next()
    }
}

const usernameValidation = async (req, res, next) =>{
    const usersCollection = await db.Users();
    const {username, email} = req.body;

    const foundedUserByUsername = await usersCollection.findOne({username})
    const foundedUserByEmail = await usersCollection.findOne({email})

    if (foundedUserByUsername) {
        res.status(200).send({status: 13});
    } else if (foundedUserByEmail){
        res.status(200).json({status: 14});
    } else {
        next()
    }
}





(async function (){
////////////////////////////////////// Register Route ///////////////////////////////////////////////////////
    router.post('/register', rightValidation,usernameValidation, async (req, res)=>{
        const {username, email, password1, password2} = req.body;


        try {
            const hashedPassword = await bcrypt.hash(password1, 12);
            const code = String(Math.floor(Math.random() * 900000) + 100000);
            const hashedCode = await bcrypt.hash(code, 12);
            const usersCollection = await db.Users();
            const userStatic = await usersCollection.countDocuments()


            let data = {
                username,
                email,
                password: hashedPassword,
                userID: null,
                verificationCodes: [hashedCode],
                verified: false,
                userStatic: userStatic + 1
            }
            await CreateUser(data)
            await sendVerificationEmail(email, code)

            console.log(`Verification code ${code}`)
            res.status(200).send({status: 7, email});
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: 'Failed to send email with error' });
        }
    });



})()

export const RegRouter = router;