import raw from './data.json';
import type {
  CardProduct, Category, Destination, Img, NavItem, Product, SiteContact, Testimonial,
} from './types';

export * from './types';

const data = raw as unknown as {
  site: Record<string, string> & {
    logo: Img; hero_img: Img; hero_img2: Img; k2_img: Img;
    gear_img: Img; cta_img: Img; page_img: Img;
  };
  products: Product[];
  destinations: Destination[];
  categories: Category[];
  testimonials: Testimonial[];
};

export const site = data.site;
export const products = data.products;
export const destinations = data.destinations;
export const categories = data.categories;
export const testimonials = data.testimonials;

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const byCat = (cat: string) => products.filter((p) => p.cat === cat);
export const byDest = (d: string) => products.filter((p) => p.destinations.includes(d));

export const slim = (p: Product): CardProduct => ({
  id: p.id, slug: p.slug, title: p.title, cat: p.cat,
  duration: p.duration, difficulty: p.difficulty, price: p.price,
  img: p.card ?? p.gallery[0] ?? null, reviews: p.reviews, excerpt: p.excerpt,
});
export const slimAll = (list: Product[]) => list.map(slim);

/** Slug + title only — for the enquiry form's trip picker. */
export const tripOptions = products.map((p) => ({ slug: p.slug, title: p.title }));

export const related = (p: Product, n = 4) =>
  products
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => {
      const sa = (a.cat === p.cat ? 2 : 0) + (a.destinations.some((d) => p.destinations.includes(d)) ? 1 : 0);
      const sb = (b.cat === p.cat ? 2 : 0) + (b.destinations.some((d) => p.destinations.includes(d)) ? 1 : 0);
      return sb - sa || a.id - b.id;
    })
    .slice(0, n);

/** House photography, 2000-2560px wide, for full-bleed banners. */
const BANNERS: Img[] = [site.hero_img2, site.cta_img, site.page_img, site.hero_img];

/**
 * Page banners run edge-to-edge, so they need ~1600px+ to stay sharp on a wide display.
 * Several trips only have ~1000px photos on the source site — for those, use a house
 * banner here and let the trip's own photos carry the gallery, where they are shown at
 * roughly their native size.
 */
export const bannerFor = (p: { id: number; card: Img | null; gallery: Img[] }): Img => {
  const own = p.card ?? p.gallery[0] ?? null;
  if (own && own.w >= 1600) return own;
  return BANNERS[p.id % BANNERS.length];
};

export const SITE_URL = 'https://sky-adventures.vercel.app';

/** Primary nav mirrors the original site's menu exactly. */
export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Treks', href: '/product-category/trekking',
    children: byCat('trekking').map((p) => ({ label: p.title, href: `/product/${p.slug}` })) },
  { label: 'Expedition', href: '/product-category/expedition',
    children: byCat('expedition').map((p) => ({ label: p.title, href: `/product/${p.slug}` })) },
  { label: 'Tours', href: '/product-category/tour',
    children: byCat('tour').map((p) => ({ label: p.title, href: `/product/${p.slug}` })) },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact us', href: '/contact' },
];

export const contact: SiteContact = {
  name: site.name, phone: site.phone, phone_href: site.phone_href,
  email: site.email, logo: site.logo,
};
