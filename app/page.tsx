import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Kalória Kalkulátor 2026 – Ingyenes Magyar Kalóriaszámoló',
  description:
    'Minden kalória eszköz egy helyen: BMI, TDEE, makró és fogyás kalkulátor. Ingyenes, gyors, pontos – magyarul.',
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu' },
  openGraph: {
    title: 'Kalória Kalkulátor 2026 – Ingyenes Magyar Kalóriaszámoló',
    description:
      'Minden kalória eszköz egy helyen: BMI, TDEE, makró és fogyás kalkulátor. Ingyenes, gyors, pontos – magyarul.',
    url: 'https://www.kaloriakalkulator9.hu',
  },
};

const calculators = [
  {
    href: '/kaloria-kalkulator',
    icon: '🔥',
    title: 'Kalória Kalkulátor',
    desc: 'Számítsa ki napi kalóriaszükségletét a Mifflin-St. Jeor vagy Harris-Benedict képlettel. Fogyáshoz, súlymegőrzéshez és izomnöveléshez.',
    badge: 'Legnépszerűbb',
  },
  {
    href: '/bmi-kalkulator',
    icon: '📊',
    title: 'BMI Kalkulátor',
    desc: 'Testtömegindex kiszámítása magasság és súly alapján. Tudja meg, hogy normális, túlsúlyos vagy alulsúlyos-e.',
    badge: null,
  },
  {
    href: '/tdee-kalkulator',
    icon: '⚡',
    title: 'TDEE Kalkulátor',
    desc: 'Teljes napi energiafelhasználás (Total Daily Energy Expenditure) számítása aktivitási szint alapján.',
    badge: null,
  },
  {
    href: '/makro-kalkulator',
    icon: '🥗',
    title: 'Makró Kalkulátor',
    desc: 'Ajánlott fehérje, szénhidrát és zsír bevitel kiszámítása a cél és testsúly alapján.',
    badge: null,
  },
];

const articles = [
  {
    href: '/mennyi-kaloria-kell-egy-nap',
    title: 'Mennyi kalória kell egy nap?',
    excerpt:
      'Az átlagos napi kalóriaszükséglet 1800–2800 kcal között mozog – de az egyéni igény ennél lényegesen eltérhet.',
    readTime: '5 perc',
  },
  {
    href: '/kaloria-deficit-mi-az',
    title: 'Kalória deficit – mi az és hogyan alkalmazzuk?',
    excerpt:
      'A kalóriadeficit a fogyás alapja. Megmutatjuk, mekkora deficittel lehet biztonságosan fogyni.',
    readTime: '6 perc',
  },
  {
    href: '/fogyas-kaloria-szamitas',
    title: 'Fogyás kalória számítás – lépésről lépésre',
    excerpt:
      'Hogyan számítsa ki pontosan, mennyi kalória szükséges a kívánt fogyáshoz? Képletek, példák és tippek.',
    readTime: '7 perc',
  },
  {
    href: '/napi-kaloria-szukseglet',
    title: 'Napi kalória szükséglet – minden amit tudni kell',
    excerpt:
      'Kor, nem, magasság és aktivitás szerint változó a napi szükséglet. Részletes táblázatok és magyarázatok.',
    readTime: '8 perc',
  },
];

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KalóriaKalkulátor.hu',
  url: 'https://www.kaloriakalkulator9.hu',
  description:
    'Ingyenes kalória kalkulátor, BMI, TDEE és makró számítás magyarok számára.',
  inLanguage: 'hu',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.kaloriakalkulator9.hu/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={websiteSchema} />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroPill}>🇭🇺 Magyar Táplálkozás Kalkulátorok · Ingyenes · 2026</div>
          <h1 className={styles.h1}>
            Kalória Kalkulátor &amp; <span className={styles.orange}>Táplálkozás Eszközök</span>
          </h1>
          <p className={styles.heroSub}>
            Ingyenes, tudományosan megalapozott kalkulátorok a <strong>fogyáshoz</strong>,{' '}
            <strong>izomnöveléshez</strong> és <strong>egészséges életmódhoz</strong>. BMI,
            kalória, TDEE és makró számítás egy helyen.
          </p>
          <div className={styles.heroCta}>
            <Link href="/kaloria-kalkulator" className={styles.ctaPrimary}>
              🔥 Kalória Kalkulátor indítása
            </Link>
            <Link href="/bmi-kalkulator" className={styles.ctaSecondary}>
              📊 BMI számítás
            </Link>
          </div>
        </div>
      </section>

      {/* CALCULATORS GRID */}
      <section className={styles.calcSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Kalkulátoraink</h2>
          <p className={styles.sectionSub}>
            Válassza ki a számítást, amelyre szüksége van – minden eszköz ingyenes és azonnal
            használható.
          </p>
          <div className={styles.calcGrid}>
            {calculators.map(({ href, icon, title, desc, badge }) => (
              <Link key={href} href={href} className={styles.calcCard}>
                <div className={styles.calcCardTop}>
                  <span className={styles.calcIcon}>{icon}</span>
                  {badge && <span className={styles.badge}>{badge}</span>}
                </div>
                <h3 className={styles.calcTitle}>{title}</h3>
                <p className={styles.calcDesc}>{desc}</p>
                <span className={styles.calcCta}>Számítás indítása →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className={styles.trustStrip}>
        <div className={styles.container}>
          <div className={styles.trustGrid}>
            {[
              { icon: '🧬', label: 'Tudományos képletek', sub: 'Mifflin-St. Jeor, Harris-Benedict, Devine' },
              { icon: '🇭🇺', label: 'Magyar nyelven', sub: 'Teljes mértékben magyarosítva' },
              { icon: '🔒', label: 'Adatvédelem', sub: 'Adatai nem kerülnek tárolásra' },
              { icon: '⚡', label: 'Azonnali eredmény', sub: 'Számítás 1 másodperc alatt' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className={styles.trustItem}>
                <span className={styles.trustIcon}>{icon}</span>
                <div>
                  <strong>{label}</strong>
                  <span>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className={styles.articlesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Kalória &amp; Táplálkozás Cikkek</h2>
          <p className={styles.sectionSub}>
            Részletes útmutatók és magyarázatok a kalóriaszámítás és egészséges táplálkozás
            témakörében.
          </p>
          <div className={styles.articlesGrid}>
            {articles.map(({ href, title, excerpt, readTime }) => (
              <Link key={href} href={href} className={styles.articleCard}>
                <div className={styles.articleMeta}>
                  <span className={styles.readTime}>📖 {readTime} olvasás</span>
                </div>
                <h3 className={styles.articleTitle}>{title}</h3>
                <p className={styles.articleExcerpt}>{excerpt}</p>
                <span className={styles.articleCta}>Cikk olvasása →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className={styles.seoContent}>
        <div className={styles.container}>
          <div className={styles.seoInner}>
            <h2>Miért válassza a KalóriaKalkulátor.hu-t?</h2>
            <p>
              A <strong>KalóriaKalkulátor.hu</strong> Magyarország egyik legteljesebb ingyenes
              táplálkozás-kalkulátor portálja. Eszközeink tudományosan igazolt képleteken alapulnak
              – a <strong>Mifflin-St. Jeor</strong> és <strong>Harris-Benedict</strong> módszereket
              alkalmazzák, amelyek a legtöbb szakmai forrás által ajánlott számítási eljárások.
            </p>
            <p>
              Akár <strong>fogyni</strong> szeretne, akár <strong>izmot építeni</strong> vagy
              egyszerűen <strong>megtartani jelenlegi súlyát</strong>, kalkulátoraink megadják az
              ehhez szükséges pontos adatokat: napi kalóriaszükséglet, BMI érték, TDEE és ajánlott
              makrotápanyag-arányok.
            </p>
            <p>
              Minden számítás <strong>személyre szabott</strong>: figyelembe veszi nemét, korát,
              magasságát, testsúlyát és aktivitási szintjét. Az eredmények azonnal megjelennek,
              adatai nem kerülnek tárolásra.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
