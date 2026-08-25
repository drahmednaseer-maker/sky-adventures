import ListingPage from '@/components/ListingPage';
import { destinations, products, site, slimAll } from '@/lib/site';

export const metadata = {
  title: 'All Tours',
  description: 'Every trek, expedition and cultural journey we run across Pakistan — 28 trips in the Karakoram, Himalaya and Hindu Kush.',
  alternates: { canonical: '/tour' },
};

export default function Page() {
  return (
    <ListingPage
      title="All Tours"
      sub="Every trek, expedition and cultural journey we run across Pakistan — 28 trips in the Karakoram, Himalaya and Hindu Kush."
      items={slimAll(products)}
      regions={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
      img={site.hero_img2}
      crumbs={[{ label: 'All Tours' }]}
      layout="grid"
      sidebar="left"
    />
  );
}
