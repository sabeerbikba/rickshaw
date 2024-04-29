import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs';


dotenv.config();
const port = 3005;
const app = express();
app.use(express.static('public', {
    maxAge: 2592000
}));
const asyncExec = promisify(exec);
const imgbbUrl = process.env.IMGBB_API1;
const mongoUrl = process.env.MONGODB_URI2;

const upload = multer({ dest: 'uploads/' }).array('images[]', 5);



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

console.time('post');
console.log('post time start');
app.post('/api/upload', upload, async (req, res) => {
    console.log(`
    
    
((((([[[  POST || /upload ]]])))))
New POST req hit with ${req.files.length} images at ${Date()}`);
    if (req.files.length <= 0) {
        console.log('no images uplaoded!')
        console.log(req.files);
        return res.status(400).send('No file uploaded');
    }
    try {
        const collection = await connectDB('images');

        for (const file of req.files) {
            console.log('inside for loop');
            console.log(file);
            const collectionCount = await collection.countDocuments();

            const command = `curl -X POST https://api.imgbb.com/1/upload \
                        -F "key=${imgbbUrl}" \
                        -F "image=@${file.path}"`;

            console.time('command');
            const { stdout, stderr } = await asyncExec(command);
            console.timeEnd('command');

            console.log('inside exce block');
            if (stderr) {
                console.log('inside exce erro block');
                console.error(`Error executing cURL command: ${stderr}`);
            }
            console.log('inside exce else ok block');

            const response = JSON.parse(stdout);
            console.log('response: ', response);

            console.log('everthing okay inserting to db');
            const result = await collection.insertOne({
                id: collectionCount + 1,
                imageName: file.originalname,
                srcUrl: response.data.url,
                alt: req.body.alt || '',
                extension: response.data.image.extension,
                mimeType: response.data.image.mime,
                timeStamp: Date(),
                originalname: file.originalname,
                apiResponse: response,
                headResponse: {
                    method: req.method,
                    headers: {
                        rawHeader: req.rawHeaders,
                        rawTrailers: req.rawTrailers,
                    },
                    ipAddress: req.ip,
                    _parsedUrl: req._parsedUrl
                },
            });
            console.log('db insert request output' + result);
        }
        res.status(200).send('Images uploaded successfully');
    } catch (error) {
        console.log('inside catch block');
        console.log('inside catch error');
        console.error('Error saving image:', error);
        // if (error.code === 'ENOENT') {
        //     console.log('Creating uploads folder...');
        //     fs.mkdirSync('./uploads');
        //     // Retry the upload logic
        //     // You may want to consider a more sophisticated retry mechanism here
        //     // as retrying the entire process may not be the best approach in a production environment
        //     // This is just for demonstration purposes
        //     console.log("retring by creating '/uploads' folder");
        //     return res.redirect('/upload');
        // } else {
        res.status(500).send('Error saving image.');
        // }
    } finally {
        console.log('inside finally block for file cleanup');
        for (const file of req.files) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error(`Error deleting file ${file.path}: ${err}`);
                } else {
                    console.log(`File ${file.path} deleted successfully`);
                }
            });
        }
        console.log('inside finlly block');
        console.log('POST request completed.');
        res.end();
    }
});
console.timeEnd('post');

app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

