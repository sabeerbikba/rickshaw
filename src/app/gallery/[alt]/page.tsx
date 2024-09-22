'server only';
import "server-only";
// import Image from "next/image";
import { FC } from "react";
// import images from '@/data/images';
// import type { ImageType } from '@/data/images';
import UploadModal from "@/components/gallery/uploadmodal";
import { transformText } from "@/utils/functions";
import "./styles.css";
import getImageData from "@/utils/getimagedata";

const PhotoPage: FC<{ params: { alt: string } }> = async (
   { params: { alt } }) => {
   try {
      const [finalSrc, photoAlt] = await getImageData(alt);


      // const photo: ImageType = images.find((p) => p.alt === alt)!;
      return (
         <>
            {!finalSrc ? (
               <>
                  <main className="main-gallery">
                     <div className="tab-img-preview">
                        <h1 className="error">Image not Found</h1>
                     </div>
                  </main>
               </>
            ) : (
               <>
                  <main className="main-gallery">
                     <div className="tab-img-preview">
                        <img
                           // alt={photo.alt}
                           // src={photo.src}
                           src={finalSrc}
                           alt={photoAlt || ''}
                        />
                        {/* TODO: remove this br elements. instead use better styles*/}
                        <br />
                        <br />
                        <div>
                           {/* <h1>{transformText(photo.alt)}</h1> */}
                           <h1>{transformText(photoAlt as string)}</h1>
                        </div>
                     </div>
                  </main>
                  <UploadModal />
               </>
            )}
         </>
      );
   } catch {
      // TODO: add logging logic here to log what happned 

      /**
       *       console.error('Failed to fetch data:', error);
      // Log error using a custom logging function
      logError(error);
       */
      return (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  <h1 className="error">Something wrong when fetching image</h1>
               </div>
            </main>
            <UploadModal />
         </>
      );
   }
}

export default PhotoPage;
