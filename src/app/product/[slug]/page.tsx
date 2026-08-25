import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Blocks from '@/components/Blocks';
import Faq from '@/components/Faq';
import Itinerary from '@/components/Itinerary';
import SectionNav from '@/components/SectionNav';
import TourCard from '@/components/TourCard';
import TripGallery from '@/components/TripGallery';
import {
  Arrow, Check, Clock, Compass, Leaf, Mail, Peak, Phone, Pin, Route, Shield, Star, Thermo, Users, Whats,
} from '@/components/Icons';
import {
  CAT_LABEL, SITE_URL, bannerFor, bySlug, destinations, products, rating, related, reviewCount, site, slimAll,
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
      images: p.card ? [{ url: p.card.src }] : undefined,
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

const STEPS = [
  'Send us your dates, group size and fitness.',
  'We come back with a costed, day-by-day itinerary.',
  'You confirm; only then do we take a deposit.',
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const rel = slimAll(related(p, 4));
  const gallery = p.card ? [p.card, ...p.gallery.filter((g) => g.src !== p.card!.src)] : p.gallery;
  const dests = destinations.filter((x) => p.destinations.includes(x.slug));
  const f = p.facts;
  const catLabel = CAT_LABEL[p.cat];

  const spec = [
    { icon: Clock, k: 'Duration', v: p.duration ?? `${f.stages} stages` },
    { icon: Peak, k: 'Grade', v: p.difficulty },
    ...(f.altitude ? [{ icon: Pin, k: 'Max altitude', v: f.altitude }] : []),
    { icon: Users, k: 'Group size', v: f.group },
    { icon: Thermo, k: 'Best season', v: f.season },
    { icon: Route, k: 'Start / end', v: f.start === f.end ? f.start ?? '—' : `${f.start} → ${f.end}` },
    { icon: Compass, k: 'Type', v: catLabel },
    ...(dests.length ? [{ icon: Leaf, k: 'Region', v: dests.map((d) => d.name).join(', ') }] : []),
  ];

  const faq = [
    {
      id: 'fitness',
      q: `How fit do I need to be for the ${p.title.toLowerCase()}?`,
      a: `This is graded ${p.difficulty.toLowerCase()}. ${
        p.cat === 'expedition'
          ? 'It is a full mountaineering objective — we ask about your climbing history and previous altitude experience before confirming a place.'
          : `You should be comfortable walking for several hours a day, on rough ground, across ${p.duration ?? 'the trip'}. Porters carry the main loads; you carry a light daypack.`
      } If you tell us your recent hill days we will give you an honest answer.`,
    },
    {
      id: 'season',
      q: 'When does this trip run?',
      a: `The reliable window is ${f.season}. Outside that, conditions on the route make it either unsafe or not worth the money. We can run private departures on any dates inside that window.`,
    },
    {
      id: 'group',
      q: 'What is the group size?',
      a: `${f.group}. Smaller and private groups are available and often cost less per head than you would expect — ask us for a quote on your own dates.`,
    },
    {
      id: 'price',
      q: 'Why is no price shown?',
      a: 'Because the honest number depends on group size, dates, hotel standard and how much of the route you cover. We quote one all-in figure for your actual group rather than a headline price that grows later.',
    },
  ];

  const sections = [
    { id: 'gallery', label: 'Photos' },
    { id: 'overview', label: 'Overview' },
    ...(p.itinerary.length ? [{ id: 'itinerary', label: 'Itinerary' }] : []),
    { id: 'included', label: "What's included" },
    { id: 'faq', label: 'FAQ' },
  ];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.excerpt,
    image: gallery.map((g) => `${SITE_URL}${g.src}`),
    brand: { '@type': 'Brand', name: site.name },
    aggregateRating: {
      '@type': 'AggregateRating', ratingValue: rating(p).toFixed(1),
      reviewCount: reviewCount(p), bestRating: 5,
    },
    offers: {
      '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD',
      price: p.price ? p.price.replace(/[^0-9.]/g, '') : '0',
      url: `${SITE_URL}/product/${p.slug}`,
    },
  };

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="phero tphero">
        <Image src={bannerFor(p).src} alt="" width={bannerFor(p).w} height={bannerFor(p).h}
          priority sizes="100vw" quality={82} placeholder="blur" blurDataURL={bannerFor(p).blur}
          className="phero-bg" />
        <div className="phero-veil" />
        <div className="wrap phero-in tphero-in">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span><i aria-hidden="true">/</i><Link href={`/product-category/${p.cat}`}>{catLabel}</Link></span>
            <span><i aria-hidden="true">/</i><b>{p.title}</b></span>
          </nav>

          <div className="tphero-tags">
            <span className="tphero-cat">{catLabel}</span>
            <span className="tphero-rate">
              <Star /> {rating(p).toFixed(1)} <i>({reviewCount(p)} reviews)</i>
            </span>
          </div>

          <h1>{p.title}</h1>
          <p>{p.excerpt}</p>

          <ul className="tphero-chips">
            {p.duration && <li><Clock /> {p.duration}</li>}
            <li><Peak /> {p.difficulty}</li>
            {f.altitude && <li><Pin /> {f.altitude}</li>}
            <li><Thermo /> {f.season}</li>
          </ul>
        </div>
      </section>

      <SectionNav items={sections} />

      <div className="section">
        <div className="wrap pdp">
          <div className="pdp-main">
            {/* photos */}
            <section id="gallery" className="pdp-sec pdp-sec-first">
              <TripGallery images={gallery} title={p.title} />
            </section>

            {/* at a glance */}
            <section className="pdp-sec">
              <h2 className="pdp-h">At a glance</h2>
              <div className="specgrid">
                {spec.map(({ icon: I, k, v }) => (
                  <div key={k}>
                    <span className="spec-i"><I /></span>
                    <span className="spec-t"><em>{k}</em><b>{v}</b></span>
                  </div>
                ))}
              </div>
              {Object.keys(p.stats).length > 0 && (
                <div className="tbl-wrap" style={{ marginTop: 18 }}>
                  <table className="tbl">
                    <caption className="sr-only">Trip statistics</caption>
                    <tbody>
                      {Object.entries(p.stats).map(([k, v]) => (
                        <tr key={k}><th>{k}</th><td>{v}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* highlights */}
            {p.highlights.length > 0 && (
              <section className="pdp-sec">
                <h2 className="pdp-h">Trip highlights</h2>
                <ul className="hilist">
                  {p.highlights.map((h) => (
                    <li key={h}><span><Check /></span>{h}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* overview */}
            <section id="overview" className="pdp-sec">
              <h2 className="pdp-h">Overview</h2>
              <div className="prose prose-full"><Blocks blocks={p.desc} /></div>
            </section>

            {/* itinerary */}
            {p.itinerary.length > 0 && (
              <section id="itinerary" className="pdp-sec">
                <h2 className="pdp-h">Itinerary</h2>
                <p className="pdp-lede">
                  {p.itinerary.length} stages{p.duration ? ` over ${p.duration.toLowerCase()}` : ''}
                  {f.start ? `, starting and finishing in ${f.start === f.end ? f.start : `${f.start} and ${f.end}`}` : ''}.
                  Routes can be shortened, extended or privately dated.
                </p>
                <Itinerary days={p.itinerary} />
              </section>
            )}

            {/* included */}
            <section id="included" className="pdp-sec">
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
                These are the standard inclusions for our {catLabel.toLowerCase()} programmes and are
                confirmed in writing on your final itinerary before any payment is taken.
              </p>
            </section>

            {/* faq */}
            <section id="faq" className="pdp-sec">
              <h2 className="pdp-h">Questions about this trip</h2>
              <Faq groups={[{ id: 'trip-faq', name: '', blurb: '', items: faq }]} />
            </section>
          </div>

          {/* ---------- booking rail ---------- */}
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
                <li><Users /> <span>Group</span> <b>{f.group}</b></li>
                <li><Thermo /> <span>Season</span> <b>{f.season}</b></li>
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
              <ol className="bookcard-steps">
                {STEPS.map((s, i) => <li key={s}><span>{i + 1}</span>{s}</li>)}
              </ol>
              <div className="bookcard-foot">
                <a href={`tel:${site.phone_href}`}><Phone /> {site.phone}</a>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(p.title)}`}><Mail /> Email us</a>
              </div>
              <p className="bookcard-trust"><Shield /> No deposit until your itinerary is confirmed in writing.</p>
            </div>

            {dests.length > 0 && (
              <div className="railbox">
                <h3>Region</h3>
                <div className="pillbar">
                  {dests.map((x) => (
                    <Link key={x.slug} href={`/tour_destination/${x.slug}`} className="pill">{x.name}</Link>
                  ))}
                  <Link href={`/product-category/${p.cat}`} className="pill">{catLabel}</Link>
                </div>
              </div>
            )}
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
