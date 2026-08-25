import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Faq from '@/components/Faq';
import { Arrow } from '@/components/Icons';
import { SITE_URL, site } from '@/lib/site';

export const metadata = {
  title: 'FAQ',
  description:
    'Answers to the questions we get most about trekking and climbing in Pakistan — visas, permits, fitness, altitude, safety, weather windows, costs and booking.',
  alternates: { canonical: '/faq' },
};

const GROUPS = [
  {
    name: 'Before you book',
    items: [
      { q: 'How fit do I need to be for a base camp trek?', a: 'For treks like K2 Base Camp or Rakaposhi Base Camp you should be comfortable walking 5–8 hours a day, on rough ground, for two weeks, carrying a light daypack. Porters carry the main loads. If you can hike a long hill day back-to-back over a weekend without wrecking yourself, you have the base to train from. We will tell you honestly if a route is too much.' },
      { q: 'Do I need previous high-altitude experience?', a: 'Not for trekking. Our base camp itineraries are built with conservative acclimatisation and rest days. For 6,000m+ climbing objectives and any 8,000m peak, we do require prior high-altitude experience and will ask about your climbing history before confirming.' },
      { q: 'What is the best time of year to go?', a: 'The Karakoram trekking and climbing season runs roughly late June to mid-September, with July and August the most reliable. Blossom tours in Hunza and Skardu are late March to mid-April. Cultural tours in the south work best October to March.' },
      { q: 'How far ahead should I book?', a: 'For expeditions, 4–6 months so permits and logistics can be arranged properly. For treks, 2–3 months is comfortable. We can sometimes take late bookings — ask.' },
    ],
  },
  {
    name: 'Permits & paperwork',
    items: [
      { q: 'Do I need a visa for Pakistan?', a: 'Most nationalities do. Pakistan runs an online visa system and a Tourist Visa is usually straightforward. We provide the invitation letter and company documentation you need to support the application at no charge once your trip is confirmed.' },
      { q: 'Who arranges trekking and climbing permits?', a: 'We do. Trek permits, national park fees, and for peaks above 6,500m the climbing permit and government liaison officer are all handled by us and are included in the trip cost unless stated otherwise.' },
      { q: 'Are there restricted areas?', a: 'Some zones near the borders require additional clearance and a liaison officer. Every route we sell is one we already hold the operating permissions for, and we will tell you upfront if a variation needs extra paperwork.' },
    ],
  },
  {
    name: 'On the trip',
    items: [
      { q: 'What is the accommodation like?', a: 'Hotels or guesthouses on the road sections — comfortable, en-suite where available. On trek you are in two-person tents with a dining tent, kitchen tent and toilet tent, set up and struck by our crew. Expeditions add heated mess facilities at base camp.' },
      { q: 'What about food and dietary requirements?', a: 'All meals during the trekking and climbing period are included and cooked fresh by our own kitchen crew. Vegetarian, vegan, halal and most allergy requirements are straightforward — tell us in advance and we plan the supply around it.' },
      { q: 'How do you handle altitude sickness?', a: 'Prevention first: slow ascent profiles, mandatory rest days, and daily monitoring by the guide. Every high-altitude trip carries a comprehensive medical kit, and expeditions carry supplementary oxygen. If someone needs to descend, they descend — that call is never negotiable.' },
      { q: 'Is there phone signal or internet?', a: 'There is usable mobile coverage in the main valleys and towns. Once on the glaciers there is none. Our guides carry satellite communications for operational and emergency use on every high trip.' },
      { q: 'How much weight can porters carry for me?', a: 'The standard personal allowance on trek is 15kg carried by porters, plus your daypack. Expedition allowances are higher and set per programme. We enforce load limits for the porters’ safety as strictly as we enforce anything.' },
    ],
  },
  {
    name: 'Money & booking',
    items: [
      { q: 'Why are prices shown on request?', a: 'Because the honest number depends on group size, dates, hotel standard and how much of the route you want to cover. We quote a single all-in figure for your actual group rather than a headline price that grows later.' },
      { q: 'What is included in the price?', a: 'Ground transport, guide, permits, park fees, hotels on road sections, full camping setup, all meals on trek, and porters within the weight limit. International flights, Pakistan visa, personal insurance, personal equipment and tips are not included.' },
      { q: 'Do I need insurance?', a: 'Yes, and it is mandatory. Your policy must cover trekking or mountaineering to the maximum altitude of your trip, and must include helicopter evacuation and repatriation. We ask for the policy details before departure.' },
      { q: 'What is your cancellation policy?', a: 'The full terms are set out in your trip confirmation before any money is taken. In short: deposits secure permits and logistics and become non-refundable once those are purchased, and the closer to departure a cancellation falls, the more of the cost is already committed. See our refunds page for the policy in full.' },
    ],
  },
];

export default function FAQ() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GROUPS.flatMap((g) =>
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
        title="Do you have some questions?"
        sub="Visas, permits, fitness, altitude, weather windows and money — the things people actually ask us before booking."
        img={site.gear_img}
        crumbs={[{ label: 'FAQ' }]}
      />
      <section className="section">
        <div className="wrap faq-wrap">
          <Faq groups={GROUPS} />
          <div className="railbox faq-help">
            <h3>Can’t find what you are looking for?</h3>
            <p className="muted" style={{ fontSize: 14.5, marginBottom: 16 }}>
              Ask us directly — a guide who has run the route will answer, usually within 24 hours.
            </p>
            <Link href="/contact" className="btn btn-primary btn-block">Ask a question <Arrow /></Link>
            <a className="btn btn-ghost btn-block" style={{ marginTop: 10 }} href={`tel:${site.phone_href}`}>
              {site.phone}
            </a>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
