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
      </>
   );
}