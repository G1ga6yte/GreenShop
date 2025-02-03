import {Router} from 'express';
import db from "../../mongoConnect.js";
import path from 'path';
import multer from "multer"
import fs from 'fs';

const router = Router();

(async function () {
    const usersCollection = await db.Users();

    const uploadPath = path.resolve('uploads');
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath); // Use absolute path
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
        },
    });

    const upload = multer({ storage: storage });



////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.post('/userInfo', upload.single('image'), async (req, res) => {
        const body = req.body;


        try {
            let newFilename = null;
            if (req.file){
                newFilename = req.file.filename
            }

            let foundedUser = await usersCollection.findOne({
                userID: Number(body.userID),
            })

            if (foundedUser) {
                const updates = {};


                if (newFilename) {
                    updates["userInfo.profileImage"] = `http://${process.env.IP}:${process.env.PORT}/uploads/${newFilename}`;

                    // Delete old profile image if it exists
                    const oldImagePath = foundedUser.userInfo?.profileImage;
                    if (oldImagePath) {
                        const oldFilename = path.basename(oldImagePath); // Extract file name
                        const oldFilePath = path.join(uploadPath, oldFilename);

                        if (fs.existsSync(oldFilePath)) {
                            fs.unlink(oldFilePath, (err) => {
                                if (err) console.error(`Failed to delete old image: ${err}`);
                                else console.log(`Deleted old image: ${oldFilePath}`);
                            });
                        }
                    }
                }

                if (newFilename) {
                }

                if (body.firstName && body.firstName.trim() !== "") {
                    updates["userInfo.firstName"] = body.firstName;
                }
                if (body.lastName && body.lastName.trim() !== "") {
                    updates["userInfo.lastName"] = body.lastName;
                }
                if (body.phoneNumber && body.phoneNumber.trim() !== "") {
                    updates["userInfo.phoneNumber"] = body.phoneNumber;
                }

                if (Object.keys(updates).length > 0) {
                    await usersCollection.updateOne(
                        { userID: foundedUser.userID },
                        {
                            $set: updates,
                        }
                    );
                    res.status(200).send({ message: 'Saved successfully!' });
                } else {
                    res.status(400).send({ message: 'No valid data to update' });
                }




            } else {
                res.status(401).send({message: 'User not found!'});

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to save with error'});
        }
    });


})()

export const UserInfoChange = router;