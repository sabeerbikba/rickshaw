// import Image from "next/image";
"use server";
import 'server-only';
// import { headers } from 'next/headers';
import ImageModal from "@/components/gallery/imagemodal";
// import images from '@/data/images';
// import type { ImageType } from '@/data/images';
import getImageData from '@/utils/getimagedata';

// TODO: if error happens need to log into databse
// TODO: need to think about id is which is better: alt or imgName

// TODO: get base can resuse check
// function getBaseUrl() { // TODO: check it's working as expected in server
//    const headersList = headers();
//    const host = headersList.get('host');
//    const protocol = headersList.get('x-forwarded-proto') || 'http';
//    return `${protocol}://${host}`;
// }

export default async function PhotoModal({
   params: { id },
}: {
   params: { id: string };
}) {
   
   // need to add jsx value 

   // function removeFallbackPrefix(text: string): string {
   //    // Regular expression to match either "fallback1-" or "fallback2-" at the start of the string
   //    const regex = /^(fallback1-|fallback2-)/;

   //    // Replace the matched prefix with an empty string
   //    return text.replace(regex, '');
   // }




   // let searchAlt: string;
   // let photo: ImageType;
   // let fallbackSrc: number = 0; // 0 = src, 1 = fallbackSrc1, 2 = fallbackSrc2
   // let finalSrc: string | undefined;


   // const fallBackStartsWith: string[] = ['fallback1-', 'fallback2-'];
   // if (fallBackStartsWith.some(prefix => id.startsWith(prefix))) {
   //    searchAlt = id.replace(/^(fallback1-|fallback2-)/, '');

   //    if (id.startsWith(fallBackStartsWith[0])) {
   //       fallbackSrc = 1;
   //    } else if (id.startsWith(fallBackStartsWith[1])) {
   //       fallbackSrc = 2;
   //    }
   // } else {
   //    searchAlt = id
   // }

   // photo = images.find((p) => p.alt === searchAlt)!;

   // if (photo) {
   //    finalSrc = (() => {
   //       switch (fallbackSrc) {
   //          case 0: {
   //             return photo.src;
   //          }
   //          case 1: {
   //             return photo.fallbackSrc1;
   //          }
   //          case 2: {
   //             return photo.fallbackSrc2;
   //          }
   //          default: {
   //             return photo.src;
   //          }
   //       }
   //    })();
   // } else {
   //    // if (photo === undefined) {
   //       const baseUrl = getBaseUrl();

   //       const url = `${baseUrl}/api/image?id=${id}`;
   //       console.log("url: ");
   //       console.log(url);
   //       const response = await fetch(url)
   //       photo = await response.json();
   //       finalSrc = photo.src
   //    // }
   // }



   // // test
   // // test
   // // test
   // // test
   // console.log('searchAlt', searchAlt);
   // console.log('photo', photo);
   // console.log('fallbackSrc', fallbackSrc);
   // console.log('id', id);
   // console.log('finalSrc', finalSrc);

   // // test
   // // test
   // // test
   // // test


   const [finalSrc, photoAlt] = await getImageData(id);



   return <ImageModal
      src={finalSrc as string}
      alt={photoAlt}
      // alt={photo.alt}
   // alt={!photo.alt ? photo.imageName : photo.alt}
   // alt={photo.alt ?? photo.id?.toString() ?? 'default alt text'}
   />;
}