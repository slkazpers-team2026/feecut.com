import type { MetadataRoute } from 'next';

interface StaticRoute {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}

const STATIC_ROUTES: ReadonlyArray<StaticRoute> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms-of-service', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://feecut.com';

  const now = new Date();

  return STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
