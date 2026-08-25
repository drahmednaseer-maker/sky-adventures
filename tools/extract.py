import json, re, html, os, sys
from collections import OrderedDict

SITE='https://skyadventures.com.pk'
def txt(s): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',s or ''))).strip()

products = json.load(open('full_products.json'))
pages = json.load(open('full_pages.json'))
cats = {c['id']:c for c in json.load(open('list_product_cat.json'))}

def parse_content(c):
    """Split product content into stats table + ordered blocks."""
    stats=OrderedDict(); blocks=[]
    # stats table
    for tbl in re.findall(r'<table.*?</table>', c, re.S):
        for tr in re.findall(r'<tr>(.*?)</tr>', tbl, re.S):
            tds=re.findall(r'<td[^>]*>(.*?)</td>', tr, re.S)
            if len(tds)==2:
                k,v=txt(tds[0]),txt(tds[1])
                if k and v and v!='\xa0' and k!='\xa0': stats[k]=v
    body=re.sub(r'<table.*?</table>','',c,flags=re.S)
    # walk block elements in order
    for m in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>|<p[^>]*>(.*?)</p>|<(ul|ol)[^>]*>(.*?)</\4>', body, re.S):
        if m.group(1):
            t=txt(m.group(2))
            if t: blocks.append({'t':'h','lvl':int(m.group(1)[1]),'v':t})
        elif m.group(3) is not None:
            raw=m.group(3); t=txt(raw)
            if not t or t=='\xa0': continue
            strong = bool(re.match(r'^\s*<strong>', raw)) and len(t)<120
            blocks.append({'t':'h' if strong else 'p','lvl':3,'v':t} if strong else {'t':'p','v':t})
        elif m.group(5):
            items=[txt(li) for li in re.findall(r'<li[^>]*>(.*?)</li>', m.group(5), re.S)]
            items=[i for i in items if i]
            if items: blocks.append({'t':'list','ordered':m.group(4)=='ol','v':items})
    # dedupe consecutive duplicate blocks (source repeats intro)
    out=[];seen=set()
    for b in blocks:
        key=json.dumps(b,sort_keys=True)
        if key in seen: continue
        seen.add(key); out.append(b)
    return stats, out

def page_images(slug):
    f=f'pages/prod-{slug}.html'
    if not os.path.exists(f): return []
    h=open(f,encoding='utf-8',errors='replace').read()
    body=h[h.find('<body'):]
    imgs=re.findall(r'(https://skyadventures\.com\.pk/wp-content/uploads/[^"\' )]+?\.(?:jpg|jpeg|png|webp))',body,re.I)
    out=[];seen=set()
    for i in imgs:
        b=re.sub(r'-\d+x\d+(\.\w+)$',r'\1',i)
        if 'logo' in b.lower() or 'favicon' in b.lower() or 'icon' in b.lower(): continue
        if b in seen: continue
        seen.add(b); out.append(b)
    return out

CAT_MAP={30:'expedition',15:'tour',28:'trekking'}
res=[]
for p in products:
    stats, blocks = parse_content(p['content']['rendered'])
    imgs = page_images(p['slug'])
    title=html.unescape(p['title']['rendered'])
    cat = next((CAT_MAP[c] for c in p['product_cat'] if c in CAT_MAP), 'tour')
    # duration from title/blocks
    dur=None
    for src in [title]+[b['v'] for b in blocks if b['t']=='h'][:6]:
        m=re.search(r'(\d{1,2})\s*[-–]?\s*(?:to\s*)?(\d{1,2})?\s*Days?\b', src, re.I)
        if m: dur=f"{m.group(1)}{'-'+m.group(2) if m.group(2) else ''} Days"; break
    if not dur and 'Camping Days' in stats: dur=stats['Camping Days']+' Days'
    res.append({
        'id':p['id'],'slug':p['slug'],'title':title,'cat':cat,
        'link':p['link'].replace(SITE,''),
        'duration':dur,'stats':stats,'blocks':blocks,'images':imgs,
        'featured':p['featured_media'],
        'excerpt':txt(p['excerpt']['rendered'])[:300],
    })

json.dump(res, open('products.json','w'), indent=1, ensure_ascii=False)
print(f"products: {len(res)}")
for r in res[:30]:
    print(f"  {r['slug'][:44]:<46} {r['cat']:<10} {str(r['duration']):<10} imgs={len(r['images']):<3} stats={len(r['stats'])} blocks={len(r['blocks'])}")
