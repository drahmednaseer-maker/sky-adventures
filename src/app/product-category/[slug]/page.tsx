import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ListingPage from '@/components/ListingPage';
import { byCat, categories, slimAll } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.name} in Pakistan`,
    description: c.blurb,
    alternates: { canonical: `/product-category/${c.slug}` },
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
      img={full[0]?.gallery[0] ?? null}
      crumbs={[{ label: 'Adventures', href: '/tour' }, { label: c.name }]} />
  );
}
