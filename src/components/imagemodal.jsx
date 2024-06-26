"use client";
import { useCallback, useRef, useEffect, MouseEventHandler, FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

const ImageModal = ({ src, alt }) => {
   const router = useRouter();
   const overlay = useRef(null);
   const wrapper = useRef(null);
   const myRef = useRef(null);
   const [dialogOpen, setDialogOpen] = useState(true);
   const [width, setWidth] = useState(0);
   const [isLoaded, setIsLoaded] = useState(false);
   const [isError, setIsError] = useState(false);
   const [imageLoadigFrame, setFrame] = useState(0);
   const [imageLoadigFrame2, setFrame2] = useState(0);
   // const frames2 = ['Image Loading.', 'Image Loading..', 'Image Loading...'];
   const frames = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'];
   // const frames2 = ['Image Loading.', 'Image Loading..', 'Image Loading...', 'Image Loading..', 'Image Loading.'];
   const frames2 = ['...Image Loading', '..Image Loading.', '.Image Loading..', 'Image Loading...', '.Image Loading..', '..Image Loading.'];

   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       setFrame((prevFrame) => (prevFrame + 1) % frames.length);
   //    }, 500);

   //    return () => clearInterval(interval);
   // }, [frames.length]);


   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       setFrame2((prevFrame) => (prevFrame + 1) % frames2.length);
   //    }, 500);

   //    return () => clearInterval(interval);
   // }, [frames2.length]);

   useEffect(() => {
      const interval = setInterval(() => {
         setFrame((prevFrame) => (prevFrame + 1) % frames.length);
         setFrame2((prevFrame) => (prevFrame + 1) % frames2.length);
      }, 500);

      return () => clearInterval(interval);
   }, [frames.length, frames2.length]);

   // // testing

   // useEffect(() => {
   //    console.log('value dailogOpen changed to: ', dialogOpen);
   // }, [dialogOpen]);

   // useEffect(() => {
   //    console.log('value isLoaded changed to: ', isLoaded);
   // }, [isLoaded]);

   // useEffect(() => {
   //    console.log('value isError changed to: ', isError);
   // }, [isError]);

   // useEffect(() => {
   //    console.log('isError: ', isError);
   //    console.log('isLoaded: ', isLoaded);
   //    console.log('!isLoaded: ', !isLoaded);
   //    console.log('isError || !isLoaded ', isError || !isLoaded);
   // }, [isError, isLoaded]);

   // // testing

   useEffect(() => {
      if (isLoaded) {
         setWidth(myRef.current.getBoundingClientRect().width);
      }
   }, [router, isLoaded]);

   const onDismiss = useCallback(() => {
      router.back();
      setDialogOpen(false);
      setIsLoaded(false);
   }, [router]);

   const onClick = useCallback(
      (e) => {
         if (e.target === overlay.current || e.target === wrapper.current) {
            onDismiss();
         }
      },
      [onDismiss]
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
      // const preview = document.querySelector(".preview");
      const imagePreviewModalContent = document.querySelector(".imagePreview-modal-content");
      const imagePreviewInfo = document.querySelector(".imagePreview-info");

      const updateStyles = () => {
         setTimeout(() => {
            const innerHeight = window.innerHeight;
            const imagePreviewModalContentHeight = imagePreviewModalContent.offsetHeight;
            // const imagePreviewModalContentWidth = imagePreviewModalContent.clientHeight;
            const imageMinusHeight = innerHeight - imagePreviewModalContentHeight;
            const calc = (innerHeight / 100) * 80;

            // imagePreviewModalContent.style.height = `${calc}px`;
            // preview.style.paddingTop = `${imageMinusHeight / 2}px`;
            imagePreviewInfo.style.width = `${width}px`;

            document.documentElement.style.setProperty('--image-modal-max-height', `${calc}px`);
            document.documentElement.style.setProperty('--image-preview-padding-top', `${(imageMinusHeight / 9)}px`);
            // document.documentElement.style.setProperty('--image-preview-info-width', `${imagePreviewModalContentWidth}px`);
            if (isLoaded) {
               document.documentElement.style.setProperty('--image-preview-info-width', `${width}px`);
            }
         }, 0);
      };

      updateStyles();
      window.addEventListener("resize", updateStyles);

      return () => {
         window.removeEventListener("resize", updateStyles);
      };
   }, [isLoaded]);

   useEffect(() => {
      const img = myRef.current;
      const handleLoad = () => setIsLoaded(true);

      if (img && img.complete) {
         handleLoad();
      } else {
         img.addEventListener('load', handleLoad);
      }

      return () => {
         if (img) {
            img.removeEventListener('load', handleLoad);
         }
      };
   }, []);

   const handleImageError = () => {
      console.log("image Error!!");
      setIsError(true)
   }

   function transformText(text) {
      return text
         .replace(/-\d+$/, '').split('-')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ');
   }

   return (
      <dialog id="imageModal" open={dialogOpen}>
         {isError || !isLoaded ? (
            <div className="image-preview-error-loading">
               {isError && <div>Unable to load image. Please check your internet <span>connection 💔.</span></div>}
               {!isLoaded && !isError &&
                  <>
                     <p>{frames[imageLoadigFrame]}</p>
                     <p style={{ display: "block" }}>{frames2[imageLoadigFrame2]}</p>
                  </>
               }
            </div>
         ) : (
            <>
               <span className="imagePreview-close" onClick={onDismiss}>&times;</span>
               <div className="preview" ref={overlay} onClick={onClick}>
                  <div className="imagePreview-wrapper" ref={wrapper}>
                     <img src={src} alt={alt} className="imagePreview-modal-content" />
                     <div className="imagePreview-info">{transformText(alt)}</div>
                  </div>
               </div>
            </>
         )}
         <img style={{ display: "none" }} ref={myRef} onError={handleImageError} src={src} />
      </dialog>
   );
};

export default ImageModal;