import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NAV, SITE_URL, contact, site } from '@/lib/site';
import './globals.css';
import './ui.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sky Adventures — Treks, Tours & Expeditions in Pakistan',
    template: '%s | Sky Adventures',
  },
  description:
    'Native Pakistani mountain operator with 15 years guiding the Karakoram, Himalaya and Hindu Kush. K2 Base Camp treks, 8000m expeditions and cultural tours.',
  keywords: ['K2 Base Camp Trek', 'Pakistan trekking', 'Karakoram expedition', 'Gilgit Baltistan tours', 'Gasherbrum', 'Nanga Parbat', 'Hunza tour'],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Sky Adventures — Treks, Tours & Expeditions in Pakistan',
    description: 'Native experts guiding the Karakoram, Himalaya and Hindu Kush for over 15 years.',
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0b1220',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: site.name,
    description: site.about_short,
    url: SITE_URL,
    telephone: site.phone,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Skardu', addressRegion: 'Gilgit-Baltistan', addressCountry: 'PK' },
    sameAs: [site.facebook],
    areaServed: 'Pakistan',
  };
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header nav={NAV} site={contact} />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
