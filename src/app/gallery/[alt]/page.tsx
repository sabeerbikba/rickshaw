'use server';
import { FC } from "react";
import type { PhotoModalTypes } from '@/types/components';
import UploadModal from "@/components/gallery/uploadmodal";
import transformText from "@/utils/transformtext";
import "./styles.css";
import getImageData from "@/utils/getimagedata";
import logError from "@/utils/logerror";

const PhotoPage: FC<PhotoModalTypes> = async ({ params: { alt } }) => {

   const [finalSrc, photoAlt, message] = await getImageData(alt);

   try {
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

      logError(error as Error, '/gallery/[alt]');

      return (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  <h1 className="error">Error: {message}</h1>
               </div>
            </main>
            <UploadModal />
         </>
      );
   }
}

export default PhotoPage;
