import ListingPage from '@/components/ListingPage';
import { products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'Tour List Left Sidebar',
  description: 'Browse all trips with filters on the left.',
  alternates: { canonical: '/tour-list-left-sidebar' },
};

export default function Page() {
  return (
    <ListingPage
      title="Tour List Left Sidebar"
      sub="Browse all trips with filters on the left."
      items={slimAll(products)}
      img={site.hero_img2}
      crumbs={[{ label: 'Tour List Left Sidebar' }]}
      layout="grid"
      sidebar={'left'}
    />
  );
}
