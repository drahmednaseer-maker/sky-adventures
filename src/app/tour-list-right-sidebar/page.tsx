import ListingPage from '@/components/ListingPage';
import { destinations, products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'Tour List Right Sidebar',
  description: 'Browse all trips with filters on the right.',
  alternates: { canonical: '/tour-list-right-sidebar' },
};

export default function Page() {
  return (
    <ListingPage
      title="Tour List Right Sidebar"
      sub="Browse all trips with filters on the right."
      items={slimAll(products)}
      regions={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
      img={site.hero_img2}
      crumbs={[{ label: 'Tour List Right Sidebar' }]}
      layout="grid"
      sidebar="right"
    />
  );
}
