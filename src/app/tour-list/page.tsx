import ListingPage from '@/components/ListingPage';
import { destinations, products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'Tour List',
  description: 'Browse the full Sky Adventures programme in list view, with duration and grade at a glance.',
  alternates: { canonical: '/tour-list' },
};

export default function Page() {
  return (
    <ListingPage
      title="Tour List"
      sub="Browse the full Sky Adventures programme in list view, with duration and grade at a glance."
      items={slimAll(products)}
      regions={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
      img={site.hero_img2}
      crumbs={[{ label: 'Tour List' }]}
      layout="list"
      sidebar="left"
    />
  );
}
