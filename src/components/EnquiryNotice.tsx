import Link from 'next/link';
import PageHero from './PageHero';
import { Arrow, Mail, Phone, Whats } from './Icons';
import { site } from '@/lib/site';

export default function EnquiryNotice({
  title, sub, note, crumbs,
}: { title: string; sub: string; note: string; crumbs?: { label: string; href?: string }[] }) {
  return (
    <>
      <PageHero title={title} sub={sub} crumbs={crumbs} img={site.hero_img2} />
      <section className="section">
        <div className="wrap">
          <div className="notice">
            <h2>{note}</h2>
            <p>
              Every Sky Adventures trip is quoted for your actual group — dates, numbers, hotel standard and
              route all change the number, so we price each departure individually rather than selling a
              fixed online cart.
            </p>
            <p>Send us an enquiry and you’ll get a costed, day-by-day itinerary back. No deposit is taken until you confirm it.</p>
            <div className="notice-btns">
              <Link href="/contact" className="btn btn-primary">Request an itinerary <Arrow /></Link>
              <a className="btn btn-ghost" href={`https://wa.me/${site.phone_href.replace('+', '')}`}
                target="_blank" rel="noopener noreferrer"><Whats /> WhatsApp us</a>
            </div>
            <div className="notice-ci">
              <a href={`tel:${site.phone_href}`}><Phone /> {site.phone}</a>
              <a href={`mailto:${site.email}`}><Mail /> {site.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
