import type { MetadataRoute } from 'next';
import { FALLBACK_BASE_URL } from '@/data/envfallback';

const baseUrl = process.env.BASE_URL as string || FALLBACK_BASE_URL;

const urls: { url: string; priority: number }[] = [
   { url: baseUrl, priority: 1 },
   { url: `${baseUrl}/about-me`, priority: 0.8 },
   { url: `${baseUrl}/gallery`, priority: 0.6 },
];

const sitemap = (): MetadataRoute.Sitemap => {
   return [
      ...urls.map(url => ({
         url: url.url,
         lastModified: new Date(),
         changeFrequency: 'yearly' as MetadataRoute.Sitemap[number]['changeFrequency'],
         priority: url.priority,
      })),

      {
         url: 'https://example.com',
         lastModified: '2021-01-01',
         changeFrequency: 'weekly',
         priority: 0.5,
         // @ts-ignore
         // Report not working
         images: ['https://example.com/image.jpg'],
      },
   ];
};

export default sitemap;
