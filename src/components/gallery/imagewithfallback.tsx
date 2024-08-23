"use client";
import 'client-only'; //
import type { ImgHTMLAttributes } from 'react';
import { useState, useEffect, useContext } from 'react';
import type { MyContextTypes } from './preloadimages';
import { useMyContext } from './preloadimages';
// import { MyContext } from './preloadimages';

// TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
//       - every time load the page clear the log

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
   src: string;
   alt: string;
   fallbackSrc1?: string | undefined;
   fallbackSrc2?: string | undefined;
   boxShadowColor?: string;
   infiniteScroll?: boolean;
}

const FINAL_ERROR_IMG: string = '/tmp/test.png';

const ImageWithFallback = ({
   src,
   alt,
   fallbackSrc1,
   fallbackSrc2,
   boxShadowColor = "red",
   infiniteScroll,
   ...props
}: ImageWithFallbackProps): JSX.Element => {

   const [currentSrc, setCurrentSrc] = useState<string>(src); // TODO: is realy need to use in context
   // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useMyContext();
   const { fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();
   // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useContext(MyContext);

   console.log('fallbackImgNumber', fallbackImgNumber);
   
   /**
         if previous image not loaded becuase of error use fallback image

             0  ->      1       ->      2      ->      3
            src -> fallbackSrc1 -> falbackSrc2 -> error-image.png 
    */

   useEffect(() => {
      if (fallbackImgNumber === 3) return setCurrentSrc(FINAL_ERROR_IMG);

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
                  setCurrentSrc(fallbackSrc2);
                  setFallbackImgNumber(2);
                  const fallbackImg2 = new Image();
                  fallbackImg2.src = fallbackSrc2;

                  fallbackImg2.onerror = () => {
                     setFallbackImgNumber(3);
                  };
               } else {
                  setFallbackImgNumber(3);

               }
            };
         } else if (fallbackSrc2) {
            setCurrentSrc(fallbackSrc2);
            setFallbackImgNumber(2);
            const fallbackImg2 = new Image();
            fallbackImg2.src = fallbackSrc2;

            fallbackImg2.onerror = () => {
               setFallbackImgNumber(3);
            };
         } else {
            setFallbackImgNumber(3);
         }
      };
   }, [src, fallbackSrc1, fallbackSrc2]);

   console.log('currentSrc', currentSrc);
   console.log('alt', alt);
   

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


// "use client";
// import 'client-only';
// import type { ImgHTMLAttributes } from 'react';
// import { useState, useEffect } from 'react';
// import type { MyContextTypes } from './preloadimages';
// import { useMyContext } from './preloadimages';

// interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
//    src: string;
//    alt: string;
//    fallbackSrc1?: string;
//    fallbackSrc2?: string;
//    boxShadowColor?: string;
//    infiniteScroll?: boolean;
// }

// const FINAL_ERROR_IMG = '/tmp/test.png';

// const ImageWithFallback = ({
//    src,
//    alt,
//    fallbackSrc1,
//    fallbackSrc2,
//    boxShadowColor = "red",
//    infiniteScroll,
//    ...props
// }: ImageWithFallbackProps): JSX.Element => {
//    const [currentSrc, setCurrentSrc] = useState<string>(src);

//    const fallbackImgHandler = () => {
//       if (!infiniteScroll) {
//          const { fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();

//          if (fallbackImgNumber === 3) {
//             return FINAL_ERROR_IMG;
//          }
//       }

//       return src;
//    };

//    useEffect(() => {
//       const loadImage = (source: string, fallback: string | undefined, nextFallback: string | undefined, fallbackLevel: number) => {
//          const img = new Image();
//          img.src = source;

//          img.onload = () => setCurrentSrc(source);

//          img.onerror = () => {
//             if (!infiniteScroll) {
//                const { setFallbackImgNumber } = useMyContext();
//                setFallbackImgNumber(fallbackLevel);
//             }

//             if (fallback) {
//                loadImage(fallback, nextFallback, undefined, fallbackLevel + 1);
//             } else {
//                setCurrentSrc(FINAL_ERROR_IMG);
//             }
//          };
//       };

//       loadImage(src, fallbackSrc1, fallbackSrc2, 1);

//    }, [src, fallbackSrc1, fallbackSrc2, infiniteScroll]);

//    return (
//       <img
//          src={currentSrc}
//          alt={alt}
//          style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
//          loading="lazy"
//          {...props}
//       />
//    );
// };

// export default ImageWithFallback;
