import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kaloriakalkulator9.hu'),
  title: {
    default: 'Kalória Kalkulátor 2026 – Ingyenes Magyar Kalóriaszámoló',
    template: '%s | KalóriaKalkulátor.hu',
  },
  description:
    'Ingyenes kalória-, BMI-, TDEE- és makró kalkulátor. Számítsa ki napi szükségletét fogyáshoz, súlymegőrzéshez és izomnöveléshez.',
  keywords: [
    'kalória kalkulátor',
    'kalória számítás',
    'napi kalóriaszükséglet',
    'bmi kalkulátor',
    'tdee kalkulátor',
    'makró kalkulátor',
    'fogyás kalória',
    'alapanyagcsere számítás',
  ],
  alternates: {
    canonical: 'https://www.kaloriakalkulator9.hu',
    languages: {
      'hu': 'https://www.kaloriakalkulator9.hu',
      'hu-HU': 'https://www.kaloriakalkulator9.hu',
      'x-default': 'https://www.kaloriakalkulator9.hu',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    url: 'https://www.kaloriakalkulator9.hu',
    siteName: 'KalóriaKalkulátor.hu',
    title: 'Kalória Kalkulátor 2026 – Ingyenes Magyar Kalóriaszámoló',
    description:
      'Ingyenes kalória kalkulátor, BMI, TDEE és makró számítás egy helyen. Fogyáshoz, izomnöveléshez és súlymegőrzéshez.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalória Kalkulátor 2026 – Ingyenes Magyar Kalóriaszámoló',
    description:
      'Számítsa ki pontosan napi kalóriaszükségletét! Alapanyagcsere, PAL-faktor, makrotápanyagok és BMI – egy helyen.',
  },
  robots: { index: true, follow: true },
  authors: [{ name: 'KalóriaKalkulátor.hu', url: 'https://www.kaloriakalkulator9.hu' }],
  // TODO: Add your Google Search Console verification token:
  // verification: { google: 'YOUR_GSC_TOKEN_HERE' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* hreflang - explicit for Hungarian-only site */}
        <link rel="alternate" hrefLang="hu" href="https://www.kaloriakalkulator9.hu" />
        <link rel="alternate" hrefLang="hu-HU" href="https://www.kaloriakalkulator9.hu" />
        <link rel="alternate" hrefLang="x-default" href="https://www.kaloriakalkulator9.hu" />
        <meta name="geo.region" content="HU" />
        <meta name="geo.country" content="Hungary" />
        <meta name="language" content="hu" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V5BK32GTSN" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V5BK32GTSN');
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}