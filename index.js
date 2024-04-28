// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static('public', {
//     maxAge: 2592000
// }));
// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, '404.html')); // this code not working 
// });

// // app.listen(3005);
// const PORT = 3005;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// imageUploadLink:: https://imgur.com/a/IAdA143


/*
name
updatedName
url
alt
size
time
timeStamp
apiResponse
mineType
uploadedDevice
extension

number

 */



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
const imgbbUrl = process.env.IMGBB_API3;
const mongoUrl = process.env.MONGODB_URI1;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const upload = multer({ dest: 'uploads/' }).array('images', 5);

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

console.time('post');
console.log('post time start');
app.post('/upload', upload, async (req, res) => {
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


console.time('get');
app.get('/images', async (req, res) => {
    console.log(`
    
((((([[[  GET || /images ]]])))))
New GET req hit at ${Date()}`);
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
console.timeEnd('get');


app.get('/loadimages', async (req, res) => {
    console.log(`
    
((((([[[  GET || /loadimages ]]])))))
New GET req hit at ${Date()}`);
    const { page } = req.query;
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


app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});

