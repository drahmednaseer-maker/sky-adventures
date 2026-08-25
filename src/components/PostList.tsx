'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { Post } from '@/lib/posts';
import { Arrow, Clock } from './Icons';

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function PostCard({ p, priority = false }: { p: Post; priority?: boolean }) {
  return (
    <article className="pcard">
      <div className="pcard-media">
        <Image src={p.img.src} alt="" width={p.img.w} height={p.img.h} quality={80}
          placeholder="blur" blurDataURL={p.img.blur} priority={priority}
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 380px" />
        <span className="pcard-tag">{p.tags[0]}</span>
        <Link href={`/blog/${p.slug}`} className="card-hit" aria-label={p.title} />
      </div>
      <div className="pcard-body">
        <p className="pcard-meta">
          <time dateTime={p.date}>{fmt(p.date)}</time>
          <span><Clock /> {p.readMins} min</span>
        </p>
        <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
        <p className="pcard-ex">{p.excerpt}</p>
        <span className="pcard-go">Read article <Arrow /></span>
      </div>
    </article>
  );
}

export default function PostList({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [tag, setTag] = useState<string>('all');

  const list = useMemo(
    () => (tag === 'all' ? posts : posts.filter((p) => p.tags.includes(tag))),
    [tag, posts],
  );
  const [lead, ...rest] = list;

  return (
    <>
      <div className="pillbar blog-filter">
        <button className={`pill${tag === 'all' ? ' is-on' : ''}`} onClick={() => setTag('all')}>
          All <span className="n">{posts.length}</span>
        </button>
        {tags.map((t) => {
          const n = posts.filter((p) => p.tags.includes(t)).length;
          return (
            <button key={t} className={`pill${tag === t ? ' is-on' : ''}`} onClick={() => setTag(t)}>
              {t} <span className="n">{n}</span>
            </button>
          );
        })}
      </div>

      {lead && (
        <Link href={`/blog/${lead.slug}`} className="plead">
          <div className="plead-media">
            <Image src={lead.img.src} alt="" width={lead.img.w} height={lead.img.h} quality={82}
              placeholder="blur" blurDataURL={lead.img.blur} priority
              sizes="(max-width: 900px) 94vw, 620px" />
          </div>
          <div className="plead-body">
            <span className="plead-badge">Latest</span>
            <p className="pcard-meta">
              <time dateTime={lead.date}>{fmt(lead.date)}</time>
              <span><Clock /> {lead.readMins} min read</span>
            </p>
            <h2>{lead.title}</h2>
            <p className="plead-ex">{lead.excerpt}</p>
            <span className="pcard-go">Read article <Arrow /></span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="grid g-3 blog-grid">
          {rest.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
      )}
    </>
  );
}
