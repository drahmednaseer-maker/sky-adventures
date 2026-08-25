'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Img } from '@/lib/types';
import { X } from './Icons';

export default function Gallery({ images, title }: { images: Img[]; title: string }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const main = images[i];

  const go = useCallback((n: number) => setI((c) => (n + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, i, go]);

  return (
    <>
      <div className="gal">
        <button className="gal-main" onClick={() => setOpen(true)} aria-label="Open image full size">
          <Image key={main.src} src={main.src} alt={`${title} — photo ${i + 1} of ${images.length}`}
            width={main.w} height={main.h} placeholder="blur" blurDataURL={main.blur}
            sizes="(max-width: 1000px) 94vw, 760px" priority />
          <span className="gal-count">{i + 1} / {images.length}</span>
        </button>
        {images.length > 1 && (
          <div className="gal-thumbs" role="tablist" aria-label="Gallery thumbnails">
            {images.map((g, n) => (
              <button key={g.src} role="tab" aria-selected={n === i} aria-label={`Photo ${n + 1}`}
                className={n === i ? 'is-on' : undefined} onClick={() => setI(n)}>
                <Image src={g.src} alt="" width={140} height={100}
                  placeholder="blur" blurDataURL={g.blur} sizes="120px" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={`${title} gallery`} onClick={() => setOpen(false)}>
          <button className="lb-x" onClick={() => setOpen(false)} aria-label="Close"><X /></button>
          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); go(i - 1); }} aria-label="Previous">‹</button>
          <Image src={main.src} alt={`${title} — photo ${i + 1}`} width={main.w} height={main.h}
            placeholder="blur" blurDataURL={main.blur} sizes="96vw" className="lb-img"
            onClick={(e) => e.stopPropagation()} />
          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); go(i + 1); }} aria-label="Next">›</button>
          <span className="lb-count">{i + 1} / {images.length}</span>
        </div>
      )}
    </>
  );
}
