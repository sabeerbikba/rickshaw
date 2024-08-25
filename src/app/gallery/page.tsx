import "server-only";
// import Script from 'next/script';
import UploadModal from "@/components/gallery/uploadmodal";
import GalleryScroll from "@/components/gallery/galleryscroll";
import InfiniteScroll from "@/components/gallery/infinitescroll";
import PreloadImages from "@/components/gallery/preloadimages";

// TODO: when page load need to scroll to top
// TODO: where that null printing in terminal before request page:

export default function GalleryPage() {
   return (
      <>
         <main className="main-gallery">
            <div className="image-gallery">
               <PreloadImages />
               {/* TODO: */}
               <InfiniteScroll />
            </div>
            <div id="loading-spinner"></div>
         </main>
         <UploadModal />
         <GalleryScroll />
      </>
   );
}
