import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { Arrow, Chevron, Clock, Facebook, Mail, Peak, Phone, Pin, Shield, Thermo, Whats } from '@/components/Icons';
import { catalogue as c, contact, products, site } from '@/lib/site';

export const metadata = {
  title: 'Contact Us',
  description:
    'Talk to Sky Adventures in Skardu, Gilgit-Baltistan. Call, WhatsApp or email for a free costed itinerary for any trek, expedition or tour in Pakistan. Replies usually within 24 hours.',
  alternates: { canonical: '/contact' },
};

const STEPS = [
  { t: 'You send the details', d: 'Dates, group size, fitness, and the trip you have in mind — or none at all.' },
  { t: 'A guide replies', d: 'Not a call centre. Someone who has actually run the route, usually within 24 hours.' },
  { t: 'You get a costed itinerary', d: 'Day by day, with what is and is not included, in writing.' },
  { t: 'Only then, a deposit', d: 'Nothing is taken until you have agreed the plan.' },
];

const ASKED = [
  { q: 'How fit do I need to be?', href: '/faq' },
  { q: 'Do I need a visa for Pakistan?', href: '/faq' },
  { q: 'When is the best time to go?', href: '/faq' },
  { q: 'What is included in the price?', href: '/faq' },
  { q: 'What is your cancellation policy?', href: '/refund_returns-2' },
];

export default function Contact() {
  const wa = `https://wa.me/${site.phone_href.replace('+', '')}`;
  const trips = products.map((p) => ({
    slug: p.slug, title: p.title, cat: p.cat, duration: p.duration,
  }));

  const METHODS = [
    {
      icon: Whats, label: 'WhatsApp', value: site.phone, note: 'Fastest during climbing season',
      href: wa, external: true, primary: true,
    },
    { icon: Phone, label: 'Phone', value: site.phone, note: 'Pakistan Standard Time (UTC+5)', href: `tel:${site.phone_href}` },
    { icon: Mail, label: 'Email', value: site.email, note: 'Replies usually within 24 hours', href: `mailto:${site.email}` },
    {
      icon: Facebook, label: 'Facebook', value: 'skyadventures.com.pk', note: 'Trip photos and updates',
      href: site.facebook, external: true,
    },
  ];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Sky Adventures',
    mainEntity: {
      '@type': 'TravelAgency',
      name: site.name,
      telephone: site.phone,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Skardu', addressRegion: 'Gilgit-Baltistan', addressCountry: 'PK',
      },
      areaServed: 'Pakistan',
    },
  };

  return (
    <>
      <PageHero
        title="Talk to a guide"
        sub="We are at your disposal seven days a week. Tell us what you want to climb or walk, and we’ll send a costed, day-by-day itinerary — no obligation, no deposit until you agree it."
        img={site.hero_img2}
        crumbs={[{ label: 'Contact Us' }]}
      />

      {/* ---------- contact methods ---------- */}
      <section className="section-tight">
        <div className="wrap">
          <div className="cmethods">
            {METHODS.map(({ icon: I, label, value, note, href, external, primary }) => (
              <a key={label} href={href} className={`cmethod${primary ? ' is-primary' : ''}`}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="cmethod-i"><I /></span>
                <span className="cmethod-t">
                  <em>{label}</em>
                  <b>{value}</b>
                  <i>{note}</i>
                </span>
                <Chevron className="cmethod-go" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- form + rail ---------- */}
      <section className="section-tight">
        <div className="wrap contact-grid">
          <ContactForm trips={trips} site={contact} />

          <aside className="contact-rail">
            <div className="railbox">
              <h3>What happens next</h3>
              <ol className="nextsteps">
                {STEPS.map((s, i) => (
                  <li key={s.t}><span>{i + 1}</span><div><b>{s.t}</b><p>{s.d}</p></div></li>
                ))}
              </ol>
            </div>

            <div className="railbox">
              <h3>Where we are</h3>
              <ul className="ci-list">
                <li><span><Pin /></span><div><b>Office</b><p>{site.address}</p></div></li>
                <li><span><Thermo /></span><div><b>Karakoram season</b><p>June – September for treks and expeditions; late March – April for blossom tours.</p></div></li>
                <li><span><Clock /></span><div><b>Hours</b><p>Seven days a week, Pakistan Standard Time (UTC+5).</p></div></li>
              </ul>
              <p className="fineprint" style={{ marginTop: 4 }}>
                <Shield /> During the June–September season our lead guides are often on the mountain,
                so WhatsApp reaches us fastest.
              </p>
            </div>

            <div className="railbox">
              <h3>Commonly asked</h3>
              <ul className="qlinks">
                {ASKED.map((a) => (
                  <li key={a.q}><Link href={a.href}>{a.q} <Arrow /></Link></li>
                ))}
              </ul>
            </div>

            <div className="railbox railbox-alt">
              <h3>Not sure what to ask for?</h3>
              <p>
                Browse the {c.trips} trips we run — {c.trekking} treks, {c.expedition} expeditions and
                {' '}{c.tour} cultural tours across {c.regions} regions — then send us the one that fits.
              </p>
              <Link href="/tour" className="btn btn-primary btn-sm btn-block">
                Browse all trips <Arrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
