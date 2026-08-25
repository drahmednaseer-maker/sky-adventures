import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** The original site linked some products with capitalised slugs (e.g. /product/Chogolisa-expedition/).
 *  Normalise those to the canonical lower-case URL instead of 404ing. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = req.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/product/:path*', '/product-category/:path*', '/tour_destination/:path*'] };
