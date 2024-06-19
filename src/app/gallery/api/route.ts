
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import { MongoClient } from 'mongodb';
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join, resolve } from "path";

dotenv.config();
const asyncExec = promisify(exec);
const imgbbUrl = process.env.IMGBB_API;
const mongoUri = process.env.MONGODB_URI;
let cachedClient: any = null;
let cachedDb: any = null;

async function connectDB(
   database: string,
   collection: string,
   dbUri: any = mongoUri,
) {
   if (!dbUri) {
      throw new Error('Please provide a valid MongoDB URI.');
   }

   if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
      console.log("database already conected reusing client");
      const db = cachedDb.collection(collection);
      return db;
   }

   try {
      const client = await MongoClient.connect(dbUri);
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

export async function POST(req: NextRequest) {
   const data = await req.formData();
   const files: File[] = data.getAll('images') as unknown as File[];

   if (!files || files.length <= 0) {
      return NextResponse.json({ success: false });
   }

   const uploadDir = resolve('.', 'uploads');
   await mkdir(uploadDir, { recursive: true });

   const uploadedFilePaths = [];

   try {
      const collection = await connectDB("rickshaw", "images");
      if (!collection) throw new Error("Collection is not available");

      for (const file of files) {
         const bytes = await file.arrayBuffer();
         const buffer = Buffer.from(bytes);

         const filePath = join(uploadDir, file.name);
         await writeFile(filePath, buffer);
         uploadedFilePaths.push(filePath);

         const command = `curl -X POST https://api.imgbb.com/1/upload -F "key=${imgbbUrl}" -F "image=@${filePath}"`;
         const { stdout, stderr } = await asyncExec(command);

         // FOUND PROBLEM THIS IS PROBLEM THIS CONDITION

         if (stderr) {
            console.error(`Error executing cURL command: ${stderr}`);
         }

         // FOUND PROBLEM THIS IS PROBLEM THIS CONDITION

         const response = JSON.parse(stdout);
         console.log(response);
         const collectionCount = await collection.countDocuments() || 0;

         console.log('Inserting document into MongoDB');

         try {
            const result = await collection.insertOne({
               id: collectionCount + 1,
               imageName: file.name,
               srcUrl: response.data.url,
               extension: response.data.image.extension,
               mimeType: response.data.image.mime,
               timeStamp: new Date(),
               originalname: file.name,
               allResponse: {
                  exceCmd: {
                     stdout: response,
                     stderr,
                  },
                  headResponse: {
                     method: req.method,
                     headers: req.headers,
                     ipAddress: req.ip,
                     url: req.url
                  },
               },
            });
            console.log('Insert result:', result);
         } catch (insertError) {
            console.error('Error inserting document:', insertError);
         }
         console.log('Document inserted successfully');
      }
      return NextResponse.json({ success: true });
   } catch (err) {
      console.error('Error saving image:', err);
      return NextResponse.json({ success: false }, { status: 500 });
   } finally {
      for (const filePath of uploadedFilePaths) {
         try {
            await unlink(filePath);
            console.log(`Successfully deleted ${filePath}`);
         } catch (err) {
            console.error(`Error deleting ${filePath}:`, err);
         }
      }
   }
}


export async function GET() {
   try {
      const collection = await connectDB("rickshaw", "images");
      const result = await collection?.insertOne({ get: "success" });
      return Response.json(result);
   } catch (error) {
      return Response.json({
         id: 1,
         error: "not found " + error
      });
   }
}

