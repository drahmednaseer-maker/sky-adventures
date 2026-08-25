import ListingPage from '@/components/ListingPage';
import { destinations, products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'Shop',
  description: 'All Sky Adventures trips available to book — treks, expeditions and tours.',
  alternates: { canonical: '/shop' },
};

export default function Page() {
  return (
    <ListingPage
      title="Shop"
      sub="All Sky Adventures trips available to book — treks, expeditions and tours."
      items={slimAll(products)}
      regions={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
      img={site.hero_img2}
      crumbs={[{ label: 'Shop' }]}
      layout="grid"
      sidebar="left"
    />
  );
}
