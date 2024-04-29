import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const port = 3005;
const app = express();
app.use(express.static('public', {
    maxAge: 2592000
}));
const mongoUrl = process.env.MONGODB_URI2;
async function connectDB(collection) {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db("rickshaw").collection(collection);
        console.log("Database connected successfully");
        return db;
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Failed to connect to the database"); // Throw a custom error message
    }
}

console.time('getLoadImages');
app.get('/api/loadimages', async (req, res) => {
    const { page } = req.query;
    console.log(`
    
((((([[[  GET || /loadimages ]]])))))
Req hit pageNumber: ${page} at ${Date()}`);
    const perPage = 5;
    const skip = (page - 1) * perPage;

    try {
        const collection = await connectDB('images');
        const images = await collection.find({}, {
            projection: {
                _id: 0, id: 1, srcUrl: 1, alt: 1
            }
        }).skip(skip).limit(perPage).toArray();
        if (images.length === 0) {
            return res.json({ message: "All images have been shown" });
        }
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        console.log('POST Request completed.');
        res.end();
    }
});
console.timeEnd('getLoadImages');


app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

