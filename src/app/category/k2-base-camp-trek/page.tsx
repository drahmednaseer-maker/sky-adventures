import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { PostCard } from '@/components/PostList';
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
  const k2Posts = posts.filter((p) => p.tags.includes('k2 base camp trek'));
  const trips = slimAll(products.filter((p) => p.title.toLowerCase().includes('k2') || p.slug.includes('k2')));

  return (
    <>
      <PageHero title="k2 base camp trek" sub="Articles, gear notes and departures for the walk to Concordia."
        img={site.k2_img} crumbs={[{ label: 'Blog', href: '/blog' }, { label: 'k2 base camp trek' }]} />
      <section className="section">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Articles</span><h2 className="h-sec">Reading on the Baltoro</h2></div>
          <div className="grid g-3">
            {k2Posts.map((p) => <PostCard key={p.slug} p={p} />)}
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
