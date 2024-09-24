// import Image from "next/image";
"use server";
import 'server-only';
// import { headers } from 'next/headers';
import ImageModal from "@/components/gallery/imagemodal";
// import images from '@/data/images';
// import type { ImageType } from '@/data/images';
import getImageData from '@/utils/getimagedata';

// TODO: if error happens need to log into databse
// TODO: need to think about alt is which is better: alt or imgName

// TODO: get base can resuse check
// function getBaseUrl() { // TODO: check it's working as expected in server
//    const headersList = headers();
//    const host = headersList.get('host');
//    const protocol = headersList.get('x-forwarded-proto') || 'http';
//    return `${protocol}://${host}`;
// }

export default async function PhotoModal({
   params: { alt },
}: {
   params: { alt: string };
}) {

   const [finalSrc, photoAlt] = await getImageData(alt);

   console.log(
      'image intercepting page component Data$$: findalSrc, phpotoAlt: ',
      finalSrc, photoAlt,

   );

   return (
      <ImageModal
         src={finalSrc as string}
         alt={photoAlt}
      />
   );
}