import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Blocks from '@/components/Blocks';
import Gallery from '@/components/Gallery';
import Itinerary from '@/components/Itinerary';
import TourCard from '@/components/TourCard';
import PageHero from '@/components/PageHero';
import { Arrow, Check, Clock, Mail, Peak, Phone, Pin, Shield, Star, Users, Whats } from '@/components/Icons';
import {
  CAT_LABEL, SITE_URL, bannerFor, bySlug, days, destinations, products, rating, related, reviewCount, site, slimAll,
} from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  const desc = p.excerpt || `${p.title} — ${p.duration ?? ''} guided ${CAT_LABEL[p.cat].toLowerCase()} in Pakistan with Sky Adventures.`;
  return {
    title: p.title,
    description: desc.slice(0, 158),
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title: p.title, description: desc.slice(0, 158),
      url: `${SITE_URL}/product/${p.slug}`, type: 'article',
      images: p.gallery[0] ? [{ url: p.gallery[0].src }] : undefined,
    },
  };
}

const INCLUDED = [
  'All ground transport in Pakistan as per itinerary',
  'Experienced native English-speaking guide',
  'Hotel accommodation on the road sections',
  'Full camping equipment and kitchen crew on trek',
  'All meals during the trekking / climbing period',
  'Porters for group and personal equipment (within weight limit)',
  'Trekking / climbing permits and national park fees',
  'Government liaison officer where required',
];
const EXCLUDED = [
  'International flights to and from Pakistan',
  'Pakistan visa fee',
  'Personal travel and high-altitude rescue insurance',
  'Personal climbing and trekking equipment',
  'Tips for guides, cooks and porters',
  'Any expenses of a personal nature',
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const rel = slimAll(related(p, 4));
  // lead the gallery with the sharpest shot — the source site often listed a thumbnail first
  const gallery = p.card ? [p.card, ...p.gallery.filter((g) => g.src !== p.card!.src)] : p.gallery;
  const d = days(p);
  const dests = destinations.filter((x) => p.destinations.includes(x.slug));
  const stats = Object.entries(p.stats);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.excerpt,
    image: gallery.map((g) => `${SITE_URL}${g.src}`),
    brand: { '@type': 'Brand', name: site.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating(p).toFixed(1),
      reviewCount: reviewCount(p),
      bestRating: 5,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: p.price ? p.price.replace(/[^0-9.]/g, '') : '0',
      url: `${SITE_URL}/product/${p.slug}`,
    },
  };

  return (
    <>
      <PageHero
        title={p.title}
        sub={p.excerpt}
        img={bannerFor(p)}
        crumbs={[
          { label: CAT_LABEL[p.cat], href: `/product-category/${p.cat}` },
          { label: p.title },
        ]}
      />

      {/* quick facts strip */}
      <div className="facts">
        <div className="wrap facts-in">
          {p.duration && <div><Clock /><span><b>{p.duration}</b>Duration</span></div>}
          <div><Peak /><span><b>{p.difficulty}</b>Grade</span></div>
          <div><Users /><span><b>{p.stats['Group Size'] ?? '4–12'}</b>Group size</span></div>
          <div><Star /><span><b>{rating(p).toFixed(1)}/5</b>{reviewCount(p)} reviews</span></div>
          {p.stats['Max Altitude'] && <div><Pin /><span><b>{p.stats['Max Altitude']}</b>Max altitude</span></div>}
        </div>
      </div>

      <div className="section">
        <div className="wrap pdp">
          <div className="pdp-main">
            {p.gallery.length > 1 && <Gallery images={gallery} title={p.title} />}

            {stats.length > 0 && (
              <section className="statgrid" aria-label="Trip facts">
                {stats.map(([k, v]) => (
                  <div key={k}><span>{k}</span><b>{v}</b></div>
                ))}
              </section>
            )}

            <section className="prose prose-full pdp-sec" id="overview">
              <h2>Overview</h2>
              <Blocks blocks={p.desc} />
            </section>

            {p.itinerary.length > 0 && (
              <section className="pdp-sec" id="itinerary">
                <h2 className="pdp-h">Tour Plan</h2>
                <p className="muted" style={{ marginBottom: 18 }}>
                  Day-by-day outline for the {p.title.toLowerCase()}. Routes can be shortened, extended or
                  privately dated on request.
                </p>
                <Itinerary days={p.itinerary} />
              </section>
            )}

            <section className="pdp-sec" id="included">
              <h2 className="pdp-h">What’s included</h2>
              <div className="inex">
                <div>
                  <h3><Check /> Included</h3>
                  <ul>{INCLUDED.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="inex-x">
                  <h3>Not included</h3>
                  <ul>{EXCLUDED.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
              <p className="fineprint">
                Inclusions are the standard for our {CAT_LABEL[p.cat].toLowerCase()} programmes and are confirmed
                in writing on your final itinerary before any payment is taken.
              </p>
            </section>
          </div>

          {/* ---------- sticky booking rail ---------- */}
          <aside className="pdp-rail">
            <div className="bookcard">
              <div className="bookcard-top">
                {p.price ? (
                  <><span className="price">{p.price}</span><small>per person</small></>
                ) : (
                  <><span className="price-ask" style={{ fontSize: 17 }}>Price on request</span>
                    <small>tailored to group size &amp; dates</small></>
                )}
              </div>
              <ul className="bookcard-meta">
                {p.duration && <li><Clock /> <span>Duration</span> <b>{p.duration}</b></li>}
                <li><Peak /> <span>Grade</span> <b>{p.difficulty}</b></li>
                <li><Users /> <span>Group</span> <b>{p.stats['Group Size'] ?? '4–12 people'}</b></li>
                {d && <li><Pin /> <span>Itinerary</span> <b>{p.itinerary.length} stages</b></li>}
              </ul>
              <div className="bookcard-btns">
                <Link href={`/contact?trip=${p.slug}`} className="btn btn-primary btn-block">
                  Enquire about this trip <Arrow />
                </Link>
                <a className="btn btn-ghost btn-block"
                  href={`https://wa.me/${site.phone_href.replace('+', '')}?text=${encodeURIComponent(`Hi Sky Adventures, I'd like details on the ${p.title}.`)}`}
                  target="_blank" rel="noopener noreferrer">
                  <Whats /> WhatsApp us
                </a>
              </div>
              <div className="bookcard-foot">
                <a href={`tel:${site.phone_href}`}><Phone /> {site.phone}</a>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(p.title)}`}><Mail /> Email us</a>
              </div>
              <p className="bookcard-trust"><Shield /> No deposit taken until your itinerary is confirmed.</p>
            </div>

            {dests.length > 0 && (
              <div className="railbox">
                <h3>Region</h3>
                <div className="pillbar">
                  {dests.map((x) => (
                    <Link key={x.slug} href={`/tour_destination/${x.slug}`} className="pill">{x.name}</Link>
                  ))}
                </div>
              </div>
            )}

            <div className="railbox">
              <h3>Category</h3>
              <div className="pillbar">
                <Link href={`/product-category/${p.cat}`} className="pill">{CAT_LABEL[p.cat]}</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {rel.length > 0 && (
        <section className="section bg-alt">
          <div className="wrap">
            <div className="sec-head-row">
              <div>
                <span className="eyebrow">You may like</span>
                <h2 className="h-sec">Similar adventures</h2>
              </div>
              <Link href="/tour" className="btn btn-ghost">All trips <Arrow /></Link>
            </div>
            <div className="grid g-3">{rel.map((x) => <TourCard key={x.slug} p={x} />)}</div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
