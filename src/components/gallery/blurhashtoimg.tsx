// import { useEffect, useState } from 'react';
// import { decode } from 'blurhash';

// const BlurhashToImage = ({ blurhash, width, height }: {blurhash: string, width: number, height: number}) => {
//   const [imageSrc, setImageSrc] = useState('');

//   useEffect(() => {
//     if (blurhash) {
//       // Create an offscreen canvas
//       const canvas = document.createElement('canvas');
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext('2d');

//       if (ctx) {
//         // Decode the blurhash and draw it on the canvas
//         const pixels = decode(blurhash, width, height);
//         const imageData = ctx.createImageData(width, height);
//         imageData.data.set(Uint8ClampedArray.from(pixels));
//         ctx.putImageData(imageData, 0, 0);

//         // Convert the canvas to a data URL
//         const dataURL = canvas.toDataURL('image/png');
//         setImageSrc(dataURL);
//       } else {
//         console.error('Failed to get 2D context from canvas');
//       }
//     }
//   }, [blurhash, width, height]);

//   return (
//     <>
//       {imageSrc && <img src={imageSrc} alt="Blurhash" />}
//     </>
//   );
// };

// export default BlurhashToImage;





import { useEffect, useState } from 'react';
import type { Message, WorkerMessage } from '@/workers/blurhash.worker';

// // Define the interface for the message sent to the worker
// interface Message {
//    type: 'decode';
//    blurhash: string;
//    width: number;
//    height: number;
// }

// // Define the interface for the message sent from the worker
// interface WorkerMessage {
//    type: 'result';
//    pixels: Uint8ClampedArray;
// }

const BlurhashToImage = ({ blurhash, width, height }: { blurhash: string, width: number, height: number }) => {
   const [imageSrc, setImageSrc] = useState('');
   console.log('imageSrc: ', imageSrc);
   

   useEffect(() => {
      if (blurhash) {
         // Create a new Web Worker
         // const worker = new Worker(new URL('../../workers/blurhash.worker.ts', import.meta.url), { type: 'module' });
         const worker = new Worker(new URL('../../workers/blurhash.worker.ts', import.meta.url), { type: 'module' });

         // Send a message to the worker to decode the blurhash
         worker.postMessage({ type: 'decode', blurhash, width, height } as Message);

         // Listen for the result from the worker
         worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
            if (event.data.type === 'result') {
               const canvas = document.createElement('canvas');
               canvas.width = width;
               canvas.height = height;
               const ctx = canvas.getContext('2d');

               if (ctx) {
                  const imageData = ctx.createImageData(width, height);
                  imageData.data.set(event.data.pixels);
                  ctx.putImageData(imageData, 0, 0);

                  // Convert the canvas to a data URL
                  const dataURL = canvas.toDataURL('image/png');
                  setImageSrc(dataURL);
               } else {
                  console.error('Failed to get 2D context from canvas');
               }

               // Clean up the worker
               worker.terminate();
            } else {
               console.error('Unexpected message type from worker:', event.data.type);
            }
         };

         // Listen for errors from the worker
         worker.onerror = (error: ErrorEvent) => {
            console.error('Worker error:', error.message);
            worker.terminate();
         };
      }
   }, [blurhash, width, height]);

   return (
      <>
         {imageSrc && <img src={imageSrc} alt="Blurhash" />}
      </>
   );
};

export default BlurhashToImage;
