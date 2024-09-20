import isValidBase64 from '@/utils/isvalidBase64';
import Image from 'next/image';
import { FALLBACK_PLACEHOLDER } from '@/data/images';

// TODO: chnage placeholder 

// for now this not using anywhere 

const BlurImg = ({
   src,
   width,
   height,
   alt,
   placeholder,
}: {
   src: string,
   width: number,
   height: number,
   alt: string
   placeholder: string,
}): JSX.Element => {
   const isValidString = isValidBase64(placeholder);

   return (
      <Image
         src={src}
         alt={alt}
         width={width}
         height={height}
         placeholder="blur"
         blurDataURL={isValidString ? placeholder : FALLBACK_PLACEHOLDER}
      />
   );
};

export default BlurImg;

