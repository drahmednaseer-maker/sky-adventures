'use client';

import { useState } from 'react';
import { Arrow, Check, Whats } from './Icons';
import type { SiteContact } from '@/lib/types';

export default function ContactForm({ trips, site }: { trips: { slug: string; title: string }[]; site: SiteContact }) {
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: '', email: '', phone: '', trip: '', people: '2', dates: '', msg: '' });

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData({ ...data, [k]: e.target.value });

  const body = [
    `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone}`,
    `Trip: ${data.trip || 'Not decided'}`, `Travellers: ${data.people}`,
    `Dates: ${data.dates || 'Flexible'}`, '', data.msg,
  ].join('\n');

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Trip enquiry — ${data.trip || 'Pakistan'}`)}&body=${encodeURIComponent(body)}`;
  const wa = `https://wa.me/${site.phone_href.replace('+', '')}?text=${encodeURIComponent(body)}`;

  if (sent) {
    return (
      <div className="formcard formcard-done">
        <span className="done-i"><Check /></span>
        <h3>Your enquiry is ready to send</h3>
        <p>
          We’ve opened your email app with the details filled in. If nothing opened, send it to us directly
          — or message us on WhatsApp for the fastest reply.
        </p>
        <div className="stack">
          <a className="btn btn-primary btn-block" href={mailto}>Open email again</a>
          <a className="btn btn-ghost btn-block" href={wa} target="_blank" rel="noopener noreferrer">
            <Whats /> Send on WhatsApp
          </a>
          <button className="btn btn-ghost btn-block" onClick={() => setSent(false)}>Edit my details</button>
        </div>
      </div>
    );
  }

  return (
    <form className="formcard" onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; setSent(true); }}>
      <h3>Request a free itinerary</h3>
      <p className="muted" style={{ fontSize: 14.5, marginBottom: 20 }}>
        Fill this in and we’ll come back with a costed, day-by-day plan.
      </p>

      <div className="f-row">
        <label className="fld">
          <span>Your name *</span>
          <input required value={data.name} onChange={set('name')} autoComplete="name" placeholder="Jane Walker" />
        </label>
        <label className="fld">
          <span>Email *</span>
          <input required type="email" value={data.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>

      <div className="f-row">
        <label className="fld">
          <span>Phone / WhatsApp</span>
          <input type="tel" value={data.phone} onChange={set('phone')} autoComplete="tel" placeholder="+44 7700 900000" />
        </label>
        <label className="fld">
          <span>Travellers</span>
          <select value={data.people} onChange={set('people')}>
            {['1', '2', '3–4', '5–8', '9–12', '12+'].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>

      <label className="fld">
        <span>Which trip?</span>
        <select value={data.trip} onChange={set('trip')}>
          <option value="">Not decided yet — recommend something</option>
          {trips.map((p) => <option key={p.slug} value={p.title}>{p.title}</option>)}
        </select>
      </label>

      <label className="fld">
        <span>Preferred dates</span>
        <input value={data.dates} onChange={set('dates')} placeholder="e.g. July 2026, or flexible" />
      </label>

      <label className="fld">
        <span>Anything else?</span>
        <textarea rows={4} value={data.msg} onChange={set('msg')}
          placeholder="Fitness and altitude experience, budget, must-see places…" />
      </label>

      <button type="submit" className="btn btn-primary btn-block">Send enquiry <Arrow /></button>
      <a className="btn btn-ghost btn-block" href={wa} target="_blank" rel="noopener noreferrer" style={{ marginTop: 10 }}>
        <Whats /> Or message us on WhatsApp
      </a>
      <p className="fineprint" style={{ marginTop: 14 }}>
        We only use your details to answer this enquiry.
      </p>
    </form>
  );
}
