// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { decode } from 'blurhash';

// function uint8ClampedArrayToBase64(uint8ClampedArray: Uint8ClampedArray): Promise<string> {
//    return new Promise((resolve, reject) => {
//       const blob = new Blob([uint8ClampedArray]);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//          const base64String = (reader.result as string).split(',')[1];
//          resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//    });
// }

// const BlurhashImage = ({ src, hash, width, height, alt }: { src: string, hash: string, width: number, height: number, alt: string }) => {
//    const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

//    useEffect(() => {
//       const generateBlurDataURL = async () => {
//          const pixels = decode(hash, width, height); // Decode the blurhash
//          const base64 = await uint8ClampedArrayToBase64(pixels); // Convert to Base64
//          setBlurDataURL(`data:image/png;base64,${base64}`);
//       };

//       generateBlurDataURL();
//    }, [hash, width, height]);

//    console.log('blurDataURL: ', blurDataURL);

//    return (
//       <Image
//          src={src}
//          alt={alt}
//          width={width}
//          height={height}
//          placeholder="blur"
//          blurDataURL={blurDataURL || undefined} // Use blurDataURL if available
//       />
//    );
// };

// export default BlurhashImage;



import { useEffect, useState } from 'react';
import Image from 'next/image';
import { decode } from 'blurhash';
import type { rgbType } from '@/data/images';

// function uint8ClampedArrayToBase64(uint8ClampedArray: Uint8ClampedArray): Promise<string> {
//    return new Promise((resolve, reject) => {
//       const blob = new Blob([uint8ClampedArray]);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//          const base64String = (reader.result as string).split(',')[1];
//          resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//    });
// }
function uint8ClampedArrayToBase64(uint8ClampedArray: Uint8ClampedArray): string {
   let binary = '';
   for (let i = 0; i < uint8ClampedArray.length; i++) {
      binary += String.fromCharCode(uint8ClampedArray[i]);
   }
   return btoa(binary);
}




// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
// github: https://github.com/vercel/next.js/blob/canary/examples/image-component/app/color/page.tsx
const keyStr =
   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
   keyStr.charAt(e1 >> 2) +
   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
   keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
   `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const BlurhashImage = ({ src, hash, width, height, alt, rgb }: { src: string, hash: string, width: number, height: number, alt: string, rgb: rgbType }) => {
   const { r, g, b }: rgbType = rgb;
   // const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

   // useEffect(() => {
   //    const generateBlurDataURL = async () => {
   //       const pixels = decode(hash, width, height); // Decode the blurhash
   //       const base64 = uint8ClampedArrayToBase64(pixels); // Convert to Base64
   //       setBlurDataURL(`data:image/png;base64,${base64}`);
   //    };

   //    generateBlurDataURL();
   // }, [hash, width, height]);

   // if (!blurDataURL) {
   //    // Optional: Return a loading state or a placeholder image while blurDataURL is loading
   //    return <div style={{ width, height, backgroundColor: 'red' }}>Loading...</div>;
   // }

   return (
      <Image
         src={src}
         alt={alt}
         width={width}
         height={height}
         placeholder="blur"
         blurDataURL={rgbDataURL(r, g, b)} // Pass the computed blurDataURL
      />
   );
};

export default BlurhashImage;

