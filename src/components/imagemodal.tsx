"use client";
import { useCallback, useRef, useEffect, MouseEvent, useState, FC } from "react";
import { useRouter } from "next/navigation";
import { transformText } from "@/utils/functions";

type ImageModalProps = {
   src: string;
   alt: string;
};

// TODO: when loading or error showing make windows smaller in top and 
// TODO: if loading screen or error showing there need to show close or back button 
// TODO: need to give media queries for image preview modal
// TODO: if dailogOpen logged it shows  continious logged true // 
// TODO: if i click outside outside error or loading image div need to run dismiss funciton 
// TODO: need to give better namming 
// TODO: need to use useReducer
// TODO: is loading sceen is there that scroll to top then show i don't want this behavior
// TODO: image preview text need to add media quries for it 


const ImageModal: FC<ImageModalProps> = ({ src, alt }) => {
   const router = useRouter();
   const overlay = useRef<HTMLDivElement>(null);
   const wrapper = useRef<HTMLDivElement>(null);
   const myRef = useRef<HTMLImageElement>(null);
   const imgPreviewLoadingErrorRef = useRef<HTMLDivElement>(null);
   // const scrollPosition = useRef(0);

   const [dialogOpen, setDialogOpen] = useState<boolean>(true); // default true
   // console.log(dialogOpen); // here
   const [width, setWidth] = useState<number>(0);
   const [isLoaded, setIsLoaded] = useState<boolean>(false); // default false
   const [isError, setIsError] = useState<boolean>(false); // default false
   const [imageLoadingFrame, setImageLoadingFrame] = useState<number>(0);
   const [imageLoadingFrame2, setImageLoadingFrame2] = useState<number>(0);
   const frames: string[] = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'];
   const frames2 = ['Image Loading.', 'Image Loading..', 'Image Loading...', 'Image Loading..', 'Image Loading.']
   // MORE FRAMES OPTIONS:
   // const frames2 = ['Image Loading.', 'Image Loading..', 'Image Loading...'];
   // const frames2: string[] = ['...Image Loading', '..Image Loading.', '.Image Loading..', 'Image Loading...', '.Image Loading..', '..Image Loading.'];

   const onDismiss = useCallback(() => {
      router.back();
      setDialogOpen(false);
      setIsLoaded(false);
   }, [router]);

   const onClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
         if (e.target === overlay.current || e.target === wrapper.current) {
            onDismiss();
         }
      },
      [onDismiss]
   );

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === "Escape") onDismiss();
      },
      [onDismiss]
   );

   const handleImageError = () => {
      console.log("image Error!!");
      setIsError(true);
   };

   useEffect(() => {
      const handleClickOutside: EventListener = (e: Event) => {
         if (imgPreviewLoadingErrorRef.current && !imgPreviewLoadingErrorRef.current.contains(e.target as Node)) {
            onDismiss();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [onDismiss]);

   useEffect(() => {
      const interval = setInterval(() => {
         setImageLoadingFrame(prevFrame => (prevFrame + 1) % frames.length);
         setImageLoadingFrame2(prevFrame => (prevFrame + 1) % frames2.length);
      }, 500);

      return () => clearInterval(interval);
   }, [frames.length, frames2.length]);

   useEffect(() => {
      if (isLoaded) {
         setWidth(myRef.current!.getBoundingClientRect().width);
      }
   }, [router, isLoaded]);

   useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onKeyDown]);

   useEffect(() => {
      // TODO: here not used values in css need to remove
      const imagePreviewModalContent = document.querySelector<HTMLDivElement>(".imagePreview-modal-content");
      const imagePreviewInfo = document.querySelector<HTMLDivElement>(".imagePreview-info");

      const updateStyles = () => {
         setTimeout(() => {
            const innerHeight = window.innerHeight;
            const imagePreviewModalContentHeight = imagePreviewModalContent?.offsetHeight || 0;
            const imageMinusHeight = innerHeight - imagePreviewModalContentHeight;
            const calc = (innerHeight / 100) * 80;

            // if (imagePreviewInfo) {
            //    imagePreviewInfo.style.width = `${width}px`;
            // }

            // console.log('--image-modal-max-height', `${calc}px`);
            document.documentElement.style.setProperty('--image-modal-max-height', `${calc}px`);
            document.documentElement.style.setProperty('--image-preview-padding-top', `${(imageMinusHeight / 2)}px`);
            if (isLoaded) {
               document.documentElement.style.setProperty('--image-preview-info-width', `${width}px`);
            }
         }, 0);
      };

      if (imagePreviewModalContent && imagePreviewInfo) {
         updateStyles();
         window.addEventListener("resize", updateStyles);
      }

      return () => {
         window.removeEventListener("resize", updateStyles);
      };
   }, [isLoaded, width]);

   useEffect(() => {
      const img = myRef.current;
      const handleLoad = () => setIsLoaded(true);

      if (img && img.complete) {
         handleLoad();
      } else {
         img!.addEventListener('load', handleLoad);
      }

      return () => {
         if (img) {
            img.removeEventListener('load', handleLoad);
         }
      };
   }, []);

   return (
      <dialog id="imageModal" open={dialogOpen}>
         {isError || !isLoaded ? (
            <>
               <div className="image-preview-error-loading" ref={imgPreviewLoadingErrorRef}>
                  {isError && <div className="error">Unable to load image. Please check your internet <span>connection 💔.</span></div>}
                  {!isLoaded && !isError &&
                     <div>
                        <p>{frames[imageLoadingFrame]}</p>
                        <p>{frames2[imageLoadingFrame2]}</p>
                     </div>
                  }
                  <button onClick={onDismiss}>&times;</button>
               </div>
            </>
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
         <img style={{ display: "none" }} ref={myRef} onError={handleImageError} src={src} alt={alt} />
      </dialog>
   );
};

export default ImageModal;











// "use client";
// import { useCallback, useRef, useEffect, MouseEventHandler, FC, ReactNode, useState } from "react";
// import { useRouter } from "next/navigation";

// const ImageModal = ({ src, alt }) => {
//    const router = useRouter();
//    const overlay = useRef(null);
//    const wrapper = useRef(null);
//    const myRef = useRef(null);
//    const [dialogOpen, setDialogOpen] = useState(true);
//    const [width, setWidth] = useState(0);
//    const [isLoaded, setIsLoaded] = useState(false);
//    const [isError, setIsError] = useState(false);
//    const [imageLoadigFrame, setFrame] = useState(0);
//    const [imageLoadigFrame2, setFrame2] = useState(0);
//    const frames = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'];
//    const frames2 = ['...Image Loading', '..Image Loading.', '.Image Loading..', 'Image Loading...', '.Image Loading..', '..Image Loading.'];
//    // MORE FRAMES OPTIONS:
//       // const frames2 = ['Image Loading.', 'Image Loading..', 'Image Loading...'];
//       // const frames2 = ['Image Loading.', 'Image Loading..', 'Image Loading...', 'Image Loading..', 'Image Loading.'];

//    const onDismiss = useCallback(() => {
//       router.back();
//       setDialogOpen(false);
//       setIsLoaded(false);
//    }, [router]);

//    const onClick = useCallback(
//       (e) => {
//          if (e.target === overlay.current || e.target === wrapper.current) {
//             onDismiss();
//          }
//       },
//       [onDismiss]
//    );

//    const onKeyDown = useCallback(
//       (e) => {
//          if (e.key === "Escape") onDismiss();
//       },
//       [onDismiss]
//    );

//    const handleImageError = () => {
//       console.log("image Error!!");
//       setIsError(true)
//    }

//    function transformText(text) {
//       return text
//          .replace(/-\d+$/, '').split('-')
//          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//          .join(' ');
//    }

//    useEffect(() => {
//       const interval = setInterval(() => {
//          setFrame((prevFrame) => (prevFrame + 1) % frames.length);
//          setFrame2((prevFrame) => (prevFrame + 1) % frames2.length);
//       }, 500);

//       return () => clearInterval(interval);
//    }, [frames.length, frames2.length]);

//    useEffect(() => {
//       if (isLoaded) {
//          setWidth(myRef.current.getBoundingClientRect().width);
//       }
//    }, [router, isLoaded]);

//    useEffect(() => {
//       document.addEventListener("keydown", onKeyDown);
//       return () => document.removeEventListener("keydown", onKeyDown);
//    }, [onKeyDown]);

//    useEffect(() => {
//       const imagePreviewModalContent = document.querySelector(".imagePreview-modal-content");
//       const imagePreviewInfo = document.querySelector(".imagePreview-info");

//       const updateStyles = () => {
//          setTimeout(() => {
//             const innerHeight = window.innerHeight;
//             const imagePreviewModalContentHeight = imagePreviewModalContent.offsetHeight;
//             // const imagePreviewModalContentWidth = imagePreviewModalContent.clientHeight;
//             const imageMinusHeight = innerHeight - imagePreviewModalContentHeight;
//             const calc = (innerHeight / 100) * 80;

//             // imagePreviewModalContent.style.height = `${calc}px`;
//             // preview.style.paddingTop = `${imageMinusHeight / 2}px`;
//             imagePreviewInfo.style.width = `${width}px`;

//             document.documentElement.style.setProperty('--image-modal-max-height', `${calc}px`);
//             document.documentElement.style.setProperty('--image-preview-padding-top', `${(imageMinusHeight / 9)}px`);
//             // document.documentElement.style.setProperty('--image-preview-info-width', `${imagePreviewModalContentWidth}px`);
//             if (isLoaded) {
//                document.documentElement.style.setProperty('--image-preview-info-width', `${width}px`);
//             }
//          }, 0);
//       };

//       updateStyles();
//       window.addEventListener("resize", updateStyles);

//       return () => {
//          window.removeEventListener("resize", updateStyles);
//       };
//    }, [isLoaded]);

//    useEffect(() => {
//       const img = myRef.current;
//       const handleLoad = () => setIsLoaded(true);

//       if (img && img.complete) {
//          handleLoad();
//       } else {
//          img.addEventListener('load', handleLoad);
//       }

//       return () => {
//          if (img) {
//             img.removeEventListener('load', handleLoad);
//          }
//       };
//    }, []);

//    return (
//       <dialog id="imageModal" open={dialogOpen}>
//          {isError || !isLoaded ? (
//             <div className="image-preview-error-loading">
//                {isError && <div>Unable to load image. Please check your internet <span>connection 💔.</span></div>}
//                {!isLoaded && !isError &&
//                   <>
//                      <p>{frames[imageLoadigFrame]}</p>
//                      <p style={{ display: "block" }}>{frames2[imageLoadigFrame2]}</p>
//                   </>
//                }
//             </div>
//          ) : (
//             <>
//                <span className="imagePreview-close" onClick={onDismiss}>&times;</span>
//                <div className="preview" ref={overlay} onClick={onClick}>
//                   <div className="imagePreview-wrapper" ref={wrapper}>
//                      <img src={src} alt={alt} className="imagePreview-modal-content" />
//                      <div className="imagePreview-info">{transformText(alt)}</div>
//                   </div>
//                </div>
//             </>
//          )}
//          <img style={{ display: "none" }} ref={myRef} onError={handleImageError} src={src} />
//       </dialog>
//    );
// };

// export default ImageModal;