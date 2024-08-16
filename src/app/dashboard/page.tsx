"use server";
import "server-only";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

// this page is edited in android please ignore code structure it will fix later 
export default async function Dashbaord() {
   console.log('page: /dashboard');
   const getCookie = cookies();

   //TODO:  cookes is undefined need to check why 
   const token: RequestCookie | undefined = getCookie.get('token');
   const expire: RequestCookie | undefined = getCookie.get('expire');

   if (!token) {
      console.log('token cookeie not found!!!');
   } else if (!expire) {
      console.log('expire cookeie not found!!!');
   }
      console.log('loggin tokens!!!');
      console.log('token', token);
      console.log('expire', expire);
   return (
      <>
         <div>[Dashbaord]</div>
         <div>[Dashbaord]</div>
         <div>[Dashbaord]</div>
         <div>[Dashbaord]</div>
         <div>[Dashbaord]</div>
         <div>[Dashbaord]</div>
         <div>[Dashbaord]</div>

         <h1>tokens</h1>
         {/* <div>{token}</div> */}
         {/* <div>{expire}</div> */}
      </>
   );
}
