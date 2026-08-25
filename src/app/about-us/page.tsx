import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import TourCard from '@/components/TourCard';
import { Arrow, Camp, Check, Compass, Leaf, Peak, Shield, Star, Users } from '@/components/Icons';
import { byCat, products, site, slimAll, testimonials } from '@/lib/site';

export const metadata = {
  title: 'About Us',
  description:
    'Sky Adventures is a native Pakistani mountain operator based in Skardu, guiding treks and expeditions in the Karakoram, Himalaya and Hindu Kush for over 15 years.',
  alternates: { canonical: '/about-us' },
};

const VALUES = [
  { t: 'Local by definition', d: 'We are from Baltistan and Hunza. Our guides grew up in the valleys they take you through, and our high-altitude porters have been on these glaciers their whole working lives.', icon: Peak },
  { t: 'Safety before summit', d: 'Conservative acclimatisation profiles, satellite comms on every high trip, oxygen and a written evacuation plan. Turning around is always an acceptable outcome.', icon: Shield },
  { t: 'Direct, not brokered', d: 'You deal with the operator running your trip. There is no overseas agent adding a margin, and no subcontracting to a company you have never spoken to.', icon: Check },
  { t: 'Fair to the mountain', d: 'Leave-no-trace camps, carry-out waste policy, enforced porter load limits and proper equipment for every member of the crew.', icon: Leaf },
];

const NUMBERS = [
  { n: '15+', l: 'Years operating' },
  { n: `${products.length}`, l: 'Trips on offer' },
  { n: '30+', l: 'Countries served' },
  { n: '4.8', l: 'Average rating' },
];

export default function About() {
  return (
    <>
      <PageHero
        title="About Sky Adventures"
        sub="Fifteen years guiding the giants of the Karakoram, Himalaya and Hindu Kush — as a native team, from Skardu."
        img={site.k2_img}
        crumbs={[{ label: 'About Us' }]}
      />

      <section className="section">
        <div className="wrap why-grid">
          <div className="why-media">
            <Image src={site.hero_img.src} alt="Sky Adventures crew crossing a Karakoram glacier"
              width={site.hero_img.w} height={site.hero_img.h} placeholder="blur"
              blurDataURL={site.hero_img.blur} sizes="(max-width:900px) 92vw, 520px" priority />
            <div className="why-badge"><b>15</b><span>years in the Karakoram</span></div>
          </div>
          <div className="prose prose-full">
            <span className="eyebrow">Who we are</span>
            <h2 className="h-sec">Welcome to Sky Adventures</h2>
            <p>{site.about_short}</p>
            <p>
              Sky Adventures is a Pakistani-owned and Pakistani-staffed mountain travel company based in
              Skardu, Gilgit-Baltistan — the gateway to the Baltoro glacier and the greatest concentration
              of high peaks on earth. Within a few days’ walk of our office are K2, Broad Peak, both
              Gasherbrums, Masherbrum, Chogolisa and the Trango Towers.
            </p>
            <p>
              We run the full range: teahouse-and-camp treks to base camps like K2, Rakaposhi and Nanga
              Parbat; full-service 6,000m–8,000m climbing expeditions with our own high-altitude staff; and
              slower cultural and blossom-season tours through Hunza, Chitral, Skardu and the south.
            </p>
            <p>
              What has not changed in fifteen years is how we work. Small groups. Native guides. Honest
              route advice, including when the honest advice is that a trip is not right for you.
            </p>
            <Link href="/contact" className="btn btn-brand">Talk to a guide <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="numbers">
        <div className="wrap numbers-in">
          {NUMBERS.map((x) => (<div key={x.l}><b>{x.n}</b><span>{x.l}</span></div>))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">How we work</span>
            <h2 className="h-sec">Four things we do not compromise on</h2>
          </div>
          <div className="grid g-2">
            {VALUES.map(({ t, d, icon: I }) => (
              <article key={t} className="vcard">
                <span className="vcard-i"><I /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="wrap">
          <div className="sec-head-row">
            <div>
              <span className="eyebrow">Our popular tours</span>
              <h2 className="h-sec">Where people go with us</h2>
            </div>
            <Link href="/tour" className="btn btn-ghost">All {products.length} trips <Arrow /></Link>
          </div>
          <div className="grid g-3">
            {slimAll([...byCat('trekking').slice(0, 2), ...byCat('expedition').slice(0, 2)]).map((p) => (
              <TourCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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
    </>
  );
}
