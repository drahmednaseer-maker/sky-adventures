import Link from 'next/link';
import Image from 'next/image';
import type { Img } from '@/lib/types';

export default function PageHero({
  title, sub, crumbs = [], img,
}: {
  title: string;
  sub?: string;
  crumbs?: { label: string; href?: string }[];
  img?: Img | null;
}) {
  return (
    <section className="phero">
      {img && (
        <Image src={img.src} alt="" width={img.w} height={img.h} priority sizes="100vw"
          placeholder="blur" blurDataURL={img.blur} className="phero-bg" />
      )}
      <div className="phero-veil" />
      <div className="wrap phero-in">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <i aria-hidden="true">/</i>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <b>{c.label}</b>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </section>
  );
}
