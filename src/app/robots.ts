import type { MetadataRoute } from 'next';
import siteData from '@/content/site.json';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteData.url}/sitemap.xml`,
  };
}
