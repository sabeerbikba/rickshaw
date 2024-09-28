import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import lqip from 'lqip-modern';
import { join, resolve } from "path";
import formatBytes from "@/utils/formatbytes";
import connectDB from "@/utils/connectdb";
import logError from "@/utils/logerror";
import { headersToObject } from "@/utils/apiutils";
import { ENV_IMGBB_API, isDevelopmentEnv } from "@/data/envimports";
import type { ImageType } from "@/data/images";
import type { PostApiResponse, GetApiResponse } from "@/types/api";


const IMGBB_API = ENV_IMGBB_API;

function removeExtension(imageName: string): string {
   return imageName.replace(/\.[^/.]+$/, "");
}

// async function getImageDimensions(filePath: string) {
//   try {
//     const { width, height } = await sharp(filePath).metadata();
//     return { width, height };
//   } catch (error) {
//     console.error('Error getting image dimensions:', error);
//     throw new Error('Could not get image dimensions');
//   }
// }

// const encodeImageToBlurhash = (path: any) =>
//    new Promise((resolve, reject) => {
//       sharp(path)
//          .raw()
//          .ensureAlpha()
//          .resize(32, 32, { fit: "inside" })
//          .toBuffer((err, buffer, { width, height }) => {
//             if (err) return reject(err);
//             resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
//          });
//    });


const POST = async (req: NextRequest):
   Promise<NextResponse<PostApiResponse>> => {

   const body = await req.formData();
   const files: File[] = body.getAll('images') as unknown as File[];
   const editedImgNames: FormDataEntryValue[] = body.getAll('editedImgNames');

   if (!files || files.length <= 0) {
      return NextResponse.json({ success: false, message: 'Error: Empty request!!' }, { status: 500 });
   }

   const uploadDir = resolve('/tmp');
   await mkdir(uploadDir, { recursive: true });

   const uploadedFilePaths: string[] = [];
   const successfullyUploadedFiles: ImageType[] = []; // To send Response

   const postFailedResponse: PostApiResponse = {
      success: false,
      message: 'Error: Failed uploading image!!',
   };

   try {
      const collection = await connectDB("images");
      if (!collection) throw new Error("Collection is not available");

      // for (const file of files) {
      for (let i = 0; i < files.length; i++) {
         const file = files[i];

         // const extension = file.name.split('.').pop();
         // const newFileName = `${getFileName(editedImgNames[i] as string)}${getFileExtension(file.name)}`;

         const bytes = await file.arrayBuffer();
         const buffer = Buffer.from(bytes);

         const filePath = join(uploadDir, file.name);
         await writeFile(filePath, buffer);

         uploadedFilePaths.push(filePath);

         const fetchBody = new FormData();
         fetchBody.append("key", IMGBB_API);

         const blob = new Blob([buffer], { type: file.type });
         fetchBody.append("image", blob, file.name);
         // fetchBody.append("image", ''); // for testing purpose

         // exce, curl old code: https://github.com/sabeerbikba/rickshaw/blob/4e8568e3b451c3a18d8293d2cef8edb5084d0cad/src/app/gallery/api/route.ts
         // Response example: https://api.imgbb.com/
         const uploadFetchResponse = await fetch("https://api.imgbb.com/1/upload", {
            method: 'POST',
            body: fetchBody,
         });

         const responseData = await uploadFetchResponse.json();

         if (!uploadFetchResponse.ok) {
            console.error(
               `Img upload, Error: ${responseData.status_code} ${responseData.status_txt}, ${responseData.error.message}: ${responseData.error.code}`
            );

            await logError(responseData as Error, '/api/image');
            return NextResponse.json(postFailedResponse, { status: 500 });
         }
         //          const uint8Array = new Uint8ClampedArray(buffer);

         //          console.log('response: ', responseData);
         // console.log('height: ', responseData.data.width);
         // console.log('width: ', responseData.data.height);

         //   const { width, height } = await getImageDimensions(filePath);
         //          const blurhash = encode(uint8Array, width as number, height as number, 4, 4);



         // // INSTEAD USING SQIP // // 
         // const blurhashResponse = await encodeImageToBlurhash(filePath).then(hash => {
         //    return hash;
         // });
         // const blurhashData = blurhashResponse;

         // const base64String = sqip({ filename: filePath, numberOfPrimitives: 10 });
         const lqipOutput = await lqip(filePath);
         const collectionCount = await collection.countDocuments() || 0;

         const id: number = collectionCount + 1 + 19; // images.length = 19
         const src: string = responseData.data.url;
         const alt: string = `${file.name === editedImgNames[i] ? "not-specified-" :
            `${removeExtension(editedImgNames[i] as string)}-`}${id}`;
         const base64String: string = lqipOutput.metadata.dataURIBase64;
         const width: number = responseData.data.width;
         const height: number = responseData.data.height;

         // TODO: need to save like: NOT PLANED TODO:
         /**
            srcUrl: data.display_url // orignal size | eg: 161KB, 27KB, 266KB
            srcDecresed: data.url // orignal size | eg: 801KB, 1.00MB, 303KB, 
            srcThumbnail: thumb.url // thumbnail | eg:. 8.96KB, 4.78KB, 20KB
            
          */

         try {
            const result = await collection.insertOne({
               id,
               src, //
               alt,
               // blurhash: blurhashData, // For now not using lqip 
               base64String,
               width,
               height,

               orignalImgName: file.name,
               editedImgName: editedImgNames[i],
               size: { // 
                  inHeaders: formatBytes(parseInt(req.headers.get('content-length') || '0')),
                  inFormData: formatBytes(file.size),
               },
               uploaderDevie: req.headers.get('user-agent'),
               extension: responseData.data.image.extension,
               mimeType: responseData.data.image.mime,
               uploadTime: new Date().toString(),
               uploadUrl: req.headers.get('referer'),
               ipAddr: {
                  host: req.headers.get('host'),
                  origin: req.headers.get('origin'),
               },
               allResponse: {
                  formData: {
                     files: files.map(file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                     })),
                  },
                  fetch: responseData,
                  headers: {
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
                  },
                  lqip: lqipOutput,
               },
            });

            successfullyUploadedFiles.push({
               id,
               src,
               alt,
               base64String,
               width,
               height,
            }); // TODO:

         } catch (insertError) {
            await logError(insertError as Error, '/api/image');
            if (isDevelopmentEnv) {
               console.log(insertError);
               console.error('Error inserting document:', insertError);
            }
         }
      }

      const postSuccessApiResponse: PostApiResponse = {
         success: true,
         // images: successfullyUploadedFiles, // Not planed
      };
      return NextResponse.json(postSuccessApiResponse, { status: 200 });
   } catch (err) {
      await logError(err as Error, '/api/image');
      return NextResponse.json(postFailedResponse, { status: 500 });
   } finally {
      // Cleanup
      for (const filePath of uploadedFilePaths) {
         try {
            await unlink(filePath);
         } catch (err) {
            await logError(err as Error, '/api/image');
            console.error(`Error deleting ${filePath}:`, err);
         }
      }
   }
};

const GET = async (req: NextRequest):
   Promise<NextResponse<GetApiResponse>> => {

   const url = new URL(req.url);
   const alt = url.searchParams.get('alt');
   const collection = await connectDB("images");


   if (!collection) {
      return NextResponse.json(
         { success: false, message: "Database connection error" },
         { status: 500 }
      );
   }

   const projection = { _id: 0, id: 1, src: 1, alt: 1, base64String: 1, width: 1, height: 1, };

   try {
      if (alt) {

         // This part used in /gallery/[alt] route and intercepting url 
         const image: ImageType | null = await collection.findOne(
            { alt }, { projection }
         );
         if (!image) {
            return NextResponse.json(
               { success: false, message: "Image not found" },
               { status: 404 }
            );
         }
         return NextResponse.json({ success: true, image });
      } else {

         // This part used in /gallery for infinite scroll
         const perPage = 5;
         const page = parseInt(url.searchParams.get('page') ?? '1', 10) - 1;
         const skip = page * perPage;

         const images: ImageType[] = await collection
            .find({}, { projection })
            .skip(skip)
            .limit(perPage)
            .toArray();

         const totalImages = await collection.countDocuments();
         const allImagesLoaded = skip + perPage >= totalImages;

         if (images.length === 0) {
            return NextResponse.json(
               { allImagesLoaded: true, success: true },
               { status: 200 }
            );
         }

         return NextResponse.json({
            success: true,
            images,
            allImagesLoaded
         });
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { success: false, message: "Internal server error" }, { status: 500 }
      );
   }
};

export { GET, POST };
