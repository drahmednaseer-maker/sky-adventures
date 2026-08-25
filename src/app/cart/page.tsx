import EnquiryNotice from '@/components/EnquiryNotice';

export const metadata = {
  title: 'Cart',
  description: 'Your saved trips — Sky Adventures Pakistan.',
  alternates: { canonical: '/cart' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EnquiryNotice
      title="Cart"
      sub="Your saved trips"
      note="Bookings here are made by enquiry"
      crumbs={[{ label: 'Cart' }]}
    />
  );
}
