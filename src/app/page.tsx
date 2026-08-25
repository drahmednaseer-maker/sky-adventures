import Link from 'next/link';
import Image from 'next/image';
import TourCard from '@/components/TourCard';
import { Arrow, Camp, Check, Compass, Leaf, Peak, Shield, Star, Users } from '@/components/Icons';
import { byCat, categories, destinations, products, site, slimAll, testimonials } from '@/lib/site';

export const metadata = {
  description:
    'Sky Adventures — 15 years guiding the Karakoram, Himalaya and Hindu Kush. K2 Base Camp Trek, 8000m expeditions, blossom tours and cultural journeys across Pakistan.',
  alternates: { canonical: '/' },
};

const STEPS = [
  { n: '01', t: 'Tell us what you want to experience', d: 'Share the peaks, passes or valleys on your list — or just the dates and how hard you want to push.', icon: Compass },
  { n: '02', t: 'Share your travel preference', d: 'Group size, trekking grade, camping vs hotels, budget. We shape the route around you, not a fixed departure.', icon: Users },
  { n: '03', t: 'We’ll give you recommendations', d: 'A costed day-by-day itinerary from native guides who have walked every stage of it themselves.', icon: Check },
];

const WHY = [
  { t: 'Native Karakoram guides', d: 'Our lead guides and high-altitude porters are from Baltistan and Hunza. This is their home range.', icon: Peak },
  { t: 'Safety-first operations', d: 'Oxygen, comms and evacuation planning on every high-altitude programme, with conservative acclimatisation.', icon: Shield },
  { t: 'No middlemen', d: 'You book the operator directly. The money stays with the team on the mountain, not an overseas agent.', icon: Check },
  { t: 'Responsible travel', d: 'Leave-no-trace camps, fair porter wages and load limits, and local sourcing wherever we can.', icon: Leaf },
];

export default function Home() {
  const featured = slimAll(products.filter((p) => p.cat === 'expedition').slice(0, 8));
  const popular = slimAll([
    ...byCat('trekking').slice(0, 4),
    ...byCat('tour').slice(0, 2),
    ...byCat('expedition').slice(0, 2),
  ]);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <Image src={site.hero_img.src} alt="" width={site.hero_img.w} height={site.hero_img.h}
          placeholder="blur" blurDataURL={site.hero_img.blur} priority fetchPriority="high"
          sizes="100vw" className="hero-bg" />
        <div className="hero-veil" />
        <div className="wrap hero-in">
          <p className="hero-kick"><Star /> Trusted by trekkers from 30+ countries</p>
          <h1>{site.hero_title}</h1>
          <p className="hero-sub">{site.hero_sub}</p>
          <div className="hero-btns">
            <Link href="/tour" className="btn btn-primary">Browse all adventures <Arrow /></Link>
            <Link href="/product/k2-base-camp-trek" className="btn btn-light">K2 Base Camp Trek</Link>
          </div>
          <ul className="hero-stats">
            <li><b>15+</b><span>Years guiding</span></li>
            <li><b>{products.length}</b><span>Trips on offer</span></li>
            <li><b>8,611m</b><span>Highest summit</span></li>
            <li><b>4.8</b><span>Average rating</span></li>
          </ul>
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">What we do</span>
            <h2 className="h-sec">Adventures, Cultures, Trekking, Tours &amp; Expeditions</h2>
            <p className="sub-sec mx-auto">Three ways into the highest concentration of 7,000m and 8,000m peaks on earth.</p>
          </div>
          <div className="grid g-3 cat-grid">
            {categories.map((c) => {
              const list = byCat(c.slug);
              const img = list[0]?.gallery[0];
              return (
                <Link key={c.slug} href={`/product-category/${c.slug}`} className="cat-card">
                  {img && <Image src={img.src} alt="" width={img.w} height={img.h}
                    placeholder="blur" blurDataURL={img.blur} sizes="(max-width:900px) 92vw, 380px" />}
                  <div className="cat-veil" />
                  <div className="cat-body">
                    <span className="cat-n">{list.length} trips</span>
                    <h3>{c.name}</h3>
                    <p>{c.blurb}</p>
                    <span className="cat-go">Explore <Arrow /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED EXPEDITIONS ---------- */}
      <section className="section bg-alt">
        <div className="wrap">
          <div className="sec-head-row">
            <div>
              <span className="eyebrow">Peoples favourite</span>
              <h2 className="h-sec">Flagship expeditions</h2>
            </div>
            <Link href="/product-category/expedition" className="btn btn-ghost">All expeditions <Arrow /></Link>
          </div>
          <div className="grid g-3">
            {featured.map((p, i) => <TourCard key={p.slug} p={p} priority={i < 3} />)}
          </div>
        </div>
      </section>

      {/* ---------- 3 STEPS ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Find your travel perfection</span>
            <h2 className="h-sec">3 steps to the perfect trip</h2>
          </div>
          <ol className="steps">
            {STEPS.map(({ n, t, d, icon: I }) => (
              <li key={n}>
                <span className="step-i"><I /></span>
                <span className="step-n">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- POPULAR ---------- */}
      <section className="section bg-alt">
        <div className="wrap">
          <div className="sec-head-row">
            <div>
              <span className="eyebrow">Handpicked</span>
              <h2 className="h-sec">Popular right now</h2>
            </div>
            <Link href="/tour" className="btn btn-ghost">See all {products.length} trips <Arrow /></Link>
          </div>
          <div className="grid g-3">
            {popular.map((p) => <TourCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* ---------- DESTINATIONS ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Where we go</span>
            <h2 className="h-sec">Popular destinations</h2>
            <p className="sub-sec mx-auto">From the granite of Baltistan to the Makran coast — seven regions, one country.</p>
          </div>
          <div className="dest-grid">
            {destinations.map((d, i) => (
              <Link key={d.slug} href={`/tour_destination/${d.slug}`} className={`dest${i === 0 ? ' dest-lg' : ''}`}>
                {d.img && <Image src={d.img.src} alt="" width={d.img.w} height={d.img.h}
                  placeholder="blur" blurDataURL={d.img.blur}
                  sizes={i === 0 ? '(max-width:900px) 92vw, 560px' : '(max-width:900px) 46vw, 280px'} />}
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

      {/* ---------- WHY US ---------- */}
      <section className="section why-sec">
        <div className="wrap why-grid">
          <div className="why-media">
            <Image src={site.k2_img.src} alt="K2 expedition team on the Baltoro glacier"
              width={site.k2_img.w} height={site.k2_img.h} placeholder="blur" blurDataURL={site.k2_img.blur}
              sizes="(max-width:900px) 92vw, 520px" />
            <div className="why-badge"><b>15</b><span>years in the Karakoram</span></div>
          </div>
          <div>
            <span className="eyebrow">Why Sky Adventures</span>
            <h2 className="h-sec">Guided by the people who live under these peaks</h2>
            <p className="sub-sec">{site.about_short}</p>
            <ul className="why-list">
              {WHY.map(({ t, d, icon: I }) => (
                <li key={t}><span><I /></span><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ul>
            <Link href="/about-us" className="btn btn-brand">More about us <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
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

      {/* ---------- CTA ---------- */}
      <section className="cta">
        <Image src={site.hero_img2.src} alt="" width={site.hero_img2.w} height={site.hero_img2.h}
          placeholder="blur" blurDataURL={site.hero_img2.blur} sizes="100vw" className="cta-bg" />
        <div className="cta-veil" />
        <div className="wrap cta-in">
          <span className="eyebrow" style={{ color: '#fff' }}>Ready when you are</span>
          <h2>Let’s plan your Karakoram trip</h2>
          <p>Tell us your dates and what you want to climb or walk. We’ll send a costed, day-by-day itinerary — no obligation.</p>
          <div className="hero-btns">
            <Link href="/contact" className="btn btn-primary">Get a free itinerary <Arrow /></Link>
            <a href={`https://wa.me/${site.phone_href.replace('+', '')}`} target="_blank" rel="noopener noreferrer"
              className="btn btn-light">WhatsApp {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
