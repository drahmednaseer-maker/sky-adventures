'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Img } from '@/lib/types';
import { X } from './Icons';

export default function TripGallery({ images, title }: { images: Img[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = images.slice(0, 5);
  const extra = images.length - shown.length;

  const go = useCallback(
    (n: number) => setOpen((c) => (c === null ? c : (n + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(open + 1);
      if (e.key === 'ArrowLeft') go(open - 1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, go]);

  const cur = open === null ? null : images[open];

  return (
    <>
      <div className={`mosaic m-${Math.min(shown.length, 5)}`}>
        {shown.map((g, i) => (
          <button key={g.src} className="mosaic-cell" onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}>
            <Image src={g.src} alt={i === 0 ? `${title} — main photo` : ''} width={g.w} height={g.h}
              quality={80} placeholder="blur" blurDataURL={g.blur} priority={i === 0}
              sizes={i === 0 ? '(max-width: 760px) 94vw, 60vw' : '(max-width: 760px) 47vw, 22vw'} />
            {i === shown.length - 1 && extra > 0 && <span className="mosaic-more">+{extra} photos</span>}
          </button>
        ))}
      </div>

      {cur && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={`${title} gallery`} onClick={() => setOpen(null)}>
          <button className="lb-x" onClick={() => setOpen(null)} aria-label="Close"><X /></button>
          {images.length > 1 && (
            <button className="lb-nav lb-prev" aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); go(open! - 1); }}>‹</button>
          )}
          <Image src={cur.src} alt={`${title} — photo ${open! + 1}`} width={cur.w} height={cur.h}
            quality={85} placeholder="blur" blurDataURL={cur.blur} sizes="96vw" className="lb-img"
            onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button className="lb-nav lb-next" aria-label="Next"
              onClick={(e) => { e.stopPropagation(); go(open! + 1); }}>›</button>
          )}
          <span className="lb-count">{open! + 1} / {images.length}</span>
        </div>
      )}
    </>
  );
}
