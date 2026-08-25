import Link from 'next/link';
import { Arrow, Check } from '@/components/Icons';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Thank you',
  description: 'Thanks for contacting Sky Adventures — we will be in touch within 24 hours.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="notice center" style={{ alignItems: 'center' }}>
          <span className="done-i"><Check /></span>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)' }}>Thank you</h1>
          <p>Your message is with us. A guide who has actually run the route will reply, usually within 24 hours — check your spam folder if you don’t see us.</p>
          <p>In a hurry? WhatsApp is the fastest way to reach us during the climbing season.</p>
          <div className="notice-btns" style={{ justifyContent: 'center' }}>
            <a className="btn btn-primary" href={`https://wa.me/${site.phone_href.replace('+', '')}`}
              target="_blank" rel="noopener noreferrer">WhatsApp {site.phone}</a>
            <Link href="/tour" className="btn btn-ghost">Browse more trips <Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
