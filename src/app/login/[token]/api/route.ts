import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/connectdb';
import { cookies } from 'next/headers';

//TODO: need to test decresing time to lower and and after login to it after time end 

// TODO: 
const SECRET_KEY1 = process.env.SECRET_KEY1; // move to database
const SECRET_KEY2 = process.env.SECRET_KEY2; // move to database

const extractToken = (url: string): string => {
   const urlObj = new URL(url);
   const pathSegments = urlObj.pathname.split('/');
   return pathSegments[2];
}

export async function POST(req: NextRequest, _res: NextResponse) {
   console.log(req);

   const setCookie = cookies();
   const body = await req.formData();
   const secret1 = body.get('secret1');
   const secret2 = body.get('secret2');
   const cookiesExpire = Date.now() + 45 * 60 * 1000;
   const token = extractToken(req.headers.get('referer') as string || req.url);

   if (token.length != 36) {
      // TODO: if length is less then 36 log mostly unkonws user with all her availble information
      return NextResponse.json({ message: 'Login failed. something wrong!!!!!' });
   } else if (secret1 === SECRET_KEY1 && secret2 === SECRET_KEY2) { // TODO: insted of env use in ecrepted db saved passwords 
      const collection = await connectDB('loginTokens');
      const loginToken = await collection.findOne({ token });  // TODO: only need to get what information needed

      if (loginToken && loginToken.expires > new Date()) {
         await collection.updateOne({ token }, { $set: { authenticated: true } });
         // ?? what is sameSite: lax
         console.log('setting cookies');
         setCookie.set("token", token, {
            secure: true,
            // TODO: need to increase the time as needed can be set session as expire 
            // maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            // expires: Date.now() + 45 * 60, // 1day
            expires: cookiesExpire,
            path: "/",
            sameSite: "lax"
         });

         setCookie.set("expire", cookiesExpire.toString(), {
            secure: true,
            // TODO: need to increase the time as needed can be set session as expire 
            // maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            // expires: Date.now() + 45 * 60, // 1day
            expires: cookiesExpire,
            path: "/",
            sameSite: "lax"
         });
      }
      return NextResponse.json({ message: 'Login successfull' });
   } else {
      console.log('failed login!!');
      return NextResponse.json({ message: 'failed to login' });
   }
}
