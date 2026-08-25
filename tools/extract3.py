"""Re-extract product descriptions, honouring <br>-separated lines.

The source site writes bullet lists as a single paragraph with <br /> between
items — e.g. <p>EXPEDITION HIGHLIGHTS<br />item<br />item</p>. The first pass
stripped the tags and produced one run-on sentence; this pass recovers the
heading and the list.
"""
import json, re, html, os
from collections import OrderedDict

BR = re.compile(r'<br\s*/?>', re.I)

def txt(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s or ''))).strip()

def looks_like_heading(line):
    if len(line) > 92 or not line:
        return False
    if line.endswith(('.', ',', ';', ':')) and not line.isupper():
        return False
    return line.isupper() or len(line.split()) <= 8

def para_blocks(raw):
    """One source <p> -> one or more blocks."""
    parts = [txt(x) for x in BR.split(raw)]
    parts = [x for x in parts if x and x != '\xa0']
    if not parts:
        return []
    if len(parts) == 1:
        t = parts[0]
        if re.match(r'^\s*<strong>', raw) and len(t) < 120 and not t.endswith('.'):
            return [{'t': 'h', 'lvl': 3, 'v': t}]
        return [{'t': 'p', 'v': t}]

    out = []
    head, rest = parts[0], parts[1:]
    if looks_like_heading(head) and len(rest) >= 2:
        out.append({'t': 'h', 'lvl': 3, 'v': head.title() if head.isupper() else head})
        # short lines read as a list; long prose lines stay paragraphs
        if sum(len(x) for x in rest) / len(rest) < 180:
            out.append({'t': 'list', 'ordered': False, 'v': rest})
        else:
            out += [{'t': 'p', 'v': x} for x in rest]
        return out
    if looks_like_heading(head) and len(rest) == 1:
        return [{'t': 'h', 'lvl': 3, 'v': head}, {'t': 'p', 'v': rest[0]}]
    return [{'t': 'p', 'v': x} for x in parts]

def blocks_from(frag):
    out = []
    for m in re.finditer(r'<(h[1-6])[^>]*>(.*?)</\1>|<p[^>]*>(.*?)</p>|<(ul|ol)[^>]*>(.*?)</\4>|<table[^>]*>(.*?)</table>', frag, re.S):
        if m.group(1):
            t = txt(m.group(2))
            if t: out.append({'t': 'h', 'lvl': min(int(m.group(1)[1]), 4), 'v': t})
        elif m.group(3) is not None:
            out += para_blocks(m.group(3))
        elif m.group(5):
            items = [txt(li) for li in re.findall(r'<li[^>]*>(.*?)</li>', m.group(5), re.S)]
            items = [i for i in items if i]
            if items: out.append({'t': 'list', 'ordered': m.group(4) == 'ol', 'v': items})
        elif m.group(6):
            rows = []
            for tr in re.findall(r'<tr[^>]*>(.*?)</tr>', m.group(6), re.S):
                tds = [txt(x) for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.S)]
                tds = [x for x in tds if x and x != '\xa0']
                if len(tds) >= 2: rows.append(tds[:2])
            if rows: out.append({'t': 'table', 'v': rows})
    seen, res = set(), []
    for b in out:
        k = json.dumps(b, sort_keys=True)
        if k in seen: continue
        seen.add(k); res.append(b)
    return res

def parse_page(slug):
    f = f'tools/pages/prod-{slug}.html'
    if not os.path.exists(f):
        return None
    h = open(f, encoding='utf-8', errors='replace').read()
    if '</html>' not in h or 'id="tour-description"' not in h:
        return None  # truncated download
    m = (re.search(r'<div class="content-product-item tour-description"[^>]*>(.*?)\n\s*</div>\s*\n\s*<!--', h, re.S)
         or re.search(r'id="tour-description"[^>]*>(.*?)<!--\s*Tour Included', h, re.S)
         or re.search(r'id="tour-description"[^>]*>(.*?)id="tour-plan"', h, re.S))
    return blocks_from(m.group(1)) if m else None

data = json.load(open('src/lib/data.json'))
LEAD = re.compile(r'^(?:[A-Z][\w\-\',()]*\s+){0,4}(?:HIGHLIGHTS?|Highlights?)\s*[:\-–]?\s*')

changed = 0
for p in data['products']:
    desc = parse_page(p['slug'])
    if not desc:
        print(f"  skip (no page) {p['slug']}")
        continue
    # keep any stats table out of the prose
    stats = OrderedDict(p.get('stats') or {})
    for b in list(desc):
        if b['t'] == 'table':
            for r in b['v']:
                if r[0] and r[1]: stats.setdefault(r[0], r[1])
            desc.remove(b)
    if len(desc) > len(p['desc']):
        changed += 1
    p['desc'] = desc
    p['stats'] = dict(stats)

json.dump(data, open('src/lib/data.json', 'w'), ensure_ascii=False, separators=(',', ':'))
lists = sum(1 for p in data['products'] if any(b['t'] == 'list' for b in p['desc']))
heads = sum(1 for p in data['products'] if any(b['t'] == 'h' for b in p['desc']))
print(f"\nproducts with richer desc: {changed}")
print(f"products with a list block: {lists}/28  (was 6)")
print(f"products with headings:     {heads}/28")
