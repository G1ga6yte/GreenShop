import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
let db;

async function connectDB() {
    if (!db) {  // Check if we have already connected and have a db reference
        await client.connect();
        db = client.db('greenshop');
    }
}

async function Users() {
    await connectDB();  // Ensure the DB is connected before returning the collection
    return db.collection('users');
}

async function Products() {
    await connectDB();
    return db.collection('products');
}

const cleanup = async (event) => {
    await client.close();  // Close the MongoDB connection
    await process.exit();  // Exit the process gracefully
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export default { Users, Products};
