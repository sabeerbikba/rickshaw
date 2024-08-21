import "server-only";
// import Image from "next/image";
import images, { ImageType } from "../../../data/images";
import UploadModal from "@/components/gallery/uploadmodal";
import { transformText } from "@/utils/functions";
import "./styles.css";

export default function PhotoPage({
   params: { id },
}: {
   params: { id: string };
}): JSX.Element {
   try {
      const photo: ImageType = images.find((p) => p.alt === id)!;
      return (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  <img
                     alt={photo.alt}
                     src={photo.src}
                  />
                  {/* TODO: remove this br elements. instead use better styles*/}
                  <br />
                  <br />
                  <div>
                     <h1>{transformText(photo.alt)}</h1>
                  </div>
               </div>
            </main>
            <UploadModal />
         </>
      );
   } catch {
      return (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  <h1 className="error">Image not Found</h1>
               </div>
            </main>
            <UploadModal />
         </>
      );
   }
}


