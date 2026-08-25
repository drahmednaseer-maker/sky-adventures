'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SiteContact } from '@/lib/types';
import { Arrow, Check, Clock, Mail, Peak, Whats, X } from './Icons';

type Trip = { slug: string; title: string; cat: string; duration: string | null };

const PEOPLE = ['1', '2', '3–4', '5–8', '9–12', '12+'];

export default function ContactForm({ trips, site }: { trips: Trip[]; site: SiteContact }) {
  const [sent, setSent] = useState<null | 'email' | 'whatsapp'>(null);
  const [touched, setTouched] = useState(false);
  const [data, setData] = useState({
    name: '', email: '', phone: '', trip: '', people: '2', dates: '', msg: '',
  });
  const topRef = useRef<HTMLElement>(null);

  /* Product pages link here as /contact?trip=<slug>. Read it from the URL rather than
     useSearchParams so the page stays fully static with no client-side bailout. */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('trip');
    if (!slug) return;
    const match = trips.find((t) => t.slug === slug);
    if (match) setData((d) => ({ ...d, trip: match.title }));
  }, [trips]);

  const picked = useMemo(() => trips.find((t) => t.title === data.trip) ?? null, [data.trip, trips]);
  const set = (k: keyof typeof data) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData({ ...data, [k]: e.target.value });

  const valid = data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email);

  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    `Trip: ${data.trip || 'Not decided — please recommend'}`,
    `Travellers: ${data.people}`,
    `Dates: ${data.dates || 'Flexible'}`,
    '',
    data.msg || '(no additional notes)',
  ].join('\n');

  const subject = `Trip enquiry — ${data.trip || 'Pakistan'}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const wa = `https://wa.me/${site.phone_href.replace('+', '')}?text=${encodeURIComponent(body)}`;

  const submit = (how: 'email' | 'whatsapp') => {
    setTouched(true);
    if (!valid) return;
    if (how === 'email') window.location.href = mailto;
    else window.open(wa, '_blank', 'noopener,noreferrer');
    setSent(how);
    topRef.current?.scrollIntoView({ block: 'nearest' });
  };

  if (sent) {
    return (
      <div className="formcard formcard-done" ref={topRef as React.RefObject<HTMLDivElement>}>
        <span className="done-i"><Check /></span>
        <h2>Your enquiry is ready to send</h2>
        <p>
          {sent === 'email'
            ? 'We’ve opened your email app with everything filled in. If nothing opened, use the buttons below.'
            : 'We’ve opened WhatsApp in a new tab with your details. If it didn’t open, use the buttons below.'}
        </p>
        <div className="stack">
          <a className="btn btn-primary btn-block" href={wa} target="_blank" rel="noopener noreferrer">
            <Whats /> Send on WhatsApp
          </a>
          <a className="btn btn-ghost btn-block" href={mailto}>
            <Mail /> Send by email
          </a>
          <button type="button" className="btn btn-ghost btn-block" onClick={() => setSent(null)}>
            Edit my details
          </button>
        </div>
        <p className="fineprint">A guide who has run the route will reply, usually within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="formcard" ref={topRef as React.RefObject<HTMLFormElement>} onSubmit={(e) => { e.preventDefault(); submit('email'); }} noValidate>
      <div className="formcard-hd">
        <h2>Request a free itinerary</h2>
        <p>Tell us what you’re after and we’ll come back with a costed, day-by-day plan.</p>
      </div>

      {picked && (
        <div className="trip-chip">
          <span className="trip-chip-i"><Peak /></span>
          <span className="trip-chip-t">
            <em>Enquiring about</em>
            <b>{picked.title}</b>
            <i>{[picked.cat, picked.duration].filter(Boolean).join(' · ')}</i>
          </span>
          <button type="button" aria-label="Clear selected trip"
            onClick={() => setData({ ...data, trip: '' })}><X /></button>
        </div>
      )}

      <div className="f-row">
        <label className="fld">
          <span>Your name <b aria-hidden="true">*</b></span>
          <input required value={data.name} onChange={set('name')} autoComplete="name"
            placeholder="Jane Walker"
            aria-invalid={touched && data.name.trim().length < 2 ? true : undefined} />
          {touched && data.name.trim().length < 2 && <em className="fld-err">Please tell us your name.</em>}
        </label>
        <label className="fld">
          <span>Email <b aria-hidden="true">*</b></span>
          <input required type="email" value={data.email} onChange={set('email')} autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={touched && !/\S+@\S+\.\S+/.test(data.email) ? true : undefined} />
          {touched && !/\S+@\S+\.\S+/.test(data.email) && <em className="fld-err">We need a valid email to reply.</em>}
        </label>
      </div>

      <div className="f-row">
        <label className="fld">
          <span>Phone / WhatsApp</span>
          <input type="tel" value={data.phone} onChange={set('phone')} autoComplete="tel"
            placeholder="+44 7700 900000" />
        </label>
        <label className="fld">
          <span>Travellers</span>
          <select value={data.people} onChange={set('people')}>
            {PEOPLE.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>

      {!picked && (
        <label className="fld">
          <span>Which trip?</span>
          <select value={data.trip} onChange={set('trip')}>
            <option value="">Not decided yet — recommend something</option>
            {trips.map((t) => <option key={t.slug} value={t.title}>{t.title}</option>)}
          </select>
        </label>
      )}

      <label className="fld">
        <span>Preferred dates</span>
        <input value={data.dates} onChange={set('dates')} placeholder="e.g. July 2026, or flexible" />
      </label>

      <label className="fld">
        <span>Anything else?</span>
        <textarea rows={4} value={data.msg} onChange={set('msg')}
          placeholder="Fitness and altitude experience, budget, must-see places…" />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-block">Send by email <Arrow /></button>
        <button type="button" className="btn btn-ghost btn-block" onClick={() => submit('whatsapp')}>
          <Whats /> Send on WhatsApp
        </button>
      </div>

      {touched && !valid && (
        <p className="form-err" role="alert">Add your name and a valid email, then send.</p>
      )}

      <p className="fineprint">
        <Clock /> Replies usually within 24 hours. We only use your details to answer this enquiry —
        see our <Link href="/privacy-policy-2">privacy policy</Link>.
      </p>
    </form>
  );
}
