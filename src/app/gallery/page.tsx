import "server-only";
import Link from "next/link";
// import Script from 'next/script';
import images, { ImageType } from "./images";
import UploadModal from "@/components/gallery/uploadmodal";
import GalleryScroll from "@/components/gallery/galleryscroll";
import InfiniteScroll from "@/components/gallery/infinitescroll";

// TODO: when page load need to scroll to top

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
               <InfiniteScroll initialImages={images} />
               {/* TODO: infinite scroll for images  */}
            </div>
            <div id="loading-spinner"></div>
         </main>
         <UploadModal />
         <GalleryScroll />
      </>
   );
}
