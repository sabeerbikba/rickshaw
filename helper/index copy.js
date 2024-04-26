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

// import express from 'express';
// import multer from 'multer';
// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';

// const PORT = 3005;
// const app = express();
// dotenv.config();
// app.use(express.static('public', {
//     maxAge: 2592000
// }));

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// const url = process.env.MONGODB_URI1;

// app.post('/upload', upload.array('image'), async (req, res) => {
//     if (!req.files) return res.status(400).send('No images uploaded.');

//     const client = await new MongoClient(url).connect();
//     const db = client.db("rickshaw");
//     const collection = db.collection("images");

//     const insertPromises = req.files.map(file => {
//         return collection.insertOne({
//             imageName: file.originalname,
//             alt: req.body.alt || '',
//             imageBinary: file.buffer,
//             apiResponse: "Success",
//             filename: file.originalname,
//             imageUrl: "http://example.com/path/to/image"
//         });
//     });

//     try {
//         await Promise.all(insertPromises);
//         res.send('Images saved successfully.');
//     } catch (error) {
//         console.error('Error saving images:', error);
//         res.status(500).send('Error saving images.');
//     }
// });

// app.get('/images', async (req, res) => {
//     const client = await new MongoClient(url).connect();
//     const images = await client.db("rickshaw").collection("images").find().toArray();
//     const imagesWithBase64 = images.map(image => ({
//         ...image,
//         imageBase64: Buffer.from(image.imageBinary).toString('base64')
//     }));
//     res.json(imagesWithBase64);
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // imageUploadLink:: https://imgur.com/a/IAdA143










// import express from 'express';
// import multer from 'multer';
// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';

// const PORT = 3005;
// const app = express();
// dotenv.config();
// app.use(express.static('public', {
//     maxAge: 2592000
// }));

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// const url = process.env.MONGODB_URI1;


// app.post('/upload', upload.array('image'), async (req, res) => {
//     if (!req.files) return res.status(400).send('No images uploaded.');

//     const client = await new MongoClient(url).connect();
//     const db = client.db("rickshaw");
//     const collection = db.collection("images");

//     const insertPromises = req.files.map(file => {
//         return collection.insertOne({
//             imageName: file.originalname,
//             alt: req.body.alt || '',
//             imageBinary: file.buffer,
//             apiResponse: "Success",
//             filename: file.originalname,
//             imageUrl: "http://example.com/path/to/image"
//         });
//     });

//     try {
//         // Simulate progress updates
//         const totalFiles = req.files.length;
//         let uploadedFiles = 0;
//         for (const promise of insertPromises) {
//             await promise;
//             uploadedFiles++;
//             // Send progress update
//             res.write(`data: ${uploadedFiles / totalFiles * 100}\n\n`);
//         }
//         res.end('Images saved successfully.');
//     } catch (error) {
//         console.error('Error saving images:', error);
//         res.status(500).send('Error saving images.');
//     }
// });


// app.get('/images', async (req, res) => {
//     const client = await new MongoClient(url).connect();
//     const images = await client.db("rickshaw").collection("images").find().toArray();
//     const imagesWithBase64 = images.map(image => ({
//         ...image,
//         imageBase64: Buffer.from(image.imageBinary).toString('base64')
//     }));
//     res.json(imagesWithBase64);
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// imageUploadLink:: https://imgur.com/a/IAdA143







// import express from 'express';
// import multer from 'multer';
// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';
// import path from 'path'; // Import the path module

// const PORT = 3005;
// const app = express();
// dotenv.config();
// app.use(express.static('public', {
//     maxAge: 2592000
// }));

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// const url = process.env.MONGODB_URI1;


// app.post('/upload', upload.array('image'), async (req, res) => {
//     if (!req.files) return res.status(400).send('No images uploaded.');

//     const client = await new MongoClient(url).connect();
//     const db = client.db("rickshaw");
//     const collection = db.collection("images");

//     const insertPromises = req.files.map(file => {
//         return collection.insertOne({
//             imageName: file.originalname,
//             alt: req.body.alt || '',
//             imageBinary: file.buffer,
//             apiResponse: "Success",
//             filename: file.originalname,
//             imageUrl: "http://example.com/path/to/image"
//         });
//     });

//     try {
//         // Simulate progress updates
//         const totalFiles = req.files.length;
//         let uploadedFiles = 0;
//         for (const promise of insertPromises) {
//             await promise;
//             uploadedFiles++;
//             // Send progress update
//             res.write(`data: ${uploadedFiles / totalFiles * 100}\n\n`);
//         }
//         res.end('Images saved successfully.');
//     } catch (error) {
//         console.error('Error saving images:', error);
//         res.status(500).send('Error saving images.');
//     }
// });


// app.get('/images', async (req, res) => {
//     const client = await new MongoClient(url).connect();
//     const images = await client.db("rickshaw").collection("images").find().toArray();
//     const imagesWithBase64 = images.map(image => ({
//         ...image,
//         imageBase64: Buffer.from(image.imageBinary).toString('base64')
//     }));
//     res.json(imagesWithBase64);
// });

// // app.get('/images/:filename', async (req, res) => {
// //     const client = await new MongoClient(url).connect();
// //     const image = await client.db("test").collection("fs.files").findOne({ filename: req.params.filename });
// //     if (!image) return res.status(404).send('Image not found.');
// //     // Set the correct Content-Type based on the file extension
// //     res.setHeader('Content-Type', `image/${image.fileExtension}`);
// //     res.send(image.imageBinary);
// // });


// // app.get('/images/:filename', async (req, res) => {
// //     const client = await new MongoClient(url).connect();
// //     const image = await client.db("rickshaw").collection("images").findOne({ filename: req.params.filename });
// //     if (!image) {
// //         return res.status(404).send('Image not found.');
// //     }
// //     // Set the correct Content-Type based on the file extension
// //     res.setHeader('Content-Type', `image/${path.extname(req.params.filename).replace('.', '')}`);
// //     res.send(image.imageBinary);
// // });

// // const mimeTypes = {
// //     'png': 'image/png',
// //     'jpg': 'image/jpeg',
// //     'jpeg': 'image/jpeg',
// //     'gif': 'image/gif',
// //     // Add more MIME types as needed
// // };

// // app.get('/images/:filename', async (req, res) => {
// //     const client = await new MongoClient(url).connect();
// //     const image = await client.db("rickshaw").collection("images").findOne({ filename: req.params.filename });
// //     if (!image) {
// //         return res.status(404).send('Image not found.');
// //     }
// //     // Extract the file extension from the filename
// //     const fileExtension = path.extname(req.params.filename).replace('.', '');
// //     const contentType = mimeTypes[fileExtension] || 'application/octet-stream';
// //     res.setHeader('Content-Type', contentType);
// //     res.send(image.imageBinary);
// // });





// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// })












// import express from 'express';
// import multer from 'multer';
// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';

// const PORT = 3005;
// const app = express();
// dotenv.config();
// app.use(express.static('public', {
//     maxAge: 2592000
// }));

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// const url = process.env.MONGODB_URI1;


// app.post('/upload', upload.array('image'), async (req, res) => {
//     if (!req.files) return res.status(400).send('No images uploaded.');

//     const client = await new MongoClient(url).connect();
//     const db = client.db("rickshaw");
//     const collection = db.collection("images");

//     const insertPromises = req.files.map(file => {
//         return collection.insertOne({
//             imageName: file.originalname,
//             alt: req.body.alt || '',
//             imageBinary: file.buffer,
//             apiResponse: "Success",
//             filename: file.originalname,
//             imageUrl: "http://example.com/path/to/image"
//         });
//     });

//     try {
//         // Simulate progress updates
//         const totalFiles = req.files.length;
//         let uploadedFiles = 0;
//         for (const promise of insertPromises) {
//             await promise;
//             uploadedFiles++;
//             // Send progress update
//             res.write(`data: ${uploadedFiles / totalFiles * 100}\n\n`);
//         }
//         res.end('Images saved successfully.');
//     } catch (error) {
//         console.error('Error saving images:', error);
//         res.status(500).send('Error saving images.');
//     }
// });


// app.get('/images', async (req, res) => {
//     const client = await new MongoClient(url).connect();
//     const images = await client.db("rickshaw").collection("images").find().toArray();
//     const imagesWithBase64 = images.map(image => ({
//         ...image,
//         imageBase64: Buffer.from(image.imageBinary).toString('base64')
//     }));
//     res.json(imagesWithBase64);
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




// import express from 'express';
// import multer from 'multer';
// import dotenv from 'dotenv';
// // import { MongoClient, GridFSBucket } from 'mongodb';
// import { MongoClient, GridFSBucket } from 'mongodb';


// const PORT = 3005;
// const app = express();
// dotenv.config();
// app.use(express.static('public', {
//     maxAge: 2592000
// }));

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const url = process.env.MONGODB_URI4;

// let db;
// let bucket; // Declare bucket variable here

// const connectDB = async () => {
//     try {
//         const client = await MongoClient.connect(url);
//         db = client.db("rickshaw");
//         console.log("Database connected successfully");

//         // Initialize GridFSBucket here, after db is defined
//         bucket = new GridFSBucket(db);
//     } catch (error) {
//         console.error("Database connection error:", error);
//     }
// };

// connectDB().catch(console.error);


// app.post('/upload', upload.array('image'), async (req, res) => {
//     console.log('post hit');
//     if (!req.files) return res.status(400).send('No images uploaded.');

//     const insertPromises = req.files.map(file => {
//         return new Promise((resolve, reject) => {
//             const uploadStream = bucket.openUploadStream(file.originalname, {
//                 contentType: file.mimetype,
//                 metadata: {
//                     alt: req.body.alt || '',
//                     apiResponse: "Success",
//                     filename: file.originalname,
//                     imageUrl: "http://example.com/path/to/image"
//                 }
//             });

//             uploadStream.on('error', error => reject(error));
//             uploadStream.on('finish', () => resolve());
//             uploadStream.end(file.buffer);
//         });
//     });

//     try {
//         await Promise.all(insertPromises);
//         res.end('Images saved successfully.');
//     } catch (error) {
//         console.error('Error saving images:', error);
//         res.status(500).send('Error saving images.');
//     }
// });

// app.get('/images', async (req, res) => {
//     try {
//         // Use the bucket object directly
//         const files = await bucket.find().toArray();
//         res.json(files);
//     } catch (error) {
//         console.error('Error retrieving images:', error);
//         res.status(500).send('Error retrieving images.');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// import express from 'express';
// import multer from 'multer';
// import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

// const PORT = 3005;
// const app = express();
// const url = process.env.MONGODB_URI1; // Ensure this is your MongoDB connection string

// let db;
// let bucket;

// const connectDB = async () => {
//     try {
//         const client = await MongoClient.connect(url);
//         db = client.db("rickshaw");
//         bucket = new GridFSBucket(db);
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Database connection error:", error);
//     }
// };

// connectDB().catch(console.error);

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/upload', upload.array('image'), async (req, res) => {
//     if (!req.files) return res.status(400).send('No images uploaded.');

//     const insertPromises = req.files.map(file => {
//         return new Promise((resolve, reject) => {
//             const uploadStream = bucket.openUploadStream(file.originalname, {
//                 contentType: file.mimetype,
//                 metadata: {
//                     alt: req.body.alt || '',
//                     apiResponse: "Success",
//                     filename: file.originalname,
//                     imageUrl: "http://example.com/path/to/image"
//                 }
//             });

//             uploadStream.on('error', error => reject(error));
//             uploadStream.on('finish', () => resolve());
//             uploadStream.end(file.buffer);
//         });
//     });

//     try {
//         await Promise.all(insertPromises);
//         res.end('Images saved successfully.');
//     } catch (error) {
//         console.error('Error saving images:', error);
//         res.status(500).send('Error saving images.');
//     }
// });

// app.get('/image/:id', async (req, res) => {
//     try {
//         const imageId = req.params.id;
//         const objectId = new ObjectId(imageId);
//         const image = await bucket.find({ _id: objectId }).toArray();
//         if (!image.length) {
//             return res.status(404).send('Image not found');
//         }

//         const readStream = bucket.openDownloadStream(objectId);
//         readStream.pipe(res);
//     } catch (error) {
//         console.error('Error serving image:', error);
//         res.status(500).send('Error serving image');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

/*
################################################################################################
#######################################| Good One |#############################################
#######################################|__________|#############################################
################################################################################################
*/

import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

const PORT = 3005;
const app = express();
dotenv.config();
app.use(express.static('public', {
    maxAge: 2592000
}));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const url = process.env.MONGODB_URI1;

app.post('/upload', upload.array('image'), async (req, res) => {
    if (!req.files) return res.status(400).send('No images uploaded.');

    const client = await new MongoClient(url).connect();
    const db = client.db("rickshaw");
    const collection = db.collection("images");

    const insertPromises = req.files.map(file => {
        return collection.insertOne({
            imageName: file.originalname,
            alt: req.body.alt || '',
            imageBinary: file.buffer,
            apiResponse: "Success",
            filename: file.originalname,
            imageUrl: "http://example.com/path/to/image"
        });
    });

    try {
        await Promise.all(insertPromises);
        res.send('Images saved successfully.');
    } catch (error) {
        console.error('Error saving images:', error);
        res.status(500).send('Error saving images.');
    }
});

app.get('/images', async (req, res) => {
    const client = await new MongoClient(url).connect();
    const images = await client.db("rickshaw").collection("images").find().toArray();
    const imagesWithBase64 = images.map(image => ({
        ...image,
        imageBase64: Buffer.from(image.imageBinary).toString('base64')
    }));
    res.json(imagesWithBase64);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// imageUploadLink:: https://imgur.com/a/IAdA143




/*
################################################################################################
################################################################################################
*/