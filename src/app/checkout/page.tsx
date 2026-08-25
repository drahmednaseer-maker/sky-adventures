import EnquiryNotice from '@/components/EnquiryNotice';

export const metadata = {
  title: 'Checkout',
  description: 'Confirm your trip with our team — Sky Adventures Pakistan.',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EnquiryNotice
      title="Checkout"
      sub="Confirm your trip with our team"
      note="Checkout is handled personally"
      crumbs={[{ label: 'Checkout' }]}
    />
  );
}
