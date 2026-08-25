import InfoPage from '@/components/InfoPage';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Refund and Returns Policy',
  description: 'Sky Adventures deposit, cancellation and refund terms for treks, expeditions and tours in Pakistan.',
  alternates: { canonical: '/refund_returns-2' },
};

export default function Page() {
  return (
    <InfoPage title="Refund and Returns Policy" sub="Deposits, cancellations and what happens if a trip cannot run."
      crumbs={[{ label: 'Refund and Returns Policy' }]}>
      <p><strong>Last updated:</strong> 1 January 2026</p>
      <h2>Deposits</h2>
      <p>A deposit confirms your place and is used immediately to secure permits, liaison officers, domestic flights and porter contracts. Once those are purchased on your behalf the deposit is non-refundable, because the money has already left us.</p>
      <h2>Cancellation by you</h2>
      <p>The closer to departure a cancellation falls, the more of the trip cost is already committed. Indicative terms, confirmed in writing on your itinerary before any payment:</p>
      <ul>
        <li><strong>More than 90 days before departure</strong> — deposit retained, balance refunded in full.</li>
        <li><strong>60–90 days</strong> — 25% of the trip cost retained.</li>
        <li><strong>30–59 days</strong> — 50% of the trip cost retained.</li>
        <li><strong>Fewer than 30 days</strong> — 100% retained, as staff, permits and logistics are fully committed.</li>
      </ul>
      <h2>Cancellation by us</h2>
      <p>If we cancel a departure for a reason within our control, you receive a full refund including the deposit, or a transfer to another departure at no charge — your choice.</p>
      <h2>Weather, closures and force majeure</h2>
      <p>Mountains close roads and ground flights. Where a trip cannot run for reasons outside anyone’s control we will refund every cost not already committed and work with you to reschedule. This is exactly what travel insurance exists for, and why we require it.</p>
      <h2>Trips cut short</h2>
      <p>If you leave a trip early for personal, medical or fitness reasons, unused services are not refundable — the crew, permits and supplies for your full itinerary have already been paid for.</p>
      <h2>How to request a refund</h2>
      <p>Email <a href={`mailto:${site.email}`}>{site.email}</a> with your booking reference. We acknowledge within 48 hours and process approved refunds within 14 working days by the method you originally paid.</p>
    </InfoPage>
  );
}
