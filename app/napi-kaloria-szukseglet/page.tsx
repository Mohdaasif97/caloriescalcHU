import type { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '../mennyi-kaloria-kell-egy-nap/page.module.css';

export const metadata: Metadata = {
  title: 'Napi Kalória Szükséglet – Minden Amit Tudni Kell | 2026',
  description: 'Napi kalória szükséglet részletes útmutatója. Mi befolyásolja, hogyan számítható ki és mire kell figyelni. Táblázatok és képletek 2026.',
  keywords: ['napi kalória szükséglet', 'kalóriaszükséglet', 'napi kalória bevitel', 'energiaszükséglet'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/napi-kaloria-szukseglet' },
  openGraph: {
    title: 'Napi Kalória Szükséglet – Minden Amit Tudni Kell | 2026',
    description:
      'Napi kalória szükséglet részletes útmutatója. Mi befolyásolja, hogyan számítható ki és mire kell figyelni. Táblázatok és képletek.',
    url: 'https://www.kaloriakalkulator9.hu/napi-kaloria-szukseglet',
  },
};

const BASE = 'https://www.kaloriakalkulator9.hu';

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Napi Kalória Szükséglet – Minden Amit Tudni Kell',
    description: 'Mi befolyásolja a napi kalória szükségletet, hogyan számítható ki és mire érdemes figyelni.',
    inLanguage: 'hu',
    url: `${BASE}/napi-kaloria-szukseglet`,
    image: `${BASE}/napi-kaloria-szukseglet/opengraph-image`,
    author: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE },
    publisher: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/favicon.png` } },
    datePublished: '2026-01-01',
    dateModified: '2026-03-01',
    wordCount: 750,
    articleSection: 'Táplálkozás',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/napi-kaloria-szukseglet` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Mi a napi kalória szükséglet?', acceptedAnswer: { '@type': 'Answer', text: 'A napi kalória szükséglet (TDEE) az a kalóriamennyiség, amelyre szervezetének szüksége van a jelenlegi testsúly fenntartásához, aktivitási szintje mellett.' } },
      { '@type': 'Question', name: 'Hogyan lehet növelni az anyagcserét?', acceptedAnswer: { '@type': 'Answer', text: 'Az anyagcsere növelésének legjobb módjai: izomtömeg növelése erőedzéssel, magas fehérjebevitel, rendszeres mozgás, megfelelő alvás (7–9 óra) és hidratálás.' } },
    ],
  },
];

const faqItems = [
  { q: 'Mi a napi kalória szükséglet?', a: 'A napi kalória szükséglet (TDEE) az a kalóriamennyiség, amelyre szervezetének szüksége van a jelenlegi testsúly fenntartásához, aktivitási szintje mellett.' },
  { q: 'Hogyan lehet növelni az anyagcserét?', a: 'Az anyagcsere növelésének legjobb módjai: izomtömeg növelése erőedzéssel, magas fehérjebevitel, rendszeres mozgás, megfelelő alvás (7–9 óra) és hidratálás.' },
  { q: 'Mennyit változhat a napi kalóriaszükséglet?', a: 'Ugyanannál a személynél is 300–500 kcal ingadozás lehetséges nap mint nap, az aktivitástól, stressztől, alvásnál és hormonális változásoktól függően. Ezért heti átlagos bevitelt érdemes figyelni.' },
];

export default function NapiKaloriaPage() {
  return (
    <>
      <StructuredData data={schemas} />

      <div className={styles.articleHero}>
        <div className={styles.container}>
          <Breadcrumb items={[{ name: 'Napi kalória szükséglet', href: '/napi-kaloria-szukseglet' }]} />
          <h1 className={styles.h1}>Napi Kalória Szükséglet – Minden Amit Tudni Kell</h1>
          <p className={styles.lead}>A napi kalória szükséglet megértése az egészséges testsúlykezelés alapja. Ebben a cikkben részletesen bemutatjuk, mi befolyásolja, hogyan számítható ki, és mire érdemes figyelni a mindennapi életben.</p>
          <div className={styles.meta}>📖 8 perc olvasás · 2026. január</div>
        </div>
      </div>

      <article className={styles.articleBody}>
        <div className={styles.container}>
          <h2>Mi a napi kalória szükséglet?</h2>
          <p>A <strong>napi kalória szükséglet</strong> – más néven TDEE (Total Daily Energy Expenditure) – az a kalóriamennyiség, amelyet szervezete naponta felhasznál. Három fő összetevőből áll: az alapanyagcsere (BMR, 60–75%), a fizikai aktivitás (15–30%) és az ételek hőhatása (10%).</p>

          <h2>A legfontosabb befolyásoló tényezők</h2>
          <p>A <strong>testösszetétel</strong> az egyik legnagyobb hatású tényező: az izomszövet 3–4-szer több kalóriát éget el nyugalomban, mint a zsírszövet. Ez magyarázza, miért fogynak könnyebben azok, akik rendszeresen erőedzést végeznek. A <strong>kor</strong> előrehaladtával az anyagcsere évtizedenként 1–3%-kal lassul. A <strong>hormonális tényezők</strong> (pajzsmirigy, inzulin, szexuális hormonok) szintén jelentősen befolyásolják az anyagcserét.</p>

          <h2>Hogyan számolja ki napi kalória szükségletét?</h2>
          <p>A pontos számításhoz használja ingyenes kalória kalkulátorát: adja meg nemét, korát, magasságát, testsúlyát és aktivitási szintjét. A kalkulátor a Mifflin-St. Jeor képlettel kiszámítja az alapanyagcseréjét, majd a PAL-faktorral meghatározza a teljes napi szükségletét.</p>

          <div className={styles.ctaBox}>
            <h3>Számítsa ki pontosan napi szükségletét</h3>
            <p>Ingyenes, tudományosan megalapozott kalkulátor – azonnal eredményt ad.</p>
            <Link href="/kaloria-kalkulator" className={styles.ctaBtn}>🔥 Kalória Kalkulátor megnyitása</Link>
          </div>
        </div>
      </article>

      <FaqSection items={faqItems} title="GYIK – Napi Kalória Szükséglet" />
    </>
  );
}
