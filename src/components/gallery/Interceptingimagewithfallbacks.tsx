'use clinet';
import 'client-only';
import { useEffect, useState, createElement } from "react";
import Link from 'next/link';
import { Img } from 'react-image';

import type { FC, SyntheticEvent } from 'react';
import type { ImageType } from '@/data/images';

import {
   FALLBACK_IMG,
   FALLBACK_IMG_DIMENSIONS,
   FALLBACK_PLACEHOLDER,
} from '@/data/images';
import isValidBase64 from '@/utils/isvalidBase64';


interface InterceptingImageWithFallbacksProps {
   img: ImageType,
   boxShadowColor?: string,
};

const InterceptingImageWithFallbacks: FC<InterceptingImageWithFallbacksProps> = ({
   img,
   boxShadowColor = "red",
}):
   JSX.Element => {
   const {
      src,
      fallbackSrc1,
      fallbackSrc2,
      alt,
      base64String,
      width: actualImageWidth,
      height: actualImageHeight,
   }: ImageType = img;
   const [currentSrc, setCurrentSrc] = useState<string>(src);
   const [interceptingUrl, setInterceptingUrl] = useState<string>('');

   const isValidString: boolean = isValidBase64(base64String);
   const isNotFallbackImg: boolean = currentSrc !== FALLBACK_IMG;
   const imageSources: string[] =
      [src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG].filter((s): s is string => s !== undefined);
   const bgImage: string = isValidString ? base64String : FALLBACK_PLACEHOLDER;
   const { width: fallbackImageWidth, height: fallbackImageHeight } = FALLBACK_IMG_DIMENSIONS;
   const finalImageWidth: number = isNotFallbackImg ? actualImageWidth : fallbackImageWidth;
   const finalImageHeight: number = isNotFallbackImg ? actualImageHeight : fallbackImageHeight;

   const stripBaseUrlIfSameOrigin = (url: string): string => { // not good name for it: it not only remove base it only remove if start with current server
      try {
         const baseUrl = new URL('/', window.location.href).href;
         if (url.startsWith(baseUrl)) {
            return url.replace(baseUrl, '/');
         }
         return url;
      } catch (error) {
         console.error('Invalid URL:', error);
         return url;
      }
   };

   const handleImageLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      const src = event.currentTarget.src;
      console.log('inside handleImgLoad and src is : ', src);
      setCurrentSrc(stripBaseUrlIfSameOrigin(src));
   };

   useEffect(() => {
      const urls = {
         [src]: `/gallery/${alt}`,
         [fallbackSrc1 || '']: `/gallery/fallback1-${alt}`, // default empty string if undefined
         [fallbackSrc2 || '']: `/gallery/fallback2-${alt}`, // default empty string if undefined
         [FALLBACK_IMG]: FALLBACK_IMG,
      };

      setInterceptingUrl(urls[currentSrc] || FALLBACK_IMG);
   }, [currentSrc]);

   const imageElement = (
      <div
         className='image-wrapper'
         style={{
            aspectRatio: `${finalImageWidth} / ${finalImageHeight}`,
            boxShadow: `1px 1px 5px ${boxShadowColor}`,
         }}>
         <div
            className='image-wrapper-blur'
            style={{
               backgroundImage: `url(${bgImage})`,
               aspectRatio: `${finalImageWidth} / ${finalImageHeight}`
            }}
         />
         {/* TODO: */}
         <Img
            className='image'
            src={imageSources}
            crossorigin="anonymous"
            unloader={
               <img
                  src={FALLBACK_IMG}
                  width={finalImageWidth}
                  height={finalImageHeight}
               />
            }
            onLoad={handleImageLoad}
            alt={alt}
         />
      </div>
   );

   return isNotFallbackImg && interceptingUrl !== '' ? (
      <Link href={interceptingUrl} scroll={false} className="image-item">
         {imageElement}
      </Link>
   ) : (
      <span className="image-item">{imageElement}</span>
   );
};

// TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
//       - every time load the page clear the log

export default InterceptingImageWithFallbacks;



// "use client";
// import 'client-only'; //
// import { useState, useEffect, useContext } from 'react';
// import type { ImgHTMLAttributes } from 'react';
// import NextImage from 'next/image';
// import Link from 'next/link';
// // import type { MyContextTypes } from './preloadimages';
// // import { useMyContext } from './preloadimages';
// import { FALLBACK_IMG, FALLBACK_PLACEHOLDER } from '@/data/images';
// import type { ImageType } from '@/data/images';
// // import BlurhashImage from './blurhashtoimg';


// import isValidBase64 from '@/utils/isvalidBase64';

// // TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
// //       - every time load the page clear the log

// // interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
// //    img: ImageType
// //    boxShadowColor?: string;
// //    fallbackImgNumber: number;
// //    setFallbackImgNumber: (value: number) => void;
// // }

// interface InterceptingImageWithFallbacksProps {
//    img: ImageType,
//    boxShadowColor?: string,
// };

// const ImageWithFallback = ({
//    img,
//    boxShadowColor = "red",
//    // fallbackImgNumber,
//    // setFallbackImgNumber,
//    // }: ImageWithFallbackProps): JSX.Element => {
// }: InterceptingImageWithFallbacksProps): JSX.Element => {

//    const { src, fallbackSrc1, fallbackSrc2, alt, height, width, base64String, }: ImageType = img; // TODO: types needed or not
//    const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
//    const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
//    // const [isLoading, setIsLoading] = useState<boolean>(true);
//    // const [isRendered, setIsRendered] = useState<boolean>(false);
//    const [interceptingUrl, setInterceptingUrl] = useState<string>('');
//    const [fallbackImgNumber, setFallbackImgNumber] = useState<number>(0);

//    const [isImgLoadingComplete, setIsImgLoadingComplete] = useState(false);

//    /**
//       if previous image not loaded becuase of error use fallback image

//           0  ->      1       ->      2      ->      3
//          src -> fallbackSrc1 -> falbackSrc2 -> error-image.png 
//  */

//    useEffect(() => {
//       const urls = {
//          [src]: `/gallery/${alt}`,
//          [fallbackSrc1 || '']: `/gallery/fallback1-${alt}`, // default empty string if undefined
//          [fallbackSrc2 || '']: `/gallery/fallback2-${alt}`, // default empty string if undefined
//          [FALLBACK_IMG]: FALLBACK_IMG,
//       };

//       setInterceptingUrl(urls[currentSrc] || FALLBACK_IMG);
//    }, [currentSrc]);


//    // console.log('currentSrc, fallbackImgNumber, isComplete:', currentSrc, fallbackImgNumber, isImgLoadingComplete);
//    const isValidString = isValidBase64(base64String);

//    const isNotFallbackImg: boolean = currentSrc !== FALLBACK_IMG;


//    useEffect(() => {
//       (function tryLoadingImage(src: string, fallbackNum: number) {
//          const img = new Image();
//          img.src = src;

//          if (fallbackImgNumber !== 3) {
//             img.onload = () => {
//                setCurrentSrc(src);
//                setIsImgLoading(false);
//             };

//          } else {
//             setIsImgLoading(false);
//             if (fallbackImgNumber === 3) return setCurrentSrc(FALLBACK_IMG);
//          }

//          img.onerror = () => {
//             if (fallbackNum === 1 && fallbackSrc1) {
//                setFallbackImgNumber(1);
//                tryLoadingImage(fallbackSrc1, 2);
//             } else if (fallbackNum === 2 && fallbackSrc2) {
//                setFallbackImgNumber(2);
//                tryLoadingImage(fallbackSrc2, 3);
//             } else {
//                setFallbackImgNumber(3);
//             }
//          }
//       })(src, 1);

//    }, [src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG, setFallbackImgNumber]);

//    // useEffect(() => {
//    //    const tryLoadingImage = async (src: string, fallbackNum: number) => {
//    //       const img = new Image();
//    //       img.src = src;

//    //       try {
//    //          // Wait for the image to load or throw an error
//    //          await new Promise<void>((resolve, reject) => {
//    //             if (img.complete) {

//    //                resolve();
//    //             } else {
//    //                img.onload = () => resolve();
//    //                img.onerror = () => reject();
//    //             }
//    //          });

//    //          setCurrentSrc(src);
//    //          setIsImgLoading(false);
//    //          setIsImgLoadingComplete(true);
//    //       } catch {
//    //          // Fallback logic if the image fails to load
//    //          if (fallbackNum === 1 && fallbackSrc1) {
//    //             setFallbackImgNumber(1);
//    //             await tryLoadingImage(fallbackSrc1, 2);
//    //          } else if (fallbackNum === 2 && fallbackSrc2) {
//    //             setFallbackImgNumber(2);
//    //             await tryLoadingImage(fallbackSrc2, 3);
//    //          } else {
//    //             setFallbackImgNumber(3);
//    //             setCurrentSrc(FALLBACK_IMG);
//    //             setIsImgLoading(false);
//    //          }
//    //       }
//    //    };

//    //    tryLoadingImage(src, 1);

//    // }, [src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG, setFallbackImgNumber]);

//    //  THIS IS ASYNC VERSION OF CODE NOT GOOD RUNNING INFINITE LOOP FOR FALLBACK IMAGE AND IMG.COMPLETE NOT WOKRING
//    // (async function tryLoadingImage(src: string, fallbackNum: number) {
//    //    const img = new Image();
//    //    img.src = src;

//    //    try {
//    //       await new Promise<void>((resolve, reject) => {
//    //          img.onload = () => resolve();
//    //          img.onerror = () => reject();
//    //       });

//    //       setCurrentSrc(src);
//    //       setIsImgLoading(false);
//    //       setIsImgLoadingComplete(img.complete);
//    //    } catch {
//    //       if (fallbackNum === 1 && fallbackSrc1) {
//    //          setFallbackImgNumber(1);
//    //          await tryLoadingImage(fallbackSrc1, 2);
//    //       } else if (fallbackNum === 2 && fallbackSrc2) {
//    //          setFallbackImgNumber(2);
//    //          await tryLoadingImage(fallbackSrc2, 3);
//    //       } else {
//    //          setFallbackImgNumber(3);
//    //          setCurrentSrc(FALLBACK_IMG);
//    //          setIsImgLoading(false);
//    //       }
//    //    }
//    // })(src, 1);

//    const lazyLoadImg = isImgLoading ? (
//       <div
//          style={{
//             backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//             backgroundSize: 'cover',
//             boxShadow: `1px 1px 5px ${boxShadowColor}`,
//             width: width,
//             height: height,
//             maxWidth: '100%',
//             maxHeight: '100%',
//             objectFit: 'cover',
//          }}
//       />
//    ) : (
//       <img
//          style={{
//             // visibility: isImgLoadingComplete ? 'visible' : 'hidden',
//             visibility: !isImgLoading ? 'visible' : 'hidden',
//             backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//             backgroundSize: 'cover',
//             boxShadow: `1px 1px 5px ${boxShadowColor}`,
//          }}
//          src={currentSrc}
//          alt={alt}
//          loading="lazy" // You can remove this if you think lazy loading is unnecessary
//       />
//    );

//    return isNotFallbackImg ? (
//       <Link href={interceptingUrl} className="image-item">
//          {lazyLoadImg}
//       </Link>
//    ) : (
//       <span className="image-item">{lazyLoadImg}</span>
//    );
//    // return isImgLoading ? (
//    // // return isImgLoading || !isImgLoadingComplete ? (
//    //    <div
//    //       style={{
//    //          backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//    //          backgroundSize: 'cover',
//    //          boxShadow: `1px 1px 5px ${boxShadowColor}`,
//    //       }}
//    //    />
//    // ) : (
//    //    <img
//    //       style={{
//    //          // visibility: isImgLoadingComplete ? 'visible' : 'hidden',
//    //          visibility: isImgLoading ? 'visible' : 'hidden',
//    //          backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//    //          backgroundSize: 'cover',
//    //          boxShadow: `1px 1px 5px ${boxShadowColor}`,
//    //       }}
//    //       src={currentSrc}
//    //       alt={alt}
//    //       loading="lazy" // You can remove this if you think lazy loading is unnecessary
//    //    />
//    // );
// };

// export default ImageWithFallback;
