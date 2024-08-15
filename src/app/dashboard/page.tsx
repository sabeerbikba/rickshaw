"use server";
import "server-only";
import { cookies } from "next/headers";

// this page is edited in android please ignore code structure it will fix later 
export default async function Dashbaord() {
   const getCookie = cookies();

   const token: string = getCookie.get('token');
   const expire: string = getCookie.get('expire');

   if (!token && !expire) {
      console.log('cookeies not found!!!');
   }


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
         <div>{token}</div>
         <div>{expire}</div>
      </>
   );
}
