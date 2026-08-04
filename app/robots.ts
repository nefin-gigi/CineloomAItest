import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.cineloom.ai';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/dashboard/', '/api/']
    },
    sitemap: `${base}/sitemap.xml`
  };
}
