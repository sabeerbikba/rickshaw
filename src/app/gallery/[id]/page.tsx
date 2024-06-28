import "server-only";
// import Image from "next/image";
import images, { ImageType } from "../images";
import UploadModal from "@/components/uploadmodal";
import { transformText } from "@/utils/functions";
import "./styles.css";
import "../styles.css";

export default function PhotoPage({
   params: { id },
}: {
   params: { id: string };
}) {
   try {
      const photo: ImageType = images.find((p) => p.alt === id)!;
      return (
         <>
            <main className="main-gallery">
               <div className="tab-img-preview">
                  <img
                     alt={photo.alt}
                     src={photo.srcUrl}
                  />
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


