import "server-only";
import Image from "next/image";
import images, { ImageType } from "../images";
// import images, { Image } from "../wonder"

export default function PhotoPage({
   params: { id },
}: {
   params: { id: string };
}) {
   try {
      const photo: ImageType = images.find((p) => p.alt === id)!;
      return (
         <div className="container mx-auto my-10">
            <div className="w-1/2 mx-auto">
               <div>
                  <h1 className="text-center text-3xl font-bold my-4">{photo.alt}</h1>
               </div>
               <Image
                  height={"200"}
                  width={"200"}
                  alt={photo.alt}
                  src={photo.srcUrl}
                  className="w-full object-cover aspect-square "
               />

               <div className="bg-white py-4">
                  <h3>{photo.alt}</h3>
               </div>
            </div>
         </div>
      );
   } catch {
      console.log('if');
      return <h1>no image to show </h1>
   }
}


