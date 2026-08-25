import Link from 'next/link';
import Image from 'next/image';
import { CAT_LABEL, type CardProduct, rating, reviewCount } from '@/lib/types';
import { Clock, Peak, Star } from './Icons';

const SIZES = '(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 380px';

export default function TourCard({ p, priority = false }: { p: CardProduct; priority?: boolean }) {
  const img = p.img;
  const alt = `${p.title} — ${CAT_LABEL[p.cat]} in Pakistan`;
  return (
    <article className="card">
      <div className="card-media">
        <span className="badge">{CAT_LABEL[p.cat]}</span>
        {p.duration && <span className="badge badge-r">{p.duration}</span>}
        {img ? (
          <Image src={img.src} alt={alt} width={img.w} height={img.h} sizes={SIZES}
            quality={80} placeholder="blur" blurDataURL={img.blur} priority={priority}
            loading={priority ? undefined : 'lazy'} />
        ) : <div className="ph" aria-hidden="true" />}
        <Link href={`/product/${p.slug}`} className="card-hit" aria-label={p.title} />
      </div>
      <div className="card-body">
        <div className="row" style={{ gap: 8 }}>
          <span className="stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
          </span>
          <span className="muted" style={{ fontSize: 13 }}>
            {rating(p).toFixed(1)} ({reviewCount(p)})
          </span>
        </div>
        <h3 className="card-title"><Link href={`/product/${p.slug}`}>{p.title}</Link></h3>
        <div className="meta-row">
          {p.duration && <span className="meta-item"><Clock />{p.duration}</span>}
          <span className="meta-item"><Peak />{p.difficulty}</span>
        </div>
        <div className="card-foot">
          {p.price
            ? <span className="price">{p.price} <small>/ person</small></span>
            : <span className="price-ask">Request a quote</span>}
          <Link href={`/product/${p.slug}`} className="btn btn-ghost btn-sm">Explore</Link>
        </div>
      </div>
    </article>
  );
}
