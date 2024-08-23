import { FC } from 'react';

type ImageRenderPropTypes = {
   src: string;
   alt: string;
   boxShadowColor?: string;
}

const ImageRender: FC<ImageRenderPropTypes> = ({
   src,
   alt,
   boxShadowColor = 'green',
   ...props
}) => {
   return (
      <img
         src={src}
         alt={alt}
         style={{ boxShadow: `1px 1px 5px ${boxShadowColor}` }}
         loading="lazy"
         {...props}
      />
   )
}

