import Link from 'next/link';
import Faq from '@/components/Faq';
import PageHero from '@/components/PageHero';
import SectionNav from '@/components/SectionNav';
import { Arrow, Clock, Mail, Peak, Phone, Shield, Whats } from '@/components/Icons';
import { FAQ, FAQ_COUNT } from '@/lib/faq';
import { catalogue as c, site } from '@/lib/site';

export const metadata = {
  title: 'FAQ',
  description:
    'Answers to the questions we get most about trekking and climbing in Pakistan — visas, permits, fitness, altitude, safety, weather windows, costs and booking.',
  alternates: { canonical: '/faq' },
};

const HELPFUL = [
  { icon: Peak, t: 'Browse the trips', d: `${c.trips} treks, expeditions and tours`, href: '/tour' },
  { icon: Shield, t: 'How we work', d: 'Safety standard and crew', href: '/about-us' },
  { icon: Clock, t: 'Refunds & cancellation', d: 'The policy in full', href: '/refund_returns-2' },
];

export default function FAQPage() {
  const wa = `https://wa.me/${site.phone_href.replace('+', '')}`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.flatMap((g) =>
      g.items.map((i) => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a },
      })),
    ),
  };

  return (
    <>
      <PageHero
        title="Questions, answered"
        sub={`The ${FAQ_COUNT} things people actually ask us before booking — visas, permits, fitness, altitude, weather windows and money.`}
        img={site.gear_img}
        crumbs={[{ label: 'FAQ' }]}
      />

      <SectionNav items={FAQ.map((g) => ({ id: g.id, label: g.name }))} />

      <section className="section">
        <div className="wrap faq-wrap">
          <Faq groups={FAQ} searchable />

          <aside className="faq-rail">
            <div className="railbox railbox-alt">
              <h3>Still not sure?</h3>
              <p>
                Ask us directly. A guide who has actually run the route will answer — usually
                within 24 hours.
              </p>
              <div className="stack">
                <Link href="/contact" className="btn btn-primary btn-sm btn-block">
                  Ask a question <Arrow />
                </Link>
                <a className="btn btn-ghost btn-sm btn-block" href={wa} target="_blank" rel="noopener noreferrer">
                  <Whats /> WhatsApp us
                </a>
              </div>
              <ul className="ci-list" style={{ marginTop: 18 }}>
                <li><span><Phone /></span><div><b>Phone</b><p><a href={`tel:${site.phone_href}`}>{site.phone}</a></p></div></li>
                <li><span><Mail /></span><div><b>Email</b><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div></li>
              </ul>
            </div>

            <div className="railbox">
              <h3>Also useful</h3>
              <ul className="uselinks">
                {HELPFUL.map(({ icon: I, t, d, href }) => (
                  <li key={t}>
                    <Link href={href}>
                      <span className="uselink-i"><I /></span>
                      <span className="uselink-t"><b>{t}</b><i>{d}</i></span>
                      <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
