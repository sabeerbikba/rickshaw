import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/utils/connectdb';

const EMAIL1 = process.env.EMAIL1;
const EMAIL2 = process.env.EMAIL2;
const EMAIL1_PASS = process.env.EMAIL1_PASS;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const sendEmail = async (
   link: string,
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
      text: `Click here to login: ${link}`,
   });
};

export async function POST(req: NextRequest, _res: NextResponse) {
   const token = uuidv4(); // token.length = 36
   const link = `${NEXT_PUBLIC_URL}/login/${token}`;
   const collection = await connectDB('loginTokens');
   const recipients = [EMAIL1, EMAIL2];

   const deviceInfo = req.headers.get('user-agent');

   await collection.insertOne({
      token,
      deviceInfo,
      expires: new Date(Date.now() + 45 * 60 * 1000), // Expires in 45 minutes
      createdAt: new Date(),
   });


   await sendEmail(link, recipients);

   return NextResponse.json({ message: 'Login link sent' });
}

