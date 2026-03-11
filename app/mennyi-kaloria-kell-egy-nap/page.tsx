import type { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '@/components/ui/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mennyi Kalória Kell Egy Nap? – Napi Kalóriaszükséglet 2026',
  description:
    'Mennyi kalória kell egy napra? Napi kalóriaszükséglet nem, kor és aktivitás szerint. Részletes táblázatok, képletek és útmutatók 2026.',
  keywords: ['mennyi kalória kell egy nap', 'napi kalóriaszükséglet', 'kalória szükséglet kor szerint'],
  alternates: { canonical: 'https://www.kaloriakalkulator9.hu/mennyi-kaloria-kell-egy-nap' },
  openGraph: {
    title: 'Mennyi Kalória Kell Egy Nap? – Napi Kalóriaszükséglet 2026',
    description:
      'Napi kalóriaszükséglet nem, kor és aktivitás szerint. Részletes táblázatok, képletek és útmutatók 2026.',
    url: 'https://www.kaloriakalkulator9.hu/mennyi-kaloria-kell-egy-nap',
  },
};

const BASE = 'https://www.kaloriakalkulator9.hu';

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mennyi Kalória Kell Egy Nap? – Napi Kalóriaszükséglet',
    description: 'Részletes útmutató a napi kalóriaszükségletről kor, nem és aktivitás szerint.',
    inLanguage: 'hu',
    url: `${BASE}/mennyi-kaloria-kell-egy-nap`,
    image: `${BASE}/mennyi-kaloria-kell-egy-nap/opengraph-image`,
    author: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE },
    publisher: { '@type': 'Organization', name: 'KalóriaKalkulátor.hu', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/favicon.png` } },
    datePublished: '2026-01-01',
    dateModified: '2026-03-01',
    wordCount: 800,
    articleSection: 'Táplálkozás',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/mennyi-kaloria-kell-egy-nap` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Mennyi kalóriára van szükségem naponta átlagosan?', acceptedAnswer: { '@type': 'Answer', text: 'Átlagosan a nők napi 1800–2200 kcal-t, a férfiak 2200–2800 kcal-t igényelnek.' } },
      { '@type': 'Question', name: 'Hogyan változik a kalóriaszükséglet korral?', acceptedAnswer: { '@type': 'Answer', text: 'Az anyagcsere általában minden évtizedben 1–3%-kal lassul.' } },
    ],
  },
];

const faqItems = [
  { q: 'Mennyi kalóriára van szükségem naponta átlagosan?', a: 'Átlagosan a nők napi 1800–2200 kcal-t, a férfiak 2200–2800 kcal-t igényelnek. Ez aktivitástól, kortól és testméreteiktől függ.' },
  { q: 'Hogyan változik a kalóriaszükséglet korral?', a: 'Az anyagcsere általában minden évtizedben 1–3%-kal lassul. 60 évesen kb. 200–300 kcal-lal kevesebb szükséges, mint 20 évesen (azonos aktivitás mellett).' },
  { q: 'Más-e a kalóriaszükséglet nőknél és férfiaknál?', a: 'Igen – a férfiak általában nagyobb izomtömeggel rendelkeznek, ami magasabb alapanyagcserét eredményez. Azonos testméret mellett a férfiak kb. 10–15%-kal több kalóriát égetnek el.' },
];

export default function MennyiKaloriaPage() {
  return (
    <>
      <StructuredData data={schemas} />

      <div className={styles.articleHero}>
        <div className={styles.container}>
          <Breadcrumb items={[{ name: 'Mennyi kalória kell egy nap?', href: '/mennyi-kaloria-kell-egy-nap' }]} />
          <h1 className={styles.h1}>Mennyi Kalória Kell Egy Nap?</h1>
          <p className={styles.lead}>
            A napi kalóriaszükséglet egyénenként eltér, de nem kell vakon tapogatózni – tudományos
            képletekkel pontosan meghatározható. Ebben a cikkben részletesen bemutatjuk, hogyan
            számíthatja ki saját szükségletét.
          </p>
          <div className={styles.meta}>📖 8 perc olvasás · 2026. január</div>
        </div>
      </div>

      <article className={styles.articleBody}>
        <div className={styles.container}>
          <h2>Az átlagos napi kalóriaszükséglet</h2>
          <p>Az Egészségügyi Világszervezet (WHO) ajánlása szerint a felnőtt nők napi átlagos kalóriaszükséglete <strong>1800–2200 kcal</strong>, a férfiaké <strong>2200–2800 kcal</strong>. Ezek azonban csupán átlagok – az egyéni szükséglet lényegesen eltérhet a testméretek, kor és aktivitás függvényében.</p>

          <h2>Napi kalóriaszükséglet kor szerint – táblázat</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Korcsoport</th><th>Férfiak (kcal/nap)</th><th>Nők (kcal/nap)</th><th>Fogyáshoz – Férfi</th><th>Fogyáshoz – Nő</th></tr>
              </thead>
              <tbody>
                {[
                  ['18–25 év','2 600–2 800','2 000–2 200','2 100–2 300','1 500–1 700'],
                  ['26–35 év','2 400–2 700','1 900–2 100','1 900–2 200','1 400–1 600'],
                  ['36–45 év','2 300–2 600','1 800–2 000','1 800–2 100','1 300–1 500'],
                  ['46–55 év','2 200–2 500','1 700–1 900','1 700–2 000','1 200–1 400'],
                  ['56–65 év','2 100–2 400','1 600–1 800','1 600–1 900','1 100–1 300'],
                  ['65+ év','1 900–2 200','1 500–1 700','1 400–1 700','1 000–1 200'],
                ].map((sor, i) => (
                  <tr key={i}>{sor.map((c, j) => <td key={j}>{c}{j > 0 ? ' kcal' : ''}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>* PAL 1,55 (mérsékelten aktív) és átlagos testméret alapján.</p>

          <h2>Mi befolyásolja a napi kalóriaszükségletet?</h2>
          <p>A <strong>nem</strong> az egyik legfontosabb tényező: a férfiak általában nagyobb izomtömeggel rendelkeznek, ami magasabb alapanyagcserét eredményez. A <strong>kor</strong> szintén meghatározó: az anyagcsere évtizedenként 1–3%-kal lassul. A <strong>testméret</strong> (magasság és súly) közvetlenül befolyásolja a szükséges energiamennyiséget. Végül az <strong>aktivitási szint</strong> a legnagyobb ingadozást okozza: ülő életmód esetén a napi szükséglet akár 40%-kal alacsonyabb lehet, mint intenzív fizikai munkánál.</p>

          <div className={styles.ctaBox}>
            <h3>Számolja ki pontosan személyre szabott szükségletét</h3>
            <p>A fenti táblázat átlagokat mutat. A pontos értékhez használja ingyenes kalória kalkulátorát!</p>
            <Link href="/kaloria-kalkulator" className={styles.ctaBtn}>🔥 Kalória Kalkulátor megnyitása</Link>
          </div>
        </div>
      </article>

      <FaqSection items={faqItems} title="GYIK – Napi Kalóriaszükséglet" />
    </>
  );
}
