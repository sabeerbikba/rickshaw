"use client";
import 'client-only'; //
import { useState, useEffect, useContext } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { Blurhash, BlurhashCanvas } from 'react-blurhash';
import type { MyContextTypes } from './preloadimages';
import { useMyContext } from './preloadimages';
import { ImageType } from '@/data/images';
import BlurhashToImage from './blurhashtoimg';
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

const FINAL_ERROR_IMG: string = '/images/test.png';

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

   const { src, fallbackSrc1, fallbackSrc2, alt, height, width, blurhash }: ImageType = img; // TODO: types needed or not
   const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
   // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useMyContext();
   const { fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();
   // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useContext(MyContext);
   // const [isImgLoading, setIsImgLoading] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isRendered, setIsRendered] = useState<boolean>(false);


   console.log('fallbackImgNumber', fallbackImgNumber);

   /**
         if previous image not loaded becuase of error use fallback image

             0  ->      1       ->      2      ->      3
            src -> fallbackSrc1 -> falbackSrc2 -> error-image.png 
    */

   // useEffect(() => {
   //    if (fallbackImgNumber === 3) return setCurrentSrc(FINAL_ERROR_IMG);

   //    const img = new Image();
   //    img.src = src;

   //    img.onload = () => {
   //       setCurrentSrc(src);
   //    };

   //    console.log('src', img.complete);

   //    setIsImgLoading(img.complete);

   //    img.onerror = () => {
   //       if (fallbackSrc1) {
   //          setCurrentSrc(fallbackSrc1);
   //          setFallbackImgNumber(1);
   //          const fallbackImg1 = new Image();
   //          fallbackImg1.src = fallbackSrc1;
   //          console.log('fall1', fallbackImg1);
   //          setIsImgLoading(fallbackImg1.complete);

   //          fallbackImg1.onerror = () => {
   //             if (fallbackSrc2) { // if not `undefined`
   //                setCurrentSrc(fallbackSrc2);
   //                setFallbackImgNumber(2);
   //                const fallbackImg2 = new Image();
   //                fallbackImg2.src = fallbackSrc2;
   //                console.log('fall2', fallbackImg2);
   //                setIsImgLoading(fallbackImg2.complete);

   //                fallbackImg2.onerror = () => {
   //                   setFallbackImgNumber(3);
   //                   setIsImgLoading(false);
   //                };
   //             } else {
   //                setFallbackImgNumber(3);
   //                setIsImgLoading(false);

   //             }
   //          };
   //       } else if (fallbackSrc2) { // if not `undefined`
   //          setCurrentSrc(fallbackSrc2);
   //          setFallbackImgNumber(2);
   //          const fallbackImg2 = new Image();
   //          fallbackImg2.src = fallbackSrc2;
   //          console.log('fall2', fallbackImg2);
   //          setIsImgLoading(fallbackImg2.complete);

   //          fallbackImg2.onerror = () => {
   //             setFallbackImgNumber(3);
   //             setIsImgLoading(false);
   //          };
   //       } else {
   //          setFallbackImgNumber(3);
   //          setIsImgLoading(false);
   //       }
   //    };

   // }, [src, fallbackSrc1, fallbackSrc2]);

   //    useEffect(() => {
   //     (function tryLoadingImage(src: string, fallbackNum: number) {
   //         const img = new Image();
   //         img.src = src;

   //         img.onload = () => setCurrentSrc(src);
   //         img.onerror = () => {
   //             if (fallbackNum === 1 && fallbackSrc1) {
   //                 setFallbackImgNumber(1);
   //                 tryLoadingImage(fallbackSrc1, 2);
   //             } else if (fallbackNum === 2 && fallbackSrc2) {
   //                 setFallbackImgNumber(2);
   //                 tryLoadingImage(fallbackSrc2, 3);
   //             } else if (fallbackImgNumber === 3 && FINAL_ERROR_IMG) {
   //                 setFallbackImgNumber(3);
   //                 setCurrentSrc(FINAL_ERROR_IMG);
   //             }
   //         };
   //     })(src, 1);
   // }, [src, fallbackSrc1, fallbackSrc2, FINAL_ERROR_IMG, setFallbackImgNumber]);



   // useEffect(() => {
   //    setIsLoading(true);
   //    setIsRendered(false);

   //    (function tryLoadingImage(src: string, fallbackNum: number) {
   //       const img = new Image();
   //       img.src = src;

   //       img.onload = () => {
   //          setCurrentSrc(src);
   //          setIsLoading(false);
   //          setIsRendered(true);
   //       };

   //       img.onerror = () => {
   //          if (fallbackNum === 1 && fallbackSrc1) {
   //             setFallbackImgNumber(1);
   //             tryLoadingImage(fallbackSrc1, 2);
   //          } else if (fallbackNum === 2 && fallbackSrc2) {
   //             setFallbackImgNumber(2);
   //             tryLoadingImage(fallbackSrc2, 3);
   //          // } else {
   //          } else if (fallbackImgNumber === 3 && FINAL_ERROR_IMG) {
   //             setFallbackImgNumber(3);
   //             setCurrentSrc(FINAL_ERROR_IMG);
   //             setIsLoading(false);
   //             setIsRendered(true);
   //          }
   //       };
   //    })(src, 1);

   // }, [src, fallbackSrc1, fallbackSrc2, FINAL_ERROR_IMG, setFallbackImgNumber]);

   useEffect(() => {

      setIsLoading(true);
      setIsRendered(false);

      (function tryLoadingImage(src: string, fallbackNum: number) {
         const img = new Image();
         img.src = src;

         if (fallbackImgNumber !== 3) {
            img.onload = () => {
               // debugger;
               setCurrentSrc(src);
               setIsLoading(false);
               setIsRendered(true);
            };
         } else {
            setCurrentSrc(FINAL_ERROR_IMG);
            setIsLoading(false);
            setIsRendered(true);
            return;
            // if (fallbackImgNumber === 3) return setCurrentSrc(FINAL_ERROR_IMG);
         }

         // img.onerror = () => {
         //    if (fallbackNum === 1 && fallbackSrc2) {
         //       setFallbackImgNumber(1);
         //       tryLoadingImage(fallbackSrc2, 1);
         //    } else if (fallbackNum === 2 && fallbackSrc2 ) {
         //       setFallbackImgNumber(2);
         //       tryLoadingImage(fallbackSrc2, 2);
         //    }
         //     else {
         //       // Stop the loop and show the error image
         //       setFallbackImgNumber(3);
         //       setCurrentSrc(FINAL_ERROR_IMG);
         //       setIsLoading(false);
         //       setIsRendered(true);
         //    }
         // };
         img.onerror = () => {
            if (fallbackNum === 1 && fallbackSrc1) {
               setFallbackImgNumber(1);
               tryLoadingImage(fallbackSrc1, 2);
            } else if (fallbackNum === 2 && fallbackSrc2) {
               setFallbackImgNumber(2);
               tryLoadingImage(fallbackSrc2, 3);
            } else {
               setFallbackImgNumber(3);
               // setCurrentSrc(FINAL_ERROR_IMG);
               // setIsLoading(false);
               // setIsRendered(true);
            }
         }
      })(src, 1);

   }, [src, fallbackSrc1, fallbackSrc2, FINAL_ERROR_IMG, setFallbackImgNumber]);

   console.log('currentSrc', currentSrc);
   console.log('alt', alt);
   /* {isLoading && <p>Loading...</p>} */
   return (
      <>
         {isLoading && <BlurhashToImage blurhash={blurhash} height={height} width={width} />
            // // <div style={{ maxHeight: '350px', maxWidth: '350px' }}>
            // // <div className='image-item'>
            //    <BlurhashCanvas
            //       hash={blurhash}
            //       width={width}
            //       height={height}
            //       // width={350}
            //       // height={350}
            //       // resolutionX={32}
            //       // resolutionY={32}
            //       punch={1}
            //    />
            // // </div>
         }
         {isRendered && (
            <img
               src={currentSrc}
               alt={alt}
               style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
               loading="lazy"
               {...props}
            />
         )}
      </>
   );
   // if (isImgLoading) {
   //    return (
   //       <>
   //          <Blurhash
   //             hash={blurhash}
   //             width={width}
   //             height={height}
   //             resolutionX={32}
   //             resolutionY={32}
   //             punch={1}
   //          /></>
   //    )
   // }

   // return (
   //    <img
   //       src={currentSrc}
   //       alt={alt}
   //       style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
   //       loading="lazy"
   //       {...props}
   //    />
   // )
}

// return (
//    <>
//       {!isImgLoading ? (
//          <>
//             <Blurhash
//               hash={blurhash}
//            width={width}
//          height={height}
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
