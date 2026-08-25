import { products, site } from './site';

export type Post = {
  slug: string; title: string; excerpt: string; date: string; readMins: number;
  tag: string; body: { h?: string; p?: string; ul?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: 'k2-base-camp-trek-essential-gear',
    title: 'K2 Base Camp Trek: the essential gear list',
    excerpt: 'What to actually carry to Concordia — the kit that earns its weight on the Baltoro, and the kit that does not.',
    date: '2026-04-18', readMins: 8, tag: 'k2 base camp trek',
    body: [
      { p: 'The Baltoro is a long, dry, dusty, glaciated walk with genuine cold at the top end. Most people arrive with either too much or the wrong thing. This is the list we send to our own clients before a K2 Base Camp departure.' },
      { h: 'The non-negotiables' },
      { ul: [
        'Four-season sleeping bag rated to at least −15°C comfort. Nights at Concordia are cold even in August.',
        'Insulated sleeping mat — an inflatable with an R-value of 4 or above. You are sleeping on ice.',
        'Broken-in B1/B2-compatible trekking boots. New boots on the Baltoro is the single most common self-inflicted injury we see.',
        'Down jacket, 700-fill or better, with a hood.',
        'Hard shell jacket and trousers, fully waterproof, not water-resistant.',
        'Category 4 glacier glasses plus a spare pair. Snow blindness ends trips.',
      ] },
      { h: 'The things people forget' },
      { ul: [
        'A wide-brim sun hat as well as a beanie — the glare off the glacier is relentless.',
        'Lip balm at SPF 50, and more of it than you think.',
        'A one-litre insulated flask; plain bottles freeze overnight above Urdukas.',
        'Trekking poles — the moraine sections punish knees badly on descent.',
        'A dry bag system so your duffel survives a river crossing and a rain day.',
      ] },
      { h: 'What to leave at home' },
      { p: 'Heavy camera tripods, a second pair of approach shoes, cotton anything, and the large power bank you will not need because we run solar at the main camps. Your porter allowance is 15kg. Every kilo you save is a kilo somebody does not carry over the Baltoro for two weeks.' },
      { h: 'On packing for the porters, not for yourself' },
      { p: 'Split your kit into a trekking duffel and a base-camp duffel before you fly. It keeps porter loads sensible, gets you into camp with what you actually need, and means your down kit is not buried under twelve days of laundry.' },
    ],
  },
  {
    slug: 'when-to-trek-in-pakistan',
    title: 'When to trek in Pakistan: a season-by-season guide',
    excerpt: 'Blossom in April, glaciers in July, colour in October. Choosing the month decides the trip more than choosing the route.',
    date: '2026-03-02', readMins: 6, tag: 'planning',
    body: [
      { p: 'Pakistan does not have one trekking season, it has several, and they barely overlap. Picking the wrong month is the most expensive mistake a first-time visitor makes.' },
      { h: 'Late March to mid-April — blossom' },
      { p: 'Apricot and cherry blossom in Hunza and Skardu, with snow still on everything above the valley floor. The high routes are shut, but this is the most photogenic fortnight of the year in northern Pakistan.' },
      { h: 'Late June to mid-September — the high season' },
      { p: 'The only reliable window for the Baltoro, Concordia, Snow Lake, Gondogoro La and every 8,000m expedition. July and August are the most settled. Late June still carries snow on the passes; mid-September gets cold fast.' },
      { h: 'October to November — the shoulder' },
      { p: 'Clear, cold, quiet, and spectacular for the lower treks and for Fairy Meadows and Nanga Parbat views. High passes are closing or closed.' },
      { h: 'December to February — the south' },
      { p: 'The north shuts down. This is the right time for Lahore, Sindh, Mohenjo-daro and the Makran coast, when the plains are pleasant instead of brutal.' },
    ],
  },
  {
    slug: 'altitude-acclimatisation-karakoram',
    title: 'Altitude and acclimatisation in the Karakoram',
    excerpt: 'Why our itineraries have rest days you think you do not need, and what actually happens if you skip them.',
    date: '2026-02-10', readMins: 7, tag: 'safety',
    body: [
      { p: 'Every base camp trek we run has rest days built into it that look, on paper, like wasted time. They are the reason our trips finish.' },
      { h: 'The rule we plan around' },
      { p: 'Above 3,000m, we plan for an average gain of no more than 300–500m of sleeping altitude per day, with a full rest day every third or fourth day. Walking higher during the day and coming back down to sleep is fine, and is in fact the mechanism.' },
      { h: 'What we watch for' },
      { ul: [
        'Headache that does not clear with fluid and a rest.',
        'Loss of appetite and nausea beyond ordinary trail tiredness.',
        'Sleep disturbance and a resting pulse that stays elevated overnight.',
        'Any loss of coordination or confusion — this is the one that ends the discussion.',
      ] },
      { h: 'The only reliable treatment' },
      { p: 'Descent. Everything else buys time. Our guides carry a full medical kit and satellite comms, and on expeditions we carry oxygen, but the treatment for altitude illness is losing height and we will do that without debate.' },
      { h: 'What you can do before you arrive' },
      { p: 'Arrive rested, arrive hydrated, and do not treat the first days in Skardu as a rush. The single biggest controllable factor is not fitness — it is how fast you go up.' },
    ],
  },
];

export const bySlugPost = (s: string) => posts.find((p) => p.slug === s);
