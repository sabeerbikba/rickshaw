import "server-only";
import { Fragment } from "react";
import images, { ImageType } from "./images";
import Modal from "@/components/modal";
import "./styles.css";

export default function GalleryPage() {
   return (
      <>
         <main className="main-gallery" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            {/* this inline styles throw error find other solution */}
            <div className="image-gallery">
               {images.map((img: ImageType, key: number) => (
                  <Fragment key={key}>
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
                  </Fragment>
               ))}
            </div>
            <Modal />
            <div id="loading-spinner"></div>
            <script src="/scripts/gallery-page.js"></script>
         </main>
         <dialog id="imageModal">
            <span className="imagePreview-close">&times;</span>
            <img src="" alt="" className="imagePreview-modal-content"/>
               <div className="imagePreview-info"></div>
         </dialog>
      </>
   );
}
