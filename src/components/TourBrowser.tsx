'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TourCard from './TourCard';
import { CAT_LABEL, type CardProduct } from '@/lib/types';
import { Arrow, Chevron, Search, X } from './Icons';

type Facet = { key: string; label: string; count: number };
type Layout = 'grid' | 'list';

const BANDS = [
  { key: '1-7', label: 'Up to 7 days', test: (d: number) => d <= 7 },
  { key: '8-14', label: '8 – 14 days', test: (d: number) => d >= 8 && d <= 14 },
  { key: '15-21', label: '15 – 21 days', test: (d: number) => d >= 15 && d <= 21 },
  { key: '22+', label: '22 days or more', test: (d: number) => d >= 22 },
];
const GRADES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'short', label: 'Duration: shortest' },
  { key: 'long', label: 'Duration: longest' },
  { key: 'az', label: 'Name: A–Z' },
  { key: 'grade', label: 'Grade: easiest' },
];
const GRADE_ORDER = Object.fromEntries(GRADES.map((g, i) => [g, i]));

/** Multi-select facet group. */
function Group({
  title, facets, active, onToggle,
}: { title: string; facets: Facet[]; active: string[]; onToggle: (k: string) => void }) {
  if (facets.length < 2) return null;
  return (
    <fieldset className="fgroup">
      <legend>{title}</legend>
      <ul>
        {facets.map((f) => (
          <li key={f.key}>
            <label className={active.includes(f.key) ? 'is-on' : undefined}>
              <input type="checkbox" checked={active.includes(f.key)} onChange={() => onToggle(f.key)} />
              <span className="fbox" aria-hidden="true" />
              <span className="flabel">{f.label}</span>
              <span className="fcount">{f.count}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default function TourBrowser({
  items, regions, layout: initialLayout = 'grid', sidebar = 'left',
}: {
  items: CardProduct[];
  regions: { slug: string; name: string }[];
  layout?: Layout;
  sidebar?: 'left' | 'right';
}) {
  const [q, setQ] = useState('');
  const [cats, setCats] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [bands, setBands] = useState<string[]>([]);
  const [dests, setDests] = useState<string[]>([]);
  const [sort, setSort] = useState('featured');
  const [layout, setLayout] = useState<Layout>(initialLayout);
  const [panel, setPanel] = useState(false);

  /* Read filters out of the URL on first paint so a filtered view can be shared,
     and keep the address bar in step without pushing history entries. */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const list = (k: string) => (p.get(k) ? p.get(k)!.split(',').filter(Boolean) : []);
    setQ(p.get('q') ?? '');
    setCats(list('cat')); setGrades(list('grade')); setBands(list('days')); setDests(list('region'));
    if (p.get('sort')) setSort(p.get('sort')!);
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (cats.length) p.set('cat', cats.join(','));
    if (grades.length) p.set('grade', grades.join(','));
    if (bands.length) p.set('days', bands.join(','));
    if (dests.length) p.set('region', dests.join(','));
    if (sort !== 'featured') p.set('sort', sort);
    const qs = p.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [q, cats, grades, bands, dests, sort]);

  useEffect(() => {
    document.body.style.overflow = panel ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [panel]);

  const toggle = (set: (f: (v: string[]) => string[]) => void) => (k: string) =>
    set((v) => (v.includes(k) ? v.filter((x) => x !== k) : [...v, k]));

  /** Count a facet against everything except its own dimension. */
  const countBy = useCallback(
    (dim: 'cat' | 'grade' | 'band' | 'dest', key: string) => {
      const s = q.trim().toLowerCase();
      return items.filter((p) => {
        if (s && !(`${p.title} ${p.excerpt}`.toLowerCase().includes(s))) return false;
        if (dim !== 'cat' && cats.length && !cats.includes(p.cat)) return false;
        if (dim !== 'grade' && grades.length && !grades.includes(p.difficulty)) return false;
        if (dim !== 'band' && bands.length && !(p.days && bands.some((b) => BANDS.find((x) => x.key === b)?.test(p.days!)))) return false;
        if (dim !== 'dest' && dests.length && !p.dests.some((d) => dests.includes(d))) return false;
        if (dim === 'cat') return p.cat === key;
        if (dim === 'grade') return p.difficulty === key;
        if (dim === 'band') return Boolean(p.days && BANDS.find((x) => x.key === key)?.test(p.days));
        return p.dests.includes(key);
      }).length;
    },
    [items, q, cats, grades, bands, dests],
  );

  const catFacets = useMemo(
    () => (['trekking', 'expedition', 'tour'] as const)
      .map((c) => ({ key: c, label: CAT_LABEL[c], count: countBy('cat', c) }))
      .filter((f) => f.count > 0 || cats.includes(f.key)),
    [countBy, cats],
  );
  const gradeFacets = useMemo(
    () => GRADES.map((g) => ({ key: g, label: g, count: countBy('grade', g) }))
      .filter((f) => f.count > 0 || grades.includes(f.key)),
    [countBy, grades],
  );
  const bandFacets = useMemo(
    () => BANDS.map((b) => ({ key: b.key, label: b.label, count: countBy('band', b.key) }))
      .filter((f) => f.count > 0 || bands.includes(f.key)),
    [countBy, bands],
  );
  const destFacets = useMemo(
    () => regions.map((r) => ({ key: r.slug, label: r.name, count: countBy('dest', r.slug) }))
      .filter((f) => f.count > 0 || dests.includes(f.key)),
    [countBy, regions, dests],
  );

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const out = items.filter((p) => {
      if (s && !(`${p.title} ${p.excerpt}`.toLowerCase().includes(s))) return false;
      if (cats.length && !cats.includes(p.cat)) return false;
      if (grades.length && !grades.includes(p.difficulty)) return false;
      if (bands.length && !(p.days && bands.some((b) => BANDS.find((x) => x.key === b)?.test(p.days!)))) return false;
      if (dests.length && !p.dests.some((d) => dests.includes(d))) return false;
      return true;
    });
    const c = [...out];
    if (sort === 'short') c.sort((a, b) => (a.days ?? 999) - (b.days ?? 999));
    if (sort === 'long') c.sort((a, b) => (b.days ?? 0) - (a.days ?? 0));
    if (sort === 'az') c.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'grade') c.sort((a, b) => (GRADE_ORDER[a.difficulty] ?? 9) - (GRADE_ORDER[b.difficulty] ?? 9));
    return c;
  }, [items, q, cats, grades, bands, dests, sort]);

  const chips = [
    ...cats.map((k) => ({ k, label: CAT_LABEL[k], clear: () => setCats((v) => v.filter((x) => x !== k)) })),
    ...grades.map((k) => ({ k, label: k, clear: () => setGrades((v) => v.filter((x) => x !== k)) })),
    ...bands.map((k) => ({ k, label: BANDS.find((b) => b.key === k)?.label ?? k, clear: () => setBands((v) => v.filter((x) => x !== k)) })),
    ...dests.map((k) => ({ k, label: regions.find((r) => r.slug === k)?.name ?? k, clear: () => setDests((v) => v.filter((x) => x !== k)) })),
  ];
  const activeCount = chips.length + (q.trim() ? 1 : 0);
  const clearAll = () => { setQ(''); setCats([]); setGrades([]); setBands([]); setDests([]); };

  const filters = (
    <div className="filters-in">
      <label className="srch">
        <Search />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Search trips…" aria-label="Search trips" />
        {q && <button type="button" className="srch-x" onClick={() => setQ('')} aria-label="Clear search"><X /></button>}
      </label>
      <Group title="Type" facets={catFacets} active={cats} onToggle={toggle(setCats)} />
      <Group title="Grade" facets={gradeFacets} active={grades} onToggle={toggle(setGrades)} />
      <Group title="Duration" facets={bandFacets} active={bands} onToggle={toggle(setBands)} />
      <Group title="Region" facets={destFacets} active={dests} onToggle={toggle(setDests)} />
      {activeCount > 0 && (
        <button className="btn btn-ghost btn-sm btn-block" onClick={clearAll}>Clear all filters</button>
      )}
    </div>
  );

  return (
    <div className={`browser${sidebar === 'right' ? ' side-right' : ''}`}>
      <aside className="browser-rail">
        <div className="filters-card">
          <h2 className="filters-hd">Filter</h2>
          {filters}
        </div>
      </aside>

      <div className="browser-main">
        <div className="toolbar">
          <p className="toolbar-count" role="status">
            <b>{list.length}</b> {list.length === 1 ? 'trip' : 'trips'}
            {activeCount > 0 && <span> of {items.length}</span>}
          </p>
          <div className="toolbar-ctl">
            <button className="btn btn-ghost btn-sm filters-open" onClick={() => setPanel(true)}>
              Filters{activeCount > 0 && <span className="fbadge">{activeCount}</span>}
            </button>
            <label className="sel">
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </label>
            <div className="viewtog" role="group" aria-label="Layout">
              <button aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')} aria-label="Grid view">
                <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>
              </button>
              <button aria-pressed={layout === 'list'} onClick={() => setLayout('list')} aria-label="List view">
                <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="4" rx="1.5"/><rect x="3" y="10" width="18" height="4" rx="1.5"/><rect x="3" y="16" width="18" height="4" rx="1.5"/></svg>
              </button>
            </div>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="chipbar">
            {chips.map((c) => (
              <button key={c.k} className="fchip" onClick={c.clear}>
                {c.label} <X />
              </button>
            ))}
            <button className="fchip fchip-clear" onClick={clearAll}>Clear all</button>
          </div>
        )}

        {list.length === 0 ? (
          <div className="empty">
            <h3>No trips match those filters</h3>
            <p>Loosen a filter, or tell us what you’re after — we run private and custom departures too.</p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <button className="btn btn-ghost" onClick={clearAll}>Clear all filters</button>
              <Link href="/contact" className="btn btn-primary">Ask a guide <Arrow /></Link>
            </div>
          </div>
        ) : (
          <div className={layout === 'list' ? 'listview' : 'grid g-3'}>
            {list.map((p, i) => <TourCard key={p.slug} p={p} priority={i < 3} />)}
          </div>
        )}
      </div>

      {/* mobile filter sheet */}
      <div className={`fsheet${panel ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Filters">
        <div className="fsheet-bg" onClick={() => setPanel(false)} />
        <div className="fsheet-panel">
          <div className="fsheet-top">
            <span>Filter{activeCount > 0 ? ` (${activeCount})` : ''}</span>
            <button onClick={() => setPanel(false)} aria-label="Close filters"><X /></button>
          </div>
          <div className="fsheet-body">{filters}</div>
          <div className="fsheet-foot">
            <button className="btn btn-primary btn-block" onClick={() => setPanel(false)}>
              Show {list.length} {list.length === 1 ? 'trip' : 'trips'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
