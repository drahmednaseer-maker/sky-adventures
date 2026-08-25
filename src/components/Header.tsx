'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavItem, SiteContact } from '@/lib/types';
import { Chevron, Menu, Phone, X } from './Icons';

export default function Header({ nav, site }: { nav: NavItem[]; site: SiteContact }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);
  const path = usePathname();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); setSub(null); }, [path]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setSub(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const active = (href: string) => href === '/' ? path === '/' : path.startsWith(href);

  return (
    <>
      <header className={`hdr${solid ? ' is-solid' : ''}`}>
        <div className="wrap hdr-in">
          <Link href="/" className="brand" aria-label={`${site.name} — home`}>
            <Image src={site.logo.src} alt="" width={site.logo.w} height={site.logo.h}
              priority sizes="(max-width: 560px) 30px, 34px" quality={95} className="brand-mark" />
            <span className="brand-txt">
              <b>Sky Adventures</b>
              <i>Treks · Tours · Expeditions</i>
            </span>
          </Link>

          <nav className="nav-d" aria-label="Primary">
            <ul>
              {nav.map((item) => (
                <li key={item.label} className={item.children ? 'has-sub' : undefined}>
                  <Link href={item.href} aria-current={active(item.href) ? 'page' : undefined}>
                    {item.label}
                    {item.children && <Chevron className="cv" />}
                  </Link>
                  {item.children && (
                    <div className="mega" role="group" aria-label={item.label}>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
                        ))}
                      </ul>
                      <Link className="mega-all" href={item.href}>View all {item.label.toLowerCase()} →</Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hdr-cta">
            <a className="hdr-tel" href={`tel:${site.phone_href}`}>
              <Phone /> <span>{site.phone}</span>
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm hdr-book">Book a trip</Link>
            <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" ref={panel}>
        <div className="drawer-bg" onClick={() => setOpen(false)} />
        <div className="drawer-panel">
          <div className="drawer-top">
            <span className="drawer-title">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="drawer-x"><X /></button>
          </div>
          <nav className="drawer-nav" aria-label="Mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button className="dr-row" aria-expanded={sub === item.label}
                        onClick={() => setSub(sub === item.label ? null : item.label)}>
                        {item.label} <Chevron className={sub === item.label ? 'cv up' : 'cv'} />
                      </button>
                      <div className={`dr-sub${sub === item.label ? ' is-open' : ''}`}>
                        <Link href={item.href} className="dr-all">All {item.label.toLowerCase()}</Link>
                        {item.children.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
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
            <a className="btn btn-ghost btn-block" href={`tel:${site.phone_href}`}><Phone /> {site.phone}</a>
            <Link className="btn btn-primary btn-block" href="/contact">Book a trip</Link>
          </div>
        </div>
      </div>
    </>
  );
}
