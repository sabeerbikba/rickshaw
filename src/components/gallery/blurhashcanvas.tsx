// import * as React from 'react';
// import { decode } from 'blurhash';

// export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
//    hash: string;
//    height: number;
//    punch: number;
//    width: number;
//    style?: object;
// };

// function decodeBlurhashWithWorker(
//    blurhash: string,
//    width: number,
//    height: number,
//    punch: number): Promise<Uint8ClampedArray> {
//    return new Promise((resolve, reject) => {
//       const worker = new Worker(new URL('../../workers/blurhash.worker.ts', import.meta.url), { type: 'module' });

//       worker.onmessage = (event) => {
//          const { type, pixels } = event.data;
//          if (type === 'result') {
//             // Resolve the promise with the decoded pixels
//             resolve(pixels);
//             worker.terminate();
//          } else if (type === 'error') {
//             reject(new Error(event.data.error));
//             worker.terminate();
//          }
//       };

//       worker.onerror = (error) => {
//          reject(error);
//          worker.terminate();
//       };

//       // Post the message to the worker with the required data
//       worker.postMessage({ type: 'decode', blurhash, width, height, punch });
//    });
// }


// export default class BlurhashCanvas extends React.PureComponent<Props> {
//    static defaultProps = {
//       height: 128,
//       width: 128,
//    };


//    canvas: HTMLCanvasElement = null;

//    componentDidUpdate() {
//       this.draw();
//    }

//    handleRef = (canvas: HTMLCanvasElement) => {
//       this.canvas = canvas;
//       this.draw();
//    };

//    draw = () => {
//       const { hash, height, punch, width } = this.props;

//       if (this.canvas) {
//          console.log('decode timing');
//          console.time('decode');
//          const pixels = decode(hash, width, height, punch);
//         console.timeEnd('decode');
//          console.log('pixels: ', pixels)

//          const ctx = this.canvas.getContext('2d');
//          const imageData = ctx.createImageData(width, height);
//          imageData.data.set(pixels);
//          ctx.putImageData(imageData, 0, 0);
//       }
//    };

//    render() {
//       const { hash, height, width, style } = this.props;

//       return <canvas height={height} width={width} ref={this.handleRef} style={style} />;
//    }
// }


// // THIS CODE IS NOT USING FOR NOW // //
// // THIS CODE IS NOT USING FOR NOW // //

// import React, { useEffect, useRef } from 'react';
// import { decode } from 'blurhash';

// export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
//    hash: string;
//    height: number;
//    punch: number;
//    width: number;
//    style?: React.CSSProperties;
// };

// function decodeBlurhashWithWorker(
//    blurhash: string,
//    width: number,
//    height: number,
//    punch: number): Promise<Uint8ClampedArray> {
//    return new Promise((resolve, reject) => {
//       const worker = new Worker(new URL('../../workers/blurhash.worker.ts', import.meta.url), { type: 'module' });

//       worker.onmessage = (event) => {
//          const { type, pixels } = event.data;
//          if (type === 'result') {
//             // Resolve the promise with the decoded pixels
//             resolve(pixels);
//             worker.terminate();
//          } else if (type === 'error') {
//             reject(new Error(event.data.error));
//             worker.terminate();
//          }
//       };

//       worker.onerror = (error) => {
//          reject(error);
//          worker.terminate();
//       };

//       // Post the message to the worker with the required data
//       worker.postMessage({ type: 'decode', blurhash, width, height, punch });
//    });
// }



// const BlurhashCanvas: React.FC<Props> = async ({
//    hash,
//    height = 128,
//    punch,
//    width = 128,
//    style,
//    ...props
// }) => {
//    const canvasRef = useRef<HTMLCanvasElement | null>(null);

//    const draw = async () => {
//       if (canvasRef.current) {
//          console.log('decode timing');
//          console.time('decode');
//          // const pixels = decode(hash, width, height, punch);
//          const pixels = await decodeBlurhashWithWorker('your-blurhash-string', 350, 622, 1)
//             .then(pixels => {
//                // Handle the decoded pixels
//                // console.log(pixels);
//                return pixels;
//             })
//             .catch(error => {
//                console.error('Error decoding blurhash:', error);
//             });

//          console.timeEnd('decode');
//          console.log('pixels: ', pixels);

//          const ctx = canvasRef.current.getContext('2d');
//          if (ctx) {
//             const imageData = ctx.createImageData(width, height);
//             imageData.data.set(pixels);
//             ctx.putImageData(imageData, 0, 0);
//          }
//       }
//    };

//    useEffect(() => {
//       draw();
//    }, [hash, height, punch, width]);

//    return (
//       <canvas
//          ref={canvasRef}
//          height={height}
//          width={width}
//          style={style}
//          {...props}
//       />
//    );
// };

// export default BlurhashCanvas;

// // THIS CODE IS NOT USING FOR NOW // //
// // THIS CODE IS NOT USING FOR NOW // //
