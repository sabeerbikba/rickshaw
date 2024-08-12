import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';

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

const sendEmail = async (link, recipient) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL1,
      pass: process.env.EMAIL1_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL1,
    to: recipient,
    subject: 'Login Link',
    text: `Click here to login: ${link}`,
  });
};

export async function POST(req, res: NextResponse) {
  const token = uuidv4(); // token.length = 36
  // Link need to be changed like /login/api/authenticate... continue
  const link = `${process.env.NEXT_PUBLIC_URL}/login/${token}`;
  // const client = await MongoClient.connect(process.env.MONGODB_URI);
  // const db = client.db();
  const collection = await connectDB('loginTokens');
const recipients = [process.env.EMAIL1, process.env.EMAIL2];

  const deviceInfo = req.headers['user-agent'];

  // await db.collection('loginTokens').insertOne({
  await collection.insertOne({
    token,
    deviceInfo,
    expires: new Date(Date.now() + 45 * 60 * 1000), // Expires in 45 minutes
    createdAt: new Date(),
  });

  // client.close();

  await sendEmail(link,recipients);
  // await sendEmail(link, process.env.EMAIL2);

  return NextResponse.json({ message: 'Login link sent' });
}

