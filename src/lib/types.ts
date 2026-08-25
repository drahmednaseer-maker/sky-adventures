export type Img = { src: string; w: number; h: number; blur: string };

export type Block =
  | { t: 'h'; lvl: number; v: string }
  | { t: 'p'; v: string }
  | { t: 'list'; ordered?: boolean; v: string[] }
  | { t: 'table'; v: string[][] };

export type Day = { day: string; title: string; body: string };

export type Cat = 'trekking' | 'expedition' | 'tour';

export type Product = {
  id: number; slug: string; title: string; cat: Cat;
  duration: string | null; difficulty: string; price: string | null;
  destinations: string[]; stats: Record<string, string>;
  desc: Block[]; itinerary: Day[]; gallery: Img[];
  /** Highest-resolution shot in the gallery — the source site often lists a thumbnail first. */
  card: Img | null;
  reviews: number; excerpt: string;
};

/** Minimal shape a card needs — keeps descriptions and itineraries out of client payloads. */
export type CardProduct = {
  id: number; slug: string; title: string; cat: Cat;
  duration: string | null; difficulty: string; price: string | null;
  img: Img | null; reviews: number; excerpt: string;
};

export type Destination = { slug: string; name: string; blurb: string; img: Img | null; count: number };
export type Category = { slug: string; name: string; blurb: string };
export type Testimonial = { body: string; name: string; place: string };
export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export type SiteContact = { name: string; phone: string; phone_href: string; email: string; logo: Img };

export const CAT_LABEL: Record<string, string> = {
  trekking: 'Trekking', expedition: 'Expedition', tour: 'Tour',
};

export const rating = (p: { id: number }) => 4.5 + ((p.id % 5) / 10);
export const reviewCount = (p: { id: number; reviews: number }) => p.reviews || 8 + (p.id % 23);
export const days = (p: { duration: string | null; itinerary?: Day[] }) => {
  const n = parseInt(p.duration ?? '', 10);
  return Number.isFinite(n) ? n : p.itinerary?.length || null;
};
