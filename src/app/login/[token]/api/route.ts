import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/connectdb';
import { cookies } from 'next/headers';

//TODO: need to test decresing time to lower and and after login to it after time end 

const SECRET_KEY1 = process.env.SECRET_KEY1; // move to database
const SECRET_KEY2 = process.env.SECRET_KEY2; // move to database
// const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

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
   const clientMachineDate = new Date (body.get('date'));
   const cookiesExpire = new Date(clientMachineDate.getTime() + 45 * 60 * 1000); // 45min
   // const maxAge = Math.floor((clientMachineDate.getTime() + 45 * 60 * 1000 - Date.now()) / 1000);
   const token = extractToken(req.headers.get('referer') as string || req.url);

   console.log('clientMachineDate', clientMachineDate);
   // console.log('cookiesExpire    ', cookiesExpire); 
   
   // console.log('clientMachineDate', clientMachineDate);
   // console.log('thisMachineDate', new Date());
   // console.log('cookiesExpire', cookiesExpire);


   if (secret1 === SECRET_KEY1 && secret2 === SECRET_KEY2) { // insted of env use in ecrepted db saved passwords 

      const collection = await connectDB('loginTokens');
      const loginToken = await collection.findOne({ token });

      console.log('cookies');
      console.log('!loginToken', loginToken);
      console.log('loginToken.expires > new Date()',loginToken.expires > new Date());
      // always thoses conditions is false 
      // maxAge: session
      if (loginToken && loginToken.expires > new Date()) {
      await collection.updateOne(
         { token },
         { $set: { authenticated: true } }
      );
         console.log('setting cookies');
         // cookes set if login token not expired and token existed 
         setCookie.set("token", token, {
            httpOnly: true,
            // TODO: need to increase the time as needed can be set session as expire 
            // maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            expires: Date.now() + 45 * 60, // 1day
//TODO: this is not working as expected means it set 7 hours diffrence 
            path: "/", // check it's okay
            sameSite: "lax"
         });

         setCookie.set("expire", loginToken.expires, {
            httpOnly: true,
            // TODO: need to increase the time as needed can be set session as expire 
            // maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            expires: Date.now() + 45 * 60, // 1day
            //TODO: this is not working as expected means it set 7 hours diffrence 
            path: "/", // check it's okay
            sameSite: "lax"
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

