import { decode } from 'blurhash';

interface Message {
   type: 'decode';
   blurhash: string;
   width: number;
   height: number;
   punch: number;
}

interface WorkerMessage {
   type: 'result';
   pixels: Uint8ClampedArray;
}

self.onmessage = (event: MessageEvent<Message>) => {
   const { blurhash, width, height, punch } = event.data;
   console.log('worker file is working fine!!');


   try {
      const pixels = decode(blurhash, width, height, punch);
      self.postMessage({ type: 'result', pixels });
   } catch (error) {
      self.postMessage({ type: 'error', error: error instanceof Error ? error.message : String(error) });
   }
};

export type { Message, WorkerMessage };