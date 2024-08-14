"use client";
// Not used anywhere if not used removed
import { useEffect, FC } from "react";

const ModalStyles: FC = (): JSX.Element => {
   useEffect(() => {
      const preview = document.querySelector(".preview") as HTMLElement;
      const imagePreviewModalContent = document.querySelector(".imagePreview-modal-content") as HTMLElement;
      const imagePreviewInfo = document.querySelector(".imagePreview-info") as HTMLElement;

      const updateStyles = () => {
         const innerHeight = window.innerHeight;
         const imagePreviewModalContentHeight = imagePreviewModalContent.offsetHeight;
         const imagePreviewModalContentWidth = imagePreviewModalContent.offsetWidth;
         const imageMinusHeight = innerHeight - imagePreviewModalContentHeight;

         console.log(imagePreviewModalContentWidth);
         preview.style.paddingTop = `${imageMinusHeight / 2}px`;
         imagePreviewInfo.style.width = `${imagePreviewModalContentWidth}px`;
      };

      updateStyles();
      window.addEventListener("resize", updateStyles);

      return () => {
         window.removeEventListener("resize", updateStyles);
      };
   }, []);

   return <div className="modal-styles"></div>;
};

export default ModalStyles;
