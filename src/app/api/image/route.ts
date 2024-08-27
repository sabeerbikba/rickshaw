import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import sharp from "sharp";
import fs from 'fs';
import { encode } from "blurhash";
import path, { join, resolve } from "path";
import { formatBytes } from "@/utils/functions";
import connectDB from "@/utils/connectdb";
import { headersToObject } from "@/utils/apiutils";
import type { ImageType } from "@/data/images";

// TODO: need to error logging system to front-end
// TODO: after image uplaod successful close the uplaod modal and if possible focus on upladed first or last image
// TODO: even upload failed show upload success in front-end  need to fix it 
// TODO: after upload img need to add in top and focus first img if possible 
// TODO: if something error in database show error in page 
// TODO: if image size is more then 1 mb need to compress it before upload reason is not show fallback image blurhash

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // tmp 4 test
const IMGBB_API = process.env.IMGBB_API as string;

const logError = async (error: Error): Promise<void> => {
   const collection = await connectDB("backend_errorlogs");

   await collection.insertOne({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toString(),
   });
}

function removeExtension(imageName: string): string {
   // replace this function when testing with getFileName() function 
   return imageName.replace(/\.[^/.]+$/, "");
}

function getFileName(fileName: string): string {
   return fileName.substring(0, fileName.indexOf('.'));
}

function getFileExtension(fileName: string): string {
   return fileName.substring(fileName.lastIndexOf('.'));
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



const encodeImageToBlurhash = (path: any) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });



export async function POST(req: NextRequest) {
   // TODO: if image upload successful need to redirect to /gallery and show uploaded image or open in same tab with image name or opening intercepted modal

   const body = await req.formData();
   const files: File[] = body.getAll('images') as unknown as File[];
   const editedImgNames: FormDataEntryValue[] = body.getAll('editedImgNames');

   if (!files || files.length <= 0) {
      // TODO: some time not working 
      return NextResponse.json({ success: false });
   }

   const uploadDir = resolve('.', 'tmp'); // here need to use which one is wokring 
   await mkdir(uploadDir, { recursive: true });

   const uploadedFilePaths = [];

   try {
      const collection = await connectDB("images");
      if (!collection) throw new Error("Collection is not available");

      // for (const file of files) {
      for (let i = 0; i < files.length; i++) {
         // const file = files[i];

         // const bytes = await file.arrayBuffer();
         // const buffer = Buffer.from(bytes);

         // const filePath = join(uploadDir, file.name);
         // await writeFile(filePath, buffer);
         // uploadedFilePaths.push(filePath);

         const file = files[i];
         const originalName = editedImgNames[i] as string;

         const extension = file.name.split('.').pop();
         const newFileName = `${getFileName(editedImgNames[i] as string)}${getFileExtension(file.name)}`;

         // is this code need
         const bytes = await file.arrayBuffer();
         const buffer = Buffer.from(bytes);

         const filePath = join(uploadDir, newFileName);
         const savedFile = await writeFile(filePath, buffer);

         //   const { imgWidth, imgHeight } = await getImageDimensions(filePath);

         const isFileRenamed: boolean = file.name !== newFileName;
         console.log("isFileRenamed ", isFileRenamed);

         uploadedFilePaths.push(filePath); // move this line bottom if needed


         // TODO: test renaming works or not 
         const fetchBody = new FormData();
         fetchBody.append("key", IMGBB_API);
         // fetchBody.append("image", new Blob([buffer], { type: file.type }), newFileName);

         const blob = new Blob([buffer], { type: file.type });
         // fileName can be changed by using fetchBody('name', newFileName);
         fetchBody.append("image", blob, newFileName);

         // exce, curl old code: https://github.com/sabeerbikba/rickshaw/blob/4e8568e3b451c3a18d8293d2cef8edb5084d0cad/src/app/gallery/api/route.ts
         // Response example: https://api.imgbb.com/
         const uploadFetchResponse = await fetch("https://api.imgbb.com/1/upload", {
            method: 'POST',
            body: fetchBody,
            // headers: fetchBody.getHeaders(),
         });


         if (!uploadFetchResponse.ok) {
            // TODO: is that good to use returne here 
            console.error("something going wrong, Error: " + uploadFetchResponse.status + " " + uploadFetchResponse.statusText);
         }
         const responseData = await uploadFetchResponse.json();
         console.log(responseData);

//          const uint8Array = new Uint8ClampedArray(buffer);
         
//          console.log('response: ', responseData);
// console.log('height: ', responseData.data.width);
// console.log('width: ', responseData.data.height);

//   const { width, height } = await getImageDimensions(filePath);
//          const blurhash = encode(uint8Array, width as number, height as number, 4, 4);

console.log('blurhash');
console.log('blurhash');

 const blurhashResponse = await encodeImageToBlurhash(filePath).then(hash => {
  return hash;
});

// const blurhashData = JSON.stringify(blurhashResponse);
const blurhashData = blurhashResponse;

console.log(blurhashData);

console.log('blurhash');
console.log('blurhash');

         const collectionCount = await collection.countDocuments() || 0;

         console.log('Inserting document into MongoDB');
         try {
            // TODO: also need to add data.url, data.display-url and thumbnail.url from imgbb API response
            const result = await collection.insertOne({
               id: collectionCount + 1,
               orignalImgName: file.name,
               editedImgName: editedImgNames[i], // TODO: need to add logic
               // TODO: here we loading data.url that is not orignal quality by planing what to do use data.display_url
               src: responseData.data.url, // changed srcUrl to src
               // TODO: need to save like 
               /**
                  srcUrl: data.display_url // orignal size | eg: 161KB, 27KB
                  srcDecresed: data.url // orignal size | eg: 801KB, 1.00MB
                  srcThumbnail: thumb.url // thumbnail | eg:. 8.96KB, 4.78KB
                  
                */
               alt: `${file.name === editedImgNames[i] ? "not-specified-" : `${removeExtension(editedImgNames[i] as string)}-`}${collectionCount + 1}`, // TODO: always need to be unique key 
               blurhash: blurhashData,
               size: { // 
                  inHeaders: formatBytes(parseInt(req.headers.get('content-length') || '0')), // TODO: now need to check working correctly or not
                  inFormData: formatBytes(file.size),
               },
               uploaderDevie: req.headers.get('user-agent'),
               extension: responseData.data.image.extension,
               mimeType: responseData.data.image.mime,
               uploadTime: new Date().toString(),
               uploadUrl: req.headers.get('referer'), // TODO: agter server test need to check is this valu really needed 
               ipAddr: { // TODO: need to check which one is uploader ip and use on of it
                  host: req.headers.get('host'),
                  origin: req.headers.get('origin'),
               },
               allResponse: {
                  fetch: {
                     responseData,
                     // uploadFetchResponse: uploadFetchResponse // TODO; it showing object in database i think need to save indidual vales suppretely we can't convert .json() because allready converted
                  },
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
                  formData: {
                     files: files.map(file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                     })),
                  },
               },
            });
            console.log('Document inserted successfully, Insert result:', result);
         } catch (insertError) {
            await logError(insertError as Error).catch(logError => {
               console.error('Failed to log error:', logError);
            });
            console.error('Error inserting document:', insertError);
         }
      }
      return NextResponse.json({ success: true });
   } catch (err) {
      await logError(err as Error).catch(logError => {
         console.error('Failed to log error:', logError);
      });
      console.error('Error saving image:', err);
      return NextResponse.json({ success: false }, { status: 500 });
   } finally {
      for (const filePath of uploadedFilePaths) {
         try {
            await unlink(filePath);
            console.log(`Successfully deleted ${filePath}`);
         } catch (err) {
            await logError(err as Error).catch(logError => {
               console.error('Failed to log error:', logError);
            });
            console.error(`Error deleting ${filePath}:`, err);
         }
      }
   }
}

// export async function POST(req: NextRequest) {
//   const body = await req.formData();
//   const files = body.getAll('images') as unknown as File[];
//   const editedImgNames = body.getAll('editedImgNames');

//   if (!files || files.length <= 0) {
//     return NextResponse.json({ success: false });
//   }

//   const uploadDir = resolve('.', 'tmp');
//   await mkdir(uploadDir, { recursive: true });

//   const uploadedFilePaths: string[] = [];

//   try {
//     const collection = await connectDB("images");
//     if (!collection) throw new Error("Collection is not available");

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const originalName = editedImgNames[i] as string;

//       const extension = file.name.split('.').pop();
//       const newFileName = `${getFileName(editedImgNames[i] as string)}${getFileExtension(file.name)}`;

//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const filePath = join(uploadDir, newFileName);

//       // TODO: Implement image resizing and thumbnail generation
//       const savedFile = await writeFile(filePath, buffer);

//       uploadedFilePaths.push(filePath);

//       const fetchBody = new FormData();
//       fetchBody.append("key", IMGBB_API); // Ensure this is correctly set
//       fetchBody.append("image", new Blob([buffer], { type: file.type }), newFileName);

//       const uploadFetchResponse = await fetch("https://api.imgbb.com/1/upload", {
//         method: 'POST',
//         body: fetchBody,
//       });

//       if (!uploadFetchResponse.ok) {
//         console.error(`Upload failed: ${uploadFetchResponse.status} ${uploadFetchResponse.statusText}`);
//         return NextResponse.json({ success: false });
//       }

//       const responseData = await uploadFetchResponse.json();

//       // console.log(responseData);

//       if (!responseData || !responseData.data || !responseData.data.url) {
//         console.error('Invalid ImgBB API response:', responseData);
//         return NextResponse.json({ success: false });
//       }

//       const collectionCount = await collection.countDocuments() || 0;

//       console.log('Inserting document into MongoDB');
//       try {
//         const result = await collection.insertOne({
//           id: collectionCount + 1,
//           originalImgName: file.name,
//           editedImgName: editedImgNames[i],
//           src: responseData.data.url,
//           alt: `${file.name === editedImgNames[i] ? "not-specified-" : `${removeExtension(editedImgNames[i] as string)}-`}${collectionCount + 1}`,
//           size: {
//             inHeaders: formatBytes(parseInt(req.headers.get('content-length') || '0')),
//             inFormData: formatBytes(file.size),
//           },
//           uploaderDevie: req.headers.get('user-agent'),
//           extension: responseData.data.image.extension,
//           mimeType: responseData.data.image.mime,
//           uploadTime: new Date().toString(),
//           ipAddr: {
//             host: req.headers.get('host'),
//             origin: req.headers.get('origin'),
//           },
//           allResponse: {
//             fetch: {
//               responseData,
//             },
//             headers: {
//               method: req.method,
//               url: req.url,
//               headers: headersToObject(req.headers),
//               destination: req.destination,
//               referrer: req.referrer,
//               referrerPolicy: req.referrerPolicy,
//               mode: req.mode,
//               credentials: req.credentials,
//               cache: req.cache,
//               redirect: req.redirect,
//               integrity: req.integrity,
//               keepalive: req.keepalive,
//               // @ts-ignore
//               isReloadNavigation: req.isReloadNavigation,
//               // @ts-ignore
//               isHistoryNavigation: req.isHistoryNavigation,
//               signal: { aborted: req.signal.aborted },
//             },
//             formData: {
//               files: files.map(file => ({
//                 name: file.name,
//                 size: file.size,
//                 type: file.type,
//               })),
//             },
//           },
//         });
//         console.log('Document inserted successfully, Insert result:', result);
//       } catch (insertError) {
//         console.error('Failed to insert document:', insertError);
//       }
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error('Error saving image:', err);
//     return NextResponse.json({ success: false }, { status: 500 });
//   } finally {
//     for (const filePath of uploadedFilePaths) {
//       try {
//         await unlink(filePath);
//         console.log(`Successfully deleted ${filePath}`);
//       } catch (unlinkErr) {
//         console.error(`Error deleting ${filePath}:`, unlinkErr);
//       }
//     }
//   }
// }


export async function GET(req: NextRequest) {
   const url = new URL(req.url);
   const id = url.searchParams.get('id');
   const collection = await connectDB("images");
   console.log(id);

   // TODO: if connection problem show somthing error in front-end 

   try {
      if (id) {
         const image = await collection.findOne(
            { alt: id },
            // { imageName: id },
            { projection: { _id: 0, id: 1, src: 1, alt: 1 } }
         );
         if (!image) {
            return NextResponse.json(
               { success: false, message: "Image not found" },
               { status: 404 }
            );
         }
         return NextResponse.json(image);
      } else {
         const perPage = 5;
         const page = parseInt(url.searchParams.get('page') ?? '1', 10) - 1;
         const skip = page * perPage;
         console.log("requested page: ", page);

         const images: ImageType[] = await collection
            .find({}, { projection: { _id: 0, id: 1, src: 1, alt: 1,  } })
            .skip(skip)
            .limit(perPage)
            .toArray();

         if (images.length === 0) {
            return NextResponse.json({ allImagesLoaded: true });
         }

         await delay(1000); // TODO: need to remove
         return NextResponse.json(images);
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false }, { status: 500 });
   }
}

