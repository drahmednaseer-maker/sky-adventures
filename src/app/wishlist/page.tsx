import EnquiryNotice from '@/components/EnquiryNotice';

export const metadata = {
  title: 'Wishlist',
  description: 'Trips you are considering — Sky Adventures Pakistan.',
  alternates: { canonical: '/wishlist' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EnquiryNotice
      title="Wishlist"
      sub="Trips you are considering"
      note="Save trips by sending us your shortlist"
      crumbs={[{ label: 'Wishlist' }]}
    />
  );
}
