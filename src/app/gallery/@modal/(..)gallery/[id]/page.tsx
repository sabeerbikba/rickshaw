// import Image from "next/image";
import ImageModal from "@/components/imagemodal";
import images, { ImageType } from "../../../images";

export default function PhotoModal({
   params: { id },
}: {
   params: { id: string };
}) {
   const photo: ImageType = images.find((p) => p.alt === id)!;

   return (
      <>
      <ImageModal src={photo.srcUrl} alt={photo.alt} />
      
         {/* <ImageModal>
            <img
               // height={"200"}
               // width={"200"}
               alt={photo.alt}
               src={photo.srcUrl}
               className="w-full object-cover aspect-square"
            />
            <div className="bg-white p-4">
               <h2 className="text-xl font-semibold">{photo.alt}</h2>
               <h3>{photo.alt}</h3> */}
               {/* <h3>{photo.}</h3> */}
               {/* <h3>{photo.alt}</h3>
            </div>
         </ImageModal> */}
      </>
   );
}