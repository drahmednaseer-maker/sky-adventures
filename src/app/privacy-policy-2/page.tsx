import InfoPage from '@/components/InfoPage';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Sky Adventures collects, uses and protects the personal information you share when enquiring about or booking a trip.',
  alternates: { canonical: '/privacy-policy-2' },
};

export default function Page() {
  return (
    <InfoPage title="Privacy Policy" sub="How we handle the information you give us." crumbs={[{ label: 'Privacy Policy' }]}>
      <p><strong>Last updated:</strong> 1 January 2026</p>
      <h2>Who we are</h2>
      <p>Sky Adventures is a travel operator based in Skardu, Gilgit-Baltistan, Pakistan. You can reach us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Contact details you give us — name, email, phone number.</li>
        <li>Trip details — dates, group size, route preferences, and the fitness or experience information you choose to share.</li>
        <li>Information required to obtain permits and visas once a trip is confirmed, including passport details.</li>
        <li>Insurance policy details, which we require before departure on all high-altitude trips.</li>
      </ul>
      <h2>Why we collect it</h2>
      <p>Solely to answer your enquiry, quote and operate your trip, obtain the permits your trip legally requires, and reach you or your emergency contact if something goes wrong on the mountain. We do not sell your data, and we do not use it for advertising.</p>
      <h2>Who we share it with</h2>
      <ul>
        <li>Government bodies where a trekking or climbing permit legally requires it.</li>
        <li>Hotels, airlines and transport providers forming part of your itinerary.</li>
        <li>Emergency and rescue services, if needed during your trip.</li>
      </ul>
      <h2>How long we keep it</h2>
      <p>Enquiry correspondence is kept for up to two years. Booking and permit records are kept for as long as Pakistani tax and tourism regulations require, then deleted.</p>
      <h2>Your rights</h2>
      <p>You can ask us at any time for a copy of what we hold about you, ask us to correct it, or ask us to delete it where we are not legally required to keep it. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days.</p>
      <h2>Cookies</h2>
      <p>This website does not use advertising or tracking cookies, and does not embed third-party trackers.</p>
    </InfoPage>
  );
}
