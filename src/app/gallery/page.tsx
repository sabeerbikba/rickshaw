import "server-only";
import Link from "next/link";
// import Script from 'next/script';
import UploadModal from "@/components/uploadmodal";
import images, { ImageType } from "./images";
import GalleryScroll from "@/components/galleryscroll";

export default function GalleryPage() {
   return (
      <>
         <main className="main-gallery">
            <div className="image-gallery">
               {images.map((img: ImageType, key: number): JSX.Element => (
                  <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
                     <img
                        src={img.srcUrl}
                        alt={img.alt}
                        id="gallery-img"
                        loading="lazy"
                        style={{ boxShadow: "1px solid red" }}
                     />
                  </Link>
               ))}
            </div>
            <div id="loading-spinner"></div>
         </main>
         <UploadModal />
         <GalleryScroll />
      </>
   );
}
