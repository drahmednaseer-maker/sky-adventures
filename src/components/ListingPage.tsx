import PageHero from './PageHero';
import TourGrid from './TourGrid';
import type { CardProduct, Img } from '@/lib/types';

export default function ListingPage({
  title, sub, items, crumbs, img, layout = 'grid', sidebar = null,
}: {
  title: string;
  sub?: string;
  items: CardProduct[];
  crumbs?: { label: string; href?: string }[];
  img?: Img | null;
  layout?: 'grid' | 'list';
  sidebar?: 'left' | 'right' | null;
}) {
  return (
    <>
      <PageHero title={title} sub={sub} crumbs={crumbs} img={img} />
      <section className="section">
        <div className="wrap">
          <TourGrid items={items} layout={layout} sidebar={sidebar} />
        </div>
      </section>
    </>
  );
}
