"use client";
import 'client-only';
import { FC, createContext, useState, useContext, useEffect } from "react";
import Link from 'next/link';
import images from '@/data/images';
import type { ImageType } from '@/data/images';
import ImageWithFallback from './imagewithfallback';

type MyContextTypes = {
   fallbackImgNumber: number;
   setFallbackImgNumber: (fallbackImgNumber: number) => void;
   // finalErrorImg: string;
}

const MyContext = createContext<MyContextTypes | undefined>(undefined);
const FINAL_ERROR_IMG: string = '/images/test.png';

const PreloadImages: FC = () => {
   return (
      <div className="image-gallery">
         {images.map((img: ImageType, key: number) => (
            <RenderImageWithLink img={img} key={key} />
         ))}

         {/*   When image loaded error occures. error-image instantly render.
                        Because of error-img already loaded                   */}
         <img src={FINAL_ERROR_IMG} alt="error-image" hidden />
      </div>
   );
};

const RenderImageWithLink: FC<{ img: ImageType }> = ({ img }) => {
   const imgAlt: string = img.alt;
   const [fallbackImgNumber, setFallbackImgNumber] = useState<number>(0);
   // const finalErrorImg: string = FINAL_ERROR_IMG;
   
   // TODO: interception only allowed when image is fully loaded
   // TODO: lastFallback image always needed even image properly loaded to load by checking network request is free
   // TODO: remove or correct the cursor styles 

   /**
        fallbackImagNumber info

         0 = src, default image
         1 = fallbackSrc1
         2 = fallbackSrc2
         3 = error image, final image 
    */


   // TODO: check this url is working fine
   const linkHref: string = (() => {
      switch (fallbackImgNumber) {
         case 0:
            return `/gallery/${imgAlt}`;
         case 1:
            return `/gallery/fallback1-${imgAlt}`;
         case 2:
            return `/gallery/fallback2-${imgAlt}`;
         default:
            return `/gallery/${imgAlt}`;
      }
   })();

   console.log('linkHref', linkHref);

   // TODO: is really needed css var 

   if (fallbackImgNumber === 3) {
      // if final image is loaded image intercepting and preview will not shown //
      return (
         // <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber, finalErrorImg }} >
         <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber }} >
            <span className="image-item" style={{ cursor: 'var(--custom-cursor-default)' }}>
               <ImageWithFallback img={img}/>
            </span>
         </MyContext.Provider>
      )
   } else {
      return (
         // <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber, finalErrorImg }}>
         <MyContext.Provider value={{ fallbackImgNumber, setFallbackImgNumber }}>
            <Link className="image-item" href={linkHref} style={{ cursor: 'var(--custom-cursor-pointer)' }}>
               <ImageWithFallback img={img}/>
            </Link>
         </MyContext.Provider>
      )
   }
};

const useMyContext = () => {
   const context = useContext(MyContext);
   if (context === undefined) {
      // throw new Error('useMyContext must be used within a MyProvider');
            return { fallbackImgNumber: 0, setFallbackImgNumber: () => {} };

   }
   return context;
};

export { MyContext, useMyContext };
// export { MyContext };
export type { MyContextTypes };
export default PreloadImages;

