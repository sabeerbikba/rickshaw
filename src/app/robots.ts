import type { MetadataRoute } from 'next'
import { FALLBACK_BASE_URL } from '@/data/envfallback';

const baseUrl = process.env.BASE_URL as string || FALLBACK_BASE_URL;

export default function robots(): MetadataRoute.Robots {
   // TODO:
   return {
      rules: {
         userAgent: '*',
         allow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
   }
}