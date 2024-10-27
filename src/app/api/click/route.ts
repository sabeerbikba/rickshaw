import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectdb";
import { headersToObject } from "@/utils/apiutils";
import logError from "@/utils/logerror";


const POST = async (req: NextRequest): Promise<NextResponse<null>> => {
   const formData = await req.formData();
   const page = formData.get('page');

   try {
      const collection = await connectDB("buttonClicks");
      if (!collection) throw new Error("Collection is not available");
      await collection.insertOne({
         page: page,
         body: {
            method: req.method,
            url: req.url,
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
            headers: headersToObject(req.headers),
         }
      });
      return NextResponse.json(null, { status: 200 });
   } catch (error) {
      logError(error as Error, '/api/click')
      return NextResponse.json(null, { status: 500 });
   }
};

export { POST };