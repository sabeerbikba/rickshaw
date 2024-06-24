"use client";
import { useCallback, useRef, useEffect, MouseEventHandler, FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

const ImageModal = ({ src, alt,
   // children 
}) => {
   const overlay = useRef(null);
   const wrapper = useRef(null);
   const router = useRouter();

   const onDismiss = useCallback(() => {
      router.back();
   }, [router]);

   const onClick = useCallback(
      (e) => {
         if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss();
         }
      },
      [onDismiss, overlay, wrapper]
   );

   const onKeyDown = useCallback(
      (e) => {
         if (e.key === "Escape") onDismiss();
      },
      [onDismiss]
   );

   useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onKeyDown]);

   useEffect(() => {
      const preview = document.querySelector(".preview");
      const imagePreviewModalContent = document.querySelector(".imagePreview-modal-content");
      const imagePreviewInfo = document.querySelector(".imagePreview-info");

      // const updateStyles = () => {
      const innerHeight = window.innerHeight;
      console.log(innerHeight);
      const imagePreviewModalContentHeight = imagePreviewModalContent.offsetHeight;
      const imagePreviewModalContentWidth = imagePreviewModalContent.offsetWidth;
      const imageMinusHeight = innerHeight - imagePreviewModalContentHeight;

      console.log(imagePreviewModalContentWidth + "px");
      preview.style.paddingTop = `${imageMinusHeight / 2}px`;
      imagePreviewInfo.style.width = `${imagePreviewModalContentWidth}px`;
      // };

      // updateStyles();
      // window.addEventListener("resize", updateStyles);

      // return () => {
      //    window.removeEventListener("resize", updateStyles);
      // };
   }, []);

   return (
      // <div ref={overlay} className="image-modal" onClick={onClick}>
      //    <div ref={wrapper} className="image-modal-centered-box">
      //       {children}
      //    </div>
      // </div>
      // {/* TODO: if image loading make sure show spiner or simmilar until load after load run that useEffect javascript and show image */}
      // {/* TODO: convert text to normal */}

      <dialog id="imageModal">
         <span className="imagePreview-close">&times;</span>
         <div className="preview">
            <img src={src} alt={alt} className="imagePreview-modal-content" />
            <div className="imagePreview-info">{alt}</div>
         </div>
      </dialog>
   );
}

export default ImageModal;