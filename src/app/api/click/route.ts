import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectdb";
import { headersToObject } from "@/utils/apiutils";


export async function POST(req: NextRequest) {
   console.log(req);
      try {
         const collection = await connectDB("buttonClicks");
         if (!collection) throw new Error("Collection is not available");
         const result = await collection.insertOne({
            method: req.method,
            url: req.url,
            headers: headersToObject(req.headers),
            destination: req.destination,
            referrer: req.referrer,
            referrerPolicy: req.referrerPolicy,
            mode: req.mode,
            credentials: req.credentials,
            cache: req.cache,
            redirect: req.redirect,
            integrity: req.integrity,
            keepalive: req.keepalive,
            // @ts-ignore
            isReloadNavigation: req.isReloadNavigation,
            // @ts-ignore
            isHistoryNavigation: req.isHistoryNavigation,
            signal: { aborted: req.signal.aborted },
         });
         return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
      } catch (error) {
         console.error('Error:', error);
         return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
      }
}