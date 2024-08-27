import { decode } from 'blurhash';

interface Message {
   type: 'decode';
   blurhash: string;
   width: number;
   height: number;
}

interface WorkerMessage {
   type: 'result';
   pixels: Uint8ClampedArray;
}

self.onmessage = async (event: MessageEvent<Message>) => {
   const { blurhash, width, height } = event.data;
   console.log('worker file is working fine!!');


   try {
      const pixels = await decode(blurhash, width, height);
      self.postMessage({ type: 'result', pixels });
   } catch (error) {
      self.postMessage({ type: 'error', error: error instanceof Error ? error.message : String(error) });
   }
};

export type { Message, WorkerMessage };