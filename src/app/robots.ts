import type { MetadataRoute } from 'next'
import { ENV_BASE_URL } from '@/data/envimports';
import { FALLBACK_BASE_URL } from '@/data/envfallback';

const BASE_URL = ENV_BASE_URL || FALLBACK_BASE_URL;

const robots = (): MetadataRoute.Robots => {
   return {
      rules: {
         userAgent: '*',
         allow: '/',
      },
      sitemap: `${BASE_URL}/sitemap.xml`,
   }
}

export default robots;
