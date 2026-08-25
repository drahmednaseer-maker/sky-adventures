import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { Arrow, Clock } from '@/components/Icons';
import { posts } from '@/lib/posts';
import { products, site } from '@/lib/site';

export const metadata = {
  title: 'Blog — Travel Tips and Advice',
  description:
    'Gear lists, seasons, altitude and route advice for trekking and climbing in Pakistan, written by the guides who run the trips.',
  alternates: { canonical: '/blog' },
};

const IMGS = [site.gear_img, site.hero_img, site.k2_img];

export default function Blog() {
  return (
    <>
      <PageHero
        title="Travel Tips and Advice"
        sub="Notes from our guides on gear, seasons, altitude and getting the most out of a trip to the Karakoram."
        img={site.gear_img}
        crumbs={[{ label: 'Blog' }]}
      />
      <section className="section">
        <div className="wrap">
          <div className="grid g-3">
            {posts.map((p, i) => {
              const img = IMGS[i % IMGS.length];
              return (
                <article key={p.slug} className="card">
                  <div className="card-media" style={{ aspectRatio: '16 / 10' }}>
                    <Image src={img.src} alt="" width={img.w} height={img.h}
                      placeholder="blur" blurDataURL={img.blur}
                      sizes="(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 380px" quality={80} priority={i === 0} />
                    <span className="badge">{p.tag}</span>
                    <Link href={`/blog/${p.slug}`} className="card-hit" aria-label={p.title} />
                  </div>
                  <div className="card-body">
                    <div className="meta-row">
                      <span className="meta-item"><Clock />{p.readMins} min read</span>
                      <time dateTime={p.date}>
                        {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                    </div>
                    <h2 className="card-title"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
                    <p style={{ fontSize: 14.5, color: 'var(--muted)' }}>{p.excerpt}</p>
                    <div className="card-foot">
                      <Link href={`/blog/${p.slug}`} className="btn btn-ghost btn-sm">Read article <Arrow /></Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="cta-strip">
            <div>
              <h2>Planning a trip rather than reading about one?</h2>
              <p>We run {products.length} trekking, climbing and cultural itineraries across Pakistan.</p>
            </div>
            <Link href="/tour" className="btn btn-primary">Browse all trips <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
