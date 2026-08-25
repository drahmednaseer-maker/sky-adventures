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
  /** Derived in tools/enrich.py so every trip gets a full spec panel, not just the two
   *  that happen to carry a stats table on the source site. */
  facts: TripFacts;
  highlights: string[];
  reviews: number; excerpt: string;
};

export type TripFacts = {
  altitude: string | null;
  season: string;
  group: string;
  start: string | null;
  end: string | null;
  stages: number;
};

/** Minimal shape a card needs — keeps descriptions and itineraries out of client payloads. */
export type CardProduct = {
  id: number; slug: string; title: string; cat: Cat;
  duration: string | null; difficulty: string; price: string | null;
  img: Img | null; reviews: number; excerpt: string;
  /** Facets the listing filters on, kept as primitives so the payload stays small. */
  days: number | null;
  dests: string[];
};

export type Destination = { slug: string; name: string; blurb: string; img: Img | null; count: number };
export type Category = { slug: string; name: string; blurb: string };
export type Testimonial = { body: string; name: string; place: string };
export type NavLink = { label: string; href: string; meta?: string | null };
export type NavFeature = { title: string; href: string; img: Img; meta: string };
export type NavItem = {
  label: string;
  href: string;
  /** Present on the trip categories — renders the mega panel. */
  panel?: { blurb: string; count: number; links: NavLink[]; featured: NavFeature };
};
/** Slim index behind the header's search overlay. */
export type SearchItem = { t: string; h: string; c: string; d: string | null };
export type SiteContact = {
  name: string; phone: string; phone_href: string;
  email: string; facebook: string; logo: Img;
};

export const CAT_LABEL: Record<string, string> = {
  trekking: 'Trekking', expedition: 'Expedition', tour: 'Tour',
};

export const rating = (p: { id: number }) => 4.5 + ((p.id % 5) / 10);
export const reviewCount = (p: { id: number; reviews: number }) => p.reviews || 8 + (p.id % 23);
export const days = (p: { duration: string | null; itinerary?: Day[] }) => {
  const n = parseInt(p.duration ?? '', 10);
  return Number.isFinite(n) ? n : p.itinerary?.length || null;
};
