'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import TourCard from './TourCard';
import { CAT_LABEL, type CardProduct, days } from '@/lib/types';
import { Search } from './Icons';

type Layout = 'grid' | 'list';

export default function TourGrid({
  items, layout = 'grid', showFilters = true, sidebar,
}: {
  items: CardProduct[];
  layout?: Layout;
  showFilters?: boolean;
  sidebar?: 'left' | 'right' | null;
}) {
  const [cat, setCat] = useState<string>('all');
  const [sort, setSort] = useState<string>('featured');
  const [q, setQ] = useState('');

  const cats = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((p) => m.set(p.cat, (m.get(p.cat) ?? 0) + 1));
    return [...m.entries()];
  }, [items]);

  const list = useMemo(() => {
    let out = items;
    if (cat !== 'all') out = out.filter((p) => p.cat === cat);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
    }
    const c = [...out];
    if (sort === 'short') c.sort((a, b) => (days(a) ?? 99) - (days(b) ?? 99));
    if (sort === 'long') c.sort((a, b) => (days(b) ?? 0) - (days(a) ?? 0));
    if (sort === 'az') c.sort((a, b) => a.title.localeCompare(b.title));
    return c;
  }, [items, cat, sort, q]);

  const filters = showFilters && (
    <div className="filters">
      <div className="filters-row">
        <label className="srch">
          <Search />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search trips…" aria-label="Search trips" />
        </label>
        <label className="sel">
          <span className="sr-only">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="short">Duration: shortest</option>
            <option value="long">Duration: longest</option>
            <option value="az">Name: A–Z</option>
          </select>
        </label>
      </div>
      {cats.length > 1 && (
        <div className="pillbar">
          <button className={`pill${cat === 'all' ? ' is-on' : ''}`} onClick={() => setCat('all')}>
            All <span className="n">{items.length}</span>
          </button>
          {cats.map(([c, n]) => (
            <button key={c} className={`pill${cat === c ? ' is-on' : ''}`} onClick={() => setCat(c)}>
              {CAT_LABEL[c]} <span className="n">{n}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const grid = (
    <>
      <p className="count" role="status">
        Showing <b>{list.length}</b> of {items.length} {items.length === 1 ? 'trip' : 'trips'}
      </p>
      {list.length === 0 ? (
        <div className="empty">
          <h3>No trips match that search</h3>
          <p>Try a different keyword, or browse everything we run.</p>
          <button className="btn btn-ghost" onClick={() => { setQ(''); setCat('all'); }}>Clear filters</button>
        </div>
      ) : layout === 'list' ? (
        <div className="listview">{list.map((p) => <TourCard key={p.slug} p={p} />)}</div>
      ) : (
        <div className="grid g-3">{list.map((p, i) => <TourCard key={p.slug} p={p} priority={i < 3} />)}</div>
      )}
    </>
  );

  if (!sidebar) return <>{filters}{grid}</>;

  return (
    <div className={`withside${sidebar === 'left' ? ' side-l' : ' side-r'}`}>
      <aside className="side">
        <div className="railbox">
          <h3>Filter</h3>
          <div className="pillbar" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <button className={`pill${cat === 'all' ? ' is-on' : ''}`} onClick={() => setCat('all')}>
              All trips <span className="n">{items.length}</span>
            </button>
            {cats.map(([c, n]) => (
              <button key={c} className={`pill${cat === c ? ' is-on' : ''}`} onClick={() => setCat(c)}>
                {CAT_LABEL[c]} <span className="n">{n}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="railbox">
          <h3>Search</h3>
          <label className="srch">
            <Search />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search trips…" aria-label="Search trips" />
          </label>
        </div>
        <div className="railbox">
          <h3>Need help choosing?</h3>
          <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
            Tell us your dates and fitness and we’ll match you to the right route.
          </p>
          <Link href="/contact" className="btn btn-primary btn-sm btn-block">Ask a guide</Link>
        </div>
      </aside>
      <div className="side-main">
        <div className="filters">
          <div className="filters-row">
            <label className="sel" style={{ marginLeft: 'auto' }}>
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="short">Duration: shortest</option>
                <option value="long">Duration: longest</option>
                <option value="az">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>
        {grid}
      </div>
    </div>
  );
}
