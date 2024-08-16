"use server";
import "server-only";
import { redirect } from "next/navigation";
import Login from "@/components/login/login";
import DelayedRedirect from "@/components/login/delayedredirect";
import connectDB from "@/utils/connectdb";

export default async function PhotoPage({
   params: { token },
}: {
   params: { token: string };
}): Promise<JSX.Element> {

   if (token.length != 36) {
      // TODO: if length is less then 36 log mostly unkonws user with all her availble information
      redirect("/login");
   } else {
      // can be used layout.tsx file... 
      try {
         const collection = await connectDB('loginTokens');
         const loginToken = await collection.findOne({ token });  // TODO: only need to get what information needed
         if (!loginToken || loginToken.expires < new Date()) {
            return (
               <>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <div> invalid or expired token</div>
                  {/* after 5 seconds redirect to /login */}
                  <DelayedRedirect seconds={5}/>
               </>
            );
         } else {
            return (
               <>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <p>[token]</p>
                  <Login />
               </>
            );
         }
      } catch (error: any) {
         console.error("error fetching token:", error);
         return (
            <>
               <p>[token]</p>
               <p>[token]</p>
               <p>[token]</p>
               <p>[token]</p>
               <p>[token]</p>
               <p>[token]</p>
               <p>[token]</p>
               {/* TODO: need to removed this error in production */}
               <div>Error: {error.message}</div>
            </>
         );
      }
   }
}
