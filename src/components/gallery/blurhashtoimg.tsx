import { useEffect, useState } from 'react';
import { decode } from 'blurhash';

const BlurhashToImage = ({ blurhash, width, height }: {blurhash: string, width: number, height: number}) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (blurhash) {
      // Create an offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Decode the blurhash and draw it on the canvas
        const pixels = decode(blurhash, width, height);
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(Uint8ClampedArray.from(pixels));
        ctx.putImageData(imageData, 0, 0);

        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');
        setImageSrc(dataURL);
      } else {
        console.error('Failed to get 2D context from canvas');
      }
    }
  }, [blurhash, width, height]);

  return (
    <>
      {imageSrc && <img src={imageSrc} alt="Blurhash" />}
    </>
  );
};

export default BlurhashToImage;


