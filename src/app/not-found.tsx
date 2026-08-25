import Link from 'next/link';
import { Arrow } from '@/components/Icons';
import { products } from '@/lib/site';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="notice center" style={{ alignItems: 'center' }}>
          <p className="e404">404</p>
          <h1 style={{ fontSize: 'clamp(24px,3.6vw,36px)' }}>That page has wandered off the trail</h1>
          <p>The link may be old, or the page may have moved. Everything we run is still here:</p>
          <div className="notice-btns" style={{ justifyContent: 'center' }}>
            <Link href="/tour" className="btn btn-primary">All {products.length} trips <Arrow /></Link>
            <Link href="/" className="btn btn-ghost">Back to home</Link>
            <Link href="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
