import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import TourGrid from '@/components/TourGrid';
import TourCard from '@/components/TourCard';
import { Arrow } from '@/components/Icons';
import { byDest, destinations, products, slimAll } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return destinations.map((d) => ({ slug: d.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) return {};
  return {
    title: `${d.name} tours & treks`,
    description: d.blurb,
    alternates: { canonical: `/tour_destination/${d.slug}` },
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
            <TourGrid items={items} />
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
