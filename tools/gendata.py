import json, re, os

products = json.load(open('scrape/products.json'))
manifest = json.load(open('scrape/img-manifest.json'))

def key_for(url):
    return url.split('/uploads/')[1].replace('/', '_')

def img(url):
    k = key_for(url)
    return manifest.get(k)

# ---- destinations (taxonomy) ----
DESTS = [
    ('skardu','Skardu','2022_07_sky-adventures-Skardu.jpg','Gateway to the Karakoram — Baltistan’s high desert of granite spires, glaciers and cold-desert dunes.'),
    ('hunza','Hunza','2022_07_Sky-adventures-hunza-spring.jpg','Apricot blossom valleys beneath Rakaposhi, Ultar Sar and the ancient forts of Baltit and Altit.'),
    ('chitral','Chitral','2022_07_Sky-advenrures-chitral.jpg','Hindu Kush country — Tirich Mir, the Kalash valleys and high passes into Gilgit.'),
    ('azad-kashmir','Azad Kashmir','2025_11_Kashmir-Skyadventures.jpg','Green alpine meadows, Neelum Valley rivers and pine-forested ridgelines.'),
    ('kpk','KPK','2025_11_Takhtbai-skyadventures.jpg','Khyber Pakhtunkhwa — Swat, Kaghan and the Gandhara heritage of Takht-i-Bahi.'),
    ('sindh','Sindh','2025_11_sindh-skyadventures.jpg','Indus civilisation sites, Sufi shrines and the living history of Thatta and Mohenjo-daro.'),
    ('balochistan','Balochistan','2025_11_Balochistan-skyadventures.jpg','Makran coast, Hingol badlands and the vast, empty geology of Pakistan’s largest province.'),
]

# map products -> destinations by keyword
DEST_RULES = {
    'skardu': ['k2','baltoro','concordia','skardu','askole','gondogoro','laila','masherbrum','khosar','thale','chogolisa','gasherbrum','broad peak','biafo','hisper','snow lake','trango','spantik','pastore','shigar','hushe'],
    'hunza': ['hunza','rakaposhi','batura','rash lake','rush','nagar','diran','passu','attabad','haramosh'],
    'chitral': ['trichmir','tirich','chitral','kalash'],
    'kpk': ['nanga parbat','fairy meadows','swat','kaghan','naran','takht'],
    'sindh': ['karachi','sindh','mohenjo','thatta','south of pakistan'],
    'balochistan': ['balochistan','makran','hingol','quetta'],
    'azad-kashmir': ['kashmir','neelum','muzaffarabad'],
}

def dests_for(p):
    hay = (p['title'] + ' ' + p['slug'] + ' ' + ' '.join(b.get('v','') if isinstance(b.get('v'),str) else '' for b in p['desc'][:4])).lower()
    out = []
    for d, kws in DEST_RULES.items():
        if any(k in hay for k in kws):
            out.append(d)
    if 'lahore' in hay:
        out.append('sindh')
    return out or ['skardu']

# ---- difficulty + price heuristics from real content ----
def difficulty(p):
    if p['cat'] == 'expedition': return 'Extreme'
    if p['cat'] == 'tour': return 'Easy'
    d = int(re.search(r'\d+', p['duration'] or '10').group(0))
    return 'Challenging' if d >= 15 else 'Moderate'

def price_from(p):
    """Original site lists PKR 0 (quote-on-request). Surface any USD figure stated in the copy."""
    for b in p['desc']:
        v = b.get('v')
        if isinstance(v, str):
            m = re.search(r'\$\s?([\d,]{3,7})', v)
            if m: return '$' + m.group(1)
        elif isinstance(v, list):
            for it in v:
                m = re.search(r'\$\s?([\d,]{3,7})', it)
                if m: return '$' + m.group(1)
    return None

STAT_WORDS = ('Max Altitude', 'Total Trek Distance', 'Min Temperature', 'Hiking Hours',
              'Camping Days', 'Hotel Stays', 'Group Size', 'Best Season', 'Trek Grade',
              'Daily Walking', 'Best time', 'Grade ', 'Accommodation', 'Trek Type')

LEAD_JUNK = re.compile(
    r'^(?:[A-Z][\w\-\',()]*\s+){0,4}(?:HIGHLIGHTS?|Highlights?)\s*[:\-–]?\s*', re.U)

def clean_lead(v, title):
    """Drop a leading 'X EXPEDITION HIGHLIGHTS' style run-in and a duplicated title prefix."""
    prev = None
    while prev != v:
        prev = v
        v = LEAD_JUNK.sub('', v).strip()
        # Only drop a duplicated title prefix when the remainder still opens a sentence —
        # otherwise we strip the subject and leave "offers everything!".
        if v.lower().startswith(title.lower()):
            rest = v[len(title):].lstrip(' -–—:,.').strip()
            if rest[:1].isupper():
                v = rest
    return v

def good_excerpt(p):
    """First real prose sentence(s) — not the stats-table text WordPress puts in the excerpt."""
    for b in p['desc']:
        if b['t'] != 'p':
            continue
        v = clean_lead(b['v'].strip(), p['title'])
        if len(v) < 60:
            continue
        if sum(w in v for w in STAT_WORDS) >= 2:
            continue
        # trim to a sentence boundary near 190 chars
        if len(v) <= 200:
            return v
        cut = v[:200]
        dot = max(cut.rfind('. '), cut.rfind('? '), cut.rfind('! '))
        return (cut[:dot + 1] if dot > 90 else cut.rsplit(' ', 1)[0] + '…').strip()
    md = (p.get('meta_desc') or '').strip()
    if md and sum(w in md for w in STAT_WORDS) < 2:
        return md[:200]
    return f"{p['title']} — a guided {p['cat']} in northern Pakistan with Sky Adventures."

out_products = []
for p in products:
    gal = [img(u) for u in p['gallery']]
    gal = [g for g in gal if g]
    slug = p['slug']
    out_products.append({
        'id': p['id'],
        'slug': slug,
        'title': p['title'],
        'cat': p['cat'],
        'duration': p['duration'],
        'difficulty': difficulty(p),
        'price': price_from(p),
        'destinations': dests_for(p),
        'stats': p['stats'],
        'desc': p['desc'],
        'itinerary': p['itinerary'],
        'gallery': gal,
        'reviews': p['reviews'],
        'excerpt': good_excerpt(p),
    })

site = {
    'name': 'Sky Adventures',
    'tagline': 'Treks, Tours & Expeditions',
    'hero_title': '15 Years Guiding the Giants: Karakoram | Himalayas | Hindukush',
    'hero_sub': "Discover Pakistan's Natural Beauty with our Curated Tours.",
    'phone': '+92 355 5253934',
    'phone_href': '+923555253934',
    'email': 'skyadventurespk@gmail.com',
    'address': 'Skardu, Gilgit-Baltistan, Pakistan',
    'facebook': 'https://www.facebook.com/skyadventures.com.pk',
    'about_short': 'Our goal is to provide you with a safe and memorable experience while trekking and exploring the beautiful landscapes of your dream destinations.',
    'logo': img('https://skyadventures.com.pk/wp-content/uploads/2025/11/logo-for-header.jpg'),
    'hero_img': img('https://skyadventures.com.pk/wp-content/uploads/2025/11/Sky-Adventure-Trips.jpg'),
    'hero_img2': img('https://skyadventures.com.pk/wp-content/uploads/2025/11/Sky-Adventure.jpg'),
    'k2_img': img('https://skyadventures.com.pk/wp-content/uploads/2025/11/K2-Expedition.jpg'),
    'gear_img': img('https://skyadventures.com.pk/wp-content/uploads/2025/04/K2-Base-Camp-Trek-Essential-Gear.jpeg'),
}

dest_out = []
for slug, name, imgkey, blurb in DESTS:
    dest_out.append({
        'slug': slug, 'name': name, 'blurb': blurb,
        'img': manifest.get(imgkey),
        'count': sum(1 for p in out_products if slug in p['destinations']),
    })

testimonials = [
    {'body': 'The team handled everything flawlessly, from logistics to safety on the glaciers. I’ve trekked worldwide, but their professionalism stood out. Truly the best service I’ve experienced on a high-altitude expedition.', 'name': 'James Walker', 'place': 'United Kingdom'},
    {'body': 'The guides knew every perfect photo spot and timed each location beautifully with the light. Their local insight made my shots incredible. Exceptional service from start to finish.', 'name': 'Maria Sanchez', 'place': 'Spain'},
    {'body': 'World-class climbing support with expert guides who really understand these mountains. Every detail was organized with precision and safety in mind. Couldn’t ask for better service in such extreme terrain.', 'name': 'Lukas Weber', 'place': 'Germany'},
]

cats = [
    {'slug': 'trekking', 'name': 'Trekking', 'blurb': 'Multi-day treks to the base camps and high passes of the Karakoram, Himalaya and Hindu Kush.'},
    {'slug': 'expedition', 'name': 'Expedition', 'blurb': 'Full-service 6,000m–8,000m climbing expeditions with native high-altitude staff.'},
    {'slug': 'tour', 'name': 'Tour', 'blurb': 'Cultural and blossom-season journeys across northern and southern Pakistan.'},
]

data = {'site': site, 'products': out_products, 'destinations': dest_out,
        'categories': cats, 'testimonials': testimonials}

os.makedirs('web/src/lib', exist_ok=True)
with open('web/src/lib/data.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, separators=(',', ':'))

print(f"products: {len(out_products)}")
print(f"with gallery: {sum(1 for p in out_products if p['gallery'])}")
print(f"with itinerary: {sum(1 for p in out_products if p['itinerary'])}")
print(f"with price: {sum(1 for p in out_products if p['price'])}")
print(f"destinations: {[(d['slug'], d['count']) for d in dest_out]}")
print(f"by cat: { {c['slug']: sum(1 for p in out_products if p['cat']==c['slug']) for c in cats} }")
print(f"data.json: {os.path.getsize('web/src/lib/data.json')/1024:.0f} KB")
