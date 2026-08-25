import PageHero from './PageHero';
import TourBrowser from './TourBrowser';
import type { CardProduct, Img } from '@/lib/types';

export default function ListingPage({
  title, sub, items, crumbs, img, layout = 'grid', sidebar = 'left', regions,
}: {
  title: string;
  sub?: string;
  items: CardProduct[];
  crumbs?: { label: string; href?: string }[];
  img?: Img | null;
  layout?: 'grid' | 'list';
  sidebar?: 'left' | 'right';
  regions: { slug: string; name: string }[];
}) {
  return (
    <>
      <PageHero title={title} sub={sub} crumbs={crumbs} img={img} />
      <section className="section">
        <div className="wrap">
          <TourBrowser items={items} regions={regions} layout={layout} sidebar={sidebar} />
        </div>
      </section>
    </>
  );
}
