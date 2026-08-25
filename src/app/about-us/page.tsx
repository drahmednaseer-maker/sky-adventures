import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import TourCard from '@/components/TourCard';
import {
  Arrow, Camp, Check, Clock, Compass, Leaf, Mail, Peak, Phone, Pin, Route, Shield, Star, Thermo, Users,
} from '@/components/Icons';
import { byCat, catalogue as c, categories, destinations, site, slimAll, testimonials } from '@/lib/site';

export const metadata = {
  title: 'About Us',
  description:
    'Sky Adventures is a native Pakistani mountain operator based in Skardu, running treks, 8,000m expeditions and cultural tours across the Karakoram, Himalaya and Hindu Kush for over 15 years.',
  alternates: { canonical: '/about-us' },
};

const PRINCIPLES = [
  {
    icon: Peak, t: 'Native by definition',
    d: 'Our guides and high-altitude porters are from Baltistan and Hunza. They grew up in the valleys they walk you through, and they are on the mountain because it is their profession, not a season abroad.',
  },
  {
    icon: Shield, t: 'Safety before summit',
    d: 'Conservative acclimatisation, satellite communications on every high trip, supplementary oxygen on expeditions, and a written evacuation plan. Turning around is always an acceptable outcome.',
  },
  {
    icon: Check, t: 'Direct, not brokered',
    d: 'You deal with the company that runs your trip. No overseas agent adds a margin, and your trip is never subcontracted to an operator you have not spoken to.',
  },
  {
    icon: Leaf, t: 'Fair to the mountain',
    d: 'Enforced porter load limits, proper equipment for every member of the crew, carry-out waste on the glaciers, and local sourcing wherever the supply chain allows it.',
  },
];

const CREW = [
  { icon: Compass, t: 'Lead guide', d: 'Native, English-speaking, and personally familiar with the route. They make the weather and turnaround calls.' },
  { icon: Users, t: 'High-altitude porters', d: 'Balti and Hunza crew carrying group loads and fixing rope on climbing programmes, under enforced weight limits.' },
  { icon: Camp, t: 'Cook and kitchen crew', d: 'Fresh meals cooked on the trail. Vegetarian, vegan, halal and most allergy requirements planned into the supply.' },
  { icon: Shield, t: 'Liaison officer', d: 'Required by the government on permitted peaks. We handle the appointment and the paperwork that goes with it.' },
];

const SAFETY = [
  'Sleeping altitude gains of 300–500m per day above 3,000m, with a full rest day every third or fourth day.',
  'Daily monitoring by the guide, and a comprehensive medical kit on every high-altitude departure.',
  'Satellite communications carried on every trip that leaves mobile coverage.',
  'Supplementary oxygen carried on all climbing expeditions.',
  'Descent is the treatment for altitude illness, and that call is never negotiable.',
  'Travel insurance covering your maximum altitude, helicopter evacuation and repatriation is mandatory.',
];

const PROCESS = [
  { n: '01', t: 'Tell us what you want', d: 'Dates, group size, fitness, and the peaks or valleys on your list. Or just say what kind of trip you are after.' },
  { n: '02', t: 'We build the route', d: 'A costed, day-by-day itinerary from people who have walked every stage of it, with honest advice on whether it fits you.' },
  { n: '03', t: 'You confirm it', d: 'Only once the itinerary is agreed in writing do we ask for a deposit — and only then do we buy permits and flights.' },
  { n: '04', t: 'We run it', d: 'Permits, transport, crew, camps and food handled end to end. You walk, climb, and let us deal with the logistics.' },
];

export default function About() {
  const NUMBERS = [
    { n: '15+', l: 'Years operating' },
    { n: String(c.trips), l: 'Trips in the programme' },
    { n: String(c.regions), l: 'Regions of Pakistan' },
    { n: `${c.highest.toLocaleString()}m`, l: 'Highest objective (K2)' },
  ];

  const WHAT = [
    {
      slug: 'trekking', name: 'Trekking', count: c.trekking, icon: Route,
      d: 'Base camps, glacier crossings and high passes — from nine-day valley routes to three weeks on the Baltoro.',
    },
    {
      slug: 'expedition', name: 'Expeditions', count: c.expedition, icon: Peak,
      d: `Full-service climbing with our own high-altitude staff, including ${c.eightThousanders} of the eight-thousanders and ${c.sevenThousanders} peaks above 7,000m.`,
    },
    {
      slug: 'tour', name: 'Cultural tours', count: c.tour, icon: Compass,
      d: 'Blossom season in Hunza and Skardu, and the Indus-valley heritage of the south when the north is closed.',
    },
  ];

  return (
    <>
      <PageHero
        title="Fifteen years under these mountains"
        sub="Sky Adventures is a Pakistani-owned, Pakistani-staffed mountain operator based in Skardu — the gateway to the Baltoro and the greatest concentration of high peaks on earth."
        img={site.page_img}
        crumbs={[{ label: 'About Us' }]}
      />

      {/* ---------- story ---------- */}
      <section className="section">
        <div className="wrap why-grid">
          <div className="why-media">
            <Image src={site.k2_img.src} alt="Sky Adventures crew high in the Karakoram"
              width={site.k2_img.w} height={site.k2_img.h} placeholder="blur"
              blurDataURL={site.k2_img.blur} quality={82} sizes="(max-width: 900px) 92vw, 560px" priority />
            <div className="why-badge"><b>15</b><span>years in the Karakoram</span></div>
          </div>
          <div className="prose prose-full">
            <span className="eyebrow">Who we are</span>
            <h2 className="h-sec">Welcome to Sky Adventures</h2>
            <p>{site.about_short}</p>
            <p>
              Within a few days’ walk of our office in Skardu are K2, Broad Peak, both Gasherbrums,
              Masherbrum, Chogolisa and the Trango Towers. That proximity is the whole business: the
              people who take you up there live at the bottom of the same valleys.
            </p>
            <p>
              We run the full range — teahouse-and-camp treks to base camps like K2, Rakaposhi and
              Nanga Parbat; full-service climbing expeditions with our own high-altitude staff,
              covering {c.eightThousanders} of the eight-thousanders and {c.sevenThousanders} peaks
              above 7,000m; and slower cultural and blossom-season journeys through Hunza, Chitral,
              Skardu and the south.
            </p>
            <p>
              What has not changed is how we work. Small groups. Native guides. Honest route advice,
              including when the honest advice is that a trip is not right for you.
            </p>
            <Link href="/contact" className="btn btn-brand">Talk to a guide <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ---------- numbers ---------- */}
      <section className="numbers">
        <div className="wrap numbers-in">
          {NUMBERS.map((x) => (<div key={x.l}><b>{x.n}</b><span>{x.l}</span></div>))}
        </div>
      </section>

      {/* ---------- what we run ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">What we run</span>
            <h2 className="h-sec">Three ways into the range</h2>
            <p className="sub-sec mx-auto">
              {c.trips} departures in the programme, from a {c.shortest}-day cultural loop to a
              {' '}{c.longest}-day expedition.
            </p>
          </div>
          <div className="grid g-3">
            {WHAT.map(({ slug, name, count, d, icon: I }) => (
              <Link key={slug} href={`/product-category/${slug}`} className="wcard">
                <span className="wcard-i"><I /></span>
                <span className="wcard-n">{count} trips</span>
                <h3>{name}</h3>
                <p>{d}</p>
                <span className="wcard-go">Browse {name.toLowerCase()} <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- where ---------- */}
      <section className="section bg-alt">
        <div className="wrap">
          <div className="sec-head-row">
            <div>
              <span className="eyebrow">Where we work</span>
              <h2 className="h-sec">{c.regions} regions, one country</h2>
            </div>
            <Link href="/tour" className="btn btn-ghost">All {c.trips} trips <Arrow /></Link>
          </div>
          <div className="dest-grid">
            {destinations.map((d) => (
              <Link key={d.slug} href={`/tour_destination/${d.slug}`} className="dest">
                {d.img && <Image src={d.img.src} alt="" width={d.img.w} height={d.img.h}
                  placeholder="blur" blurDataURL={d.img.blur} quality={80}
                  sizes="(max-width: 640px) 46vw, (max-width: 1000px) 31vw, 280px" />}
                <div className="dest-veil" />
                <div className="dest-body">
                  <h3>{d.name}</h3>
                  {d.count > 0 && <span>{d.count} {d.count === 1 ? 'trip' : 'trips'}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- principles ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">How we work</span>
            <h2 className="h-sec">Four things we do not compromise on</h2>
          </div>
          <div className="grid g-2">
            {PRINCIPLES.map(({ t, d, icon: I }) => (
              <article key={t} className="vcard">
                <span className="vcard-i"><I /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- crew + safety ---------- */}
      <section className="section bg-alt">
        <div className="wrap crew-grid">
          <div>
            <span className="eyebrow">On the mountain</span>
            <h2 className="h-sec">Who goes with you</h2>
            <p className="sub-sec">
              Every departure runs with our own staff. Team size scales with the objective — a valley
              trek needs a guide and porters, an eight-thousander needs a rope-fixing team.
            </p>
            <ul className="crew-list">
              {CREW.map(({ t, d, icon: I }) => (
                <li key={t}><span><I /></span><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="safety">
            <h3><Shield /> Our safety standard</h3>
            <ul>{SAFETY.map((x) => <li key={x}>{x}</li>)}</ul>
            <Link href="/faq" className="btn btn-ghost btn-sm btn-block">Read the full FAQ <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Planning a trip</span>
            <h2 className="h-sec">How it works, start to finish</h2>
          </div>
          <ol className="steps steps-plain">
            {PROCESS.map(({ n, t, d }) => (
              <li key={n}>
                <span className="step-n">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- testimonials ---------- */}
      <section className="section bg-alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Testimonials</span>
            <h2 className="h-sec">What our happy clients say</h2>
          </div>
          <div className="grid g-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="quote">
                <span className="stars" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
                </span>
                <blockquote>{t.body}</blockquote>
                <figcaption><b>{t.name}</b><span>{t.place}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- popular ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head-row">
            <div>
              <span className="eyebrow">Our popular tours</span>
              <h2 className="h-sec">Where people go with us</h2>
            </div>
            <Link href="/tour" className="btn btn-ghost">All {c.trips} trips <Arrow /></Link>
          </div>
          <div className="grid g-3">
            {slimAll([...byCat('trekking').slice(0, 2), ...byCat('expedition').slice(0, 2)]).map((p) => (
              <TourCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="section-tight">
        <div className="wrap">
          <div className="cta-strip">
            <div>
              <h2>Planning something in the Karakoram?</h2>
              <p>Tell us your dates and we’ll send a costed, day-by-day itinerary — no obligation.</p>
            </div>
            <div className="row">
              <Link href="/contact" className="btn btn-primary">Get an itinerary <Arrow /></Link>
              <a className="btn btn-light" href={`tel:${site.phone_href}`}><Phone /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
