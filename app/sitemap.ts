import type { MetadataRoute } from 'next';

const publicPaths = [
  '/', '/how-it-works', '/examples', '/pricing', '/enterprise', '/security', '/support', '/status', '/case-studies',
  '/create-free-storyboard', '/sample-package', '/flagship-scene', '/ai-storyboard-generator', '/script-to-storyboard-generator',
  '/ai-animatic-generator', '/storyboard-generator-for-youtube-shorts', '/storyboard-generator-for-filmmakers',
  '/commercial-storyboard-generator', '/bible-film-storyboard-generator', '/film-school-storyboard-tool', '/music-video-storyboard-generator',
  '/marketplace', '/api-platform', '/integrations', '/customers'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.cineloom.ai';
  const now = new Date();
  return publicPaths.map((path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: path === '/' ? 'daily' : 'weekly', priority: path === '/' ? 1 : 0.8 }));
}
