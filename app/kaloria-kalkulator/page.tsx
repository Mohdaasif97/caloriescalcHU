import type { Metadata } from 'next';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';
import Hero, { OrangeSpan } from '@/components/ui/Hero';
import FoodTable from '@/components/ui/FoodTable';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Kalória Kalkulátor 2026 – Napi Kalóriaszükséglet Kiszámítása',
  description:
    'Ingyenes kalória kalkulátor 2026: Számítsa ki napi kalóriaszükségletét és alapanyagcseréjét. Harris-Benedict & Mifflin-St. Jeor képlet. Makrotápanyagok és BMI.',
  keywords: [
    'kalória kalkulátor',
    'kalória számítás',
    'napi kalóriaszükséglet',
    'alapanyagcsere számítás',
    'bmr kalkulátor',
    'fogyás kalória',
    'makrotápanyag kalkulátor',
    'harris benedict kalkulátor',
    'mifflin st jeor',
  ],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/kaloria-kalkulator' },
  openGraph: {
    title: 'Kalória Kalkulátor 2026 – Napi Kalóriaszükséglet Kiszámítása',
    description:
      'Ingyenes kalória kalkulátor: Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét, BMI-jét és makrotápanyag-szükségletét egyszerűen és pontosan.',
    url: 'https://www.kaloriakalkulator9.hu/kaloria-kalkulator',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kalória Kalkulátor 2026',
  description:
    'Ingyenes kalória kalkulátor: Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét és makrotápanyag-szükségletét.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  inLanguage: 'hu',
  url: 'https://www.kaloriakalkulator9.hu/kaloria-kalkulator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'HUF' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Mennyi kalóriára van szükségem naponta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A napi kalóriaszükséglet függ a nemtől, kortól, magasságtól, súlytól és aktivitási szinttől. Átlagosan a nők napi 1800–2200 kcal-t, a férfiak 2200–2800 kcal-t igényelnek.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mi az alapanyagcsere (BMR)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Az alapanyagcsere (BMR) az a kalóriamennyiség, amelyet a szervezet teljes nyugalomban életfenntartó folyamatokhoz felhasznál. Az összes napi energiafelhasználás 60–75%-át teszi ki.',
      },
    },
  ],
};

const faqItems = [
  {
    q: 'Mennyi kalóriára van szükségem naponta?',
    a: 'A napi kalóriaszükséglet egyénenként eltér – függ a nemtől, kortól, magasságtól, testsúlytól és aktivitástól. Átlagosan nők 1 800–2 200 kcal-t, férfiak 2 200–2 800 kcal-t igényelnek naponta. Kalória kalkulátorunk pontosan kiszámítja az Ön személyes szükségletét.',
  },
  {
    q: 'Mi az alapanyagcsere és hogyan kell kiszámítani?',
    a: 'Az alapanyagcsere (BMR – Basal Metabolic Rate) az a kalóriamennyiség, amelyet a szervezet teljes nyugalomban az életfenntartó folyamatokhoz használ fel. Mifflin-St. Jeor képlettel (nők esetén: 10×kg + 6,25×cm − 5×kor − 161). Az alapanyagcsere az összes napi kalóriafelhasználás 60–75%-a.',
  },
  {
    q: 'Hány kalória kell a fogyáshoz naponta?',
    a: 'A fogyáshoz kalóriadeficit szükséges: napi 500 kcal hiány körülbelül heti 0,5 kg fogyást eredményez. Ez az egészséges és fenntartható ütem. Soha ne csökkentse 1 200 kcal (nők) illetve 1 500 kcal (férfiak) alá a bevitelt.',
  },
  {
    q: 'Melyik jobb: a Mifflin-St. Jeor vagy a Harris-Benedict képlet?',
    a: 'Általában a Mifflin-St. Jeor képletet tartják pontosabbnak a mai, jellemzően ülő életmódot folytató emberekre. A Harris-Benedict képlet idősebb (1919), de szintén megbízható. Kalkulátorunkban mindkét lehetőséget megtalálja.',
  },
  {
    q: 'Mi a BMI normál értéke?',
    a: 'A BMI normális értéke 18,5–24,9 között van. 18,5 alatt alulsúlyról, 25–29,9 között túlsúlyról, 30 felett elhízásról beszélünk. Fontos tudni, hogy a BMI nem veszi figyelembe az izom- és zsírarányt.',
  },
  {
    q: 'Mi a PAL faktor a kalóriaszámításban?',
    a: 'A PAL (Physical Activity Level) faktor az aktivitási szintet jelzi. Az alapanyagcserét megszorozzuk a PAL értékkel, hogy megkapjuk a napi összes energiafelhasználást. Értéke 1.2 (ülő életmód) és 1.9 (extrém aktív) között mozog.',
  },
];

export default function KaloriaKalkulatorPage() {
  return (
    <>
      <StructuredData data={[webAppSchema, faqSchema]} />

      <Hero
        pill="🇭🇺 Magyar Kalória Kalkulátor · Ingyenes · 2026"
        breadcrumb={[{ name: 'Kalória Kalkulátor', href: '/kaloria-kalkulator' }]}
        title={
          <>
            Kalória Kalkulátor –<br />
            <OrangeSpan>Napi Kalóriaszükséglet</OrangeSpan>
            <br />
            Kiszámítása
          </>
        }
        subtitle={
          <>
            Számítsa ki személyre szabott <strong>napi kalóriaszükségletét</strong>,{' '}
            <strong>alapanyagcseréjét</strong> és <strong>makrotápanyag-igényét</strong>{' '}
            tudományosan igazolt képletekkel.
          </>
        }
        badges={['📐 Harris-Benedict', '🧬 Mifflin-St. Jeor', '⚡ PAL-faktor', '🥗 Makrotápanyagok', '📊 BMI számítás']}
        stats={[
          { num: '~2 000', label: 'kcal/nap · átlag nő' },
          { num: '~2 500', label: 'kcal/nap · átlag férfi' },
          { num: '−500', label: 'kcal/nap · fogyáshoz' },
        ]}
      />

      {/* CALCULATOR */}
      <section className={styles.calcSection}>
        <div className={styles.container}>
          <CalorieCalculator />
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <article className={styles.article}>
            <h2>Kalória Kalkulátor 2026 – Hogyan számítsa ki napi kalóriaszükségletét?</h2>
            <p>
              A <strong>kalória kalkulátor</strong> a leggyorsabb módszer arra, hogy megtudjuk,
              naponta pontosan mennyi kalóriára van szükségünk. Kalória kalkulátorunk tudományosan
              igazolt képleteket alkalmaz – a <strong>Mifflin-St. Jeor</strong> és a{' '}
              <strong>Harris-Benedict</strong> egyenletet –, amelyek a legpontosabb becslést adják
              az <strong>alapanyagcseréről</strong> és a <strong>napi kalóriaszükségletről</strong>.
            </p>

            <h2>Az alapanyagcsere (BMR) és a Mifflin-St. Jeor képlet</h2>
            <p>
              Az <strong>alapanyagcsere</strong> (Basal Metabolic Rate, BMR) azt a
              kalóriamennyiséget jelenti, amelyet szervezetünk teljes nyugalomban – kizárólag az
              életfenntartó folyamatokhoz – felhasznál. Az alapanyagcsere az összes napi
              energiafelhasználás 60–75%-át teszi ki.
            </p>
            <p>
              Kalória kalkulátorunk elsősorban a <strong>Mifflin-St. Jeor képletet</strong>{' '}
              alkalmazza (1990):<br />
              <strong>Férfiak:</strong> BMR = (10 × kg) + (6,25 × cm) − (5 × kor) + 5<br />
              <strong>Nők:</strong> BMR = (10 × kg) + (6,25 × cm) − (5 × kor) − 161
            </p>

            <h2>Fogyás kalóriával – Kalóriadeficit a hatékony testsúlycsökkentéshez</h2>
            <p>
              A <strong>fogyás</strong> alapelve megdönthetetlen:{' '}
              <strong>kalóriadeficitre</strong> van szükség. 1 kg testzsír elégetéséhez kb. 7 700
              kcal deficitre van szükség. Napi 500 kcal hiánnyal ez hetente kb. 0,5 kg fogyást
              jelent – ez az egészségesnek tartott ütem.
            </p>
          </article>
        </div>
      </section>

      {/* Tips */}
      <section className={styles.tipsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>10 bevált tipp a fogyáshoz</h2>
          <div className={styles.tipsGrid}>
            {[
              { icon: '💧', title: '1. Igyon több vizet', text: 'Étkezés előtt egy pohár víz elfogyasztása csökkenti az éhségérzetet és 10–15%-kal kevesebb kalória bevitelét eredményezheti étkezésenként.' },
              { icon: '🥩', title: '2. Fehérje minden étkezésnél', text: 'A fehérje megemeli az anyagcserét (termikus hatás: 20–30%), csökkenti az éhségérzetet és megőrzi az izomtömeget fogyás során.' },
              { icon: '📝', title: '3. Kalórianaplót vezessen', text: 'Kutatások igazolják: akik naponta feljegyzik étkezéseiket, átlagosan kétszer annyit fogynak, mint akik nem.' },
              { icon: '🥦', title: '4. Zöldségek minden tányéron', text: 'Töltse meg a tányér legalább felét zöldséggel – kevés kalóriával sok rostot és tápanyagot visz be.' },
              { icon: '⏰', title: '5. Egyenletes étkezési ritmus', text: 'Naponta 4–5 kisebb étkezés stabilizálja a vércukorszintet, csökkenti a falásrohamok valószínűségét.' },
              { icon: '😴', title: '6. Aludjon eleget', text: 'Az alváshiány növeli az éhséghormon (ghrelin) szintjét. Aki kevesebbet alszik 7 óránál, naponta átlagosan 300–500 kcal-val többet eszik.' },
              { icon: '🚫', title: '7. Csökkentse a folyékony kalóriákat', text: 'Üdítők, gyümölcslevek, alkohol adagonként akár 200–500 kcal-t tartalmazhatnak – anélkül, hogy megtörnék az éhségérzetet.' },
              { icon: '🏃', title: '8. Mozogjon rendszeresen', text: 'A napi 8 000–10 000 lépés extra 300–500 kcal-t éget el. Kombináljon erő- és állóképességi edzést.' },
              { icon: '🍽️', title: '9. Kisebb tányért használjon', text: 'A kisebb tányéron tálalt ételekből automatikusan 20–30%-kal kevesebbet eszünk.' },
              { icon: '🧠', title: '10. Tudatosan egyék', text: 'A tudatos evés lassabb étkezési tempót és a teltségjelzések jobb érzékelését eredményezi.' },
            ].map(({ icon, title, text }) => (
              <div key={title} className={styles.tipCard}>
                <span className={styles.tipIcon}>{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FoodTable />
      <FaqSection items={faqItems} title="GYIK – Kalória Kalkulátor és Kalóriaszükséglet" />
    </>
  );
}
