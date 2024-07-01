// import Image from "next/image";
"use server";
import { headers } from 'next/headers';
import ImageModal from "@/components/imagemodal";
import images, { ImageType } from "../../../images";

// TODO: if errorr happens need to log into databse
// TODO: need to think about id is which is better: alt or imgName

function getBaseUrl() {
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

   let photo: ImageType;
   photo = images.find((p) => p.alt === id)!;

   if (photo === undefined) {
      const baseUrl = getBaseUrl();

      const url = `${baseUrl}/gallery/api?id=${id}`;
      console.log("url: ");      
      console.log(url);      
      const response = await fetch(url)
      photo = await response.json();
   }

   return <ImageModal src={photo.srcUrl} alt={photo.alt} />;
}