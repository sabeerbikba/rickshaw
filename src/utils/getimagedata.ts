'use server';
import type { ImageType } from "@/data/images";
import getBaseUrl from "./getbaseurl";
import images from "@/data/images";
import type { GetApiResponse } from '@/types/api';


const getImageData = async (alt: string): Promise<[string | undefined, string, string | undefined]> => {
   let searchAlt: string;
   let photo: ImageType;
   let fallbackSrc: number = 0; // 0 = src, 1 = fallbackSrc1, 2 = fallbackSrc2
   let finalSrc: string | undefined;
   let responseData: GetApiResponse | undefined = undefined;


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

      // If no local image is found, fetch from API
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/api/image?alt=${alt}`;
      const response = await fetch(url)
      const data = await response.json();
      /**
       * Example response:
       * {
       *   success: true,
       *   image: {
       *     id: 22,
       *     src: 'https://i.ibb.co/bvS19Sm/lj1YChB.jpg',
       *     alt: 'not-specified-3',
       *     base64String: 'data:image/webp;base64,...',
       *     width: 959,
       *     height: 1280
       *   }
       * }
       */
      photo = data.image;
      responseData = data;
      finalSrc = photo?.src
   }


   return [finalSrc, photo?.alt, responseData?.message];
};

export default getImageData;
