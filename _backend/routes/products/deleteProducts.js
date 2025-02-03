import { Router } from 'express';
import db from "../../mongoConnect.js";
import path from 'path';
import multer from "multer";
import fs from 'fs';

const router = Router();

(async function () {
    const usersCollection = await db.Users();
    const productsCollection = await db.Products();
    const upload = multer();
    const uploadPath = path.resolve('uploads');

    ////////////////////////////////////// UserInfo Change Route ///////////////////////////////////////////////////////
    router.post('/deleteProducts', upload.none(), async (req, res) => {
        const { userID, productsIDs } = req.body;

        try {
            const foundedUser = await usersCollection.findOne({
                userID: Number(userID),
            });

            if (!foundedUser) {
                return res.status(404).send({ message: 'User not found!' });
            }

            const parsedProductsIDs = Array.isArray(productsIDs) ? productsIDs : [productsIDs];
            console.log(parsedProductsIDs);

            for (const productID of parsedProductsIDs) {
                const product = await productsCollection.findOne({
                    productID: Number(productID),
                });

                if (product && product.images) {
                    for (const img of product.images) {
                        if (img) {
                            const oldFilename = path.basename(img); // Extract file name
                            const oldFilePath = path.join(uploadPath, oldFilename);

                            if (fs.existsSync(oldFilePath)) {
                                try {
                                    await fs.promises.unlink(oldFilePath);
                                    console.log(`Deleted old image: ${oldFilePath}`);
                                } catch (err) {
                                    console.error(`Failed to delete old image: ${err}`);
                                }
                            }
                        }
                    }
                }

                const result = await productsCollection.deleteOne({
                    productID: Number(productID),
                });

                if (result.deletedCount === 1) {
                    console.log(`Deleted product with ID: ${productID}`);
                } else {
                    console.log(`No product found to delete with ID: ${productID}`);
                }
            }

            return res.status(200).send({ status: 28, message: 'Products deleted successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to delete products.' });
        }
    });
})();

export const DeleteProducts = router;
