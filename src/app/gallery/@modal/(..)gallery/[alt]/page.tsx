"use server";
import { FC } from 'react';
import type { PhotoModalTypes } from '@/types/components';
import ImageModal from "@/components/gallery/imagemodal";
import getImageData from '@/utils/getimagedata';

const PhotoModal: FC<PhotoModalTypes> = async ({ params: { alt } }) => {

   const [finalSrc, photoAlt] = await getImageData(alt);

   return (
      <ImageModal
         src={finalSrc as string}
         alt={photoAlt}
      />
   );
};

export default PhotoModal;