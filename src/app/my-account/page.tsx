import EnquiryNotice from '@/components/EnquiryNotice';

export const metadata = {
  title: 'My account',
  description: 'Manage your booking with us — Sky Adventures Pakistan.',
  alternates: { canonical: '/my-account' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EnquiryNotice
      title="My account"
      sub="Manage your booking with us"
      note="Your booking is managed by your guide"
      crumbs={[{ label: 'My account' }]}
    />
  );
}
