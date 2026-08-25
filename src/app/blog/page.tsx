import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PostList from '@/components/PostList';
import { Arrow, Phone } from '@/components/Icons';
import { allTags, posts, sorted } from '@/lib/posts';
import { catalogue as c, site } from '@/lib/site';

export const metadata = {
  title: 'Blog — Travel Tips and Advice',
  description:
    'Gear lists, seasons, permits, altitude and route advice for trekking and climbing in Pakistan, written by the guides who run the trips.',
  alternates: { canonical: '/blog' },
};

export default function Blog() {
  return (
    <>
      <PageHero
        title="Travel tips and advice"
        sub={`${posts.length} notes from our guides on gear, seasons, permits and altitude — the things we end up explaining on every trip.`}
        img={site.gear_img}
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="section">
        <div className="wrap">
          <PostList posts={sorted} tags={allTags} />

          <div className="cta-strip">
            <div>
              <h2>Planning a trip rather than reading about one?</h2>
              <p>
                We run {c.trips} trekking, climbing and cultural itineraries across {c.regions} regions
                of Pakistan.
              </p>
            </div>
            <div className="row">
              <Link href="/tour" className="btn btn-primary">Browse all trips <Arrow /></Link>
              <a className="btn btn-light" href={`tel:${site.phone_href}`}><Phone /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
