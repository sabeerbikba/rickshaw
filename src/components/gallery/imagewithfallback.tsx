// "use client";
// import type { ImgHTMLAttributes } from 'react';
// import { useState, useEffect } from 'react';

// // TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
// //       - every time load the page clear the log

// interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
//    src: string;
//    alt: string;
//    fallbackSrc1?: string | undefined;
//    fallbackSrc2?: string | undefined;
//    boxShadowColor?: string;
// }

// const ImageWithFallback = ({ src, alt, fallbackSrc1, fallbackSrc2, boxShadowColor = "red", ...props }: ImageWithFallbackProps): JSX.Element => {
//    const [currentSrc, setCurrentSrc] = useState(src);

//    useEffect(() => {
//       const img = new Image();
//       img.src = src;

//       img.onload = () => {
//          setCurrentSrc(src);
//       };

//       img.onerror = () => {
//          if (fallbackSrc1) {
//             setCurrentSrc(fallbackSrc1);
//             const fallbackImg1 = new Image();
//             fallbackImg1.src = fallbackSrc1;

//             fallbackImg1.onerror = () => {
//                if (fallbackSrc2) {
//                   console.log('inside fallbackSrc2');
//                   setCurrentSrc(fallbackSrc2);
//                   const fallbackImg2 = new Image();
//                   fallbackImg2.src = fallbackSrc2;

//                   fallbackImg2.onerror = () => {
//                      setCurrentSrc('/tmp/test.png');
//                   };
//                } else {
//                   setCurrentSrc('/tmp/test.png');
//                }
//             };
//          } else if (fallbackSrc2) {
//             setCurrentSrc(fallbackSrc2);
//             const fallbackImg2 = new Image();
//             fallbackImg2.src = fallbackSrc2;

//             fallbackImg2.onerror = () => {
//                setCurrentSrc('/tmp/test.png');
//             };
//          } else {
//             setCurrentSrc('/tmp/test.png');
//          }
//       };
//    }, [src, fallbackSrc1, fallbackSrc2]);

//    return (
//       <img
//          src={currentSrc}
//          alt={alt}
//          style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
//          loading="lazy"
//          {...props}
//       />
//    );
// }

// export default ImageWithFallback;


"use client";
import type { ImgHTMLAttributes } from 'react';
import { useEffect, useContext } from 'react';
import type { MyContextTypes } from './preloadimages';
import { MyContext, useMyContext } from './preloadimages';

// TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
//       - every time load the page clear the log

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
   src: string;
   alt: string;
   fallbackSrc1?: string | undefined;
   fallbackSrc2?: string | undefined;
   boxShadowColor?: string;
}

const ImageWithFallback = ({ src, alt, fallbackSrc1, fallbackSrc2, boxShadowColor = "red", ...props }: ImageWithFallbackProps): JSX.Element => {
   const { currentSrc, setCurrentSrc, fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();

   useEffect(() => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
         setCurrentSrc(src);
      };

      img.onerror = () => {
         if (fallbackSrc1) {
            setCurrentSrc(fallbackSrc1);
            setFallbackImgNumber(1);
            const fallbackImg1 = new Image();
            fallbackImg1.src = fallbackSrc1;

            fallbackImg1.onerror = () => {
               if (fallbackSrc2) {
                  console.log('inside fallbackSrc2');
                  setCurrentSrc(fallbackSrc2);
                  setFallbackImgNumber(2);
                  const fallbackImg2 = new Image();
                  fallbackImg2.src = fallbackSrc2;

                  fallbackImg2.onerror = () => {
                     setCurrentSrc('/tmp/test.png');
                     setFallbackImgNumber(3);
                  };
               } else {
                  setCurrentSrc('/tmp/test.png');
                  setFallbackImgNumber(3);
               }
            };
         } else if (fallbackSrc2) {
            setCurrentSrc(fallbackSrc2);
            setFallbackImgNumber(2);
            const fallbackImg2 = new Image();
            fallbackImg2.src = fallbackSrc2;

            fallbackImg2.onerror = () => {
               setCurrentSrc('/tmp/test.png');
               setFallbackImgNumber(3);
            };
         } else {
            setCurrentSrc('/tmp/test.png');
            setFallbackImgNumber(3);
         }
      };
   }, [src, fallbackSrc1, fallbackSrc2]);

   return (
      <img
         src={currentSrc}
         alt={alt}
         style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
         loading="lazy"
         {...props}
      />
   );
}

export default ImageWithFallback;