# Sky Adventures

A rebuild of [skyadventures.com.pk](https://skyadventures.com.pk) — a Pakistani mountain travel
operator running treks, expeditions and cultural tours in the Karakoram, Himalaya and Hindu Kush.

Same pages, same URLs, same content — rebuilt as a fully static Next.js site.

## Why it's fast

| | |
| --- | --- |
| **Every page is pre-rendered** | 62 static HTML pages, no server work at request time. |
| **~8.6 KB of CSS** | Hand-written design system, no framework, no runtime CSS-in-JS. |
| **~102 KB shared JS** | Essentially the React/Next baseline. Only four small client components ship JS: header, gallery, itinerary and the filter grid. |
| **Images 65% smaller** | All 116 originals converted to WebP (30.1 MB → 10.6 MB), served through `next/image` as AVIF/WebP at device-appropriate sizes with inline blur placeholders. |
| **No third-party requests** | The original loaded WordPress, WooCommerce, Elementor, jQuery, Facebook SDK and Google Fonts. This ships none of them — the font is self-hosted. |
| **Slim payloads** | Client components receive a narrowed `CardProduct` shape, keeping descriptions and 28 itineraries out of the RSC payload. |

## Responsive

Fluid type and spacing via `clamp()`, CSS Grid with `auto-fit`/`minmax` everywhere, and a
layout verified from 320px through 1440px with no horizontal overflow. Touch targets are ≥44px,
the nav collapses to a drawer below 1080px, and `prefers-reduced-motion` is respected.

## Structure

```
src/
  app/            routes — one folder per page, mirroring the original URLs
  components/     Header, Footer, TourCard, TourGrid, Gallery, Itinerary, …
  lib/
    site.ts       data access (server)
    types.ts      types + pure helpers (safe for client components)
    data.json     all 28 trips, destinations, categories, testimonials
    posts.ts      blog articles
tools/            one-off content-migration scripts (see tools/README.md)
public/img/       116 optimised WebP images
```

## URL parity

Every URL on the original site resolves. Products, categories and the `tour_destination`
taxonomy keep their exact paths; legacy WordPress paths (`/tripgo/blog`, `/sample-page`,
`/cart-2`, feeds, `xmlrpc.php`) are 308-redirected, and `middleware.ts` normalises the
capitalised product slugs the original menu linked to.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```
