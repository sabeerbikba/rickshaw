import "server-only";
import Link from "next/link";
// import Script from 'next/script';
import Modal from "@/components/modal";
import ImageBanners from "@/components/imagesbanners";
import images, { ImageType } from "./images";
import "./styles.css";

export default function GalleryPage() {
   return (
      <>
         <main className="main-gallery">
            <div className="image-gallery">
               {images.map((img: ImageType, key: number) => (
                  <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
                     <img
                        src={img.srcUrl}
                        alt={img.alt}
                        id="gallery-img"
                        loading="lazy"
                        style={{ boxShadow: "1px solid red" }}
                     />
                     <div id="imagePreview-info-mobile">{img.alt}</div>
                  </Link>
               ))}
            </div>
            <div id="loading-spinner"></div>
         </main>
         <dialog id="imageModal" open={false}>
            <span className="imagePreview-close">&times;</span>
            <img src="./tmp/GWpSpVl.jpg" alt="" className="imagePreview-modal-content" />
            <div className="imagePreview-info"></div>
         </dialog>
         <Modal />
         <ImageBanners />
      </>
   );
}
