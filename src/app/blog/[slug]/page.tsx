import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import TourCard from '@/components/TourCard';
import { PostCard } from '@/components/PostList';
import { Arrow, Clock, Mail, Peak, Whats } from '@/components/Icons';
import { bySlugPost, posts, sorted } from '@/lib/posts';
import { SITE_URL, bySlug, site, slimAll } from '@/lib/site';

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
    openGraph: {
      title: p.title, description: p.excerpt, type: 'article',
      publishedTime: p.date, images: [{ url: p.img.src }], tags: p.tags,
    },
  };
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlugPost(slug);
  if (!p) notFound();

  const i = sorted.findIndex((x) => x.slug === p.slug);
  const prev = sorted[i + 1] ?? null;
  const next = sorted[i - 1] ?? null;
  const more = sorted.filter((x) => x.slug !== p.slug && x.tags.some((t) => p.tags.includes(t))).slice(0, 2);
  const trips = slimAll(p.trips.map((s) => bySlug(s)).filter((t): t is NonNullable<typeof t> => Boolean(t)));
  const headings = p.body.filter((b) => b.h).map((b) => ({ id: slugify(b.h!), label: b.h! }));

  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.title, description: p.excerpt, datePublished: p.date,
    image: `${SITE_URL}${p.img.src}`,
    keywords: p.tags.join(', '),
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
  };

  return (
    <>
      <PageHero title={p.title} sub={p.excerpt} img={p.img}
        crumbs={[{ label: 'Blog', href: '/blog' }, { label: p.title }]} />

      <article className="section">
        <div className="wrap post-wrap">
          <div>
            <p className="post-meta">
              <time dateTime={p.date}>
                {new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span className="meta-item"><Clock />{p.readMins} min read</span>
              {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </p>

            <div className="prose post-body">
              {p.body.map((b, n) => (
                <div key={n}>
                  {b.h && <h2 id={slugify(b.h)}>{b.h}</h2>}
                  {b.p && <p>{b.p}</p>}
                  {b.ul && <ul>{b.ul.map((x, j) => <li key={j}>{x}</li>)}</ul>}
                </div>
              ))}
            </div>

            {trips.length > 0 && (
              <section className="post-trips">
                <h2>Trips this applies to</h2>
                <div className="grid g-3">{trips.map((t) => <TourCard key={t.slug} p={t} />)}</div>
              </section>
            )}

            <nav className="post-nav" aria-label="More articles">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="post-nav-i post-nav-prev">
                  <em>← Previous</em><b>{prev.title}</b>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/blog/${next.slug}`} className="post-nav-i post-nav-next">
                  <em>Next →</em><b>{next.title}</b>
                </Link>
              )}
            </nav>
          </div>

          <aside className="post-side">
            {headings.length > 1 && (
              <div className="railbox">
                <h3>In this article</h3>
                <ul className="toc">
                  {headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.label}</a></li>)}
                </ul>
              </div>
            )}

            <div className="railbox railbox-alt">
              <h3>Ask a guide</h3>
              <p>
                Every enquiry is answered by someone who has actually run the route — usually within
                24 hours.
              </p>
              <div className="stack">
                <Link href="/contact" className="btn btn-primary btn-sm btn-block">Get an itinerary <Arrow /></Link>
                <a className="btn btn-ghost btn-sm btn-block"
                  href={`https://wa.me/${site.phone_href.replace('+', '')}`}
                  target="_blank" rel="noopener noreferrer"><Whats /> WhatsApp us</a>
              </div>
            </div>

            {more.length > 0 && (
              <div className="railbox">
                <h3>More on this</h3>
                <ul className="linklist">
                  {more.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/blog/${m.slug}`}>{m.title}</Link>
                      <span><Clock /> {m.readMins} min</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
