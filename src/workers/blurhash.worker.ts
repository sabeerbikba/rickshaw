// import { decode } from 'blurhash';

// interface Message {
//    type: 'decode';
//    blurhash: string;
//    width: number;
//    height: number;
// }

// interface WorkerMessage {
//    type: 'result';
//    pixels: Uint8ClampedArray;
// }

//    console.log('worker file is working fine!!1');
// self.onmessage = async (event: MessageEvent<Message>) => {
//    const { blurhash, width, height } = event.data;
//    console.log('worker file is working fine!!2');


//    try {
//       const pixels = await decode(blurhash, width, height);
//       self.postMessage({ type: 'result', pixels });
//    } catch (error) {
//       self.postMessage({ type: 'error', error: error instanceof Error ? error.message : String(error) });
//    }
// };


// THIS CODE NOT USING FOR NOW // //
// // // LAST USING CODE // //
// // // LAST USING CODE // //
// import { decode } from 'blurhash';

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

// console.log('worker file is working fine!!1');
// self.onmessage = async (event: MessageEvent<Message>) => {
//    const { blurhash, width, height } = event.data;
//    console.log('worker file is working fine!!2');

//    try {
//       const pixels = await decode(blurhash, width, height);
//       self.postMessage({ type: 'result', pixels });
//    } catch (error) {
//       self.postMessage({ type: 'error', error: error instanceof Error ? error.message : String(error) });
//    }
// };


// export type { Message, WorkerMessage };
// // // LAST USING CODE // //
// // // LAST USING CODE // //