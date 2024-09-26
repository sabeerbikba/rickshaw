import { FC } from "react";
import { StaticImageData } from "next/image";
import { isDevelopmentEnv } from "@/data/envimports";

type PlaceholderImageProps = {
   image: StaticImageData;
   alt?: string;
   mainSrc: string;
   classNames?: string;
   noBackgroudImg?: boolean;
};

const PlaceholderImage: FC<PlaceholderImageProps> = ({
   image, alt, mainSrc, classNames, noBackgroudImg
}): JSX.Element => {

   const { src, width, height, blurDataURL } = image;
   const styles = {
      backgroundImage: !noBackgroudImg ? `url(${blurDataURL})` : '',
      aspectRatio: ` ${width} / ${height}`,
   };

   return (
      <img
         src={isDevelopmentEnv ? src : mainSrc}
         alt={alt}
         style={styles}
         className={classNames}
      />
   )
};

export default PlaceholderImage;