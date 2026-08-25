import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import TourCard from '@/components/TourCard';
import { Arrow, Clock } from '@/components/Icons';
import { posts } from '@/lib/posts';
import { products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'K2 Base Camp Trek — articles & trips',
  description: 'Everything we publish about the K2 Base Camp Trek: gear, seasons, acclimatisation, and the departures we run each summer.',
  alternates: { canonical: '/category/k2-base-camp-trek' },
};

export default function Cat() {
  const k2Posts = posts.filter((p) => p.tag === 'k2 base camp trek' || p.title.toLowerCase().includes('k2'));
  const trips = slimAll(products.filter((p) => p.title.toLowerCase().includes('k2') || p.slug.includes('k2')));

  return (
    <>
      <PageHero title="k2 base camp trek" sub="Articles, gear notes and departures for the walk to Concordia."
        img={site.k2_img} crumbs={[{ label: 'Blog', href: '/blog' }, { label: 'k2 base camp trek' }]} />
      <section className="section">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Articles</span><h2 className="h-sec">Reading on the Baltoro</h2></div>
          <div className="grid g-3">
            {k2Posts.map((p) => (
              <article key={p.slug} className="card">
                <div className="card-media" style={{ aspectRatio: '16 / 10' }}>
                  <Image src={site.gear_img.src} alt="" width={site.gear_img.w} height={site.gear_img.h}
                    placeholder="blur" blurDataURL={site.gear_img.blur} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 380px" quality={80} />
                  <Link href={`/blog/${p.slug}`} className="card-hit" aria-label={p.title} />
                </div>
                <div className="card-body">
                  <div className="meta-row"><span className="meta-item"><Clock />{p.readMins} min read</span></div>
                  <h3 className="card-title"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                  <div className="card-foot">
                    <Link href={`/blog/${p.slug}`} className="btn btn-ghost btn-sm">Read <Arrow /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="sec-head" style={{ marginTop: 56 }}>
            <span className="eyebrow">Departures</span><h2 className="h-sec">K2 trips we run</h2>
          </div>
          <div className="grid g-3">{trips.map((p) => <TourCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
    </>
  );
}
