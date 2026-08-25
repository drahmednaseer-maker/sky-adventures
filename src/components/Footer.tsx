import Link from 'next/link';
import { byCat, categories, destinations, site } from '@/lib/site';
import { Facebook, Mail, Phone, Pin, Whats } from './Icons';

export default function Footer() {
  const year = 2026;
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div className="ftr-col ftr-about">
          <Link href="/" className="ftr-brand">Sky<span>Adventures</span></Link>
          <p>{site.about_short}</p>
          <div className="ftr-social">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href={`https://wa.me/${site.phone_href.replace('+', '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Whats /></a>
            <a href={`mailto:${site.email}`} aria-label="Email"><Mail /></a>
          </div>
        </div>

        <div className="ftr-col">
          <h3>Adventures</h3>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/product-category/${c.slug}`}>{c.name} <span>({byCat(c.slug).length})</span></Link>
              </li>
            ))}
            <li><Link href="/tour">All tours</Link></li>
            <li><Link href="/shop">Shop</Link></li>
          </ul>
        </div>

        <div className="ftr-col">
          <h3>Destinations</h3>
          <ul>
            {destinations.slice(0, 7).map((d) => (
              <li key={d.slug}><Link href={`/tour_destination/${d.slug}`}>{d.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="ftr-col">
          <h3>Company</h3>
          <ul>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/privacy-policy-2">Privacy Policy</Link></li>
            <li><Link href="/refund_returns-2">Refund &amp; Returns</Link></li>
          </ul>
        </div>

        <div className="ftr-col ftr-contact">
          <h3>Contact Info</h3>
          <ul className="ftr-ci">
            <li><Pin /><span>{site.address}</span></li>
            <li><Phone /><a href={`tel:${site.phone_href}`}>{site.phone}</a></li>
            <li><Mail /><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
          <a className="btn btn-primary btn-sm" href={`https://wa.me/${site.phone_href.replace('+', '')}`}
            target="_blank" rel="noopener noreferrer"><Whats /> WhatsApp us</a>
        </div>
      </div>

      <div className="ftr-bot">
        <div className="wrap ftr-bot-in">
          <p>© {year} Sky Adventures Pakistan. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/privacy-policy-2">Privacy</Link>
            <Link href="/refund_returns-2">Refunds</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
