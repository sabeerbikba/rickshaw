// "use client";
// import { useEffect, FC } from "react";

// const ImageBanners: FC = () => {
//    useEffect(() => {
//       const ImagePreviewInfoMobile = document.querySelectorAll("#imagePreview-info-mobile");
//       const ImageGallery = document.querySelectorAll("#gallery-img");
//       const imagePreview_modalImg = document.querySelector(".imagePreview-modal-content");
//       const imagePreview_info = document.querySelector(".imagePreview-info");
//       let imagePreview_modal;
//       document.addEventListener("DOMContentLoaded", function () {
//          imagePreview_modal = document.getElementById("imageModal");
//       });

//       function getPathname(urlString) {
//          const url = new URL(urlString, window.location.origin);
//          return url.pathname;
//       }

//       function isMobileDevice() {
//          const userAgent = navigator.userAgent;
//          return (typeof window.orientation !== "undefined") ||
//             (userAgent.indexOf('Mobile') !== -1) ||
//             (userAgent.indexOf('touch') !== -1);
//       }


//       if (isMobileDevice()) {
//          ImagePreviewInfoMobile.forEach(element => {
//             element.style.display = 'block';
//          });

//          ImageGallery.forEach(element => {
//             element.addEventListener('click', function () {
//                imagePreview_modal.showModal();
//                imagePreview_modalImg.src = this.src;
//                imagePreview_modalImg.alt = this.alt;
//                imagePreview_info.style.maxWidth = `${imagePreview_modalImg.clientWidth + 6}px`;
//                imagePreview_info.textContent = this.alt.replace(/-/g, ' ').replace(/\d+/g, '');
//                imagePreview_modalImg.style.marginTop = ((window.innerHeight - imagePreview_modalImg.height) / 2) + 'px';
//             });
//          });
//       } else {
//          ImagePreviewInfoMobile.forEach(element => {
//             element.style.display = 'none';
//          });
//       }
//    }, []);

//    return <div className="image-banners"></div>;
// }


"use client";
import { useEffect, FC } from "react";

const ImageBanners: FC = () => {
   useEffect(() => {
      const imagePreviewInfoMobile: NodeListOf<HTMLElement> = document.querySelectorAll("#imagePreview-info-mobile");
      const imageGallery: NodeListOf<HTMLElement> = document.querySelectorAll("#gallery-img");
      const imagePreviewModalImg: HTMLImageElement | null = document.querySelector(".imagePreview-modal-content");
      const imagePreviewInfo: HTMLElement | null = document.querySelector(".imagePreview-info");
      let imagePreviewModal: HTMLDialogElement | null = null;

      const handleDOMContentLoaded = () => {
         imagePreviewModal = document.getElementById("imageModal") as HTMLDialogElement;
      };

      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

      const getPathname = (urlString: string): string => {
         const url = new URL(urlString, window.location.origin);
         return url.pathname;
      };

      const isMobileDevice = (): boolean => {
         const userAgent = navigator.userAgent;
         return (
            typeof window.orientation !== "undefined" ||
            userAgent.indexOf('Mobile') !== -1 ||
            userAgent.indexOf('touch') !== -1
         );
      };

      if (isMobileDevice()) {
         imagePreviewInfoMobile.forEach((element) => {
            element.style.display = 'block';
         });

         imageGallery.forEach((element) => {
            element.addEventListener('click', function (this: HTMLElement) {
               if (imagePreviewModal && imagePreviewModalImg && imagePreviewInfo) {
                  imagePreviewModal.showModal();
                  imagePreviewModalImg.src = (this as HTMLImageElement).src;
                  imagePreviewModalImg.alt = (this as HTMLImageElement).alt;
                  imagePreviewInfo.style.maxWidth = `${imagePreviewModalImg.clientWidth + 6}px`;
                  imagePreviewInfo.textContent = (this as HTMLImageElement).alt.replace(/-/g, ' ').replace(/\d+/g, '');
                  imagePreviewModalImg.style.marginTop = `${(window.innerHeight - imagePreviewModalImg.height) / 2}px`;
               }
            });
         });
      } else {
         imagePreviewInfoMobile.forEach((element) => {
            element.style.display = 'none';
         });
      }

      return () => {
         document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
      };
   }, []);

   return <div className="image-banners"></div>;
};

export default ImageBanners;
