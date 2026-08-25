type P = { className?: string };
const s = {
  width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
};

export const Clock = (p: P) => (<svg {...s} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const Peak = (p: P) => (<svg {...s} {...p}><path d="m3 20 6.5-11 4 6 2.5-4 5 9z" /><path d="m9.5 9 2 3.2" /></svg>);
export const Pin = (p: P) => (<svg {...s} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
export const Users = (p: P) => (<svg {...s} {...p}><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13A4 4 0 0 1 16 11" /></svg>);
export const Star = (p: P) => (<svg {...s} fill="currentColor" stroke="none" {...p}><path d="m12 2 2.9 6.2 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.3l1.2-6.6L2.5 9.1l6.6-.9Z" /></svg>);
export const Phone = (p: P) => (<svg {...s} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>);
export const Mail = (p: P) => (<svg {...s} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>);
export const Arrow = (p: P) => (<svg {...s} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>);
export const Chevron = (p: P) => (<svg {...s} {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const Check = (p: P) => (<svg {...s} {...p}><path d="M20 6 9 17l-5-5" /></svg>);
export const Menu = (p: P) => (<svg {...s} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>);
export const X = (p: P) => (<svg {...s} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>);
export const Shield = (p: P) => (<svg {...s} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>);
export const Compass = (p: P) => (<svg {...s} {...p}><circle cx="12" cy="12" r="10" /><path d="m16 8-2 6-6 2 2-6z" /></svg>);
export const Leaf = (p: P) => (<svg {...s} {...p}><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16Z" /><path d="M6 18c3-3 6-5 10-6" /></svg>);
export const Camp = (p: P) => (<svg {...s} {...p}><path d="M12 4 3 20h18Z" /><path d="M12 4v16" /></svg>);
export const Thermo = (p: P) => (<svg {...s} {...p}><path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z" /></svg>);
export const Route = (p: P) => (<svg {...s} {...p}><circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" /><path d="M9 19h5a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h3" /></svg>);
export const Facebook = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...p}><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" /></svg>);
export const Whats = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...p}><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.2-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l2 1c.3.1.4.2.5.3.1.2.1.7-.2 1.3Z" /></svg>);
export const Search = (p: P) => (<svg {...s} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
