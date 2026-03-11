import type { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '../mennyi-kaloria-kell-egy-nap/page.module.css';

export const metadata: Metadata = {
  title: 'Kalória Deficit – Mi Az és Hogyan Alkalmazzuk? | 2026',
  description: 'Mi az a kalória deficit és hogyan segít a fogyásban? Mennyi deficit biztonságos? Tudományos magyarázat és praktikus tippek 2026.',
  keywords: ['kalória deficit', 'kalóriadeficit', 'fogyás kalória deficit', 'kalória hiány'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/kaloria-deficit-mi-az' },
  openGraph: {
    title: 'Kalória Deficit – Mi Az és Hogyan Alkalmazzuk? | 2026',
    description:
      'Mi az a kalória deficit és hogyan segít a fogyásban? Mennyi deficit biztonságos? Tudományos magyarázat és praktikus tippek.',
    url: 'https://www.kaloriakalkulator9.hu/kaloria-deficit-mi-az',
  },
};

const BASE = 'https://www.kaloriakalkulator9.hu';

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kalória Deficit – Mi Az és Hogyan Alkalmazzuk?',
    description: 'Részletes útmutató a kalóriadeficitről és a biztonságos fogyásról.',
    inLanguage: 'hu',
    url: `${BASE}/kaloria-deficit-mi-az`,
    image: `${BASE}/kaloria-deficit-mi-az/opengraph-image`,
    author: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE },
    publisher: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/favicon.png` } },
    datePublished: '2026-01-01',
    dateModified: '2026-03-01',
    wordCount: 650,
    articleSection: 'Fogyás',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/kaloria-deficit-mi-az` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Mekkora kalóriadeficit szükséges a fogyáshoz?', acceptedAnswer: { '@type': 'Answer', text: 'Napi 300–500 kcal deficit az ajánlott tartomány a biztonságos fogyáshoz. Ez heti 0,3–0,5 kg fogyást eredményez.' } },
      { '@type': 'Question', name: 'Mi történik, ha túl nagy a kalóriadeficit?', acceptedAnswer: { '@type': 'Answer', text: 'Nagyon nagy deficit esetén a szervezet lelassítja az anyagcserét, izomfehérjét bont le. Nők esetén 1200 kcal, férfiaknál 1500 kcal alatt ne csökkentse a bevitelt.' } },
    ],
  },
];

const faqItems = [
  { q: 'Mekkora kalóriadeficit szükséges a fogyáshoz?', a: 'Napi 300–500 kcal deficit az ajánlott tartomány a biztonságos fogyáshoz. Ez heti 0,3–0,5 kg fogyást eredményez. Ennél nagyobb deficit (500–1000 kcal) gyorsabb fogyást okoz, de izomvesztéssel és tápanyaghiánnyal járhat.' },
  { q: 'Mi történik, ha túl nagy a kalóriadeficit?', a: 'Nagyon nagy deficit esetén a szervezet lelassítja az anyagcserét, izomfehérjét bont le, és visszaeshet a jojó-effektus. Nők esetén 1200 kcal, férfiaknál 1500 kcal alatt ne csökkentse a bevitelt.' },
  { q: 'Hogyan számolja ki a kalóriadeficitet?', a: 'Kalóriadeficit = TDEE (teljes napi energiafelhasználás) − napi kalóriabevitel. Ha a TDEE-je 2500 kcal és napi 2000 kcal-t eszik, akkor 500 kcal deficit keletkezik.' },
];

export default function KaloriaDeficitPage() {
  return (
    <>
      <StructuredData data={schemas} />

      <div className={styles.articleHero}>
        <div className={styles.container}>
          <Breadcrumb items={[{ name: 'Kalória deficit – mi az?', href: '/kaloria-deficit-mi-az' }]} />
          <h1 className={styles.h1}>Kalória Deficit – Mi Az és Hogyan Alkalmazzuk?</h1>
          <p className={styles.lead}>A kalóriadeficit a fogyás egyetlen tudományosan igazolt alapelve. Ebben a cikkben megmutatjuk, mi az a kalóriadeficit, mekkora hiány biztonságos és hogyan alkalmazza hatékonyan a mindennapi életben.</p>
          <div className={styles.meta}>📖 6 perc olvasás · 2026. január</div>
        </div>
      </div>

      <article className={styles.articleBody}>
        <div className={styles.container}>
          <h2>Mi az a kalória deficit?</h2>
          <p>A <strong>kalóriadeficit</strong> azt jelenti, hogy kevesebb kalóriát visz be a szervezetbe, mint amennyit felhasznál. Az energiaegyenleg egyszerű elve: ha a bevitel kisebb, mint a kiadás, a szervezet tartalékaiból (elsősorban zsírból) fedezi a hiányzó energiát – és fogy.</p>
          <p>Egy kilogramm testzsír kb. <strong>7 700 kcal</strong> energiát tartalmaz. Napi 500 kcal deficittel számítva ez körülbelül <strong>hetente 0,5 kg fogyást</strong> jelent – ez az egészségesnek tartott, fenntartható ütem.</p>

          <h2>Mekkora kalóriadeficit biztonságos?</h2>
          <p>A legtöbb táplálkozástudományi szervezet <strong>napi 300–500 kcal deficitet</strong> ajánl a biztonságos és fenntartható fogyáshoz. Ennél nagyobb deficit (500–1000 kcal) gyorsabb fogyást eredményez, de nagyobb az izomvesztés kockázata is.</p>
          <p><strong>Fontos minimum értékek:</strong> nők esetén soha ne csökkentse a napi bevitelt 1200 kcal alá, férfiaknál az alsó határ 1500 kcal. Ennél kevesebb esetén az anyagcsere lelassul és tápanyaghiány alakulhat ki.</p>

          <div className={styles.ctaBox}>
            <h3>Számítsa ki a személyes kalóriadeficitjét</h3>
            <p>Adja meg adatait és kalória kalkulátorunk kiszámítja a fogyáshoz szükséges bevitelt.</p>
            <Link href="/kaloria-kalkulator" className={styles.ctaBtn}>🔥 Kalória Kalkulátor megnyitása</Link>
          </div>
        </div>
      </article>

      <FaqSection items={faqItems} title="GYIK – Kalória Deficit" />
    </>
  );
}
