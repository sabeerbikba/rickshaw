
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
// const uploadDirectory = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDirectory)) {
//     console.log('upload folder created!');
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }


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

async function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
}


console.time('getImages');
app.get('/api/images', async (req, res) => {
    console.log(`
    
((((([[[  GET || /images ]]])))))
Req hit at ${Date()}`);
    let imageNames = req.query.img;
    if (!Array.isArray(imageNames)) {
        imageNames = [imageNames];
    }
    console.log(imageNames);

    if (!imageNames || !Array.isArray(imageNames)) return res.status(400).json({
        error: 'No image names provided or invalid format.' // TODO: recive error show it with 
    });

    let imagesOut = [];
    const collection = await connectDB('images');
    try {
        let attempt = 1;
        while (attempt <= 10) {
            console.log(`trying again attempt ${attempt}`);
            console.time('delay');
            await delay();
            console.timeEnd('delay');
            console.log('log insdie while loop check imagesNames: ', imageNames);

            imagesOut = await collection.find(
                {
                    imageName: {
                        $in: imageNames
                    }
                },
                {
                    projection: {
                        _id: 0,
                        srcUrl: 1,
                        alt: 1
                    }
                }
            ).toArray();

            console.log(imagesOut);
            console.log('imagesOut.length:' + imagesOut.length);
            console.log('imageNames.length: ' + imageNames.length);
            if (imagesOut.length === imageNames.length) {
                console.log('image found in ' + attempt + ' attempt');
                res.json({ imagesOut });
                return;
            }
            attempt++;
        }

        console.log('imagesOut sendion output: ', imagesOut);
        console.log('images sent!');
        res.json({ imagesOut });
    } catch (error) {
        console.error('Failed to fetch images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    } finally {
        console.log('POST Request completed.');
        res.end();
    }
});
console.timeEnd('getImages');

app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

