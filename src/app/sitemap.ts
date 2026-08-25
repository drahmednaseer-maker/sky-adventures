import type { MetadataRoute } from 'next';
import { SITE_URL, categories, destinations, products } from '@/lib/site';
import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-08-25');
  const statics = [
    ['', 1.0], ['/tour', 0.9], ['/about-us', 0.7], ['/contact', 0.8], ['/faq', 0.6],
    ['/blog', 0.6], ['/shop', 0.7], ['/tour-list', 0.5], ['/tour-list-grid-view', 0.4],
    ['/tour-list-left-sidebar', 0.4], ['/tour-list-right-sidebar', 0.4],
    ['/privacy-policy-2', 0.3], ['/refund_returns-2', 0.3],
    ['/category/k2-base-camp-trek', 0.5],
  ] as const;

  return [
    ...statics.map(([p, pr]) => ({
      url: `${SITE_URL}${p}`, lastModified: now,
      changeFrequency: 'weekly' as const, priority: pr,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`, lastModified: now,
      changeFrequency: 'monthly' as const, priority: 0.85,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/product-category/${c.slug}`, lastModified: now,
      changeFrequency: 'weekly' as const, priority: 0.75,
    })),
    ...destinations.map((d) => ({
      url: `${SITE_URL}/tour_destination/${d.slug}`, lastModified: now,
      changeFrequency: 'monthly' as const, priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const, priority: 0.5,
    })),
  ];
}
