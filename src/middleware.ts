import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Canonical host — keep in sync with SITE_URL in src/lib/site.ts.
 *  FOLD_VERCEL_ONTO_DOMAIN: flip to `true` at domain cutover so every
 *  *.vercel.app deployment URL 301s onto the live domain. Keep it `false`
 *  while previewing on the Vercel URL — the canonical tag already stops the
 *  preview being indexed as a duplicate, so this is only belt-and-suspenders. */
const CANON_HOST = 'www.skyadventures.com.pk';
const FOLD_VERCEL_ONTO_DOMAIN = false;

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') ?? '';

  // 1. (At cutover) fold any Vercel deployment host onto the canonical domain.
  if (FOLD_VERCEL_ONTO_DOMAIN && host.endsWith('.vercel.app')) {
    url.protocol = 'https:';
    url.host = CANON_HOST;
    return NextResponse.redirect(url, 308);
  }

  // 2. The original site linked some trips with capitalised slugs
  //    (e.g. /tours/Chogolisa-expedition/). Normalise those to lower-case.
  if (/^\/(tours|categories|destinations)\//.test(url.pathname)) {
    const lower = url.pathname.toLowerCase();
    if (lower !== url.pathname) {
      url.pathname = lower;
      return NextResponse.redirect(url, 308);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|img/|favicon.ico|icon.png|apple-icon.png).*)'],
};
