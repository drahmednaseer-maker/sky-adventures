import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import TourBrowser from '@/components/TourBrowser';
import TourCard from '@/components/TourCard';
import { Arrow } from '@/components/Icons';
import { SITE_URL, byDest, destinations, products, slimAll } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return destinations.map((d) => ({ slug: d.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) return {};
  const count = byDest(d.slug).length;
  const title = `${d.name} tours & treks`;
  const description = count > 0
    ? `${d.blurb} ${count} guided trips here with native guides — free, costed itineraries.`
    : `${d.blurb} Private, custom journeys on request with native guides — free, costed itineraries.`;
  return {
    title,
    description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: `${title} | Sky Adventures`, description, type: 'website',
      url: `${SITE_URL}/destinations/${d.slug}`,
      images: d.img ? [{ url: d.img.src }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  const items = slimAll(byDest(d.slug));

  return (
    <>
      <PageHero title={d.name} sub={d.blurb} img={d.img}
        crumbs={[{ label: 'Destinations', href: '/tour' }, { label: d.name }]} />
      <section className="section">
        <div className="wrap">
          {items.length > 0 ? (
            <TourBrowser items={items} regions={destinations.map((x) => ({ slug: x.slug, name: x.name }))} />
          ) : (
            <>
              <div className="empty">
                <h3>We don’t have a scheduled trip in {d.name} right now</h3>
                <p>
                  We do run private and custom journeys here on request — tell us your dates and
                  we’ll build an itinerary around them.
                </p>
                <Link href="/contact" className="btn btn-primary">Plan a custom trip <Arrow /></Link>
              </div>
              <div className="sec-head-row" style={{ marginTop: 56 }}>
                <div>
                  <span className="eyebrow">Meanwhile</span>
                  <h2 className="h-sec">Trips running now</h2>
                </div>
                <Link href="/tour" className="btn btn-ghost">All trips <Arrow /></Link>
              </div>
              <div className="grid g-3">
                {slimAll(products.slice(0, 6)).map((p) => <TourCard key={p.slug} p={p} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
