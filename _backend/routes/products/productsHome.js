import {Router} from 'express';
import db from "../../mongoConnect.js";

const router = Router();


(async function () {
    router.get('/productsHome', async (req, res) => {
        const productsCollection = await db.Products();
        const { exclude } = req.query;
        const excludeIDs = Array.isArray(exclude)
            ? exclude.map(item => String(item)) // Ensure type matches productID in DB
            : [];

        try {
            // Count available products after exclusion
            const availableCount = await productsCollection.countDocuments({
                productID: { $nin: excludeIDs },
            });

            // Adjust sample size based on available products
            const sampleSize = Math.min(9, availableCount);

            const pipeline = [
                { $match: { productID: { $nin: excludeIDs } } },
                { $sample: { size: sampleSize } },
            ];

            const randomProducts = await productsCollection.aggregate(pipeline).toArray();

            res.status(200).send({
                products: randomProducts,
            });
        }  catch (error) {
            console.error('Error fetching random products:', error);
            res.status(500).send({error: 'Failed to fetch random products.'});
        }
    });

})()


export const ProductsHome = router;