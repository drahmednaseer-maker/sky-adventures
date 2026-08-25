'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { NavItem, SearchItem, SiteContact } from '@/lib/types';
import { Arrow, Chevron, Clock, Facebook, Mail, Menu, Phone, Pin, Search, Whats, X } from './Icons';

export default function Header({
  nav, site, index,
}: { nav: NavItem[]; site: SiteContact; index: SearchItem[] }) {
  const [drawer, setDrawer] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  /* The mega panels are hidden until hover, but they occupy viewport geometry, so
     their featured images would otherwise be fetched eagerly on every page load.
     Only mount them once the visitor first moves toward the nav. */
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);
  const path = usePathname();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { setDrawer(false); setSub(null); setSearch(false); }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const locked = drawer || search;
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDrawer(false); setSub(null); setSearch(false); }
      if (e.key === '/' && !search && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName)) {
        e.preventDefault(); setSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [search]);

  useEffect(() => { if (search) input.current?.focus(); }, [search]);

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return index.slice(0, 6);
    return index.filter((x) => x.t.toLowerCase().includes(s) || x.c.toLowerCase().includes(s)).slice(0, 8);
  }, [q, index]);

  const active = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  const wa = `https://wa.me/${site.phone_href.replace('+', '')}`;

  return (
    <>
      <header className={`hdr${scrolled ? ' is-scrolled' : ' is-top'}`}>
        {/* utility bar — collapses away once you start scrolling */}
        <div className="hdr-util">
          <div className="wrap hdr-util-in">
            <span className="hu-loc"><Pin /> Skardu, Gilgit-Baltistan · Pakistan</span>
            <span className="hu-sep" aria-hidden="true" />
            <a href={`mailto:${site.email}`} className="hu-mail"><Mail /> {site.email}</a>
            <div className="hu-right">
              <span className="hu-season">Karakoram season: Jun–Sep</span>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
              <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Whats /></a>
            </div>
          </div>
        </div>

        <div className="hdr-main">
          <div className="wrap hdr-in">
            <Link href="/" className="brand" aria-label="Sky Adventures — home">
              <Image src={site.logo.src} alt="" width={site.logo.w} height={site.logo.h}
                priority sizes="(max-width: 560px) 30px, 34px" quality={95} className="brand-mark" />
              <span className="brand-txt">
                <b>Sky Adventures</b>
                <i>Treks · Tours · Expeditions</i>
              </span>
            </Link>

            <nav className="nav-d" aria-label="Primary" onPointerEnter={arm} onFocusCapture={arm}>
              <ul>
                {nav.map((item) => (
                  <li key={item.label} className={item.panel ? 'has-panel' : undefined}>
                    <Link href={item.href} aria-current={active(item.href) ? 'page' : undefined}>
                      {item.label}
                      {item.panel && <Chevron className="cv" />}
                    </Link>

                    {item.panel && (
                      <div className="mega">
                        <div className="mega-in">
                          <div className="mega-lead">
                            <h2>{item.label}</h2>
                            <p>{item.panel.blurb}</p>
                            <Link href={item.href} className="mega-all">
                              View all {item.panel.count} <Arrow />
                            </Link>
                          </div>

                          <ul className="mega-list">
                            {item.panel.links.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href}>
                                  <span>{c.label}</span>
                                  {c.meta && <em>{c.meta}</em>}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <Link href={item.panel.featured.href} className="mega-feat">
                            {armed ? (
                              <Image src={item.panel.featured.img.src} alt=""
                                width={item.panel.featured.img.w} height={item.panel.featured.img.h}
                                sizes="260px" quality={80}
                                placeholder="blur" blurDataURL={item.panel.featured.img.blur} />
                            ) : (
                              <span className="mega-feat-ph" aria-hidden="true"
                                style={{ backgroundImage: `url(${item.panel.featured.img.blur})` }} />
                            )}
                            <span className="mega-feat-body">
                              <em>Featured</em>
                              <b>{item.panel.featured.title}</b>
                              <i>{item.panel.featured.meta}</i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hdr-cta">
              <button className="hdr-icon" onClick={() => setSearch(true)} aria-label="Search trips">
                <Search />
              </button>
              <a className="hdr-tel" href={`tel:${site.phone_href}`}>
                <span className="hdr-tel-i"><Phone /></span>
                <span className="hdr-tel-t"><em>Talk to a guide</em><b>{site.phone}</b></span>
              </a>
              <Link href="/contact" className="btn btn-primary btn-sm hdr-book">Book a trip</Link>
              <button className="hdr-icon burger" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer}>
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- search overlay ---------- */}
      {search && (
        <div className="srchlay" role="dialog" aria-modal="true" aria-label="Search trips">
          <div className="srchlay-bg" onClick={() => setSearch(false)} />
          <div className="srchlay-panel">
            <div className="srchlay-top">
              <Search />
              <input ref={input} type="search" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search 28 treks, expeditions and tours…" aria-label="Search trips" />
              <button onClick={() => setSearch(false)} aria-label="Close search"><X /></button>
            </div>
            <div className="srchlay-body">
              <p className="srchlay-lbl">{q.trim() ? `${hits.length} result${hits.length === 1 ? '' : 's'}` : 'Popular right now'}</p>
              {hits.length === 0 ? (
                <p className="srchlay-none">
                  Nothing matched “{q.trim()}”. <Link href="/contact">Ask us</Link> — we run private trips too.
                </p>
              ) : (
                <ul>
                  {hits.map((h) => (
                    <li key={h.h}>
                      <Link href={h.h}>
                        <span className="sr-t">{h.t}</span>
                        <span className="sr-m">
                          <em>{h.c}</em>
                          {h.d && <i><Clock /> {h.d}</i>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/tour" className="srchlay-all">Browse all 28 trips <Arrow /></Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------- mobile drawer ---------- */}
      <div className={`drawer${drawer ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-bg" onClick={() => setDrawer(false)} />
        <div className="drawer-panel">
          <div className="drawer-top">
            <span className="drawer-title">Menu</span>
            <button onClick={() => setDrawer(false)} aria-label="Close menu" className="drawer-x"><X /></button>
          </div>

          <nav className="drawer-nav" aria-label="Mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.label}>
                  {item.panel ? (
                    <>
                      <button className="dr-row" aria-expanded={sub === item.label}
                        onClick={() => setSub(sub === item.label ? null : item.label)}>
                        {item.label}
                        <span className="dr-n">{item.panel.count}</span>
                        <Chevron className={sub === item.label ? 'cv up' : 'cv'} />
                      </button>
                      <div className={`dr-sub${sub === item.label ? ' is-open' : ''}`}>
                        <div>
                          <Link href={item.href} className="dr-all">All {item.label.toLowerCase()}</Link>
                          {item.panel.links.map((c) => (
                            <Link key={c.href} href={c.href}>
                              <span>{c.label}</span>
                              {c.meta && <em>{c.meta}</em>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="dr-row" aria-current={active(item.href) ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="drawer-foot">
            <a className="dr-contact" href={`tel:${site.phone_href}`}>
              <span><Phone /></span><span><em>Talk to a guide</em><b>{site.phone}</b></span>
            </a>
            <div className="dr-btns">
              <Link className="btn btn-primary btn-block" href="/contact">Book a trip</Link>
              <a className="btn btn-ghost btn-block" href={wa} target="_blank" rel="noopener noreferrer">
                <Whats /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
