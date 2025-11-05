import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://agentic-a5f63681.vercel.app';
  return [
    { url: base, lastModified: new Date(), priority: 1 },
  ];
}
