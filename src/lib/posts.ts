import type { Img } from './types';

export type Block = { h?: string; p?: string; ul?: string[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  tags: string[];
  img: Img;
  /** Trips this article is really about — rendered as cards under the piece. */
  trips: string[];
  body: Block[];
};

/* Every article here restates guidance that already appears on the site — the FAQ,
   the safety standard, or a trip's own inclusions — rather than introducing new
   policy. Images are drawn from the operator's own photo library. */
export const posts: Post[] = [
  {
    slug: 'k2-base-camp-trek-essential-gear',
    title: 'K2 Base Camp Trek: the essential gear list',
    excerpt: 'What to actually carry to Concordia — the kit that earns its weight on the Baltoro, and the kit that does not.',
    date: '2026-04-18', readMins: 8,
    tags: ['k2 base camp trek', 'gear'],
    img: { src: '/img/snow-lake-1.webp', w: 1500, h: 1000, blur: 'data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAsABABoJagCdACyo2Te2QAA+oznfL03p5nIm5QVwsq5S/e11l64Zt+ia6XjWuyTx4ufMaHqK/saP7U1O90wOvX9KDnVxulj3jAA' },
    trips: ['k2-base-camp-trek', 'k2-gondogoro-la-trek'],
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
      { h: 'Packing for the porters, not just for yourself' },
      { p: 'Split your kit into a trekking duffel and a base-camp duffel before you fly. It keeps porter loads sensible, gets you into camp with what you actually need, and means your down kit is not buried under twelve days of laundry.' },
    ],
  },
  {
    slug: 'when-to-trek-in-pakistan',
    title: 'When to trek in Pakistan: a season-by-season guide',
    excerpt: 'Blossom in April, glaciers in July, colour in October. Choosing the month decides the trip more than choosing the route.',
    date: '2026-03-02', readMins: 6,
    tags: ['planning', 'seasons'],
    img: { src: '/img/thalle-la.webp', w: 1501, h: 994, blur: 'data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAABQAgCdASoQAAsABABoJZQCdAEfmpyIm5AGNgAA+NbQ7L2g2s9x+iu5KGZ4yG5qE6tlMCsX4ryy5WFtVUZhyoBcOZ3NCWAmOP8DS7q/AZaaGUPCYCv/GAAA' },
    trips: ['hunza-apricot-blossom-tour', 'skardu-blossom-tour', 'k2-base-camp-trek'],
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
      { h: 'Build in contingency days' },
      { p: 'Whatever month you choose, weather closes roads and grounds the Skardu flight — it is a normal part of travel here. Our itineraries carry spare days for exactly that, and it is why we insist on insurance that covers delay.' },
    ],
  },
  {
    slug: 'altitude-acclimatisation-karakoram',
    title: 'Altitude and acclimatisation in the Karakoram',
    excerpt: 'Why our itineraries have rest days you think you do not need, and what actually happens if you skip them.',
    date: '2026-02-10', readMins: 7,
    tags: ['safety', 'altitude'],
    img: { src: '/img/spantik-3.webp', w: 1600, h: 1041, blur: 'data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQAgCdASoQAAoABABoJQBOgCIANJ6dfWiAAP6w9fdRxPy3ZbdRp0Mc+U8fYjiTNOKXCDSRj4UWroLp31Z1Lj3KZo3Qk7UcBY+lktNjDhb6HQpKXxMJTPIQvLL1HjFnAAA=' },
    trips: ['spantik-peak-expedition', 'k2-base-camp-trek', 'nanga-parbat-base-camp-trek'],
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
      { p: 'Descent. Everything else buys time. Our guides carry a full medical kit and satellite communications, and on expeditions we carry oxygen, but the treatment for altitude illness is losing height and we will do that without debate.' },
      { h: 'What you can do before you arrive' },
      { p: 'Arrive rested, arrive hydrated, and do not treat the first days in Skardu as a rush. The single biggest controllable factor is not fitness — it is how fast you go up.' },
    ],
  },
  {
    slug: 'k2-base-camp-or-gondogoro-la',
    title: 'K2 Base Camp or Gondogoro La: which trek should you do?',
    excerpt: 'Both start on the Baltoro and both reach Concordia. One walks back the way it came; the other crosses a 5,500m glaciated pass.',
    date: '2026-05-06', readMins: 6,
    tags: ['k2 base camp trek', 'planning'],
    img: { src: '/img/batura-glacier-yak-trek-2.webp', w: 1600, h: 1067, blur: 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoQAAsABABoJYgCdAEfcaJGlwAAzeVz+swBIzNsbqxY6XqOrXpaJ4Xg0X734BcWv2PLmoWstDcK3gLCAAA=' },
    trips: ['k2-base-camp-trek', 'k2-gondogoro-la-trek'],
    body: [
      { p: 'These are the two trips people most often ask us to compare, and the honest answer is that they are the same walk until Concordia. What separates them is how you come home.' },
      { h: 'What they share' },
      { p: 'Both run around twenty days, both follow the Braldu valley from Askole onto the Baltoro glacier, and both reach Concordia and the foot of K2. Up to that point the days, the camps and the difficulty are identical.' },
      { h: 'K2 Base Camp — the return leg' },
      { p: 'You retrace the Baltoro back to Askole. It is long, and the moraine is hard on the knees, but there is no technical ground and no fixed rope. If this is your first Karakoram trek, or you have not used crampons before, this is the one to do.' },
      { h: 'Gondogoro La — the crossing' },
      { ul: [
        'A glaciated pass at roughly 5,500m, crossed before dawn on fixed rope.',
        'Crampons, harness and an ice axe are required, and our guides fix and manage the ropes.',
        'The pass is weather- and condition-dependent; if it is not safe we do not cross it, and you finish on the standard return.',
        'The reward is the view from the top — K2, Broad Peak and both Gasherbrums in one line — and a descent into the Hushe valley rather than a repeat of the Baltoro.',
      ] },
      { h: 'Which to choose' },
      { p: 'Take Gondogoro La if you have prior glacier experience, are comfortable on fixed rope, and want the crossing. Take K2 Base Camp if you want the Baltoro and Concordia without technical ground. Either way you see K2 — the difference is the last four days.' },
    ],
  },
  {
    slug: 'what-porters-carry',
    title: 'What porters carry, and why we cap the load',
    excerpt: 'Fifteen kilos is not an arbitrary number. Here is how a Karakoram trek actually gets supplied, and what your packing choices mean for the crew.',
    date: '2026-01-22', readMins: 5,
    tags: ['responsible travel', 'gear'],
    img: { src: '/img/rakaposhi-base-camp-trek-2.webp', w: 1600, h: 890, blur: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoQAAkABABoJYgCdADcTZyygAD84APG70JFtzylifpddgA4tPTzFHWFmubOkCSCFVb5UVmquMyxtiLKqQKEBgAA' },
    trips: ['k2-base-camp-trek', 'rakaposhi-base-camp-trek-diran-base-camp-included', 'masherbrum-base-camp-trek'],
    body: [
      { p: 'There is no road to Concordia and no pack animal that will cross the Baltoro. Everything on a Karakoram trek — tents, food, fuel, kitchen, your duffel — is carried on someone’s back.' },
      { h: 'How the loads work' },
      { p: 'Your personal allowance on trek is 15kg, carried by porters, plus whatever you take in your own daypack. On top of that the crew carries the group equipment: tents, the dining and kitchen tents, stoves, fuel and food for the whole party for the whole route.' },
      { h: 'Why the cap is enforced' },
      { ul: [
        'Load limits are a safety measure for the porters, not an administrative detail.',
        'Every kilo over the allowance is a kilo carried over moraine and glacier for up to two weeks.',
        'Overloading is how people get hurt, and it is the part of this industry with the worst reputation.',
        'Our crew carry proper equipment and clothing for the altitude they are working at — that is a cost we build into the trip, not an optional extra.',
      ] },
      { h: 'What that means for your packing' },
      { p: 'Split your kit before you fly: a trekking duffel that moves with you and a base-camp bag that does not. Leave the third fleece and the heavy tripod. If you are close to the limit, we will tell you before departure rather than at the trailhead.' },
      { h: 'The bit people miss' },
      { p: 'Tips are not included in any of our trips and they are not a formality. The crew is the reason the trip works, and we will tell you what is customary rather than leaving you to guess.' },
    ],
  },
  {
    slug: 'permits-and-paperwork-pakistan',
    title: 'Permits and paperwork for a Karakoram trip',
    excerpt: 'Visas, trekking permits, climbing permits, liaison officers and restricted zones — what you handle and what we handle.',
    date: '2025-12-11', readMins: 6,
    tags: ['planning', 'permits'],
    img: { src: '/img/hero-laila.webp', w: 1844, h: 1112, blur: 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAwAgCdASoQAAoABABoJYwCdEf/gYtWso8MAAD9PAOUM+OmoWWcL3OzCf+tCcwdscSTpm2DiJbZGW4l1n25XZxAAAA=' },
    trips: ['k2-expedition', 'gasherbrum-i-expedition', 'k2-base-camp-trek'],
    body: [
      { p: 'Pakistan has a reputation for paperwork. Most of it is ours to deal with, not yours — but the parts that are yours have lead times, so it is worth knowing which is which.' },
      { h: 'What you handle: the visa' },
      { p: 'Most nationalities need a visa. Pakistan runs an online system and the Tourist Visa is usually straightforward. We provide the invitation letter and company documentation to support the application at no charge once your trip is confirmed — that is the part applicants most often get stuck on.' },
      { h: 'What we handle: everything else' },
      { ul: [
        'Trekking permits and national park fees for the route you are on.',
        'Climbing permits for peaks above 6,500m, and the government liaison officer that comes with them.',
        'Additional clearance for zones near the borders, where it is required.',
        'The registrations and check-ins along the way that a foreign trekking party has to make.',
      ] },
      { h: 'Lead times' },
      { p: 'This is the real reason we ask for four to six months on expeditions and two to three on treks. Permits for the big peaks are not same-week paperwork, and a liaison officer has to be appointed and travel with the party.' },
      { h: 'Insurance is not optional' },
      { p: 'Your policy has to cover trekking or mountaineering to the maximum altitude of your trip, and it has to include helicopter evacuation and repatriation. We ask to see the details before departure. It is the one document we will not start a trip without.' },
    ],
  },
];

export const bySlugPost = (s: string) => posts.find((p) => p.slug === s);

export const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

export const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
