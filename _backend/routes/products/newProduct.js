import {Router} from 'express';
import db from "../../mongoConnect.js";
import path from 'path';
import multer from "multer"
import fs from 'fs';

const router = Router();

(async function () {
    const usersCollection = await db.Users();

    const validation =  (req, res, next) => {
        const {productName, productPrice, productShortDesc, productSKU,
            productCategory, productDescription, productSizes, productTags
        } = req.body;

        if (productName.length < 1 || productPrice.length < 1 || productShortDesc.length < 1
            || productSKU.length < 1 || productCategory.length < 1 || productDescription.length < 1
            || productSizes.length < 1 || productTags.length < 1) {

            if (req.files.length > 0){
                req.files.map((img)=>{
                    fs.unlinkSync(img.path, (err)=>{if (err) console.log(err)});
                })
            }

            res.status(200).send({status: 5});
        } else if(req.files.length < 1){
            res.status(200).send({status: 27})
        } else {
            next()
        }

    }

    const uploadPath = path.resolve('uploads');
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath); // Save files in 'uploads' folder
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
        },
    });
    const upload = multer({storage: storage});

    async function CreateProduct(data, userID, userStatic) {
        const productsCollection = await db.Products();
        const productID = Date.now();

        data.productID = Number(`${userStatic}` +  String(productID));
        data.userID = Number(userID);

        await productsCollection.insertOne({
            ...data, // Spread the `data` object directly
        });

        console.log("Product is created in the database");
    }

////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.post('/newProduct', upload.array("productImages", 4), validation, async (req, res) => {
        const body = req.body;

        let foundedUser = await usersCollection.findOne({
            userID: Number(body.userID),
        })

        try {

            if (foundedUser) {
                let Images = [];
                if (req.files) {
                    req.files.forEach((file) => {
                        Images.push(`http://${process.env.IP}:${process.env.PORT}/uploads/${file.filename}`);
                    })
                }

                const productData = {
                    productName: body.productName,
                    productPrice: body.productPrice,
                    productShortDesc: body.productShortDesc,
                    productSKU: Number(body.productSKU),
                    productCategory: body.productCategory,
                    productDescription: body.productDescription,
                    productSizes: JSON.parse(body.productSizes),
                    productTags: JSON.parse(body.productTags),
                    productAltDesc: JSON.parse(body.productAltDesc),
                    productRate: {},
                    productCount: 0,
                    images: Images,
                };

                await CreateProduct(productData, body.userID, foundedUser.userStatic);
                return res.status(200).send({status: 0});
            } else {
                res.status(200).send({message: 'User not found!'});
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'Failed to save with error'});
        }
    });


})()

export const NewProduct = router;