// "use client";
// import { FC } from "react";
// import Link from 'next/link';
// import images, { ImageType } from '@/data/images';
// import ImageWithFallback from './imagewithfallback';

// // TODO: PROBLEM: when calling intercepter it loads imagur image even if imgbb image shown 

// const PreloadImages: FC = () => {
//    return (
//       <div className="image-gallery">
//          {images.map((img: ImageType, key: number) => (
//             <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
//                <ImageWithFallback src={img.src} alt={img.alt} fallbackSrc1={img.fallbackSrc1} fallbackSrc2={img.fallbackSrc2}/>
//             </Link>
//          ))}
//       </div>
//    );
// };

// const renderWithLink: Fc = () => {

// }

// export default PreloadImages;





"use client";
import { FC, createContext, useState, useContext, useEffect } from "react";
import Link from 'next/link';
import images, { ImageType } from '@/data/images';
import ImageWithFallback from './imagewithfallback';

// TODO: PROBLEM: when calling intercepter it loads imagur image even if imgbb image shown 

type MyContextTypes = {
   currentSrc: string;
   setCurrentSrc: (currentSrc: string) => void;
   fallbackImgNumber: number;
   setFallbackImgNumber: (fallbackImgNumber: number) => void;
}

const PreloadImages: FC = () => {
   return (
      <div className="image-gallery">
         {images.map((img: ImageType, key: number) => (
            // <Link className="image-item" key={key} href={`/gallery/${img.alt}`}>
            //    <ImageWithFallback src={img.src} alt={img.alt} fallbackSrc1={img.fallbackSrc1} fallbackSrc2={img.fallbackSrc2} />
            // </Link>
            <RenderImageWithLink img={img} key={key} />
         ))}
      </div>
   );
};

const MyContext = createContext<MyContextTypes | undefined>(undefined);

const RenderImageWithLink: FC = ({ img }) => {

   // TODO: interception only allowed when image is fully loaded
   const [currentSrc, setCurrentSrc] = useState<string>(img.src); // TODO: is realy need to use in context
   const [fallbackImgNumber, setFallbackImgNumber] = useState<number>(0);
   // TODO:  PROBLEM: if fallbackImgNumber is == 3 runns loop for every 50ms 

   useEffect(() => {
      console.log('changing fallbackImgNumber: current: ', fallbackImgNumber);
   }, [fallbackImgNumber]);

   const { src, fallbackSrc1, fallbackSrc2, alt } = img;

   /**
      fallbackImagNumber info

         0 = src, default image
         1 = fallbackSrc1
         2 = fallbackSrc2
         3 = error image, final image 
    */


   // TODO: check this url is working fine
   // const linkHref: string = `/gallery/${fallbackImgNumber === 0 ? alt : fallbackImgNumber === 1 ? 'fallback1-' + alt : fallbackImgNumber === 2 ? 'fallback2-' + alt}`;
   const linkHref: string = (() => {
      switch (fallbackImgNumber) {
         case 0:
            return `/gallery/${alt}`;
         case 1:
            return `/gallery/fallback1-${alt}`;
         case 2:
            return `/gallery/fallback2-${alt}`;
         default:
            return `/gallery/${alt}`; // or handle the default case as needed
      }
   })();

   console.log('linkHref', linkHref);

   if (fallbackImgNumber === 3) {
      // if final image is loaded image intercepting and preview will not shown 
      return (
         <MyContext.Provider value={{ currentSrc, setCurrentSrc, fallbackImgNumber, setFallbackImgNumber }} >
            <a className="image-item" href={linkHref}>
               <ImageWithFallback src={src} alt={alt} fallbackSrc1={fallbackSrc1} fallbackSrc2={fallbackSrc2} />
            </a>
         </MyContext.Provider>
      )
   } else {
      return (
         <MyContext.Provider value={{ currentSrc, setCurrentSrc, fallbackImgNumber, setFallbackImgNumber }} >
            <Link className="image-item" href={linkHref}>
               <ImageWithFallback src={src} alt={alt} fallbackSrc1={fallbackSrc1} fallbackSrc2={fallbackSrc2} />
            </Link>
         </MyContext.Provider>
      )
   }
}

const useMyContext = () => {
   const context = useContext(MyContext);
   if (context === undefined) {
      throw new Error('useMyContext must be used within a MyProvider');
   }
   return context;
};

export { MyContext, useMyContext };
export type { MyContextTypes };
export default PreloadImages;

