import json, re, html, os
from collections import OrderedDict
SITE='https://skyadventures.com.pk'
def txt(s): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',s or ''))).strip()
def norm(u): return re.sub(r'-\d+x\d+(\.\w+)$',r'\1',u)

def blocks_from(hfrag):
    out=[]
    for m in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>|<p[^>]*>(.*?)</p>|<(ul|ol)[^>]*>(.*?)</\4>|<table[^>]*>(.*?)</table>', hfrag, re.S):
        if m.group(1):
            t=txt(m.group(2))
            if t: out.append({'t':'h','lvl':min(int(m.group(1)[1]),4),'v':t})
        elif m.group(3) is not None:
            raw=m.group(3); t=txt(raw)
            if not t or t=='\xa0': continue
            if re.match(r'^\s*<strong>',raw) and len(t)<120 and not t.endswith('.'):
                out.append({'t':'h','lvl':3,'v':t})
            else: out.append({'t':'p','v':t})
        elif m.group(5):
            items=[txt(li) for li in re.findall(r'<li[^>]*>(.*?)</li>',m.group(5),re.S)]
            items=[i for i in items if i]
            if items: out.append({'t':'list','ordered':m.group(4)=='ol','v':items})
        elif m.group(6):
            rows=[]
            for tr in re.findall(r'<tr[^>]*>(.*?)</tr>',m.group(6),re.S):
                tds=[txt(x) for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',tr,re.S)]
                tds=[x for x in tds if x and x!='\xa0']
                if len(tds)>=2: rows.append(tds[:2])
            if rows: out.append({'t':'table','v':rows})
    # dedupe
    seen=set(); res=[]
    for b in out:
        k=json.dumps(b,sort_keys=True)
        if k in seen: continue
        seen.add(k); res.append(b)
    return res

def parse_product_page(slug):
    f=f'pages/prod-{slug}.html'
    if not os.path.exists(f): return {}
    h=open(f,encoding='utf-8',errors='replace').read()
    d={}
    # description
    m=re.search(r'<div class="content-product-item tour-description"[^>]*>(.*?)\n\s*</div>\s*\n\s*<!--', h, re.S)
    if not m: m=re.search(r'id="tour-description"[^>]*>(.*?)<!--\s*Tour Included', h, re.S)
    if not m: m=re.search(r'id="tour-description"[^>]*>(.*?)id="tour-plan"', h, re.S)
    if m: d['desc']=blocks_from(m.group(1))
    # itinerary
    itin=[]
    for it in re.findall(r'<div class="item-tour-plan[^"]*">(.*?)</div>\s*</div>', h, re.S):
        day=re.search(r'tour-plan-day">(.*?)</span>',it,re.S)
        lab=re.search(r'tour-plan-label">(.*?)</span>',it,re.S)
        desc=re.search(r'tour-plan-description">(.*?)$',it,re.S)
        if day or lab:
            itin.append({'day':txt(day.group(1)) if day else '',
                         'title':txt(lab.group(1)) if lab else '',
                         'body':txt(desc.group(1)) if desc else ''})
    if itin: d['itinerary']=itin
    # gallery
    g=[]
    for m2 in re.finditer(r'ova-gallery-slideshow.*?</div>\s*</div>', h, re.S):
        g += re.findall(r'(https://skyadventures\.com\.pk/wp-content/uploads/[^"\' ]+?\.(?:jpg|jpeg|png|webp))', m2.group(0), re.I)
    if not g:
        head=h[:h.find('id="tour-description"') if 'id="tour-description"' in h else 60000]
        g = re.findall(r'(https://skyadventures\.com\.pk/wp-content/uploads/[^"\' ]+?\.(?:jpg|jpeg|png|webp))', head, re.I)
    seen=set(); gg=[]
    for u in g:
        u=norm(u)
        if any(x in u.lower() for x in ('logo','favicon','icon','placeholder')): continue
        if u in seen: continue
        seen.add(u); gg.append(u)
    d['gallery']=gg[:12]
    # review count
    rc=re.search(r'(\d+)\s+responses? to', h)
    d['reviews']=int(rc.group(1)) if rc else 0
    # meta description
    md=re.search(r'<meta name="description" content="([^"]*)"',h)
    if md: d['meta_desc']=html.unescape(md.group(1))
    return d

products=json.load(open('full_products.json'))
CAT_MAP={30:'expedition',15:'tour',28:'trekking'}
res=[]
for p in products:
    slug=p['slug']; title=html.unescape(p['title']['rendered'])
    pg=parse_product_page(slug)
    # stats from REST content table
    stats=OrderedDict()
    for tbl in re.findall(r'<table.*?</table>', p['content']['rendered'], re.S):
        for tr in re.findall(r'<tr>(.*?)</tr>',tbl,re.S):
            tds=re.findall(r'<td[^>]*>(.*?)</td>',tr,re.S)
            if len(tds)==2:
                k,v=txt(tds[0]),txt(tds[1])
                if k and v: stats[k]=v
    desc = pg.get('desc') or blocks_from(re.sub(r'<table.*?</table>','',p['content']['rendered'],flags=re.S))
    # pull stats out of desc tables too
    for b in list(desc):
        if b['t']=='table':
            for r in b['v']:
                if r[0] and r[1]: stats.setdefault(r[0],r[1])
            desc.remove(b)
    itin=pg.get('itinerary',[])
    dur=None
    m=re.search(r'(\d{1,2})\s*[-–]\s*(\d{1,2})\s*Days?\b',title,re.I) or re.search(r'(\d{1,2})\s*Days?\b',title,re.I)
    if m: dur=m.group(0).strip()
    if not dur:
        for b in desc[:8]:
            if b['t']=='h':
                m=re.search(r'(\d{1,2})\s*[-–]?\s*(\d{1,2})?\s*Days?\b',b['v'],re.I)
                if m: dur=m.group(0).strip(); break
    if not dur and itin:
        nums=[int(x) for d2 in itin for x in re.findall(r'(\d{1,2})',d2['day'])]
        if nums: dur=f"{max(nums)} Days"
    cat=next((CAT_MAP[c] for c in p['product_cat'] if c in CAT_MAP),'tour')
    res.append({'id':p['id'],'slug':slug,'title':title,'cat':cat,
        'duration':dur,'stats':dict(stats),'desc':desc,'itinerary':itin,
        'gallery':pg.get('gallery',[]),'reviews':pg.get('reviews',0),
        'meta_desc':pg.get('meta_desc',''),'excerpt':txt(p['excerpt']['rendered'])[:260]})
json.dump(res,open('products.json','w'),indent=1,ensure_ascii=False)
print(f"{'slug':<46}{'cat':<11}{'dur':<10}{'gal':<5}{'itin':<6}{'stats':<6}desc")
for r in res:
    print(f"{r['slug'][:44]:<46}{r['cat']:<11}{str(r['duration'])[:8]:<10}{len(r['gallery']):<5}{len(r['itinerary']):<6}{len(r['stats']):<6}{len(r['desc'])}")
