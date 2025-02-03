import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import db from "./mongoConnect.js"
import session from "express-session";
import cookieParser from "cookie-parser";
import {RegRouter} from "./routes/reg/regControl.js";
import {VerifyRouter} from "./routes/reg/verifyEmail.js";
import {LoginRouter} from "./routes/login/login.js";
import {UserInfoChange} from "./routes/userInfoChange/userInfoChange.js";
import {UserPasswordChange} from "./routes/userInfoChange/userPasswordChange.js";
import {UsernameChange} from "./routes/userInfoChange/usernameChange.js";
import {SendMailCode} from "./routes/userInfoChange/sendMailCode.js";
import {NewProduct} from "./routes/products/newProduct.js";
import {UserProducts} from "./routes/products/userProducts.js";
import {DeleteProducts} from "./routes/products/deleteProducts.js";
import {ProductsHome} from "./routes/products/productsHome.js";
import {ProductCount} from "./routes/products/productCount.js";
import {AddRemoveCart} from "./routes/cart/addRemoveCart.js";
import {GetProduct} from "./routes/products/getProduct.js";
import {CodeSender} from "./routes/reg/passwordReset/codeSender.js";
import {VerifyCode} from "./routes/reg/passwordReset/verifyCode.js";
import {ChangePassword} from "./routes/reg/passwordReset/changePassword.js";
import {AddNewAddress} from "./routes/userAddress/addNewAddress.js";
import {DefaultAddress} from "./routes/userAddress/defaultAddress.js";
import {DeleteAddress} from "./routes/userAddress/deleteAddress.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
(async function() {
    app.use(express.json());
    app.use(cors({
        origin: ["http://192.168.1.5:3000", "http://localhost:3000"],
        method: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }))
    app.use(cookieParser());
    // app.use(session({
    //     secret: '7tacfb5gnemhqjfpxxojihmg3ayfombsvuhonrtfbgcxmhpfayf3t78c4tnfg4',
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: {
    //         secure: false,
    //         maxAge: 1000*60*60*24
    //     }
    // }))
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    //////////////////// Session Test //////////////////////////////////////////
    const usersCollection = await db.Users();
    app.get("/session", async (req, res) => {
        // try{
        //     console.log(req.session)
        //     if (req.session.username){
        //         console.log("true")
        //         const userData = await usersCollection.findOne({username: req.session.username});
        //         if (userData){
        //             return res.status(200).send({valid: true, userData});
        //         } else {
        //             return res.status(401).send({valid: false, message: "Account time out"});
        //         }
        //     } else {
        //         return res.status(401).send({valid: false, message: "Not Found"});
        //     }
        // }
        // catch(err){
        //     console.log(err)
        //     res.status(404).send({valid: false, message: "Error"});
        // }

        const sessionUser = req.cookies.sessionUser;
        if (!sessionUser) return res.status(401).json({ error: "Unauthorized" });
        const userData = await usersCollection.findOne({username: sessionUser});
        // res.json({ user: { username: sessionUser } });
        return res.status(200).send({valid: true, userData});
    })

    /////////////////////////////// Log Out /////////////////////////////////////////////
    app.post('/logout', (req, res) => {
        res.clearCookie("sessionUser");
        res.status(200).send('Logged out successfully');
    });


    app.use("/authentication", RegRouter)
    app.use("/authentication", VerifyRouter)
    app.use("/authentication", LoginRouter)
    app.use("/userDetailsChange", UserInfoChange)
    app.use("/userDetailsChange", UserPasswordChange)
    app.use("/userDetailsChange", UsernameChange)
    app.use("/userDetailsChange", SendMailCode)
    app.use("/products", NewProduct)
    app.use("/products", UserProducts)
    app.use("/products", DeleteProducts)
    app.use("/products", ProductsHome)
    app.use("/products", ProductCount) // количество продуктов
    app.use("/products", GetProduct)
    app.use("/cart", AddRemoveCart)
    app.use("/password", CodeSender)
    app.use("/password", VerifyCode)
    app.use("/password", ChangePassword)
    app.use("/address", AddNewAddress)
    app.use("/address", DefaultAddress)
    app.use ("/address", DeleteAddress)



    app.listen(process.env.PORT || 8080, ()=>{
        console.log('Server is running on port 8080')
    });
})();
