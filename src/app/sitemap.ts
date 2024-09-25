import type { MetadataRoute } from 'next';
import { ENV_BASE_URL } from '@/data/envimports';
import { FALLBACK_BASE_URL } from '@/data/envfallback';

const BASE_URL = ENV_BASE_URL || FALLBACK_BASE_URL;

const urls: { url: string; priority: number }[] = [
   { url: BASE_URL, priority: 1 },
   { url: `${BASE_URL}/about-me`, priority: 0.8 },
   { url: `${BASE_URL}/gallery`, priority: 0.6 },
];

const sitemap = (): MetadataRoute.Sitemap => {
   return [
      ...urls.map(url => ({
         url: url.url,
         lastModified: new Date(),
         changeFrequency: 'yearly' as MetadataRoute.Sitemap[number]['changeFrequency'],
         priority: url.priority,
      })),

      // {
      //    url: 'https://example.com',
      //    lastModified: '2021-01-01',
      //    changeFrequency: 'weekly',
      //    priority: 0.5,
      //    // @ts-ignore
      //    images: ['https://example.com/image.jpg'],
      // },
   ];
};

export default sitemap;
