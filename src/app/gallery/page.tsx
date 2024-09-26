import InfiniteScroll from "@/components/gallery/infinitescroll";
import Providers from "@/components/gallery/queryprovider";

export default function GalleryPage() {
   return (
      <>
         <main className="main-gallery">
            <div className="image-gallery">
               <Providers>
                  <InfiniteScroll />
               </Providers>
            </div>
            <div id="loading-spinner"></div>
         </main>
      </>
   );
}
