"use client";
import { useEffect, FC } from "react";
import "./styles.css";

const Test = () => {
   useEffect(() => {
      const preview = document.querySelector(".preview");
      const imagePreviewModalContent = document.querySelector(".imagePreview-modal-content");
      const imagePreviewInfo = document.querySelector(".imagePreview-info");

      const updateStyles = () => {
         const innerHeight = window.innerHeight;
         const imagePreviewModalContentHeight = imagePreviewModalContent.offsetHeight;
         const imagePreviewModalContentWidth = imagePreviewModalContent.offsetWidth;
         const imageMinusHeight = innerHeight - imagePreviewModalContentHeight;

         console.log(imagePreviewModalContentWidth + "px");
         preview.style.paddingTop = `${imageMinusHeight / 2}px`;
         imagePreviewInfo.style.width = imagePreviewModalContentWidth + "px";
      };

      updateStyles();
      window.addEventListener("resize", updateStyles);

      return () => {
         window.removeEventListener("resize", updateStyles);
      };
   }, []);

   return (
      <dialog id="imageModal" open={true}>
         <span className="imagePreview-close">&times;</span>
         <div className="preview">
            <img src="./tmp/GWpSpVl.jpg" alt="" className="imagePreview-modal-content" />
            <div className="imagePreview-info">{"{alt}"}</div>
         </div>
      </dialog>
   );
};

export default Test;
