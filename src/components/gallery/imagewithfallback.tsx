// // THIS FILE CODE NOTE USING FOR NOW // // 
// // THIS FILE CODE NOTE USING FOR NOW // // 

// "use client";
// import 'client-only'; //
// import { useState, useEffect, useContext } from 'react';
// import type { ImgHTMLAttributes } from 'react';
// import NextImage from 'next/image';
// // import { Blurhash, BlurhashCanvas } from 'react-blurhash';
// // import BlurhashCanvas from '@/components/gallery/blurhashcanvas';
// import type { MyContextTypes } from './preloadimages';
// import { useMyContext } from './preloadimages';
// import type { ImageType } from '@/data/images';
// // import { decode } from 'blurhash';
// import BlurhashImage from './blurhashtoimg';
// // import BlurhashToImage from '../../app/workers/blurhashtoimg';
// // import { MyContext } from './preloadimages';

// // TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
// //       - every time load the page clear the log

// interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
//    img: ImageType
//    boxShadowColor?: string;
// }

// const FALLBACK_IMG: string = '/images/test.png';

// const ImageWithFallback = ({
//    img,
//    boxShadowColor = "red",
// }: ImageWithFallbackProps): JSX.Element => {

//    const { src, fallbackSrc1, fallbackSrc2, alt, height, width, blurhash, isLarage, rgb }: ImageType = img; // TODO: types needed or not
//    const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
//    // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useMyContext();
//    const { fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();
//    // const { fallbackImgNumber, setFallbackImgNumber, finalErrorImg }: MyContextTypes = useContext(MyContext);
//    // const [isImgLoading, setIsImgLoading] = useState<boolean>(false);
//    const [isLoading, setIsLoading] = useState<boolean>(true);
//    const [isRendered, setIsRendered] = useState<boolean>(false);


//    // function getMaintainedHeight(originalWidth: number, originalHeight: number, fixedWidth: number = 350) {
//    //    const aspectRatio = originalHeight / originalWidth;
//    //    const newHeight = fixedWidth * aspectRatio;
//    //    return newHeight;
//    // }


//    // console.log('fallbackImgNumber', fallbackImgNumber);

//    /**
//          if previous image not loaded becuase of error use fallback image

//              0  ->      1       ->      2      ->      3
//             src -> fallbackSrc1 -> falbackSrc2 -> error-image.png 
//     */

//    // useEffect(() => {
//    //    if (fallbackImgNumber === 3) return setCurrentSrc(FALLBACK_IMG);

//    //    const img = new Image();
//    //    img.src = src;

//    //    img.onload = () => {
//    //       setCurrentSrc(src);
//    //    };

//    //    console.log('src', img.complete);

//    //    setIsImgLoading(img.complete);

//    //    img.onerror = () => {
//    //       if (fallbackSrc1) {
//    //          setCurrentSrc(fallbackSrc1);
//    //          setFallbackImgNumber(1);
//    //          const fallbackImg1 = new Image();
//    //          fallbackImg1.src = fallbackSrc1;
//    //          console.log('fall1', fallbackImg1);
//    //          setIsImgLoading(fallbackImg1.complete);

//    //          fallbackImg1.onerror = () => {
//    //             if (fallbackSrc2) { // if not `undefined`
//    //                setCurrentSrc(fallbackSrc2);
//    //                setFallbackImgNumber(2);
//    //                const fallbackImg2 = new Image();
//    //                fallbackImg2.src = fallbackSrc2;
//    //                console.log('fall2', fallbackImg2);
//    //                setIsImgLoading(fallbackImg2.complete);

//    //                fallbackImg2.onerror = () => {
//    //                   setFallbackImgNumber(3);
//    //                   setIsImgLoading(false);
//    //                };
//    //             } else {
//    //                setFallbackImgNumber(3);
//    //                setIsImgLoading(false);

//    //             }
//    //          };
//    //       } else if (fallbackSrc2) { // if not `undefined`
//    //          setCurrentSrc(fallbackSrc2);
//    //          setFallbackImgNumber(2);
//    //          const fallbackImg2 = new Image();
//    //          fallbackImg2.src = fallbackSrc2;
//    //          console.log('fall2', fallbackImg2);
//    //          setIsImgLoading(fallbackImg2.complete);

//    //          fallbackImg2.onerror = () => {
//    //             setFallbackImgNumber(3);
//    //             setIsImgLoading(false);
//    //          };
//    //       } else {
//    //          setFallbackImgNumber(3);
//    //          setIsImgLoading(false);
//    //       }
//    //    };

//    // }, [src, fallbackSrc1, fallbackSrc2]);

//    //    useEffect(() => {
//    //     (function tryLoadingImage(src: string, fallbackNum: number) {
//    //         const img = new Image();
//    //         img.src = src;

//    //         img.onload = () => setCurrentSrc(src);
//    //         img.onerror = () => {
//    //             if (fallbackNum === 1 && fallbackSrc1) {
//    //                 setFallbackImgNumber(1);
//    //                 tryLoadingImage(fallbackSrc1, 2);
//    //             } else if (fallbackNum === 2 && fallbackSrc2) {
//    //                 setFallbackImgNumber(2);
//    //                 tryLoadingImage(fallbackSrc2, 3);
//    //             } else if (fallbackImgNumber === 3 && FALLBACK_IMG) {
//    //                 setFallbackImgNumber(3);
//    //                 setCurrentSrc(FALLBACK_IMG);
//    //             }
//    //         };
//    //     })(src, 1);
//    // }, [src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG, setFallbackImgNumber]);



//    // useEffect(() => {
//    //    setIsLoading(true);
//    //    setIsRendered(false);

//    //    (function tryLoadingImage(src: string, fallbackNum: number) {
//    //       const img = new Image();
//    //       img.src = src;

//    //       img.onload = () => {
//    //          setCurrentSrc(src);
//    //          setIsLoading(false);
//    //          setIsRendered(true);
//    //       };

//    //       img.onerror = () => {
//    //          if (fallbackNum === 1 && fallbackSrc1) {
//    //             setFallbackImgNumber(1);
//    //             tryLoadingImage(fallbackSrc1, 2);
//    //          } else if (fallbackNum === 2 && fallbackSrc2) {
//    //             setFallbackImgNumber(2);
//    //             tryLoadingImage(fallbackSrc2, 3);
//    //          // } else {
//    //          } else if (fallbackImgNumber === 3 && FALLBACK_IMG) {
//    //             setFallbackImgNumber(3);
//    //             setCurrentSrc(FALLBACK_IMG);
//    //             setIsLoading(false);
//    //             setIsRendered(true);
//    //          }
//    //       };
//    //    })(src, 1);

//    // }, [src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG, setFallbackImgNumber]);

//    // function uint8ClampedArrayToBase64(uint8ClampedArray: Uint8ClampedArray): Promise<string> {
//    //    return new Promise((resolve, reject) => {
//    //       const blob = new Blob([uint8ClampedArray]);
//    //       const reader = new FileReader();
//    //       reader.onloadend = () => {
//    //          const base64String = (reader.result as string).split(',')[1];
//    //          resolve(base64String);
//    //       };
//    //       reader.onerror = reject;
//    //       reader.readAsDataURL(blob);
//    //    });
//    // }

//    useEffect(() => {

//       setIsLoading(true);
//       setIsRendered(false);

//       (function tryLoadingImage(src: string, fallbackNum: number) {
//          const img = new Image();
//          img.src = src;

//          if (fallbackImgNumber !== 3) {
//             img.onload = () => {
//                // debugger;
//                setCurrentSrc(src);
//                setIsLoading(false);
//                setIsRendered(true);
//             };
//          } else {
//             setCurrentSrc(FALLBACK_IMG);
//             setIsLoading(false);
//             setIsRendered(true);
//             return;
//             // if (fallbackImgNumber === 3) return setCurrentSrc(FALLBACK_IMG);
//          }

//          // img.onerror = () => {
//          //    if (fallbackNum === 1 && fallbackSrc2) {
//          //       setFallbackImgNumber(1);
//          //       tryLoadingImage(fallbackSrc2, 1);
//          //    } else if (fallbackNum === 2 && fallbackSrc2 ) {
//          //       setFallbackImgNumber(2);
//          //       tryLoadingImage(fallbackSrc2, 2);
//          //    }
//          //     else {
//          //       // Stop the loop and show the error image
//          //       setFallbackImgNumber(3);
//          //       setCurrentSrc(FALLBACK_IMG);
//          //       setIsLoading(false);
//          //       setIsRendered(true);
//          //    }
//          // };
//          img.onerror = () => {
//             if (fallbackNum === 1 && fallbackSrc1) {
//                setFallbackImgNumber(1);
//                tryLoadingImage(fallbackSrc1, 2);
//             } else if (fallbackNum === 2 && fallbackSrc2) {
//                setFallbackImgNumber(2);
//                tryLoadingImage(fallbackSrc2, 3);
//             } else {
//                setFallbackImgNumber(3);
//                // setCurrentSrc(FALLBACK_IMG);
//                // setIsLoading(false);
//                // setIsRendered(true);
//             }
//          }
//       })(src, 1);

//    }, [src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG, setFallbackImgNumber]);

//    console.log('currentSrc', currentSrc);
//    console.log('alt', alt);
//    console.log('hash', blurhash);

//    /* {isLoading && <p>Loading...</p>} */
//    return (
//       <>
//          <BlurhashImage
//             src={src}
//             width={width}
//             height={height}
//             hash={blurhash}
//             alt={alt}
//             rgb={rgb}
//          />
//          {/* {isLoading && (
//             <div className='image-item'>
//                <span style={{ display: 'flex' }}>
//                   <BlurhashCanvas
//                      hash={blurhash}
//                      width={width}
//                      height={height}
//                      punch={1}
//                      style={{ height: '100%', width: '100%' }}
//                   />
//                </span>
//             </div>
//          )} */}
//          {/* {isRendered && (
//             // TODO: if it is better option use next/image
//             // if images size is bigger then use next/image else use normal img element
//             // - check every image one by one 
//             <> {isLarage ? ( */}

//          {/* ) : ( */}
//          {/* <img
//                   src={currentSrc}
//                   alt={alt}
//                   style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
//                   loading="lazy"
//                /> */}
//          {/* )} */}
//       </>
//       // )}
//       // </>
//    );
//    // if (isImgLoading) {
//    //    return (
//    //       <>
//    //          <Blurhash
//    //             hash={blurhash}
//    //             width={width}
//    //             height={height}
//    //             resolutionX={32}
//    //             resolutionY={32}
//    //             punch={1}
//    //          /></>
//    //    )
//    // }

//    // return (
//    //    <img
//    //       src={currentSrc}
//    //       alt={alt}
//    //       style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
//    //       loading="lazy"
//    //       {...props}
//    //    />
//    // )
// }

// // return (
// //    <>
// //       {!isImgLoading ? (
// //          <>
// //             <Blurhash
// //               hash={blurhash}
// //            width={width}
// //          height={height}
// //                resolutionX={32}
// //                resolutionY={32}
// //                punch={1}
// //             /></>
// //       ) : (
// //          <img
// //             src={currentSrc}
// //             alt={alt}
// //             style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
// //             loading="lazy"
// //             {...props}
// //          />
// //       )}
// //    </>
// // );

// export default ImageWithFallback;


// // "use client";
// // import 'client-only';
// // import type { ImgHTMLAttributes } from 'react';
// // import { useState, useEffect } from 'react';
// // import type { MyContextTypes } from './preloadimages';
// // import { useMyContext } from './preloadimages';

// // interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
// //    src: string;
// //    alt: string;
// //    fallbackSrc1?: string;
// //    fallbackSrc2?: string;
// //    boxShadowColor?: string;
// //    infiniteScroll?: boolean;
// // }

// // const FALLBACK_IMG = '/tmp/test.png';

// // const ImageWithFallback = ({
// //    src,
// //    alt,
// //    fallbackSrc1,
// //    fallbackSrc2,
// //    boxShadowColor = "red",
// //    infiniteScroll,
// //    ...props
// // }: ImageWithFallbackProps): JSX.Element => {
// //    const [currentSrc, setCurrentSrc] = useState<string>(src);

// //    const fallbackImgHandler = () => {
// //       if (!infiniteScroll) {
// //          const { fallbackImgNumber, setFallbackImgNumber }: MyContextTypes = useMyContext();

// //          if (fallbackImgNumber === 3) {
// //             return FALLBACK_IMG;
// //          }
// //       }

// //       return src;
// //    };

// //    useEffect(() => {
// //       const loadImage = (source: string, fallback: string | undefined, nextFallback: string | undefined, fallbackLevel: number) => {
// //          const img = new Image();
// //          img.src = source;

// //          img.onload = () => setCurrentSrc(source);

// //          img.onerror = () => {
// //             if (!infiniteScroll) {
// //                const { setFallbackImgNumber } = useMyContext();
// //                setFallbackImgNumber(fallbackLevel);
// //             }

// //             if (fallback) {
// //                loadImage(fallback, nextFallback, undefined, fallbackLevel + 1);
// //             } else {
// //                setCurrentSrc(FALLBACK_IMG);
// //             }
// //          };
// //       };

// //       loadImage(src, fallbackSrc1, fallbackSrc2, 1);

// //    }, [src, fallbackSrc1, fallbackSrc2, infiniteScroll]);

// //    return (
// //       <img
// //          src={currentSrc}
// //          alt={alt}
// //          style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
// //          loading="lazy"
// //          {...props}
// //       />
// //    );
// // };

// // export default ImageWithFallback;



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

// // LAST EDITED
// // LAST EDITED
// // LAST EDITED

// import isValidBase64 from '@/utils/isvalidBase64';

// // TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
// //       - every time load the page clear the log

// interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
//    img: ImageType
//    boxShadowColor?: string;
//    fallbackImgNumber: number;
//    setFallbackImgNumber: (value: number) => void;
// }

// const ImageWithFallback = ({
//    img,
//    boxShadowColor = "red",
//    // fallbackImgNumber,
//    // setFallbackImgNumber,
// }: ImageWithFallbackProps): JSX.Element => {

//    const { src, fallbackSrc1, fallbackSrc2, alt, height, width, base64String, }: ImageType = img; // TODO: types needed or not
//    const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
//    const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
//    // const [isLoading, setIsLoading] = useState<boolean>(true);
//    // const [isRendered, setIsRendered] = useState<boolean>(false);
//    const [interceptingUrl, setInterceptingUrl] = useState<string>('');

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

// // LAST EDITED
// // LAST EDITED
// // LAST EDITED

// export default ImageWithFallback;




















// "use client";
// import 'client-only'; //
// import { useState, useEffect, useContext } from 'react';
// import type { ImgHTMLAttributes } from 'react';
// // import NextImage from 'next/image';
// import { Img } from 'react-image'
// // import type { MyContextTypes } from './preloadimages';
// // import { useMyContext } from './preloadimages';
// import { FALLBACK_IMG, FALLBACK_PLACEHOLDER } from '@/data/images';
// import type { ImageType } from '@/data/images';
// // import BlurhashImage from './blurhashtoimg';


// import isValidBase64 from '@/utils/isvalidBase64';

// // TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
// //       - every time load the page clear the log

// interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
//    img: ImageType
//    boxShadowColor?: string;
//    fallbackImgNumber: number;
//    setFallbackImgNumber: (value: number) => void;
// }

// const ImageWithFallback = ({
//    img,
//    boxShadowColor = "red",
//    fallbackImgNumber,
//    setFallbackImgNumber,
// }: ImageWithFallbackProps): JSX.Element => {

//    const { src, fallbackSrc1, fallbackSrc2, alt, height, width, base64String, }: ImageType = img; // TODO: types needed or not
//    const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
//    const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
//    // const [isLoading, setIsLoading] = useState<boolean>(true);
//    // const [isRendered, setIsRendered] = useState<boolean>(false);

//    // const [isImgLoadingComplete, setIsImgLoadingComplete] = useState(false);
//    const isValidString = isValidBase64(base64String);

//    /**
//       if previous image not loaded becuase of error use fallback image
 
//           0  ->      1       ->      2      ->      3
//          src -> fallbackSrc1 -> falbackSrc2 -> error-image.png 
//  */


//    return isimgloading ? (
//       // return isimgloading || !isimgloadingcomplete ? (
//       <div
//          style={{
//             backgroundimage: `url(${isvalidstring ? base64string : fallback_placeholder})`,
//             backgroundsize: 'cover',
//             boxshadow: `1px 1px 5px ${boxshadowcolor}`,
//          }}
//       />
//    ) : (
//       <img
//          style={{
//             visibility: isimgloadingcomplete ? 'visible' : 'hidden',
//             backgroundimage: `url(${isvalidstring ? base64string : fallback_placeholder})`,
//             backgroundsize: 'cover',
//             boxshadow: `1px 1px 5px ${boxshadowcolor}`,
//          }}
//          src={currentsrc}
//          alt={alt}
//          loading="lazy" // you can remove this if you think lazy loading is unnecessary
//       />
//    )

//    // return (
//    //    <Img
//    //       // src={[src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG]}
//    //       src={[src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG].filter((s): s is string => s !== undefined)}
//    //       loader={
//    //          <div
//    //             style={{
//    //                backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//    //                backgroundSize: 'cover',
//    //                boxShadow: `1px 1px 5px ${boxShadowColor}`,
//    //             }}
//    //          />
//    //       }
//    //       unloader={<img src={FALLBACK_IMG} />}
//    //    />
//    // )
// }

// export default ImageWithFallback;

// // THIS FILE CODE NOTE USING FOR NOW // // 
// // THIS FILE CODE NOTE USING FOR NOW // // 
