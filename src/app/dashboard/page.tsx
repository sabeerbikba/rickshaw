"use server";
import "server-only";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import DelayedRedirect from "@/components/login/delayedredirect";
import connectDB from "@/utils/connectdb";

export default async function Dashbaord() {
   console.log('page: /dashboard');
   const getCookie = cookies();
   const token: RequestCookie | undefined = getCookie.get('token');
   const expire: RequestCookie | undefined = getCookie.get('expire');

   const collection = await connectDB('loginTokens');
   const loginToken = await collection.findOne({ token: token?.value }); // TODO: only need to get what information needed
   console.log('loginToken', loginToken);
   console.log('token expire', loginToken?.expires > new Date());

   if (!token?.value) {
      return (
         <>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>

            <div>Token Expired please Login</div>
            <DelayedRedirect seconds={5} showTimer />
         </>
      );
   } else if (loginToken && loginToken.expires > new Date()) {
      return (
         <>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <h1>valid user</h1>
            <div>token: {token?.value}</div>
            <div>expire: {expire?.value}</div>
            <h3>need to show whatEver want to show </h3>
         </>
      )
   } else {
      return (
         <>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>[Dashbaord]</div>
            <div>something going wrong contact owner</div>
         </>
      )
   }

}
