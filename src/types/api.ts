
import type { ImageType } from "@/data/images";

type BaseApiResponse = {
   success: boolean,
   images: ImageType[],
};

type PostApiResponse = BaseApiResponse;

type GetApiResponse = BaseApiResponse & {
   allImagesLoaded?: boolean;
};

export type {
   PostApiResponse,
   GetApiResponse,
};