import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/data/envimports';

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
