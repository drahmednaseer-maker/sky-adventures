export type FaqItem = { id: string; q: string; a: string };
export type FaqGroup = { id: string; name: string; blurb: string; items: FaqItem[] };

/** Shared so the contact page can deep-link to individual answers. */
export const FAQ: FaqGroup[] = [
  {
    id: 'before-you-book',
    name: 'Before you book',
    blurb: 'Fitness, experience, seasons and how far ahead to plan.',
    items: [
      {
        id: 'fitness',
        q: 'How fit do I need to be for a base camp trek?',
        a: 'For treks like K2 Base Camp or Rakaposhi Base Camp you should be comfortable walking 5–8 hours a day, on rough ground, for two weeks, carrying a light daypack. Porters carry the main loads. If you can hike a long hill day back-to-back over a weekend without wrecking yourself, you have the base to train from. We will tell you honestly if a route is too much.',
      },
      {
        id: 'altitude-experience',
        q: 'Do I need previous high-altitude experience?',
        a: 'Not for trekking. Our base camp itineraries are built with conservative acclimatisation and rest days. For 6,000m+ climbing objectives and any 8,000m peak, we do require prior high-altitude experience and will ask about your climbing history before confirming.',
      },
      {
        id: 'best-season',
        q: 'What is the best time of year to go?',
        a: 'The Karakoram trekking and climbing season runs roughly late June to mid-September, with July and August the most reliable. Blossom tours in Hunza and Skardu are late March to mid-April. Cultural tours in the south work best October to March.',
      },
      {
        id: 'how-far-ahead',
        q: 'How far ahead should I book?',
        a: 'For expeditions, 4–6 months so permits and logistics can be arranged properly. For treks, 2–3 months is comfortable. We can sometimes take late bookings — ask.',
      },
      {
        id: 'private-dates',
        q: 'Can you run private departures or custom dates?',
        a: 'Yes. Every route we publish can be shortened, extended or run on your own dates inside its season window, and we build private trips for couples, families and clubs. Smaller groups often cost less per head than people expect — ask us for a quote on the dates you want.',
      },
    ],
  },
  {
    id: 'permits',
    name: 'Permits & paperwork',
    blurb: 'Visas, trekking and climbing permits, restricted zones.',
    items: [
      {
        id: 'visa',
        q: 'Do I need a visa for Pakistan?',
        a: 'Most nationalities do. Pakistan runs an online visa system and a Tourist Visa is usually straightforward. We provide the invitation letter and company documentation you need to support the application at no charge once your trip is confirmed.',
      },
      {
        id: 'permits',
        q: 'Who arranges trekking and climbing permits?',
        a: 'We do. Trek permits, national park fees, and for peaks above 6,500m the climbing permit and government liaison officer are all handled by us and are included in the trip cost unless stated otherwise.',
      },
      {
        id: 'restricted-areas',
        q: 'Are there restricted areas?',
        a: 'Some zones near the borders require additional clearance and a liaison officer. Every route we sell is one we already hold the operating permissions for, and we will tell you upfront if a variation needs extra paperwork.',
      },
    ],
  },
  {
    id: 'on-the-trip',
    name: 'On the trip',
    blurb: 'Accommodation, food, altitude, communications and porters.',
    items: [
      {
        id: 'accommodation',
        q: 'What is the accommodation like?',
        a: 'Hotels or guesthouses on the road sections — comfortable, en-suite where available. On trek you are in two-person tents with a dining tent, kitchen tent and toilet tent, set up and struck by our crew. Expeditions add heated mess facilities at base camp.',
      },
      {
        id: 'food',
        q: 'What about food and dietary requirements?',
        a: 'All meals during the trekking and climbing period are included and cooked fresh by our own kitchen crew. Vegetarian, vegan, halal and most allergy requirements are straightforward — tell us in advance and we plan the supply around it.',
      },
      {
        id: 'altitude-sickness',
        q: 'How do you handle altitude sickness?',
        a: 'Prevention first: slow ascent profiles, mandatory rest days, and daily monitoring by the guide. Every high-altitude trip carries a comprehensive medical kit, and expeditions carry supplementary oxygen. If someone needs to descend, they descend — that call is never negotiable.',
      },
      {
        id: 'connectivity',
        q: 'Is there phone signal or internet?',
        a: 'There is usable mobile coverage in the main valleys and towns. Once on the glaciers there is none. Our guides carry satellite communications for operational and emergency use on every high trip.',
      },
      {
        id: 'porter-weight',
        q: 'How much weight can porters carry for me?',
        a: 'The standard personal allowance on trek is 15kg carried by porters, plus your daypack. Expedition allowances are higher and set per programme. We enforce load limits for the porters’ safety as strictly as we enforce anything.',
      },
    ],
  },
  {
    id: 'money',
    name: 'Money & booking',
    blurb: 'Pricing, inclusions, insurance and cancellation.',
    items: [
      {
        id: 'why-no-price',
        q: 'Why are prices shown on request?',
        a: 'Because the honest number depends on group size, dates, hotel standard and how much of the route you want to cover. We quote a single all-in figure for your actual group rather than a headline price that grows later.',
      },
      {
        id: 'whats-included',
        q: 'What is included in the price?',
        a: 'Ground transport, guide, permits, park fees, hotels on road sections, full camping setup, all meals on trek, and porters within the weight limit. International flights, Pakistan visa, personal insurance, personal equipment and tips are not included.',
      },
      {
        id: 'insurance',
        q: 'Do I need insurance?',
        a: 'Yes, and it is mandatory. Your policy must cover trekking or mountaineering to the maximum altitude of your trip, and must include helicopter evacuation and repatriation. We ask for the policy details before departure.',
      },
      {
        id: 'cancellation',
        q: 'What is your cancellation policy?',
        a: 'The full terms are set out in your trip confirmation before any money is taken. In short: deposits secure permits and logistics and become non-refundable once those are purchased, and the closer to departure a cancellation falls, the more of the cost is already committed. See our refunds page for the policy in full.',
      },
      {
        id: 'weather-closures',
        q: 'What happens if weather stops the trip?',
        a: 'Mountains close roads and ground flights — it is a normal part of travel here, and our itineraries carry contingency days for it. Where a trip cannot run at all for reasons outside anyone’s control we refund every cost not already committed and work with you to reschedule. This is exactly what your travel insurance is for, and why we require it.',
      },
    ],
  },
];

export const FAQ_COUNT = FAQ.reduce((n, g) => n + g.items.length, 0);

/** Flat lookup for cross-page deep links. */
export const faqHref = (id: string) => {
  const g = FAQ.find((grp) => grp.items.some((i) => i.id === id));
  return g ? `/faq#${id}` : '/faq';
};
