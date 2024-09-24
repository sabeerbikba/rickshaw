'use server';
import "server-only";
// import Image from "next/image";
import { FC } from "react";
// import images from '@/data/images';
// import type { ImageType } from '@/data/images';
import UploadModal from "@/components/gallery/uploadmodal";
import transformText from "@/utils/transformtext";
import "./styles.css";
import getImageData from "@/utils/getimagedata";
import logError from "@/utils/logerror";

const PhotoPage: FC<{ params: { alt: string } }> = async (
   { params: { alt } }) => {

   const [finalSrc, photoAlt, message] = await getImageData(alt);

   try {
      console.log('photoAlt in /gallery/[alt]', photoAlt);
      const isAltNotDefined = photoAlt.startsWith('not-specified-');
      const imagePreviewInfo = isAltNotDefined ? '' : transformText(alt);

      return !finalSrc ? (
         <main className="main-gallery">
            <div className="tab-img-preview">
               <h1 className="error">Image not Found</h1>
            </div>
         </main>
      ) : (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  <img
                     src={finalSrc}
                     alt={photoAlt || ''}
                  />
                  {imagePreviewInfo != '' && (
                     <div>
                        {/* // TODO: remove this br elements. instead use better styles */}
                        <br />
                        <br />
                        <h1>{imagePreviewInfo}</h1>
                     </div>
                  )}
               </div>
            </main>
            <UploadModal />
         </>
      );
   } catch (error) {

      if (error instanceof Error) {
         console.error('/gallery/[alt]: error: ', error.message);
         logError(error);
      } else {
         console.log('An unknown error occurred route: /gallery/[alt]', error);
      }

      return (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  {/* TODO: This is not good message */}
                  <h1 className="error">Error: {message}</h1>
               </div>
            </main>
            <UploadModal />
         </>
      );
   }
}

export default PhotoPage;
