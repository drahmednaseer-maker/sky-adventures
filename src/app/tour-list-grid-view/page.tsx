import ListingPage from '@/components/ListingPage';
import { products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'Tour List Grid View',
  description: 'The full Sky Adventures programme in a grid layout.',
  alternates: { canonical: '/tour-list-grid-view' },
};

export default function Page() {
  return (
    <ListingPage
      title="Tour List Grid View"
      sub="The full Sky Adventures programme in a grid layout."
      items={slimAll(products)}
      img={site.hero_img2}
      crumbs={[{ label: 'Tour List Grid View' }]}
      layout="grid"
      sidebar={null}
    />
  );
}
