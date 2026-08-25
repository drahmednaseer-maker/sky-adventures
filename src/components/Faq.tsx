'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { FaqGroup } from '@/lib/faq';
import { Chevron, Search, X } from './Icons';

const norm = (s: string) => s.toLowerCase();

export default function Faq({ groups, searchable = false }: { groups: FaqGroup[]; searchable?: boolean }) {
  const [open, setOpen] = useState<string | null>(groups[0]?.items[0]?.id ?? null);
  const [q, setQ] = useState('');
  const first = useRef(true);

  /* Deep links from elsewhere on the site (the contact page links to individual
     answers) should open the question they point at and scroll it into view. */
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.replace('#', ''));
      if (!id) return;
      if (!groups.some((g) => g.items.some((i) => i.id === id))) return;
      setOpen(id);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          block: 'center',
          behavior: first.current ? 'auto' : 'smooth',
        });
        first.current = false;
      });
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [groups]);

  const filtered = useMemo(() => {
    const s = norm(q.trim());
    if (!s) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => norm(i.q).includes(s) || norm(i.a).includes(s)) }))
      .filter((g) => g.items.length);
  }, [q, groups]);

  const hits = filtered.reduce((n, g) => n + g.items.length, 0);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="faq">
      {searchable && (
        <div className="faq-search">
          <label className="srch">
            <Search />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${total} questions…`} aria-label="Search questions" />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="srch-x">
                <X />
              </button>
            )}
          </label>
          {q.trim() && (
            <p className="faq-count" role="status">
              {hits === 0 ? 'No questions match that.' : `${hits} of ${total} questions match.`}
            </p>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty">
          <h3>Nothing matched “{q.trim()}”</h3>
          <p>Try a different word, or just ask us directly — we answer every enquiry ourselves.</p>
          <button className="btn btn-ghost" onClick={() => setQ('')}>Clear search</button>
        </div>
      ) : (
        filtered.map((g) => (
          <section key={g.id} id={g.id} className="faq-g">
            <div className="faq-g-hd">
              <h2>{g.name}</h2>
              <p>{g.blurb}</p>
            </div>
            <div className="faq-list">
              {g.items.map((it) => {
                const isOpen = open === it.id;
                return (
                  <div key={it.id} id={it.id} className={`faq-i${isOpen ? ' is-open' : ''}`}>
                    <h3>
                      <button aria-expanded={isOpen} aria-controls={`${it.id}-a`}
                        onClick={() => setOpen(isOpen ? null : it.id)}>
                        <span>{it.q}</span>
                        <Chevron className={isOpen ? 'cv up' : 'cv'} />
                      </button>
                    </h3>
                    <div className="faq-a" id={`${it.id}-a`} hidden={!isOpen}>
                      <p>{it.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
