import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { MongoClient, Db, Collection } from 'mongodb';
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join, resolve } from "path";
import { formatBytes } from "@/utils/functions";
import { ImageType } from "../images";

// TODO: need to error logging system to front-end
// TODO: even upload failed show upload success in front-end  need to fix it 
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

dotenv.config();
const asyncExec = promisify(exec);
const imgbbUrl = process.env.IMGBB_API;
const mongoUri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const connectDB = async (
   collection: string,
   database: string = "rickshaw",
   dbUri: string = mongoUri as string,
): Promise<Collection<any>> => {
   if (!dbUri) {
      throw new Error('Please provide a valid MongoDB URI.');
   }

   if (cachedClient && cachedDb) {
      console.log("Database already connected, reusing client");
      const db = cachedDb.collection(collection);
      return db;
   }

   try {
      const client = new MongoClient(dbUri);

      await client.connect();
      cachedClient = client;
      cachedDb = client.db(database);

      console.log("Database connected successfully");
      const db = cachedDb.collection(collection);
      return db;
   } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Failed to connect to the database");
   }
}

const logError = async (error: Error): Promise<void> => {
   const collection = await connectDB("backend_errorlogs");

   await collection.insertOne({
      error: error.message,
      stack: error.stack,
      timestamp: new Date(),
   });
}

const headersToObject = (headers: Headers) => {
   const headersObj: { [key: string]: string } = {};
   headers.forEach((value, key) => {
      headersObj[key] = value;
   });
   return headersObj;
};

export async function POST(req: NextRequest) {
   // TODO: if image upload successful need to redirect to /gallery and show uploaded image or open in same tab with image name or opening intercepted modal

   const data = await req.formData();
   const files: File[] = data.getAll('images') as unknown as File[];

   if (!files || files.length <= 0) {
      return NextResponse.json({ success: false });
   }

   const uploadDir = resolve('.', 'tmp'); // here need to use which one is wokring 
   await mkdir(uploadDir, { recursive: true });

   const uploadedFilePaths = [];

   try {
      const collection = await connectDB("images");
      if (!collection) throw new Error("Collection is not available");

      for (const file of files) {
         const bytes = await file.arrayBuffer();
         const buffer = Buffer.from(bytes);

         const filePath = join(uploadDir, file.name);
         await writeFile(filePath, buffer);
         uploadedFilePaths.push(filePath);

         const command = `curl -X POST https://api.imgbb.com/1/upload -F "key=${imgbbUrl}" -F "image=@${filePath}"`;
         const { stdout, stderr } = await asyncExec(command);

         if (stderr) {
            console.warn(`Error executing cURL command: ${stderr}`); // TODO: in vercel it considered as error because of console.errro() give need to decide what to do with it 
         }

         const response = JSON.parse(stdout);
         console.log(response);
         const collectionCount = await collection.countDocuments() || 0;

         console.log('Inserting document into MongoDB');
         try {
            const result = await collection.insertOne({
               id: collectionCount + 1,
               imgName: file.name,
               srcUrl: response.data.url,
               alt: "not-specified", // TODO: always need to be unique key 
               imgSize: {
                  inHeaders: formatBytes(parseInt(req.headers.get('content-length') || '0')), // TODO: now need to check working correctly or not
                  inFormData: formatBytes(file.size),
               },
               uploaderDevie: req.headers.get('user-agent'),
               extension: response.data.image.extension,
               mimeType: response.data.image.mime,
               uploadTime: new Date().toString(),
               uploadUrl: req.headers.get('referer'), // TODO: agter server test need to check is this valu really needed 
               ipAddr: { // TODO: need to check which one is uploader ip and use on of it
                  host: req.headers.get('host'),
                  origin: req.headers.get('origin'),
               },
               allResponse: {
                  exceCmd: {
                     stdout: response,
                     stderr,
                  },
                  headers: {
                     method: req.method,
                     url: req.url,
                     headers: headersToObject(req.headers),
                     destination: req.destination,
                     referrer: req.referrer,
                     referrerPolicy: req.referrerPolicy,
                     mode: req.mode,
                     credentials: req.credentials,
                     cache: req.cache,
                     redirect: req.redirect,
                     integrity: req.integrity,
                     keepalive: req.keepalive,
                     // @ts-ignore
                     isReloadNavigation: req.isReloadNavigation,
                     // @ts-ignore
                     isHistoryNavigation: req.isHistoryNavigation,
                     signal: { aborted: req.signal.aborted },
                  },
                  formData: {
                     files: files.map(file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                     })),
                  },
               },
            });
            console.log('Document inserted successfully, Insert result:', result);
         } catch (insertError) {
            await logError(insertError as Error).catch(logError => {
               console.error('Failed to log error:', logError);
            });
            console.error('Error inserting document:', insertError);
         }
      }
      return NextResponse.json({ success: true });
   } catch (err) {
      await logError(err as Error).catch(logError => {
         console.error('Failed to log error:', logError);
      });
      console.error('Error saving image:', err);
      return NextResponse.json({ success: false }, { status: 500 });
   } finally {
      for (const filePath of uploadedFilePaths) {
         try {
            await unlink(filePath);
            console.log(`Successfully deleted ${filePath}`);
         } catch (err) {
            await logError(err as Error).catch(logError => {
               console.error('Failed to log error:', logError);
            });
            console.error(`Error deleting ${filePath}:`, err);
         }
      }
   }
}

// export async function GET(req: NextRequest) {
//    const perPage = 5;
//    const url = new URL(req.url);
//    const page = (parseInt(url.searchParams.get('page') as string) || 1) - 1;
//    const skip = page * perPage;
//    console.log("requested page: ", page);

//    try {
//       const collection = await connectDB("images");
//       const images: ImageType[] = await collection
//          .find({}, { projection: { _id: 0, id: 1, srcUrl: 1, alt: 1 } })
//          .skip(skip).limit(perPage).toArray();

//       if (images.length === 0) return NextResponse.json(
//          { allImagesLoaded: true });

//       await delay(3000);
//       return NextResponse.json(images);
//    } catch (error) {
//       console.error(error);
//       return NextResponse.json({ success: false }, { status: 500 });
//    }
// }


export async function GET(req: NextRequest) {
   const url = new URL(req.url);
   const id = url.searchParams.get('id');
   const collection = await connectDB("images");
   console.log(id);   

   try {
      if (id) {
         const image = await collection.findOne(
            // { alt: id },
            { imageName: id },
            { projection: { _id: 0, id: 1, srcUrl: 1, alt: 1 } }
         );
         if (!image) {
            return NextResponse.json(
               { success: false, message: "Image not found" },
               { status: 404 }
            );
         }
         return NextResponse.json(image);
      } else {
         const perPage = 5;
         const page = parseInt(url.searchParams.get('page') ?? '1', 10) - 1;
         const skip = page * perPage;
         console.log("requested page: ", page);

         const images: ImageType[] = await collection
            .find({}, { projection: { _id: 0, id: 1, srcUrl: 1, alt: 1 } })
            .skip(skip)
            .limit(perPage)
            .toArray();

         if (images.length === 0) {
            return NextResponse.json({ allImagesLoaded: true });
         }

         await delay(1000); // TODO: need to remove
         return NextResponse.json(images);
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false }, { status: 500 });
   }
}

