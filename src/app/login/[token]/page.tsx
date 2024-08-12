"use server";
import "server-only";
// import UploadModal from "@/components/uploadmodal";
// import { transformText } from "@/utils/functions";
// import "./styles.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { MongoClient, Db, Collection } from 'mongodb';
import Login from "@/components/login";


const mongoUri = process.env.MONGODB_URI;                                   
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
                                                                            const connectDB = async (
   collection: string,
   database: string = "rickshaw",
   dbUri: string = mongoUri as string,                                      ): Promise<Collection<any>> => {
   if (!dbUri) {
      throw new Error('Please provide a valid MongoDB URI.');
   }

   if (cachedClient && cachedDb) {
      console.log("Database already connected, reusing client");
      const db = cachedDb.collection(collection);
      return db;
   }

   try {
      const client = new MongoClient(dbUri);

      await client.connect();
      cachedClient = client;
      cachedDb = client.db(database);

      console.log("Database connected successfully");
      const db = cachedDb.collection(collection);
      return db;
   } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Failed to connect to the database");                    }
}

export default async function PhotoPage({
   params: { token },
}: {
   params: { token: string };
}): promise<JSX.Element> {
// this file is edited in android please ignore code structure it will fixed later 

const storeCookie = cookies();


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
	<div> invalid or expired token</div>
	</>
    );
  } else {
storeCookies.set("token", token, {
	httpOnly: true,
	maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
	path: "/dashboard", // check it's okay
	sameSite: "lax"
});

storeCookies.set("expire", loginToken.expires, {
	httpOnly: true,
	maxAge: 60 * 45, // 45 min in seconds need to use same used as loginToken.expires if it okay  to use 
	path: "/dashboard", // check it's okay
	sameSite: "lax"
});



    return (
	<>
	    <p>[token]</p>
	    <p>[token]</p>
	    <p>[token]</p>
	<Login />
	</>
    );
  }

		
	} catch (e) {
	console.error("error fetching token:", e);
	    return (
	    <>
	    <p>[token]</p>
	    <p>[token]</p>
	    <p>[token]</p>
	    <p>[token]</p>
	<div>Error: {e.message}</div>
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
