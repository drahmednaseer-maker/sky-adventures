'use client';

import { useState } from 'react';
import { Chevron } from './Icons';

type Group = { name: string; items: { q: string; a: string }[] };

export default function Faq({ groups, flat = false }: { groups: Group[]; flat?: boolean }) {
  const [open, setOpen] = useState<string | null>(`0-0`);
  return (
    <div className="faq">
      {groups.map((g, gi) => (
        <section key={g.name || gi} className="faq-g">
          {!flat && g.name && <h2>{g.name}</h2>}
          <div className="faq-list">
            {g.items.map((it, ii) => {
              const id = `${gi}-${ii}`;
              const isOpen = open === id;
              return (
                <div key={id} className={`faq-i${isOpen ? ' is-open' : ''}`}>
                  <h3>
                    <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : id)}>
                      <span>{it.q}</span>
                      <Chevron className={isOpen ? 'cv up' : 'cv'} />
                    </button>
                  </h3>
                  <div className="faq-a" hidden={!isOpen}><p>{it.a}</p></div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
