import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/utils/connectdb';

type env = string | undefined;
const EMAIL1: env = process.env.EMAIL1;
const EMAIL2: env = process.env.EMAIL2;
const EMAIL1_PASS: env = process.env.EMAIL1_PASS;
const NEXT_PUBLIC_URL: env = process.env.NEXT_PUBLIC_URL;

const sendEmail = async (
   text: string,
   recipient: string | object
) => {

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: EMAIL1,
         pass: EMAIL1_PASS,
      },
   });

   await transporter.sendMail({
      from: EMAIL1,
      to: recipient,
      subject: 'Login Link',
      text // Need to use html insted of text 
   });
};

export async function POST(req: NextRequest, _res: NextResponse) {
   const token = uuidv4(); // token.length = 36
   const link = `${NEXT_PUBLIC_URL}/login/${token}`;
   const collection = await connectDB('loginTokens');
   const recipients = [EMAIL1, EMAIL2];

   const deviceInfo = {
      userAgent: req.headers.get('user-agent'),
      secChUaPlatform: req.headers.get('sec-ch-ua-platform'),
      secChUa: req.headers.get('sec-ch-ua'),
      acceptEncoding: req.headers.get('accept-encoding'),
      acceptLanguage: req.headers.get('accept-language'),
      // Need to test using in server by using conosle.log(); what information we can collect 
   };

   await collection.insertOne({
      token,
      deviceInfo,
      expires: new Date(Date.now() + 5 * 60 * 60 * 1000), // Expires in 5 hours
      createdAt: new Date(),
      authenticated: false,
   });

   // Instead of text need to send html :29
   const message: string = `Click here to login: ${link} and json is ${JSON.stringify(deviceInfo)}`;
   const sendGmail = await sendEmail(message, recipients);
   console.log(sendGmail);
   

   return NextResponse.json({ message: 'Login link sent' });
}

