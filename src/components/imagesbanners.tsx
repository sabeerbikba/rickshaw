// TODO:  not using for now
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
