import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ListingPage from '@/components/ListingPage';
import { SITE_URL, bannerFor, byCat, categories, destinations, slimAll } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return {};
  const count = byCat(c.slug).length;
  const title = `${c.name} in Pakistan`;
  const description = `${c.blurb} ${count} guided trips with native guides and free, costed itineraries.`;
  return {
    title,
    description,
    alternates: { canonical: `/categories/${c.slug}` },
    openGraph: { title: `${title} | Sky Adventures`, description, url: `${SITE_URL}/categories/${c.slug}`, type: 'website' },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  const full = byCat(c.slug);
  const items = slimAll(full);
  return (
    <ListingPage title={c.name} sub={c.blurb} items={items}
      img={full[0] ? bannerFor(full[0]) : null}
      crumbs={[{ label: 'Adventures', href: '/tour' }, { label: c.name }]}
      regions={destinations.map((d) => ({ slug: d.slug, name: d.name }))} />
  );
}
