import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { Facebook, Mail, Phone, Pin, Whats } from '@/components/Icons';
import { contact, site, tripOptions } from '@/lib/site';

export const metadata = {
  title: 'Contact Us',
  description:
    'Talk to Sky Adventures in Skardu, Gilgit-Baltistan. Call, WhatsApp or email us for a free, costed itinerary for any trek, expedition or tour in Pakistan.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contact Us"
        sub="We are at your disposal 7 days a week. Tell us what you want to climb or walk, and we’ll send a costed day-by-day itinerary."
        img={site.hero_img2}
        crumbs={[{ label: 'Contact Us' }]}
      />

      <section className="section">
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2 className="h-sec">Plan your trip with a native guide</h2>
            <p className="sub-sec">
              Every enquiry is answered by someone who has actually walked the route. No call centre, no
              obligation, and no deposit until your itinerary is confirmed in writing.
            </p>

            <ul className="cinfo">
              <li>
                <span><Phone /></span>
                <div><b>Phone</b><a href={`tel:${site.phone_href}`}>{site.phone}</a></div>
              </li>
              <li>
                <span><Whats /></span>
                <div><b>WhatsApp</b>
                  <a href={`https://wa.me/${site.phone_href.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li>
                <span><Mail /></span>
                <div><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></div>
              </li>
              <li>
                <span><Pin /></span>
                <div><b>Office</b><span>{site.address}</span></div>
              </li>
              <li>
                <span><Facebook /></span>
                <div><b>Facebook</b>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer">skyadventures.com.pk</a>
                </div>
              </li>
            </ul>

            <div className="railbox" style={{ marginTop: 28 }}>
              <h3>Response time</h3>
              <p className="muted" style={{ fontSize: 14.5 }}>
                We reply to most enquiries within 24 hours. During the June–September climbing season our
                lead guides are often on the mountain, so WhatsApp is the fastest way to reach us.
              </p>
            </div>
          </div>

          <ContactForm trips={tripOptions} site={contact} />
        </div>
      </section>
    </>
  );
}
