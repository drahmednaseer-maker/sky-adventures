'use client';

import { useState } from 'react';
import type { Day } from '@/lib/types';
import { Chevron } from './Icons';

/** Normalises "Day-1", "Day 01:", "Day 12:" etc. to a bare number for the marker. */
const dayNumber = (raw: string, i: number) => {
  const m = raw.match(/\d+/);
  return m ? m[0].replace(/^0+(?=\d)/, '') : String(i + 1);
};

export default function Itinerary({ days }: { days: Day[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const expandable = days.some((d) => d.body.trim());
  const [all, setAll] = useState(false);
  const visible = all || days.length <= 10 ? days : days.slice(0, 10);

  return (
    <>
      <ol className="tline">
        {visible.map((d, i) => {
          const body = d.body.trim();
          const isOpen = open === i && Boolean(body);
          return (
            <li key={i} className={isOpen ? 'is-open' : undefined}>
              <span className="tline-mark" aria-hidden="true">{dayNumber(d.day, i)}</span>
              {body ? (
                <div className="tline-card">
                  <button className="tline-hd" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>
                      <em>{d.day || `Day ${i + 1}`}</em>
                      <b>{d.title}</b>
                    </span>
                    <Chevron className={isOpen ? 'cv up' : 'cv'} />
                  </button>
                  <div className="tline-bd" hidden={!isOpen}><p>{body}</p></div>
                </div>
              ) : (
                <div className="tline-card tline-static">
                  <div className="tline-hd">
                    <span>
                      <em>{d.day || `Day ${i + 1}`}</em>
                      <b>{d.title}</b>
                    </span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {days.length > 10 && !all && (
        <button className="btn btn-ghost tline-more" onClick={() => setAll(true)}>
          Show all {days.length} days
        </button>
      )}

      {!expandable && (
        <p className="tline-note">
          Altitudes, walking hours and overnight arrangements for each stage are set out in the full
          itinerary we send with your quote.
        </p>
      )}
    </>
  );
}
