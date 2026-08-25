'use client';

import { useState } from 'react';
import type { Day } from '@/lib/types';
import { Chevron } from './Icons';

export default function Itinerary({ days }: { days: Day[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const anyBody = days.some((d) => d.body);

  return (
    <ol className="itin">
      {days.map((d, i) => {
        const isOpen = open === i;
        const hasBody = Boolean(d.body);
        return (
          <li key={i} className={isOpen && hasBody ? 'is-open' : undefined}>
            {hasBody ? (
              <>
                <button className="itin-hd" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="itin-day">{d.day || `Day ${i + 1}`}</span>
                  <span className="itin-t">{d.title}</span>
                  <Chevron className={isOpen ? 'cv up' : 'cv'} />
                </button>
                <div className="itin-bd" hidden={!isOpen}><p>{d.body}</p></div>
              </>
            ) : (
              <div className="itin-hd itin-static">
                <span className="itin-day">{d.day || `Day ${i + 1}`}</span>
                <span className="itin-t">{d.title}</span>
              </div>
            )}
          </li>
        );
      })}
      {!anyBody && (
        <li className="itin-note">
          Detailed stage notes, altitudes and walking hours are included in the full itinerary we send on enquiry.
        </li>
      )}
    </ol>
  );
}
