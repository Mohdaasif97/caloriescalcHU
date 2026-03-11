import type { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '../mennyi-kaloria-kell-egy-nap/page.module.css';

export const metadata: Metadata = {
  title: 'Fogyás Kalória Számítás – Lépésről Lépésre | 2026',
  description: 'Hogyan számítsa ki pontosan, mennyi kalória szükséges a kívánt fogyáshoz? Képletek, példák, tippek és a leggyakoribb hibák elkerülése.',
  keywords: ['fogyás kalória számítás', 'fogyas kaloria', 'kalória fogyáshoz', 'fogyás kalória deficit'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/fogyas-kaloria-szamitas' },
  openGraph: {
    title: 'Fogyás Kalória Számítás – Lépésről Lépésre | 2026',
    description:
      'Hogyan számítsa ki pontosan, mennyi kalória szükséges a kívánt fogyáshoz? Képletek, példák, tippek és a leggyakoribb hibák elkerülése.',
    url: 'https://www.kaloriakalkulator9.hu/fogyas-kaloria-szamitas',
  },
};

const BASE = 'https://www.kaloriakalkulator9.hu';

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fogyás Kalória Számítás – Lépésről Lépésre',
    description: 'BMR → TDEE → célkalória: a fogyás kalóriaszámításának teljes folyamata.',
    inLanguage: 'hu',
    url: `${BASE}/fogyas-kaloria-szamitas`,
    image: `${BASE}/fogyas-kaloria-szamitas/opengraph-image`,
    author: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE },
    publisher: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/favicon.png` } },
    datePublished: '2026-01-01',
    dateModified: '2026-03-01',
    wordCount: 700,
    articleSection: 'Fogyás',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/fogyas-kaloria-szamitas` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Mennyi kalóriát kell ennem a fogyáshoz?', acceptedAnswer: { '@type': 'Answer', text: 'A fogyáshoz szükséges kalóriabevitel = TDEE − deficit. Például: ha TDEE-je 2500 kcal, akkor fogyáshoz napi 2000 kcal elegendő (500 kcal deficit).' } },
      { '@type': 'Question', name: 'Miért áll meg a fogyás egy idő után?', acceptedAnswer: { '@type': 'Answer', text: 'Ahogy fogy, csökken a testsúlya és az alapanyagcseréje is. Megoldás: csökkentse kissé a kalóriabevitelt vagy növelje az aktivitást.' } },
    ],
  },
];

const faqItems = [
  { q: 'Mennyi kalóriát kell ennem a fogyáshoz?', a: 'A fogyáshoz szükséges kalóriabevitel = TDEE − deficit. Például: ha TDEE-je 2500 kcal, akkor fogyáshoz napi 2000 kcal elegendő (500 kcal deficit). Kalkulátorunk automatikusan kiszámítja.' },
  { q: 'Miért áll meg a fogyás egy idő után?', a: 'A "platóhatás" oka: ahogy fogy, csökken a testsúlya és az alapanyagcseréje is. Így az egykor deficites bevitel idővel fenntartóvá válik. Megoldás: csökkentse kissé a kalóriabevitelt vagy növelje az aktivitást.' },
  { q: 'Gyorsabb fogyáshoz több kalóriát kell elhagyni?', a: 'Nem feltétlenül bölcs döntés. Nagyon nagy deficit (1000+ kcal) izomvesztést okoz, lelassítja az anyagcserét és fenntarthatatlan. A legjobb stratégia: 500 kcal deficit + rendszeres mozgás.' },
];

export default function FogyasKaloriaPage() {
  return (
    <>
      <StructuredData data={schemas} />

      <div className={styles.articleHero}>
        <div className={styles.container}>
          <Breadcrumb items={[{ name: 'Fogyás kalória számítás', href: '/fogyas-kaloria-szamitas' }]} />
          <h1 className={styles.h1}>Fogyás Kalória Számítás – Lépésről Lépésre</h1>
          <p className={styles.lead}>A fogyás kalóriaszámítása nem bonyolult – de pontosan kell csinálni. Ebben a cikkben lépésről lépésre végigvezetjük a folyamaton: a TDEE kiszámításától a célkalória meghatározásáig.</p>
          <div className={styles.meta}>📖 7 perc olvasás · 2026. január</div>
        </div>
      </div>

      <article className={styles.articleBody}>
        <div className={styles.container}>
          <h2>1. lépés: Számítsa ki az alapanyagcseréjét (BMR)</h2>
          <p>Az alapanyagcsere (BMR) az a kalóriamennyiség, amelyet a szervezete nyugalomban felhasznál. Ezt a Mifflin-St. Jeor képlettel számítjuk: Férfiaknál BMR = (10 × kg) + (6,25 × cm) − (5 × kor) + 5; Nőknél BMR = (10 × kg) + (6,25 × cm) − (5 × kor) − 161.</p>

          <h2>2. lépés: Számítsa ki a TDEE-t (teljes napi felhasználás)</h2>
          <p>TDEE = BMR × PAL faktor. Ha ülő életmódot folytat (PAL 1,2): TDEE = BMR × 1,2. Ha heti 3–5x sportol (PAL 1,55): TDEE = BMR × 1,55. Ez adja meg, mennyi kalóriát éget el naponta összesen.</p>

          <h2>3. lépés: Vonja le a déficitet</h2>
          <p>Fogyáshoz kalóriadeficitre van szükség. Az ajánlott mértéke <strong>300–500 kcal/nap</strong>. Célkalória fogyáshoz = TDEE − 500 kcal. Ez heti kb. 0,5 kg fogyást eredményez – az egészséges, fenntartható ütem.</p>

          <h2>Példaszámítás</h2>
          <p>35 éves, 170 cm-es, 75 kg-os nő, heti 3x sportol: BMR = (10 × 75) + (6,25 × 170) − (5 × 35) − 161 = <strong>1526 kcal</strong>. TDEE = 1526 × 1,55 = <strong>2365 kcal</strong>. Fogyási célkalória = 2365 − 500 = <strong>1865 kcal/nap</strong>.</p>

          <div className={styles.ctaBox}>
            <h3>Végezze el a számítást automatikusan</h3>
            <p>Kalória kalkulátorunk elvégzi az összes lépést egyszerre, személyre szabottan.</p>
            <Link href="/kaloria-kalkulator" className={styles.ctaBtn}>🔥 Kalória Kalkulátor – fogyás célra</Link>
          </div>
        </div>
      </article>

      <FaqSection items={faqItems} title="GYIK – Fogyás Kalória Számítás" />
    </>
  );
}
