import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { Arrow, Clock } from '@/components/Icons';
import { bySlugPost, posts } from '@/lib/posts';
import { SITE_URL, site } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlugPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: 'article', publishedTime: p.date },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlugPost(slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.title, description: p.excerpt, datePublished: p.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
  };

  return (
    <>
      <PageHero title={p.title} sub={p.excerpt} img={site.gear_img}
        crumbs={[{ label: 'Blog', href: '/blog' }, { label: p.title }]} />
      <article className="section">
        <div className="wrap post-wrap">
          <div className="prose">
            <p className="post-meta">
              <span className="meta-item"><Clock />{p.readMins} min read</span>
              <time dateTime={p.date}>
                {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span className="tag">{p.tag}</span>
            </p>
            {p.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2>{b.h}</h2>}
                {b.p && <p>{b.p}</p>}
                {b.ul && <ul>{b.ul.map((x, j) => <li key={j}>{x}</li>)}</ul>}
              </div>
            ))}
            <div className="cta-strip" style={{ marginTop: 44 }}>
              <div>
                <h2>Want this trip planned properly?</h2>
                <p>Our guides will build the itinerary around your dates and fitness.</p>
              </div>
              <Link href="/contact" className="btn btn-primary">Get an itinerary <Arrow /></Link>
            </div>
          </div>
          <aside className="post-side">
            <div className="railbox">
              <h3>More reading</h3>
              <ul className="linklist">
                {more.map((m) => <li key={m.slug}><Link href={`/blog/${m.slug}`}>{m.title}</Link></li>)}
              </ul>
            </div>
            <div className="railbox">
              <h3>Talk to a guide</h3>
              <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
                Every enquiry is answered by someone who has walked the route.
              </p>
              <Link href="/contact" className="btn btn-primary btn-sm btn-block">Contact us</Link>
            </div>
          </aside>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
