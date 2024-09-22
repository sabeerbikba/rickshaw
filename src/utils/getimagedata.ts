'use server';
import 'server-only';
import { headers } from 'next/headers';
import type { ImageType } from "@/data/images";
import images from "@/data/images";

function getBaseUrl() { // TODO: check it's working as expected in server
   const headersList = headers();
   const host = headersList.get('host');
   const protocol = headersList.get('x-forwarded-proto') || 'http';
   return `${protocol}://${host}`;
}

// TODO: I think this is not utility function 

// const getImageData = async (alt: string) => {
const getImageData = async (alt: string): Promise<[string | undefined, string]> => {


   let searchAlt: string;
   let photo: ImageType;
   let fallbackSrc: number = 0; // 0 = src, 1 = fallbackSrc1, 2 = fallbackSrc2
   let finalSrc: string | undefined;


   const fallBackStartsWith: string[] = ['fallback1-', 'fallback2-'];
   if (fallBackStartsWith.some(prefix => alt.startsWith(prefix))) {
      searchAlt = alt.replace(/^(fallback1-|fallback2-)/, '');

      if (alt.startsWith(fallBackStartsWith[0])) {
         fallbackSrc = 1;
      } else if (alt.startsWith(fallBackStartsWith[1])) {
         fallbackSrc = 2;
      }
   } else {
      searchAlt = alt
   }

   photo = images.find((p) => p.alt === searchAlt)!;

   if (photo) {
      finalSrc = (() => {
         switch (fallbackSrc) {
            case 0: {
               return photo.src;
            }
            case 1: {
               return photo.fallbackSrc1;
            }
            case 2: {
               return photo.fallbackSrc2;
            }
            default: {
               return photo.src;
            }
         }
      })();
   } else {
      // if (photo === undefined) {
      const baseUrl = getBaseUrl();

      const url = `${baseUrl}/api/image?alt=${alt}`;
      console.log("url: ");
      console.log(url);
      const response = await fetch(url)
      photo = await response.json();
      finalSrc = photo.src
      // }
   }

   return [finalSrc, photo.alt];
}

export default getImageData;

// 'use server';
// import 'server-only';
// import { headers } from 'next/headers';
// import type { ImageType } from "@/data/images";
// import images from "@/data/images";

// function getBaseUrl(): string {
//    try {
//       const headersList = headers();
//       const host = headersList.get('host');
//       const protocol = headersList.get('x-forwarded-proto') || 'http';
//       return `${protocol}://${host}`;
//    } catch (error) {
//       console.error("Error getting base URL:", error);
//       return 'http://localhost'; // Default fallback URL
//    }
// }

// const getImageData = async (alt: string): Promise<[string | undefined, string | undefined]> => {
//    let searchAlt: string;
//    let photo: ImageType | undefined;
//    let fallbackSrc: number = 0; // 0 = src, 1 = fallbackSrc1, 2 = fallbackSrc2
//    let finalSrc: string | undefined;

//    try {
//       const fallBackStartsWith: string[] = ['fallback1-', 'fallback2-'];
//       if (fallBackStartsWith.some(prefix => alt.startsWith(prefix))) {
//          searchAlt = alt.replace(/^(fallback1-|fallback2-)/, '');

//          fallbackSrc = alt.startsWith(fallBackStartsWith[0]) ? 1 : 2;
//       } else {
//          searchAlt = alt;
//       }

//       photo = images.find((p) => p.alt === searchAlt);

//       if (photo) {
//          switch (fallbackSrc) {
//             case 0:
//                finalSrc = photo.src;
//                break;
//             case 1:
//                finalSrc = photo.fallbackSrc1;
//                break;
//             case 2:
//                finalSrc = photo.fallbackSrc2;
//                break;
//             default:
//                finalSrc = photo.src;
//          }
//       } else {
//          const baseUrl = getBaseUrl();
//          const url = `${baseUrl}/api/image?alt=${alt}`;
//          const response = await fetch(url);

//          if (!response.ok) {
//             throw new Error(`Error fetching image data: ${response.statusText}`);
//          }

//          photo = await response.json();

//          // @ts-ignore   
//          finalSrc = photo.src;
//          // @ts-ignore   
//          if (photo.src === undefined) {
//             throw new Error('Error: photo.src undefinded!!')
//          }
//       }

//    } catch (error) {
//       console.error("Error getting image data:", error);
//       finalSrc = undefined;
//    }

//    return [finalSrc, photo?.alt];
// }

// export default getImageData;
