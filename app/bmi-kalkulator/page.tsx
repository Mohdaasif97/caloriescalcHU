import type { Metadata } from 'next';
import BmiCalculator from '@/components/calculators/BmiCalculator';
import Hero, { OrangeSpan } from '@/components/ui/Hero';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import styles from '../kaloria-kalkulator/page.module.css';

export const metadata: Metadata = {
  title: 'BMI Kalkulátor 2026 – Testtömegindex Kiszámítása Ingyenesen',
  description:
    'Ingyenes BMI kalkulátor 2026: Számítsa ki testtömegindexét (BMI) magasság és súly alapján. Megmutatja az ideális testsúlyt és a BMI kategóriáját.',
  keywords: ['bmi kalkulátor', 'testtömegindex', 'bmi számítás', 'ideális testsúly', 'bmi normál érték'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/bmi-kalkulator' },
  openGraph: {
    title: 'BMI Kalkulátor 2026 – Testtömegindex Kiszámítása Ingyenesen',
    description:
      'Számítsa ki testtömegindexét (BMI) magasság és súly alapján. Megmutatja az ideális testsúlyt és a BMI kategóriáját.',
    url: 'https://www.kaloriakalkulator9.hu/bmi-kalkulator',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'BMI Kalkulátor 2026',
  description: 'Ingyenes BMI kalkulátor: Számítsa ki testtömegindexét.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  inLanguage: 'hu',
  url: 'https://www.kaloriakalkulator9.hu/bmi-kalkulator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'HUF' },
};

const faqItems = [
  {
    q: 'Mi a normális BMI értéke?',
    a: 'A BMI normális értéke 18,5–24,9 között van. 18,5 alatt alulsúlyról, 25–29,9 között túlsúlyról, 30 felett elhízásról, 18,5 alatt alulsúlyról beszélünk.',
  },
  {
    q: 'Hogyan számítják ki a BMI-t?',
    a: 'BMI = testsúly (kg) / (magasság (m))². Például: 75 kg / (1.75 m)² = 24.5. A kalkulátor automatikusan elvégzi ezt a számítást.',
  },
  {
    q: 'Pontos-e a BMI az egészségi állapot mérésére?',
    a: 'A BMI hasznos általános mutató, de nem veszi figyelembe az izom- és zsírarányt, csont- és testösszetételt. Egy sportoló magas BMI-je ellenére egészséges lehet.',
  },
  {
    q: 'Mi az ideális testsúly a BMI alapján?',
    a: 'Ideális testsúly az a tartomány, ahol a BMI 18,5–24,9 közé esik. Például 175 cm magasságnál az ideális testsúly 56,7–76,3 kg. A kalkulátor megmutatja az Ön ideális tartományát.',
  },
];

export default function BmiKalkulatorPage() {
  return (
    <>
      <StructuredData data={schema} />
      <Hero
        pill="📊 Ingyenes BMI Kalkulátor · 2026"
        breadcrumb={[{ name: 'BMI Kalkulátor', href: '/bmi-kalkulator' }]}
        title={<>BMI Kalkulátor –<br /><OrangeSpan>Testtömegindex</OrangeSpan><br />Kiszámítása</>}
        subtitle={<>Számítsa ki <strong>testtömegindexét (BMI)</strong> magasság és súly alapján. Tudja meg, hogy normális tartományban van-e, és mi az <strong>ideális testsúlya</strong>.</>}
        badges={['📏 Magasság & súly alapján', '🎯 Ideális testsúly', '📊 WHO kategóriák']}
      />
      <section className={styles.calcSection}>
        <div className={styles.container}>
          <BmiCalculator />
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <article className={styles.article}>
            <h2>Mi a BMI és miért fontos?</h2>
            <p>
              A <strong>BMI</strong> (Body Mass Index, testtömegindex) a testsúly és a testmagasság
              négyzetének hányadosa: <strong>BMI = kg / m²</strong>. A WHO osztályozása szerint 18,5
              alatti érték alulsúlyt, 18,5–24,9 normális testsúlyt, 25–29,9 túlsúlyt, 30 feletti
              érték pedig elhízást jelez.
            </p>
            <h2>A BMI korlátai</h2>
            <p>
              Fontos tudni, hogy a BMI nem veszi figyelembe az izom- és zsírarányt. Egy atléta magas
              BMI-je ellenére egészséges lehet, mivel az izmok sűrűbbek és nehézebbek, mint a zsír.
              Az idősebbeknél a BMI szintén alulbecsülheti a zsírtömeget. Pontosabb képet ad a
              derék-csípő arány vagy a testzsírszázalék mérése.
            </p>
          </article>
        </div>
      </section>
      <FaqSection items={faqItems} title="GYIK – BMI Kalkulátor" />
    </>
  );
}
