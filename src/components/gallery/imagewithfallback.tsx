"use client";
import 'client-only'; //
import { useState, useEffect, useContext } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { Blurhash } from 'react-blurhash';
import type { MyContextTypes } from './preloadimages';
import { useMyContext } from './preloadimages';
import { ImageType } from '@/data/images';
// import { MyContext } from './preloadimages';

// TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
//       - every time load the page clear the log

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
   img: ImageType
   // src: string;
   // alt: string;
   // fallbackSrc1?: string | undefined;
   // fallbackSrc2?: string | undefined;
   boxShadowColor?: string;
   // infiniteScroll?: boolean;
}

const FINAL_ERROR_IMG: string = '/tmp/test.png';

const ImageWithFallback = ({
   img,
   // src,
   // alt,
   // fallbackSrc1,
   // fallbackSrc2,
   boxShadowColor = "red",
   // infiniteScroll,
   ...props
}: ImageWithFallbackProps): JSX.Element => {

   const { src, fallbackSrc1, fallbackSrc2, alt }: ImageType = img; // TODO: types needed or not
   const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
   // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useMyContext();
   const { fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();
   // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useContext(MyContext);
   const [isImgLoading, setIsImgLoading] = useState<boolean>(false);

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

      console.log('src', img.complete);

      setIsImgLoading(img.complete);

      img.onerror = () => {
         if (fallbackSrc1) {
            setCurrentSrc(fallbackSrc1);
            setFallbackImgNumber(1);
            const fallbackImg1 = new Image();
            fallbackImg1.src = fallbackSrc1;
            console.log('fall1', fallbackImg1);
            setIsImgLoading(fallbackImg1.complete);

            fallbackImg1.onerror = () => {
               if (fallbackSrc2) { // if not `undefined`
                  setCurrentSrc(fallbackSrc2);
                  setFallbackImgNumber(2);
                  const fallbackImg2 = new Image();
                  fallbackImg2.src = fallbackSrc2;
                  console.log('fall2', fallbackImg2);
                  setIsImgLoading(fallbackImg2.complete);

                  fallbackImg2.onerror = () => {
                     setFallbackImgNumber(3);
                     setIsImgLoading(false);
                  };
               } else {
                  setFallbackImgNumber(3);
                  setIsImgLoading(false);

               }
            };
         } else if (fallbackSrc2) { // if not `undefined`
            setCurrentSrc(fallbackSrc2);
            setFallbackImgNumber(2);
            const fallbackImg2 = new Image();
            fallbackImg2.src = fallbackSrc2;
            console.log('fall2', fallbackImg2);
            setIsImgLoading(fallbackImg2.complete);

            fallbackImg2.onerror = () => {
               setFallbackImgNumber(3);
               setIsImgLoading(false);
            };
         } else {
            setFallbackImgNumber(3);
            setIsImgLoading(false);
         }
      };

   }, [src, fallbackSrc1, fallbackSrc2]);

   console.log('currentSrc', currentSrc);
   console.log('alt', alt);
   if (isImgLoading) {
      return (
         <>
            <Blurhash
               hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
               width={400}
               height={300}
               resolutionX={32}
               resolutionY={32}
               punch={1}
            /></>
      )
   }

   return (
      <img
         src={currentSrc}
         alt={alt}
         style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
         loading="lazy"
         {...props}
      />
   )
}

   // return (
   //    <>
   //       {!isImgLoading ? (
   //          <>
   //             <Blurhash
   //                hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
   //                width={400}
   //                height={300}
   //                resolutionX={32}
   //                resolutionY={32}
   //                punch={1}
   //             /></>
   //       ) : (
   //          <img
   //             src={currentSrc}
   //             alt={alt}
   //             style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
   //             loading="lazy"
   //             {...props}
   //          />
   //       )}
   //    </>
   // );

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
