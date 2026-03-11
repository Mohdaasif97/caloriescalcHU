import type { Metadata } from 'next';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';
import Hero, { OrangeSpan } from '@/components/ui/Hero';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import styles from '../kaloria-kalkulator/page.module.css';

export const metadata: Metadata = {
  title: 'Makró Kalkulátor 2026 – Fehérje, Szénhidrát & Zsír',
  description:
    'Ingyenes makró kalkulátor: Számítsa ki ajánlott fehérje, szénhidrát és zsír bevitelét. Fogyáshoz, izomnöveléshez és súlymegőrzéshez személyre szabva.',
  keywords: ['makró kalkulátor', 'fehérje szükséglet', 'szénhidrát számítás', 'zsír bevitel', 'makrotápanyag kalkulátor'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/makro-kalkulator' },
  openGraph: {
    title: 'Makró Kalkulátor 2026 – Fehérje, Szénhidrát & Zsír',
    description:
      'Számítsa ki ajánlott fehérje, szénhidrát és zsír bevitelét. Fogyáshoz, izomnöveléshez és súlymegőrzéshez személyre szabva.',
    url: 'https://www.kaloriakalkulator9.hu/makro-kalkulator',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Makró Kalkulátor 2026',
  description: 'Ajánlott fehérje, szénhidrát és zsír bevitel kiszámítása.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  inLanguage: 'hu',
  url: 'https://www.kaloriakalkulator9.hu/makro-kalkulator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'HUF' },
};

const faqItems = [
  {
    q: 'Mennyi fehérjére van szükségem naponta?',
    a: 'Általános ajánlás testsúlykilogrammonként 1,6–2,2 g fehérje aktív személyeknek. Fogyásnál 1,7 g/kg, izomnövelésnél 2,0 g/kg az ajánlott érték.',
  },
  {
    q: 'Mi a makrotápanyagok optimális aránya?',
    a: 'Általános ajánlás: fehérje 25–35%, zsír 25–35%, szénhidrát 35–50%. Ez a cél és aktivitás szerint változik. Fogyásnál magasabb fehérjearány ajánlott az izomtömeg megőrzéséhez.',
  },
  {
    q: 'Számít-e a makrotápanyagok aránya a fogyásban?',
    a: 'Az összkalória a döntő tényező a fogyásban, de a makrók aránya befolyásolja az izmok megtartását, az éhségérzetet és az energiaszintet. A magas fehérjebevitel különösen előnyös fogyásnál.',
  },
];

export default function MakroKalkulatorPage() {
  return (
    <>
      <StructuredData data={schema} />
      <Hero
        pill="🥗 Makró Kalkulátor · Ingyenes · 2026"
        breadcrumb={[{ name: 'Makró Kalkulátor', href: '/makro-kalkulator' }]}
        title={<>Makró Kalkulátor –<br /><OrangeSpan>Fehérje, Zsír &amp;</OrangeSpan><br />Szénhidrát Számítás</>}
        subtitle={<>Számítsa ki ajánlott <strong>fehérje</strong>, <strong>szénhidrát</strong> és <strong>zsír bevitelét</strong> személyre szabottan – a céljainak megfelelően.</>}
        badges={['🥩 Fehérje számítás', '🥑 Zsír arány', '🍚 Szénhidrát', '🎯 Célhoz igazítva']}
      />
      <section className={styles.calcSection}>
        <div className={styles.container}>
          <CalorieCalculator />
        </div>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <article className={styles.article}>
            <h2>Makrotápanyagok – fehérje, szénhidrát, zsír szerepe</h2>
            <p>
              A <strong>makrotápanyagok</strong> (fehérje, szénhidrát, zsír) az energia három fő
              forrása. Fehérje: 4 kcal/g – izomépítés, szövetek regenerálása. Szénhidrát: 4 kcal/g
              – elsődleges energiaforrás. Zsír: 9 kcal/g – hormontermelés, vitaminfelvétel.
            </p>
            <h2>Mennyi fehérje szükséges izomnöveléshez?</h2>
            <p>
              Izomnöveléshez (hipertrófia) a szakmai konszenzus szerint testsúlykilogrammonként napi{' '}
              <strong>1,6–2,2 g fehérje</strong> szükséges. Ennél több fehérje általában nem
              eredményez nagyobb izomépítést. Kalkulátorunk fogyásnál 1,7 g/kg, izomnövelésnél 2,0
              g/kg értéket alkalmaz.
            </p>
          </article>
        </div>
      </section>
      <FaqSection items={faqItems} title="GYIK – Makró Kalkulátor" />
    </>
  );
}
