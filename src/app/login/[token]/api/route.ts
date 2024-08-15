import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/connectdb';
import { cookies } from 'next/headers';

const SECRET_KEY1 = process.env.SECRET_KEY1; // move to database
const SECRET_KEY2 = process.env.SECRET_KEY2; // move to database
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const extractToken = (url: string): string => {
   const urlObj = new URL(url);
   const pathSegments = urlObj.pathname.split('/');
   return pathSegments[pathSegments.length - 1];
}

export async function POST(req: NextRequest, _res: NextResponse) {
   //TODO: In incoming request need to check url token contains in Db 

   const setCookie = cookies();
   const body = await req.formData();
   const secret1 = body.get('secret1');
   const secret2 = body.get('secret2');
   const token = extractToken(req.headers.get('referer') as string);
   console.log('token');
   console.log(token);


   if (secret1 === SECRET_KEY1 && secret2 === SECRET_KEY2) { // insted of env use in ecrepted db saved passwords 

      const collection = await connectDB('loginTokens');

      await collection.updateOne(
         { token },
         { $set: { authenticated: true } }
      );
      const loginToken = await collection.findOne({ token });

      if (!loginToken || loginToken.expires < new Date()) {
         console.log('setting cookies');
         // cookes set if login token not expired and token existed 
         setCookie.set("token", token, {
            httpOnly: true,
            // TODO: need to increase the time as needed can be set session as expire 
            maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            // path: "/dashboard", // check it's okay
            path: "/", 
            // sameSite: "lax"
         });

         setCookie.set("expire", loginToken.expires, {
            httpOnly: true,
            // TODO: need to increase the time as needed can be set session as expire 
            maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            // path: "/dashboard", // check it's okay
            path: "/", 
            // sameSite: "lax"
         });
      }














      return NextResponse.json({ message: 'Login successfull' });
   } else {
      console.log('failed login!!');
      return NextResponse.json({ message: 'failed to login' });
   }







   // await collection.insertOne({
   //    token,
   //    deviceInfo,
   //    expires: new Date(Date.now() + 5 * 60 * 60 * 1000), // Expires in 5 hours
   //    createdAt: new Date(),
   // });

}

