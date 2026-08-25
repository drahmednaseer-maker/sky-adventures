import Link from 'next/link';
import PageHero from './PageHero';
import { Arrow } from './Icons';
import { site } from '@/lib/site';

export default function InfoPage({
  title, sub, crumbs, children, cta = true,
}: {
  title: string; sub?: string; crumbs?: { label: string; href?: string }[];
  children: React.ReactNode; cta?: boolean;
}) {
  return (
    <>
      <PageHero title={title} sub={sub} crumbs={crumbs} img={site.hero_img2} />
      <section className="section">
        <div className="wrap">
          <div className="prose">{children}</div>
          {cta && (
            <div className="cta-strip" style={{ marginTop: 44 }}>
              <div>
                <h2>Questions about any of this?</h2>
                <p>We answer every enquiry ourselves, usually within 24 hours.</p>
              </div>
              <Link href="/contact" className="btn btn-primary">Contact us <Arrow /></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
