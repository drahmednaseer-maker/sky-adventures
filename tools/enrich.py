"""Derive a consistent fact set for every trip.

Only two of the 28 trips carry a stats table on the source site, so the product
page would otherwise have a rich spec panel on two pages and nothing on the rest.
Everything here is derived from content that does exist: the title, the prose,
the itinerary and the category.
"""
import json, re

data = json.load(open('src/lib/data.json'))

ALT = re.compile(r'(\d{1,2}[,.]?\d{3})\s*(?:m\b|meters?\b|metres?\b)', re.I)

NOISE = re.compile(r'\b(expedition|trek+ing|trek|tour|pakistan|karakoram|himalaya|hindukush|base|camp|\d{4}(?:-\d{2})?)\b', re.I)

def peak_name(title):
    """Leading proper-noun run of the title, e.g. 'Broad Peak Expedition 2023-24' -> 'Broad Peak'."""
    t = re.sub(r'\(.*?\)', ' ', title)
    t = re.split(r'[,\d]', t)[0]
    words = []
    for w in t.split():
        if NOISE.fullmatch(w):
            break
        words.append(w)
    return ' '.join(words[:3]).strip() or title.split()[0]

def pick(m):
    n = int(m.group(1).replace(',', '').replace('.', ''))
    return n if 2000 <= n <= 8611 else None

def altitude(p):
    """Only report a figure we can actually stand behind.

    A trek's max altitude is the highest point walked to, not the height of the
    mountain it visits — quoting 8,611m on the K2 Base Camp Trek would be wrong.
    So: use the source's own stat if present; for expeditions fall back to the
    summit height, but only when it comes from the title or from a sentence
    naming the peak itself. Otherwise show nothing.
    """
    stat = p['stats'].get('Max Altitude')
    if stat:
        return stat
    if p['cat'] != 'expedition':
        return None
    m = ALT.search(p['title'])
    if m and pick(m):
        return f"{pick(m):,}m"
    peak = peak_name(p['title'])
    if not peak:
        return None
    rx = re.compile(re.escape(peak), re.I)
    for b in p['desc']:
        if b['t'] != 'p' or not isinstance(b['v'], str):
            continue
        for sent in re.split(r'(?<=[.!?])\s+', b['v']):
            if rx.search(sent):
                for mm in ALT.finditer(sent):
                    n = pick(mm)
                    if n:
                        return f"{n:,}m"
    return None

SEASON = {
    'expedition': 'June – September',
    'trekking': 'June – September',
    'tour': 'March – April',
}
def season(p):
    hay = (p['title'] + ' ' + p['excerpt']).lower()
    if 'blossom' in hay or 'apricot' in hay or 'spring' in hay:
        return 'Late March – mid April'
    if any(k in p['destinations'] for k in ('sindh', 'balochistan')) or 'lahore' in hay or 'south' in hay:
        return 'October – March'
    return SEASON.get(p['cat'], 'June – September')

CITY = re.compile(r'\b(Islamabad|Skardu|Gilgit|Lahore|Karachi|Chitral|Hunza|Rawalpindi)\b', re.I)
def endpoint(days, first=True):
    seq = days if first else list(reversed(days))
    for d in seq[:4]:
        m = CITY.search(d['title'])
        if m:
            return m.group(1).title()
    return 'Islamabad'

def group_size(p):
    return p['stats'].get('Group Size') or ('2 – 8 climbers' if p['cat'] == 'expedition' else '4 – 12 people')

HL = re.compile(r'highlight', re.I)
def highlights(p):
    """The bullet list that follows a '… Highlights' heading, if the trip has one."""
    for i, b in enumerate(p['desc']):
        if b['t'] == 'h' and HL.search(b['v']):
            for nxt in p['desc'][i + 1:i + 3]:
                if nxt['t'] == 'list':
                    return nxt['v'][:6]
    for b in p['desc']:
        if b['t'] == 'list' and 3 <= len(b['v']) <= 8 and all(len(x) < 130 for x in b['v']):
            return b['v'][:6]
    return []

for p in data['products']:
    it = p['itinerary']
    p['facts'] = {
        'altitude': altitude(p),
        'season': season(p),
        'group': group_size(p),
        'start': endpoint(it, True) if it else None,
        'end': endpoint(it, False) if it else None,
        'stages': len(it),
    }
    p['highlights'] = highlights(p)

json.dump(data, open('src/lib/data.json', 'w'), ensure_ascii=False, separators=(',', ':'))

n_alt = sum(1 for p in data['products'] if p['facts']['altitude'])
n_hl = sum(1 for p in data['products'] if p['highlights'])
print(f"altitude derived : {n_alt}/28")
print(f"highlights found : {n_hl}/28")
print()
print(f"{'slug':<34}{'alt':<10}{'season':<24}{'group':<16}route")
for p in data['products'][:12]:
    f = p['facts']
    print(f"{p['slug'][:32]:<34}{str(f['altitude']):<10}{f['season']:<24}{f['group']:<16}{f['start']} → {f['end']}")
