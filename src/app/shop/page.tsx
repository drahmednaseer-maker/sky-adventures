import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionNav from '@/components/SectionNav';
import TourCard from '@/components/TourCard';
import { Arrow, Peak, Shield, Thermo } from '@/components/Icons';
import { byCat, catalogue as c, products, site, slimAll } from '@/lib/site';
import type { Product } from '@/lib/types';

export const metadata = {
  title: 'Shop',
  description:
    'Browse Sky Adventures trips by shelf — the eight-thousanders, classic Karakoram treks, trips of two weeks or less, and blossom-season tours. Every departure is quoted for your group.',
  alternates: { canonical: '/shop' },
};

const metres = (p: Product) => {
  const m = p.facts.altitude?.match(/([\d,]+)/);
  return m ? parseInt(m[1].replace(/,/g, ''), 10) : 0;
};
const days = (p: Product) => {
  const m = p.duration?.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
};

const STEPS = [
  { n: '01', t: 'Pick a trip — or a shelf', d: 'Nothing here is a fixed departure. Every route can run on your dates, inside its season window.' },
  { n: '02', t: 'Ask for the price', d: 'We quote one all-in figure for your actual group size, dates and hotel standard — not a headline that grows later.' },
  { n: '03', t: 'Confirm, then deposit', d: 'You get the itinerary in writing first. No money is taken until you have agreed it.' },
];

export default function Shop() {
  const eightK = slimAll(
    products.filter((p) => metres(p) >= 8000).sort((a, b) => metres(b) - metres(a)),
  );
  const classics = slimAll(
    byCat('trekking').filter((p) => (days(p) ?? 0) >= 15).sort((a, b) => (days(b) ?? 0) - (days(a) ?? 0)),
  );
  const short = slimAll(
    products.filter((p) => (days(p) ?? 99) <= 14).sort((a, b) => (days(a) ?? 0) - (days(b) ?? 0)),
  );
  const tours = slimAll(byCat('tour'));

  const SHELVES = [
    {
      id: 'eight-thousanders',
      label: 'Eight-thousanders',
      title: 'The eight-thousanders',
      blurb: `Full-service expeditions on ${eightK.length} of the world’s fourteen 8,000m peaks — K2, both Gasherbrums, Broad Peak and Nanga Parbat — with our own high-altitude staff.`,
      items: eightK,
      href: '/product-category/expedition',
      cta: `All ${c.expedition} expeditions`,
    },
    {
      id: 'classic-treks',
      label: 'Classic treks',
      title: 'Classic Karakoram treks',
      blurb: 'The big walks — Concordia and K2 Base Camp, the Gondogoro La crossing, Snow Lake and the long valley routes. Fifteen days and up.',
      items: classics,
      href: '/product-category/trekking',
      cta: `All ${c.trekking} treks`,
    },
    {
      id: 'short-trips',
      label: 'Two weeks or less',
      title: 'Two weeks or less',
      blurb: 'Real mountains on ordinary annual leave — base camp treks, a trekking peak and the cultural loops, all inside fourteen days.',
      items: short,
      href: '/tour?days=1-7,8-14',
      cta: 'Filter the catalogue',
    },
    {
      id: 'blossom-tours',
      label: 'Blossom & culture',
      title: 'Blossom season & cultural tours',
      blurb: 'Apricot blossom in Hunza and Skardu in early April; Lahore, the Indus valley and the south through the winter.',
      items: tours,
      href: '/product-category/tour',
      cta: `All ${c.tour} tours`,
    },
  ];

  return (
    <>
      <PageHero
        title="The trip shop"
        sub={`All ${c.trips} departures, arranged by shelf rather than by filter. Every trip is quoted for your group and your dates — booking starts with an enquiry, not a card payment.`}
        img={site.hero_img2}
        crumbs={[{ label: 'Shop' }]}
      />

      <SectionNav items={SHELVES.map((s) => ({ id: s.id, label: s.label }))} />

      {SHELVES.map((s, i) => (
        <section key={s.id} id={s.id} className={`section-tight shelf${i % 2 ? ' bg-alt' : ''}`}>
          <div className="wrap">
            <div className="shelf-hd">
              <div>
                <h2>{s.title}</h2>
                <p>{s.blurb}</p>
              </div>
              <Link href={s.href} className="btn btn-ghost">{s.cta} <Arrow /></Link>
            </div>
            <div className="shelf-row" role="list" aria-label={s.title}>
              {s.items.map((p, n) => (
                <div role="listitem" key={p.slug} className="shelf-item">
                  <TourCard p={p} priority={i === 0 && n < 3} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* how buying works */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">How buying works</span>
            <h2 className="h-sec">No cart, no checkout — a conversation</h2>
            <p className="sub-sec mx-auto">
              Group size, dates and hotel standard change the honest price, so we quote each departure
              individually instead of selling a fixed product.
            </p>
          </div>
          <ol className="steps steps-plain">
            {STEPS.map(({ n, t, d }) => (
              <li key={n}>
                <span className="step-n" aria-hidden="true">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <div className="shop-notes">
            <p><Shield /> No deposit until your itinerary is confirmed in writing.</p>
            <p><Thermo /> Karakoram season runs June – September; book expeditions 4–6 months ahead.</p>
            <p><Peak /> Private and custom departures available on every route.</p>
          </div>
          <div className="row" style={{ justifyContent: 'center', marginTop: 28 }}>
            <Link href="/contact" className="btn btn-primary">Start an enquiry <Arrow /></Link>
            <Link href="/tour" className="btn btn-ghost">Browse with filters instead</Link>
          </div>
        </div>
      </section>
    </>
  );
}
