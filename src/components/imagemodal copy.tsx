"use client";
import { useCallback, useRef, useEffect, MouseEventHandler, FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ImageModalProps {
   // children: ReactNode,
   src: string,
   alt: string,
}

const ImageModal: FC<ImageModalProps> = ({ src, alt,
   // children 
}) => {
   const overlay = useRef(null);
   const wrapper = useRef(null);
   const router = useRouter();

   const onDismiss = useCallback(() => {
      router.back();
   }, [router]);

   const onClick: MouseEventHandler = useCallback(
      (e) => {
         if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss();
         }
      },
      [onDismiss, overlay, wrapper]
   );

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === "Escape") onDismiss();
      },
      [onDismiss]
   );

   useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onKeyDown]);

   useEffect(() => {
      const preview = document.querySelector(".preview") as HTMLElement;
      const imagePreviewModalContent = document.querySelector(".imagePreview-modal-content") as HTMLElement;
      const imagePreviewInfo = document.querySelector(".imagePreview-info") as HTMLElement;

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
      <dialog id="imageModal" open={true}>
         <span className="imagePreview-close">&times;</span>
         <div className="preview">
            <img src={src} alt={alt} className="imagePreview-modal-content" />
            <div className="imagePreview-info">{alt}</div>
            {/* TODO: convert text to normal */}
         </div>
      </dialog>
   );
}

export default ImageModal;