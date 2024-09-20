// "use client";
// import 'client-only';
// import { FC, createContext, useState, useContext, useEffect } from "react";
// import Link from 'next/link';
// import images, { FALLBACK_IMG } from '@/data/images';
// import type { ImageType } from '@/data/images';
// import ImageWithFallback from './imagewithfallback';
// // import { Blurhash, BlurhashCanvas } from 'react-blurhash';
// // import BlurhashCanvas from '@/components/gallery/blurhashcanvas';

// // TODO: remove context and use prop drilling method because over kill 
// // TODO: Fallback image and fallback string need to store in images file 

// type MyContextTypes = {
//    fallbackImgNumber: number;
//    setFallbackImgNumber: (fallbackImgNumber: number) => void;
//    // finalErrorImg: string;
// }

// function getMaintainedHeight(originalWidth: number, originalHeight: number, fixedWidth: number = 350) {
//    const aspectRatio = originalHeight / originalWidth;
//    const newHeight = fixedWidth * aspectRatio;
//    return newHeight;
// }

// const MyContext = createContext<MyContextTypes | undefined>(undefined);
// // const FALLBACK_IMG: string = '/images/test.png';

// const PreloadImages: FC = () => {
//    return (
//       <>
//          {images.map((img: ImageType, key: number) => (
//             <RenderImageWithLink img={img} key={key} />
//          ))}
//          {/*   When image loaded and error occures. error-image instantly isNotFallbackImg.
//                         Because of error-img already loaded                   */}
//          <img src={FALLBACK_IMG} alt="error-image" hidden />
//       </>
//    );
// };

// const RenderImageWithLink: FC<{ img: ImageType }> = ({ img }) => {
//    const imgAlt: string = img.alt;
//    const [fallbackImgNumber, setFallbackImgNumber] = useState<number>(0);
//    // const finalErrorImg: string = FALLBACK_IMG;

//    // TODO: interception only allowed when image is fully loaded
//    // TODO: lastFallback image always needed even image properly loaded to load by checking network request is free
//    // TODO: remove or correct the cursor styles 

//    /**
//         fallbackImagNumber info

//          0 = src, default image
//          1 = fallbackSrc1
//          2 = fallbackSrc2
//          3 = error image, final image 
//     */


//    // TODO: check this url is working fine
//    const linkHref: string = (() => {
//       switch (fallbackImgNumber) {
//          case 0:
//             return `/gallery/${imgAlt}`;
//          case 1:
//             return `/gallery/fallback1-${imgAlt}`;
//          case 2:
//             return `/gallery/fallback2-${imgAlt}`;
//          default:
//             return `/gallery/${imgAlt}`;
//       }
//    })();

//    console.log('linkHref', linkHref);

//    // TODO: is really needed css var 

//    if (fallbackImgNumber === 3) {
//       // if final image is loaded image intercepting and preview will not shown //
//       // TODO: if good and possible move span and link that is a move in imageWithFallback compoenent if it is better and possible
//       return (
//          // <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber, finalErrorImg }} >
//          <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber }} >
//             <span className="image-item" style={{ cursor: 'var(--custom-cursor-default)' }}>
//                <ImageWithFallback img={img} />
//             </span>
//          </MyContext.Provider>
//       )
//    } else {
//       return (
//          // <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber, finalErrorImg }}>
//          <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber }}>
//             <Link className="image-item" href={linkHref} style={{ cursor: 'var(--custom-cursor-pointer)' }}>
//                <ImageWithFallback img={img} />
//             </Link>
//          </MyContext.Provider>
//       )
//    }
// };

// const useMyContext = () => {
//    const context = useContext(MyContext);
//    if (context === undefined) {
//       // throw new Error('useMyContext must be used within a MyProvider');
//       return { fallbackImgNumber: 1, setFallbackImgNumber};

//    }
//    return context;
// };

// export { MyContext, useMyContext };
// // export { MyContext };
// export type { MyContextTypes };
// export default PreloadImages;




// "use client";
// import 'client-only';
// import InterceptingImageWithFallbacks from './Interceptingimagewithfallbacks';

// import type { FC } from 'react';
// import type { ImageType } from '@/data/images';

// import images, { FALLBACK_IMG} from '@/data/images';

// TODO: Fallback image and fallback string need to store in images file 

// // FOR NOW THIS CODE IS NOT USING BECAUSE USING LIB // //
// // FOR NOW THIS CODE IS NOT USING BECAUSE USING LIB // //
// // FOR NOW THIS CODE IS NOT USING BECAUSE USING LIB // //

// const PreloadImages: FC = () => {
//    return (
//       <>
//          {images.map((img: ImageType, key: number) => (
//             <InterceptingImageWithFallbacks img={img} key={key} />
//          ))}
//          {/*   When image loaded and error occures. FALLBACK_IMG instantly render
//                         Because of error-img already loaded                   */}
//          <img src={FALLBACK_IMG} alt="error-image" hidden />
//       </>
//    );
// };

// export default PreloadImages;


// // FOR NOW THIS CODE IS NOT USING BECAUSE USING LIB // //
// // FOR NOW THIS CODE IS NOT USING BECAUSE USING LIB // //
// // FOR NOW THIS CODE IS NOT USING BECAUSE USING LIB // //


























// const RenderImageWithLink: FC<{ img: ImageType }> = ({ img }) => {
//    const imgAlt: string = img.alt;
//    const [fallbackImgNumber, setFallbackImgNumber] = useState<number>(0);
//    const [loadedImageSrc, setLoadedImageSrc] = useState<string | null>(null);
//    const [usedFallbackNumber, setUsedFallbackNumber] = useState<number>(0);
//    // const finalErrorImg: string = FALLBACK_IMG;

//    // TODO: interception only allowed when image is fully loaded
//    // TODO: lastFallback image always needed even image properly loaded to load by checking network request is free
//    // TODO: remove or correct the cursor styles 

//    /**
//       if previous image not loaded becuase of error use fallback image

//            0   ->      1       ->      2      ->      3
//           src  -> fallbackSrc1 -> falbackSrc2 -> error-image.png 
//  */


//    // TODO: check this url is working fine
//    // const linkHref: string = (() => {
//    // const generateSrc = (number: number) => {
//    //    switch (fallbackImgNumber) {
//    //       case 0:
//    //          return `/gallery/${imgAlt}`;
//    //       case 1:
//    //          return `/gallery/fallback1-${imgAlt}`;
//    //       case 2:
//    //          return `/gallery/fallback2-${imgAlt}`;
//    //       default:
//    //          return `/gallery/${imgAlt}`;
//    //    }
//    // };
//    // })();

//    console.log('usedFallbackNumber: ', usedFallbackNumber);

//    const generateSrc = (number: number) => {
//       switch (number) {
//          case 0:
//             return `/gallery/${imgAlt}`;
//          case 1:
//             return `/gallery/fallback1-${imgAlt}`;
//          case 2:
//             return `/gallery/fallback2-${imgAlt}`;
//          default:
//             return `/gallery/error-image.png`;
//       }
//    };


//    const srcArray = [
//       generateSrc(0),
//       generateSrc(1),
//       generateSrc(2),
//       generateSrc(3)
//    ];

//    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
//       const loadedSrc = event.currentTarget.src;
//       setLoadedImageSrc(loadedSrc);

//       // Determine which fallback was used
//       const fallbackUsed = srcArray.findIndex(src => src === loadedSrc);
//       setUsedFallbackNumber(fallbackUsed);
//    };

//    // console.log('linkHref', linkHref);

//    // TODO: is really needed css var 

//    if (usedFallbackNumber === 3) {
//       return (
//          <span className="image-item" style={{ cursor: 'var(--custom-cursor-default)' }}>
//             <ImageWithFallback
//                img={img}
//                setLoadedImageSrc={setLoadedImageSrc}
//             />
//          </span>
//       )
//    } else {
//       return (
//          <Link className="image-item" href={srcArray[usedFallbackNumber]} style={{ cursor: 'var(--custom-cursor-pointer)' }}>
//             <ImageWithFallback
//                img={img}
//                setLoadedImageSrc={setLoadedImageSrc}
//             />
//          </Link>
//       )
//    }
// };




// // TODO: if more than 10 images loaded not correct log and show message show error using localStorageState,
// //       - every time load the page clear the log

// interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
//    img: ImageType
//    boxShadowColor?: string;
//    setLoadedImageSrc: (value: string) => void;

// }

// const ImageWithFallback = ({
//    img,
//    boxShadowColor = "red",
//    setLoadedImageSrc,
// }: ImageWithFallbackProps): JSX.Element => {

//    const { src, fallbackSrc1, fallbackSrc2, alt, height, width, base64String, }: ImageType = img; // TODO: types needed or not
//    const isValidString = isValidBase64(base64String);



//    return (
//       <Img
//          src={[src, fallbackSrc1, fallbackSrc2, FALLBACK_IMG].filter((s): s is string => s !== undefined)}
//          style={{
//             backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//             backgroundSize: 'cover',
//             boxShadow: `1px 1px 5px ${boxShadowColor}`,
//          }}
//          loader={
//             <div
//                style={{
//                   backgroundImage: `url(${isValidString ? base64String : FALLBACK_PLACEHOLDER})`,
//                   backgroundSize: 'cover',
//                   boxShadow: `1px 1px 5px ${boxShadowColor}`,
//                }}
//             />
//          }
//          unloader={<img src={FALLBACK_IMG} />}
//          onLoad={(event) => {
//             const loadedSrc = (event.target as HTMLImageElement).src;
//             setLoadedImageSrc(loadedSrc);
//          }}
//       />
//    )
// }

// export default PreloadImages;
