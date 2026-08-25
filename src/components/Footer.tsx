import Link from 'next/link';
import { byCat, categories, destinations, products, site } from '@/lib/site';
import { Arrow, Check, Facebook, Leaf, Mail, Peak, Phone, Pin, Shield, Whats } from './Icons';

const PROMISES = [
  { icon: Peak, t: '15+ years', d: 'guiding the Karakoram' },
  { icon: Shield, t: 'Safety first', d: 'oxygen, comms, evac plan' },
  { icon: Check, t: 'No middlemen', d: 'book the operator direct' },
  { icon: Leaf, t: 'Responsible', d: 'fair wages, leave no trace' },
];

/** A spread of well-known trips — useful to visitors and to crawlers. */
const popular = [
  ...byCat('trekking').filter((p) => /k2|nanga|rakaposhi|snow lake|4810/i.test(p.title + p.slug)).slice(0, 4),
  ...byCat('expedition').slice(0, 2),
  ...byCat('tour').slice(0, 2),
];

export default function Footer() {
  const wa = `https://wa.me/${site.phone_href.replace('+', '')}`;

  return (
    <footer className="ftr">
      {/* ridgeline divider */}
      <svg className="ftr-ridge" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="ftr-ridge-b" d="M0 96V58L96 32L180 52L268 18L356 46L452 14L548 42L648 20L748 48L844 24L944 52L1044 26L1148 48L1248 22L1348 44L1440 28L1440 96Z" />
        <path className="ftr-ridge-f" d="M0 96V74L112 50L206 70L304 42L402 66L506 36L612 62L714 44L816 70L916 46L1016 72L1118 44L1218 68L1328 42L1440 62L1440 96Z" />
      </svg>

      {/* why-book-with-us strip */}
      <div className="ftr-promise">
        <div className="wrap ftr-promise-in">
          {PROMISES.map(({ icon: I, t, d }) => (
            <div key={t}>
              <span><I /></span>
              <p><b>{t}</b><i>{d}</i></p>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap ftr-grid">
        {/* brand + contact */}
        <div className="ftr-brandcol">
          <Link href="/" className="ftr-brand">Sky<span>Adventures</span></Link>
          <p className="ftr-blurb">{site.about_short}</p>

          <ul className="ftr-ci">
            <li><span><Pin /></span><span>{site.address}</span></li>
            <li><span><Phone /></span><a href={`tel:${site.phone_href}`}>{site.phone}</a></li>
            <li><span><Mail /></span><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>

          <div className="ftr-actions">
            <a className="ftr-wa" href={wa} target="_blank" rel="noopener noreferrer">
              <Whats /> WhatsApp us
            </a>
            <a className="ftr-social" href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook />
            </a>
            <a className="ftr-social" href={`mailto:${site.email}`} aria-label="Email us"><Mail /></a>
          </div>
        </div>

        {/* link columns */}
        <nav className="ftr-col" aria-label="Adventures">
          <h3>Adventures</h3>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/product-category/${c.slug}`}>{c.name}<span>{byCat(c.slug).length}</span></Link>
              </li>
            ))}
            <li><Link href="/tour">All {products.length} trips</Link></li>
            <li><Link href="/shop">Shop</Link></li>
          </ul>
        </nav>

        <nav className="ftr-col" aria-label="Destinations">
          <h3>Destinations</h3>
          <ul>
            {destinations.map((d) => (
              <li key={d.slug}><Link href={`/tour_destination/${d.slug}`}>{d.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="ftr-col" aria-label="Company">
          <h3>Company</h3>
          <ul>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/privacy-policy-2">Privacy Policy</Link></li>
            <li><Link href="/refund_returns-2">Refund &amp; Returns</Link></li>
          </ul>
        </nav>
      </div>

      {/* popular trips */}
      <div className="wrap ftr-pop">
        <h3>Popular trips</h3>
        <ul>
          {popular.map((p) => (
            <li key={p.slug}><Link href={`/product/${p.slug}`}>{p.title}</Link></li>
          ))}
        </ul>
      </div>

      {/* enquiry nudge */}
      <div className="wrap">
        <div className="ftr-cta">
          <div>
            <h3>Not sure which trip fits?</h3>
            <p>Tell us your dates and fitness — a guide who has walked the route will answer.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Get a free itinerary <Arrow /></Link>
        </div>
      </div>

      <div className="ftr-bot">
        <div className="wrap ftr-bot-in">
          <p>© 2026 Sky Adventures Pakistan. All rights reserved.</p>
          <p className="ftr-made"><Peak /> Operated from Skardu, Gilgit-Baltistan</p>
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
