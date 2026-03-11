import type { Metadata } from 'next';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';
import Hero, { OrangeSpan } from '@/components/ui/Hero';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import styles from '../kaloria-kalkulator/page.module.css';

export const metadata: Metadata = {
  title: 'TDEE Kalkulátor 2026 – Napi Energiafelhasználás Számítás',
  description:
    'Ingyenes TDEE kalkulátor: Számítsa ki teljes napi energiafelhasználását (Total Daily Energy Expenditure) aktivitási szint alapján. PAL-faktor, alapanyagcsere.',
  keywords: ['tdee kalkulátor', 'teljes napi energiafelhasználás', 'pal faktor', 'energiaszükséglet számítás'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/tdee-kalkulator' },
  openGraph: {
    title: 'TDEE Kalkulátor 2026 – Napi Energiafelhasználás Számítás',
    description:
      'Számítsa ki teljes napi energiafelhasználását (TDEE) aktivitási szint alapján. PAL-faktor és alapanyagcsere számítás.',
    url: 'https://www.kaloriakalkulator9.hu/tdee-kalkulator',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TDEE Kalkulátor 2026',
  description: 'Teljes napi energiafelhasználás kiszámítása aktivitási szint alapján.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  inLanguage: 'hu',
  url: 'https://www.kaloriakalkulator9.hu/tdee-kalkulator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'HUF' },
};

const faqItems = [
  {
    q: 'Mi az a TDEE?',
    a: 'A TDEE (Total Daily Energy Expenditure, teljes napi energiafelhasználás) az a kalóriamennyiség, amelyet egy személy naponta felhasznál – beleértve az alapanyagcserét és az összes fizikai aktivitást.',
  },
  {
    q: 'Hogyan számítják ki a TDEE-t?',
    a: 'TDEE = BMR × PAL (fizikai aktivitási szint). Az alapanyagcserét (BMR) megszorozzuk a PAL faktorral, amely 1,2 (ülő életmód) és 1,9 (extrém aktív) között mozog.',
  },
  {
    q: 'Mi a különbség a BMR és TDEE között?',
    a: 'A BMR a nyugalmi energiafelhasználás – csak az életfenntartó folyamatokhoz szükséges kalória. A TDEE a teljes napi felhasználás, amely tartalmazza a fizikai aktivitást is. A TDEE általában 20–90%-kal magasabb a BMR-nél.',
  },
];

export default function TdeeKalkulatorPage() {
  return (
    <>
      <StructuredData data={schema} />
      <Hero
        pill="⚡ TDEE Kalkulátor · Ingyenes · 2026"
        breadcrumb={[{ name: 'TDEE Kalkulátor', href: '/tdee-kalkulator' }]}
        title={<>TDEE Kalkulátor –<br /><OrangeSpan>Energiafelhasználás</OrangeSpan><br />Számítása</>}
        subtitle={<>Számítsa ki <strong>teljes napi energiafelhasználását</strong> (TDEE) aktivitási szint és alapanyagcsere alapján. A pontos <strong>kalóriabevitel</strong> meghatározásának alapja.</>}
        badges={['⚡ PAL-faktor alapján', '🧬 BMR × aktivitás', '🎯 Személyre szabott']}
      />
      <section className={styles.calcSection}>
        <div className={styles.container}>
          <CalorieCalculator />
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <article className={styles.article}>
            <h2>Mi az a TDEE és miért fontos?</h2>
            <p>
              A <strong>TDEE</strong> (Total Daily Energy Expenditure) a teljes napi
              energiafelhasználást jelenti – ez az az energiamennyiség, amelyet szervezete valójában
              naponta felhasznál, beleértve az alapanyagcserét és minden fizikai aktivitást.
            </p>
            <p>
              A TDEE ismerete kulcsfontosságú, mert megmutatja: ha ennél kevesebbet eszik, fogy; ha
              ennyit eszik, megtartja súlyát; ha többet, hízik. Ez az energiaegyenleg alapja.
            </p>
            <h2>A PAL-faktor és az aktivitási szintek</h2>
            <p>
              A <strong>PAL-faktor</strong> (Physical Activity Level) az aktivitási szintet jelző
              szorzószám: 1,2 (ülő életmód) – 1,375 (enyhén aktív) – 1,55 (mérsékelten aktív) –
              1,725 (nagyon aktív) – 1,9 (extrém aktív). Minél pontosabban választja meg az
              aktivitási szintjét, annál pontosabb lesz a TDEE értéke.
            </p>
          </article>
        </div>
      </section>
      <FaqSection items={faqItems} title="GYIK – TDEE Kalkulátor" />
    </>
  );
}
