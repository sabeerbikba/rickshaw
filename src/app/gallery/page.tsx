import "server-only";
import Link from "next/link";
import Script from 'next/script';
import Modal from "@/components/modal";
import images, { ImageType } from "./images";
import "./styles.css";

export default function GalleryPage() {
   return (
      <>
         <main className="main-gallery">
            <div className="image-gallery">
               {images.map((img: ImageType, key: number) => (
                  <Link key={key} href={`/gallery/${img.alt}`}>
                     <div className="image-item">
                        <img
                           src={img.srcUrl}
                           alt={img.alt}
                           id="gallery-img"
                           loading="lazy"
                           style={{ boxShadow: "1px solid red" }}
                        />
                     </div>
                     <div id="imagePreview-info-mobile">{img.alt}</div>
                  </Link>
               ))}
            </div>
            <Modal />
            <div id="loading-spinner"></div>
            <Script strategy="afterInteractive" src="/scripts/gallery-page.js"></Script>
         </main>
         {/* <dialog id="imageModal">
            <span className="imagePreview-close">&times;</span>
            <img src="" alt="" className="imagePreview-modal-content"/>
               <div className="imagePreview-info"></div>
         </dialog> */}
      </>
   );
}
