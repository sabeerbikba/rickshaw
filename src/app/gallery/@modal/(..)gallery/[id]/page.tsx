// import Image from "next/image";
"use server";
import { headers } from 'next/headers';
import ImageModal from "@/components/gallery/imagemodal";
import images from '@/data/images';
import type { ImageType } from '@/data/images';

// TODO: if error happens need to log into databse
// TODO: need to think about id is which is better: alt or imgName

function getBaseUrl() { // TODO: check it's working as expected in server
   const headersList = headers();
   const host = headersList.get('host');
   const protocol = headersList.get('x-forwarded-proto') || 'http';
   return `${protocol}://${host}`;
}

export default async function PhotoModal({
   params: { id },
}: {
   params: { id: string };
}) { // need to add jsx value 

   // function removeFallbackPrefix(text: string): string {
   //    // Regular expression to match either "fallback1-" or "fallback2-" at the start of the string
   //    const regex = /^(fallback1-|fallback2-)/;

   //    // Replace the matched prefix with an empty string
   //    return text.replace(regex, '');
   // }




   let searchAlt: string;
   let photo: ImageType;
   let fallbackSrc: number; // 1 = fallbackSrc1, 2 = fallbackSrc2



   const fallBackStartsWith: string[] = ['fallback1-', 'fallback2-'];
   if (fallBackStartsWith.some(prefix => id.startsWith(prefix))) {
      searchAlt = id.replace(/^(fallback1-|fallback2-)/, '');

      if (id.startsWith(fallBackStartsWith[0])) {
         fallbackSrc = 1;
      } else if (id.startsWith(fallBackStartsWith[1])) {
         fallbackSrc = 2;
      }
   } else {
      searchAlt = id
   }

   photo = images.find((p) => p.alt === searchAlt)!;

   // test
   // test
   // test
   // test
   console.log('searchAlt', searchAlt);
   console.log('photo', photo);
   // console.log('fallbackSrc', fallbackSrc);
   console.log('id', id);
   // test
   // test
   // test
   // test

   if (photo === undefined) {
      const baseUrl = getBaseUrl();

      const url = `${baseUrl}/api/image?id=${id}`;
      console.log("url: ");
      console.log(url);
      const response = await fetch(url)
      photo = await response.json();
   }

   return <ImageModal
      src={photo.src}
      alt={photo.alt}
   // alt={!photo.alt ? photo.imageName : photo.alt}
   // alt={photo.alt ?? photo.id?.toString() ?? 'default alt text'}
   />;
}