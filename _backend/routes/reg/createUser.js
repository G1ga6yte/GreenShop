import db from "../../mongoConnect.js";
import bcrypt from 'bcryptjs';

function idGenerator (){
    return Math.floor(Math.random() * 1e16);
}

async function CreateUser (data){
    let userData = data
    let randomId;
    const usersCollection = await db.Users();


    do{
        randomId = idGenerator()
        const idTry = await usersCollection.findOne({userID: randomId});

        if(!idTry){
            userData.userID = randomId;
            await usersCollection.insertOne({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                userID: randomId,
                userStatic: userData.userStatic,
                verified: userData.verified,
                verificationCodes: userData.verificationCodes,
                cartProducts: [],
                userInfo: {
                    firstName: "",
                    lastName: "",
                    phoneNumber: ""
                }
            });
            console.log("account is created in db")
        }
    } while (!userData.userID)


}


export default CreateUser;