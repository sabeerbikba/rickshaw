"use server";
import "server-only";
// import UploadModal from "@/components/uploadmodal";
// import { transformText } from "@/utils/functions";
// import "./styles.css";
import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
import Login from "@/components/login/login";
import DelayedRedirect from "@/components/login/delayedredirect";
import connectDB from "@/utils/connectdb";

// Error:  Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options

export default async function PhotoPage({
   params: { token },
}: {
   params: { token: string };
}): Promise<JSX.Element> {
   // this file is edited in android please ignore code structure it will fixed later 

   // const storeCookie = cookies();

   if (token.length != 36) {
      redirect("/login");
   } else {

      // can be use layout.tsx file... 
      try {
         const collection = await connectDB('loginTokens');
         const loginToken = await collection.findOne({ token });
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
            // storeCookie.set("token", token, {
            //    httpOnly: true,
            //    maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            //    path: "/dashboard", // check it's okay
            //    sameSite: "lax"
            // });

            // storeCookie.set("expire", loginToken.expires, {
            //    httpOnly: true,
            //    maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
            //    path: "/dashboard", // check it's okay
            //    sameSite: "lax"
            // });

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
               {/* need to removed this error in production */}
               <div>Error: {error.message}</div>
            </>
         );
      }
   }

   /*
      try {
         const photo: ImageType = images.find((p) => p.alt === id)!;
         return (
            <>
               <main className="main-gallery">
                  <div className="tab-img-preview">
                     <img                                                                           alt={photo.alt}                                                             src={photo.srcUrl}
                     />
                     <br />
                     <br />
                     <div>
                        <h1>{transformText(photo.alt)}</h1>                                      </div>
                  </div>
               </main>
               <UploadModal />
            </>
         );
      } catch {
         return (
            <>
               <main className="main-gallery">
                  <div className="tab-img-preview">
                     <h1 className="error">Image not Found</h1>
                  </div>                                                                   </main>
               <UploadModal />
            </>
         );
      }
      */
}
