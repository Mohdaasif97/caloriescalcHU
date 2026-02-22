import Head from 'next/head';
import { useState, useCallback } from 'react';
import styles from '../styles/Home.module.css';

// PAL activity levels in Hungarian
const PAL_SZINTEK = [
  { label: 'Ülő életmód (irodai munka, kevés mozgás)', pal: 1.2, icon: '💼' },
  { label: 'Enyhén aktív (heti 1–2x sport)', pal: 1.375, icon: '🚶' },
  { label: 'Mérsékelten aktív (heti 3–5x sport)', pal: 1.55, icon: '🏃' },
  { label: 'Nagyon aktív (heti 6–7x intenzív edzés)', pal: 1.725, icon: '🏋️' },
  { label: 'Extrém aktív (fizikai munka + napi edzés)', pal: 1.9, icon: '⚡' },
];

const CELOK = [
  { label: '🔥 Fogyás (−500 kcal/nap)', delta: -500, color: '#ef4444' },
  { label: '⚖️ Súlymegőrzés', delta: 0, color: '#3b82f6' },
  { label: '💪 Izomnövelés (+300 kcal/nap)', delta: 300, color: '#22c55e' },
];

// Harris-Benedict (used by kaloriabazis.hu) + Mifflin-St.Jeor
function harrisBenedict(nem, suly, magassag, kor) {
  if (nem === 'ferfi') {
    return 88.362 + (13.397 * suly) + (4.799 * magassag) - (5.677 * kor);
  } else {
    return 447.593 + (9.247 * suly) + (3.098 * magassag) - (4.330 * kor);
  }
}

function mifflinStJeor(nem, suly, magassag, kor) {
  if (nem === 'ferfi') {
    return (10 * suly) + (6.25 * magassag) - (5 * kor) + 5;
  } else {
    return (10 * suly) + (6.25 * magassag) - (5 * kor) - 161;
  }
}

// BMI category in Hungarian
function bmiKategoria(bmi) {
  if (bmi < 18.5) return { label: 'Alulsúly', color: '#f59e0b' };
  if (bmi < 25)   return { label: 'Normális testsúly ✅', color: '#22c55e' };
  if (bmi < 30)   return { label: 'Túlsúly', color: '#f97316' };
  if (bmi < 35)   return { label: 'Elhízás (I. fokozat)', color: '#ef4444' };
  return { label: 'Súlyos elhízás (II+)', color: '#991b1b' };
}

// Common Hungarian foods with calories
const ELELMISZEREK = [
  { nev: 'Csirkemell (100g)', kcal: 165, feherje: 31, szenhidrat: 0, zsir: 3.6 },
  { nev: 'Tojás (1 db, 60g)', kcal: 86, feherje: 7.5, szenhidrat: 0.4, zsir: 6.1 },
  { nev: 'Fehér rizs főtt (100g)', kcal: 130, feherje: 2.7, szenhidrat: 28, zsir: 0.3 },
  { nev: 'Burgonya főtt (100g)', kcal: 77, feherje: 2, szenhidrat: 17, zsir: 0.1 },
  { nev: 'Alma (100g)', kcal: 52, feherje: 0.3, szenhidrat: 14, zsir: 0.2 },
  { nev: 'Banán (100g)', kcal: 89, feherje: 1.1, szenhidrat: 23, zsir: 0.3 },
  { nev: 'Görögdinnye (100g)', kcal: 30, feherje: 0.6, szenhidrat: 7.6, zsir: 0.2 },
  { nev: 'Zabpehely (100g)', kcal: 370, feherje: 13, szenhidrat: 66, zsir: 7 },
  { nev: 'Trappista sajt (100g)', kcal: 336, feherje: 24, szenhidrat: 0.5, zsir: 26 },
  { nev: 'Tej (100ml)', kcal: 61, feherje: 3.2, szenhidrat: 4.8, zsir: 3.3 },
  { nev: 'Kenyér fehér (100g)', kcal: 265, feherje: 9, szenhidrat: 50, zsir: 3.2 },
  { nev: 'Tészta főtt (100g)', kcal: 131, feherje: 5, szenhidrat: 25, zsir: 1.1 },
  { nev: 'Sertésszelet (100g)', kcal: 242, feherje: 27, szenhidrat: 0, zsir: 14 },
  { nev: 'Lazac (100g)', kcal: 208, feherje: 20, szenhidrat: 0, zsir: 13 },
  { nev: 'Brokkoli (100g)', kcal: 34, feherje: 2.8, szenhidrat: 7, zsir: 0.4 },
  { nev: 'Avokádó (100g)', kcal: 160, feherje: 2, szenhidrat: 9, zsir: 15 },
  { nev: 'Dió (100g)', kcal: 654, feherje: 15, szenhidrat: 14, zsir: 65 },
  { nev: 'Mozzarella (100g)', kcal: 280, feherje: 18, szenhidrat: 3.1, zsir: 22 },
  { nev: 'Joghurt (100g)', kcal: 59, feherje: 3.5, szenhidrat: 4.7, zsir: 3.3 },
  { nev: 'Sült csirkecomb (100g)', kcal: 245, feherje: 26, szenhidrat: 0, zsir: 15 },
];

export default function Home() {
  const [nem, setNem] = useState('ferfi');
  const [kor, setKor] = useState('');
  const [magassag, setMagassag] = useState('');
  const [suly, setSuly] = useState('');
  const [aktivitas, setAktivitas] = useState(1);
  const [cel, setCel] = useState(0);
  const [modszer, setModszer] = useState('mifflin');
  const [eredmeny, setEredmeny] = useState(null);
  const [hiba, setHiba] = useState('');
  const [activeTab, setActiveTab] = useState('kalkulator');

  const kiszamit = useCallback(() => {
    const k = parseFloat(kor);
    const m = parseFloat(magassag);
    const s = parseFloat(suly);

    if (!k || !m || !s || k < 10 || k > 110 || m < 100 || m > 250 || s < 30 || s > 300) {
      setHiba('Kérjük érvényes adatokat adjon meg! (Kor: 10–110, Magasság: 100–250 cm, Súly: 30–300 kg)');
      return;
    }
    setHiba('');

    const alapanyagcsere = modszer === 'harris'
      ? harrisBenedict(nem, s, m, k)
      : mifflinStJeor(nem, s, m, k);

    const alapanyagcserekerekitett = Math.round(alapanyagcsere);
    const palSzorzo = PAL_SZINTEK[aktivitas].pal;
    const osszesCsere = Math.round(alapanyagcsere * palSzorzo);
    const celKcal = osszesCsere + CELOK[cel].delta;

    // Macros
    const feherjeGKg = cel === 2 ? 2.0 : 1.7;
    const feherjeG = Math.round(feherjeGKg * s);
    const feherjeKcal = feherjeG * 4;
    const zsirKcal = Math.round(celKcal * 0.25);
    const zsirG = Math.round(zsirKcal / 9);
    const szenhidratKcal = celKcal - feherjeKcal - zsirKcal;
    const szenhidratG = Math.round(szenhidratKcal / 4);

    // BMI
    const bmi = parseFloat((s / ((m / 100) ** 2)).toFixed(1));
    const bmiInfo = bmiKategoria(bmi);

    // Ideal weight (Devine formula)
    const idealisSuly = nem === 'ferfi'
      ? Math.round(50 + 2.3 * ((m - 152.4) / 2.54))
      : Math.round(45.5 + 2.3 * ((m - 152.4) / 2.54));

    setEredmeny({
      alapanyagcsere: alapanyagcserekerekitett,
      osszesCsere,
      celKcal: Math.max(celKcal, nem === 'ferfi' ? 1500 : 1200),
      feherjeG, zsirG, szenhidratG,
      bmi, bmiInfo,
      idealisSuly,
      palLabel: PAL_SZINTEK[aktivitas].label,
      celLabel: CELOK[cel].label,
      celDelta: CELOK[cel].delta,
    });
  }, [nem, kor, magassag, suly, aktivitas, cel, modszer]);

  // Schema.org structured data
  const schemaApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalória Kalkulátor 2026 – Kalóriaszükséglet Kiszámítása",
    "description": "Ingyenes kalória kalkulátor: Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét és makrotápanyag-szükségletét. Mifflin-St. Jeor és Harris-Benedict képlet alapján. Fogyáshoz, súlymegőrzéshez és izomnöveléshez.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "inLanguage": "hu",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "HUF" },
    "featureList": [
      "Alapanyagcsere kiszámítása",
      "Napi kalóriaszükséglet (PAL-faktor alapján)",
      "Mifflin-St. Jeor és Harris-Benedict képlet",
      "Makrotápanyag ajánlás (fehérje, zsír, szénhidrát)",
      "BMI számítás",
      "Ideális testsúly kalkulátor"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Mennyi kalóriára van szükségem naponta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A napi kalóriaszükséglet függ a nemtől, kortól, magasságtól, súlytól és aktivitási szinttől. Átlagosan a nők napi 1800–2200 kcal-t, a férfiak 2200–2800 kcal-t igényelnek. Kalória kalkulátorunk pontosan kiszámítja az Ön személyes szükségletét."
        }
      },
      {
        "@type": "Question",
        "name": "Mi az alapanyagcsere (BMR)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Az alapanyagcsere (Basal Metabolic Rate, BMR) az a kalóriamennyiség, amelyet a szervezet teljes nyugalomban – életfenntartó folyamatokhoz (légzés, szívverés, testhőmérséklet) – felhasznál. Ez az összes napi energiafelhasználás 60–75%-át teszi ki."
        }
      },
      {
        "@type": "Question",
        "name": "Hány kalória kell a fogyáshoz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A fogyáshoz kalóriadeficitra van szükség. Napi 500 kcal hiány hetente kb. 0,5 kg fogyást eredményez. Az egészséges fogyás üteme 0,5–1 kg per hét. Kalória kalkulátorunk kiszámítja az Ön fogyáshoz szükséges napi kalóriabevitelét."
        }
      },
      {
        "@type": "Question",
        "name": "Mi a különbség a Mifflin-St. Jeor és a Harris-Benedict képlet között?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mindkettő az alapanyagcserét számítja, de különböző pontossággal. A Mifflin-St. Jeor képletet (1990) pontosabbnak tartják a modern, jellemzően ülő életmódot folytató emberekre. A Harris-Benedict képlet (1919) az idősebb, széles körben elterjedt módszer. Kalkulátorunk mindkettőt támogatja."
        }
      },
      {
        "@type": "Question",
        "name": "Hogyan számítom ki a BMI-t?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI = testsúly (kg) / (magasság (m))². Például: 75 kg / (1.75 m)² = 24.5. Normális testsúly: 18.5–24.9. Túlsúly: 25–29.9. Elhízás: 30 felett. Kalkulátorunk automatikusan kiszámítja az Ön BMI értékét."
        }
      },
      {
        "@type": "Question",
        "name": "Mi a PAL faktor a kalóriaszámításban?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A PAL (Physical Activity Level) faktor az aktivitási szintet jelzi. Az alapanyagcserét megszorozzuk a PAL értékkel, hogy megkapjuk a napi összes energiafelhasználást. Értéke 1.2 (ülő életmód) és 1.9 (extrém aktív) között mozog."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Kalória Kalkulátor 2026 – Napi Kalóriaszükséglet Kiszámítása | Ingyenes</title>
        <meta name="description" content="✅ Ingyenes kalória kalkulátor 2026: Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét és BMI-jét. Harris-Benedict & Mifflin-St. Jeor képlet ✓ Makrotápanyagok ✓ Fogyáshoz & izomnöveléshez. Kalóriaszámítás most!" />
        <meta name="keywords" content="kalória kalkulátor, kalória számítás, napi kalóriaszükséglet, kalória kalkulator, alapanyagcsere számítás, bmr kalkulátor, kalóriaszámoló, kalória számító, fogyás kalória, kalóriabevitel számítás, makrotápanyag kalkulátor, bmi számítás, ideális testsúly, kalória fogyáshoz, harris benedict kalkulátor, mifflin st jeor, pal faktor, energiaszükséglet számítás, kalóriaszükséglet kiszámítása" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kalória Kalkulátor" />
        <meta name="language" content="hu" />
        <meta name="geo.region" content="HU" />
        <meta name="geo.country" content="Hungary" />
        <link rel="canonical" href="https://www.kaloria-kalkulator.hu/" />

        <meta property="og:title" content="Kalória Kalkulátor 2026 – Napi Kalóriaszükséglet Kiszámítása" />
        <meta property="og:description" content="Ingyenes kalória kalkulátor: Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét, BMI-jét és makrotápanyag-szükségletét egyszerűen és pontosan." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta property="og:url" content="https://www.kaloria-kalkulator.hu/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kalória Kalkulátor 2026 – Ingyenes Magyar Kalóriaszámoló" />
        <meta name="twitter:description" content="Számítsa ki pontosan napi kalóriaszükségletét! Alapanyagcsere, PAL-faktor, makrotápanyagok és BMI – egy helyen." />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>

        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <span className={styles.logoFire}>🔥</span>
              <span>Kalória<span className={styles.accent}>Kalkulátor</span>.hu</span>
            </div>
            <nav className={styles.nav}>
              <a href="#kalkulator">Kalkulátor</a>
              <a href="#elelmiszertablazat">Élelmiszer táblázat</a>
              <a href="#tippek">Tippek</a>
              <a href="#gyik">GYIK</a>
            </nav>
          </div>
        </header>

        <main>

          {/* HERO */}
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <div className={styles.heroLeft}>
                <div className={styles.heroPill}>🇭🇺 Magyar Kalória Kalkulátor · Ingyenes · 2026</div>
                <h1 className={styles.h1}>
                  Kalória Kalkulátor –<br />
                  <span className={styles.h1Orange}>Napi Kalóriaszükséglet</span><br />
                  Kiszámítása
                </h1>
                <p className={styles.heroSub}>
                  Számítsa ki személyre szabott <strong>napi kalóriaszükségletét</strong>, <strong>alapanyagcseréjét</strong> és <strong>makrotápanyag-igényét</strong> tudományosan igazolt képletekkel. Fogyáshoz, súlymegőrzéshez és izomnöveléshez egyaránt.
                </p>
                <div className={styles.heroBadges}>
                  <span>📐 Harris-Benedict</span>
                  <span>🧬 Mifflin-St. Jeor</span>
                  <span>⚡ PAL-faktor</span>
                  <span>🥗 Makrotápanyagok</span>
                  <span>📊 BMI számítás</span>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.statsBox}>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>~2 000</span>
                    <span className={styles.statLabel}>kcal/nap · átlag nő</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>~2 500</span>
                    <span className={styles.statLabel}>kcal/nap · átlag férfi</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>−500</span>
                    <span className={styles.statLabel}>kcal/nap · fogyáshoz</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CALCULATOR */}
          <section id="kalkulator" className={styles.calcSection}>
            <div className={styles.container}>
              <div className={styles.calcCard}>
                {!eredmeny ? (
                  <>
                    <div className={styles.calcHeader}>
                      <h2>Kalória Kalkulátor – Adja meg adatait</h2>
                      <p>Töltse ki az alábbi mezőket, és kalóriakalkulátorunk azonnal kiszámítja napi szükségletét.</p>
                    </div>

                    {/* Képlet választó */}
                    <div className={styles.methodRow}>
                      <span className={styles.methodLabel}>Számítási képlet:</span>
                      <div className={styles.methodBtns}>
                        <button
                          className={`${styles.methodBtn} ${modszer === 'mifflin' ? styles.methodActive : ''}`}
                          onClick={() => setModszer('mifflin')}
                        >Mifflin-St. Jeor <span className={styles.methodTag}>Pontosabb</span></button>
                        <button
                          className={`${styles.methodBtn} ${modszer === 'harris' ? styles.methodActive : ''}`}
                          onClick={() => setModszer('harris')}
                        >Harris-Benedict <span className={styles.methodTag}>Klasszikus</span></button>
                      </div>
                    </div>

                    {/* Step 1 */}
                    <div className={styles.step}>
                      <div className={styles.stepHead}><span className={styles.stepNum}>1</span> Személyes adatok</div>

                      <div className={styles.nemRow}>
                        <button className={`${styles.nemBtn} ${nem === 'ferfi' ? styles.nemActive : ''}`}
                          onClick={() => { setNem('ferfi'); setEredmeny(null); }}>
                          <span className={styles.nemIcon}>👨</span> Férfi
                        </button>
                        <button className={`${styles.nemBtn} ${nem === 'no' ? styles.nemActive : ''}`}
                          onClick={() => { setNem('no'); setEredmeny(null); }}>
                          <span className={styles.nemIcon}>👩</span> Nő
                        </button>
                      </div>

                      <div className={styles.inputGrid3}>
                        <div className={styles.field}>
                          <label className={styles.label} htmlFor="kor">Kor</label>
                          <div className={styles.inputWrap}>
                            <input id="kor" type="number" min="10" max="110" placeholder="pl. 30"
                              className={styles.input} value={kor}
                              onChange={e => { setKor(e.target.value); setEredmeny(null); }} />
                            <span className={styles.unit}>év</span>
                          </div>
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label} htmlFor="magassag">Magasság</label>
                          <div className={styles.inputWrap}>
                            <input id="magassag" type="number" min="100" max="250" placeholder="pl. 175"
                              className={styles.input} value={magassag}
                              onChange={e => { setMagassag(e.target.value); setEredmeny(null); }} />
                            <span className={styles.unit}>cm</span>
                          </div>
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label} htmlFor="suly">Testsúly</label>
                          <div className={styles.inputWrap}>
                            <input id="suly" type="number" min="30" max="300" placeholder="pl. 75"
                              className={styles.input} value={suly}
                              onChange={e => { setSuly(e.target.value); setEredmeny(null); }} />
                            <span className={styles.unit}>kg</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className={styles.step}>
                      <div className={styles.stepHead}><span className={styles.stepNum}>2</span> Aktivitási szint (PAL-faktor)</div>
                      <div className={styles.aktivitasLista}>
                        {PAL_SZINTEK.map((p, i) => (
                          <label key={i} className={`${styles.aktivitasElem} ${aktivitas === i ? styles.aktivitasAktiv : ''}`}>
                            <input type="radio" name="aktivitas" checked={aktivitas === i}
                              onChange={() => { setAktivitas(i); setEredmeny(null); }} />
                            <span className={styles.aktivitasIcon}>{p.icon}</span>
                            <span className={styles.aktivitasText}>{p.label}</span>
                            <span className={styles.aktivitasPal}>PAL {p.pal}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className={styles.step}>
                      <div className={styles.stepHead}><span className={styles.stepNum}>3</span> Célom</div>
                      <div className={styles.celGrid}>
                        {CELOK.map((c, i) => (
                          <button key={i}
                            className={`${styles.celBtn} ${cel === i ? styles.celAktiv : ''}`}
                            style={cel === i ? { borderColor: c.color, background: c.color + '18' } : {}}
                            onClick={() => { setCel(i); setEredmeny(null); }}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {hiba && <div className={styles.hiba}>⚠️ {hiba}</div>}

                    <button className={styles.btnSzamit} onClick={kiszamit}>
                      🔥 Kalóriaszükséglet kiszámítása
                    </button>
                  </>
                ) : (
                  /* EREDMÉNYEK */
                  <div className={styles.eredmenyek}>
                    <div className={styles.eredmenyFej}>
                      <h2>Az Ön kalóriaszükséglete</h2>
                      <p>{eredmeny.celLabel} · {eredmeny.palLabel.split('(')[0].trim()}</p>
                    </div>

                    {/* Fő számok */}
                    <div className={styles.foSzamok}>
                      <div className={styles.foKartya}>
                        <span className={styles.foKartyaCim}>Alapanyagcsere (BMR)</span>
                        <span className={styles.foKartyaSzam}>{eredmeny.alapanyagcsere.toLocaleString('hu-HU')}</span>
                        <span className={styles.foKartyaEgyseg}>kcal/nap</span>
                        <span className={styles.foKartyaMegjegyzes}>Nyugalmi energiafelhasználás</span>
                      </div>
                      <div className={styles.nyil}>→</div>
                      <div className={styles.foKartya}>
                        <span className={styles.foKartyaCim}>Összes csere (TDEE)</span>
                        <span className={styles.foKartyaSzam}>{eredmeny.osszesCsere.toLocaleString('hu-HU')}</span>
                        <span className={styles.foKartyaEgyseg}>kcal/nap</span>
                        <span className={styles.foKartyaMegjegyzes}>Aktivitással együtt</span>
                      </div>
                      <div className={styles.nyil}>→</div>
                      <div className={`${styles.foKartya} ${styles.foKartyaKiemelt}`}>
                        <span className={styles.foKartyaCim}>🎯 Célkalória</span>
                        <span className={styles.foKartyaSzam}>{eredmeny.celKcal.toLocaleString('hu-HU')}</span>
                        <span className={styles.foKartyaEgyseg}>kcal/nap</span>
                        <span className={styles.foKartyaMegjegyzes}>
                          {eredmeny.celDelta < 0 ? `${Math.abs(eredmeny.celDelta)} kcal deficit` :
                           eredmeny.celDelta > 0 ? `+${eredmeny.celDelta} kcal többlet` : 'Fenntartó kalória'}
                        </span>
                      </div>
                    </div>

                    {/* Makrotápanyagok */}
                    <div className={styles.makroSzekció}>
                      <h3 className={styles.makroCim}>Ajánlott makrotápanyag-bevitel</h3>
                      <div className={styles.makroRács}>
                        <div className={`${styles.makroKártya} ${styles.makroFehérje}`}>
                          <span className={styles.makroIkon}>🥩</span>
                          <span className={styles.makroNév}>Fehérje</span>
                          <span className={styles.makroG}>{eredmeny.feherjeG} g</span>
                          <span className={styles.makroKcal}>{(eredmeny.feherjeG * 4).toLocaleString('hu-HU')} kcal</span>
                        </div>
                        <div className={`${styles.makroKártya} ${styles.makroZsír}`}>
                          <span className={styles.makroIkon}>🥑</span>
                          <span className={styles.makroNév}>Zsír</span>
                          <span className={styles.makroG}>{eredmeny.zsirG} g</span>
                          <span className={styles.makroKcal}>{(eredmeny.zsirG * 9).toLocaleString('hu-HU')} kcal</span>
                        </div>
                        <div className={`${styles.makroKártya} ${styles.makroSzénh}`}>
                          <span className={styles.makroIkon}>🍚</span>
                          <span className={styles.makroNév}>Szénhidrát</span>
                          <span className={styles.makroG}>{eredmeny.szenhidratG} g</span>
                          <span className={styles.makroKcal}>{(eredmeny.szenhidratG * 4).toLocaleString('hu-HU')} kcal</span>
                        </div>
                      </div>
                    </div>

                    {/* BMI + ideális testsúly */}
                    <div className={styles.bmiSor}>
                      <div className={styles.bmiElem}>
                        <span className={styles.bmiCimke}>BMI:</span>
                        <span className={styles.bmiErtek}>{eredmeny.bmi}</span>
                        <span className={styles.bmiStátusz} style={{ color: eredmeny.bmiInfo.color }}>
                          {eredmeny.bmiInfo.label}
                        </span>
                      </div>
                      <div className={styles.bmiElvalaszto}></div>
                      <div className={styles.bmiElem}>
                        <span className={styles.bmiCimke}>Ideális testsúly:</span>
                        <span className={styles.bmiErtek}>{eredmeny.idealisSuly} kg</span>
                        <span className={styles.bmiStátusz} style={{ color: '#888' }}>Devine-képlet</span>
                      </div>
                    </div>

                    <div className={styles.eredmenyMegjegyzes}>
                      Az értékek a <strong>{modszer === 'mifflin' ? 'Mifflin-St. Jeor' : 'Harris-Benedict'}</strong> képleten alapulnak, tájékoztató jellegűek. Egyéni eltérések ±10%-ban lehetségesek. Orvosi kérdésekben konzultáljon szakemberrel.
                    </div>

                    <button className={styles.btnUjra} onClick={() => setEredmeny(null)}>
                      ← Újra számítás
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SEO TARTALOM BLOKK 1 */}
          <section className={styles.tartalomSzekció}>
            <div className={styles.container}>
              <article className={styles.cikk}>
                <h2>Kalória Kalkulátor 2026 – Hogyan számítsa ki napi kalóriaszükségletét?</h2>
                <p>
                  A <strong>kalória kalkulátor</strong> a leggyorsabb és legmegbízhatóbb módszer arra, hogy megtudjuk, naponta pontosan mennyi kalóriára van szükségünk. Kalória kalkulátorunk tudományosan igazolt képleteket alkalmaz – a <strong>Mifflin-St. Jeor</strong> és a <strong>Harris-Benedict</strong> egyenletet –, amelyek a legpontosabb becslést adják az <strong>alapanyagcseréről</strong> és a <strong>napi kalóriaszükségletről</strong>. Az eredmény személyre szabott: figyelembe veszi nemét, korát, magasságát, testsúlyát, aktivitási szintjét (PAL-faktort) és a célját – legyen szó fogyásról, súlymegőrzésről vagy izomnövelésről.
                </p>
                <p>
                  A <strong>kalóriaszámítás</strong> alapja az egyszerű energiaegyenleg: ha több kalóriát éget el, mint amennyit bevesz, fogy; ha kevesebbet, hízik. A kalória kalkulátor segítségével pontosan meghatározhatja azt a <strong>napi kalóriakeretet</strong>, amely a céljának leginkább megfelelő eredményt hozza.
                </p>

                <h2>Az alapanyagcsere (BMR) és a Mifflin-St. Jeor képlet</h2>
                <p>
                  Az <strong>alapanyagcsere</strong> (angolul: Basal Metabolic Rate, rövidítve BMR) azt a kalóriamennyiséget jelenti, amelyet szervezetünk teljes nyugalomban – kizárólag az életfenntartó folyamatokhoz (légzés, szívverés, testhőmérséklet szabályozása, sejtek regenerálódása) – felhasznál. Az alapanyagcsere az összes napi energiafelhasználás 60–75%-át teszi ki.
                </p>
                <p>
                  Kalória kalkulátorunk elsősorban a <strong>Mifflin-St. Jeor képletet</strong> alkalmazza, amelyet 1990-ben dolgoztak ki és a mai napig a legpontosabb módszernek tartják az alapanyagcsere meghatározásához:<br />
                  <strong>Férfiak esetén:</strong> BMR = (10 × kg) + (6,25 × cm) − (5 × kor) + 5<br />
                  <strong>Nők esetén:</strong> BMR = (10 × kg) + (6,25 × cm) − (5 × kor) − 161
                </p>
                <p>
                  Például: egy 30 éves, 175 cm magas, 80 kg-os férfi alapanyagcseréje: (10 × 80) + (6,25 × 175) − (5 × 30) + 5 = 800 + 1093,75 − 150 + 5 = <strong>1748 kcal/nap</strong>.
                </p>

                <h2>A Harris-Benedict képlet – a klasszikus kalóriaszámítási módszer</h2>
                <p>
                  A <strong>Harris-Benedict képlet</strong> az 1919-ben kidolgozott, hagyományos alapanyagcsere-számítási módszer, amelyet a világ számos kalóriaszámláló oldala – köztük a <strong>kaloriabazis.hu</strong> is – alkalmaz. Bár valamivel kevésbé pontos a modern emberekre nézve, mint a Mifflin-képlet, mégis széles körben elterjedt és elfogadott:<br />
                  <strong>Férfiak:</strong> BMR = 88,362 + (13,397 × kg) + (4,799 × cm) − (5,677 × kor)<br />
                  <strong>Nők:</strong> BMR = 447,593 + (9,247 × kg) + (3,098 × cm) − (4,330 × kor)
                </p>
                <p>
                  Kalória kalkulátorunk lehetőséget nyújt mindkét képlet alkalmazására, hogy az Önnek legmegfelelőbb módszerrel számíthassa ki <strong>napi kalóriaigényét</strong>.
                </p>

                <h2>A PAL-faktor szerepe a kalóriaszámításban</h2>
                <p>
                  A PAL-faktor (Physical Activity Level, azaz fizikai aktivitási szint) egy szorzószám, amellyel az alapanyagcserét meg kell szorozni, hogy megkapjuk a <strong>napi összes energiafelhasználást</strong> (TDEE – Total Daily Energy Expenditure). Értéke az aktivitástól függően változik:
                </p>
                <p>
                  Az <strong>1,2</strong>-es PAL érték az ülő életmódot folytató, szinte egyáltalán nem mozgó emberekre jellemző. Az <strong>1,375</strong>-ös szint a heti 1–2 alkalommal sportolókra vonatkozik. Az <strong>1,55</strong>-ös PAL-faktor a heti 3–5 edzésnapot tartó, aktív életmódot folytató személyek értéke. A <strong>1,725</strong>-ös szint a napi intenzív sportolókat jellemzi, míg a <strong>1,9</strong>-es PAL az extrém aktívakra – például fizikai munkát végzőkre vagy élsportolókra – érvényes.
                </p>
              </article>
            </div>
          </section>

          {/* ÉLELMISZER TÁBLÁZAT */}
          <section id="elelmiszertablazat" className={styles.tablaSzekció}>
            <div className={styles.container}>
              <h2 className={styles.szekcióCím}>Magyar élelmiszerek kalóriatáblázata</h2>
              <p className={styles.szekcióBevezető}>
                Az alábbi <strong>kalóriatáblázat</strong> a leggyakrabban fogyasztott magyar élelmiszerek <strong>kalóriatartalmát</strong> mutatja be – 100 grammonként feltüntetve a fehérje, szénhidrát és zsírtartalmat is. Használja kalória kalkulátorunkkal együtt a pontos <strong>kalóriabevitel</strong> nyomon követéséhez.
              </p>
              <div className={styles.tablaWrap}>
                <table className={styles.tabla}>
                  <thead>
                    <tr>
                      <th>Élelmiszer</th>
                      <th>Kalória (kcal)</th>
                      <th>Fehérje (g)</th>
                      <th>Szénhidrát (g)</th>
                      <th>Zsír (g)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ELELMISZEREK.map((e, i) => (
                      <tr key={i}>
                        <td><strong>{e.nev}</strong></td>
                        <td className={styles.kcalCella}>{e.kcal} kcal</td>
                        <td>{e.feherje} g</td>
                        <td>{e.szenhidrat} g</td>
                        <td>{e.zsir} g</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tablaMegjegyzes}>* Az adatok 100 grammra vonatkoznak, kivéve ahol jelölve van. Forrás: USDA, Európai élelmiszerbiztonság.</p>
            </div>
          </section>

          {/* TIPPEK */}
          <section id="tippek" className={styles.tippekSzekció}>
            <div className={styles.container}>
              <h2 className={styles.szekcióCím}>10 bevált tipp a fogyáshoz és az egészséges kalóriabevitelhez</h2>
              <p className={styles.szekcióBevezető}>
                A <strong>kalória kalkulátor</strong> használata az első lépés – de a hosszú távú siker a szokásokon múlik. Íme a leghatásosabb, tudományosan alátámasztott tippek a hatékony <strong>kalóriaszámításhoz</strong> és fogyáshoz.
              </p>
              <div className={styles.tippekRács}>
                {[
                  { ikon: '💧', cim: '1. Igyon több vizet', szoveg: 'Étkezés előtt egy pohár víz elfogyasztása csökkenti az éhségérzetet és 10–15%-kal kevesebb kalória bevitelét eredményezheti étkezésenként. A napi 2–3 liter vízfogyasztás elengedhetetlen az anyagcsere hatékony működéséhez.' },
                  { ikon: '🥩', cim: '2. Fehérje minden étkezésnél', szoveg: 'A fehérje a legjobb teltségérzetet nyújtó makrotápanyag: megemeli az anyagcserét (termikus hatás: 20–30%), csökkenti az éhségérzetet és megőrzi az izomtömeget fogyás során. Célozzon meg étkezésenként 25–35 g fehérjét.' },
                  { ikon: '📝', cim: '3. Kalórianaplót vezessen', szoveg: 'Kutatások igazolják: akik naponta feljegyzik étkezéseiket, átlagosan kétszer annyit fogynak, mint akik nem. A kalórianaplózás növeli az étkezési tudatosságot és segít azonosítani a "rejtett kalóriák" forrásait.' },
                  { ikon: '🥦', cim: '4. Zöldségek minden tányéron', szoveg: 'Töltse meg a tányér legalább felét zöldséggel – kevés kalóriával sok rostot és tápanyagot visz be, ami hosszabb teltségérzetet biztosít. Különösen ajánlott: brokkoli, spenót, cukkini, paprika, paradicsom.' },
                  { ikon: '⏰', cim: '5. Egyenletes étkezési ritmus', szoveg: 'Naponta 4–5 kisebb étkezés stabilizálja a vércukorszintet, csökkenti a falásrohamok valószínűségét és fokozza az anyagcserét. Kerülje a hosszú, 5 óránál hosszabb étkezési szüneteket.' },
                  { ikon: '😴', cim: '6. Aludjon eleget', szoveg: 'Az alváshiány növeli az éhséghormon (ghrelin) szintjét és csökkenti a teltséghormon (leptin) termelődését. Aki kevesebbet alszik 7 óránál, naponta átlagosan 300–500 kcal-val többet eszik. Törekedjünk 7–9 óra alvásra.' },
                  { ikon: '🚫', cim: '7. Csökkentse a folyékony kalóriákat', szoveg: 'Üdítők, gyümölcslevek, alkohol és tejeskávék adagonként akár 200–500 kcal-t tartalmazhatnak – anélkül, hogy megtörnék az éhségérzetet. Víz, cukrozatlan tea és fekete kávé fogyasztásával sokat spórolhat.' },
                  { ikon: '🏃', cim: '8. Mozogjon rendszeresen', szoveg: 'A napi 8 000–10 000 lépés extra 300–500 kcal-t éget el. Kombináljon erő- és állóképességi edzést a legjobb eredmény érdekében – az izomtömeg növelése tartósan emeli az alapanyagcserét is.' },
                  { ikon: '🍽️', cim: '9. Kisebb tányért használjon', szoveg: 'Vizsgálatok bizonyítják, hogy a kisebb tányéron tálalt ételekből automatikusan 20–30%-kal kevesebbet eszünk – az agy be van csapva a teljes tányér látványától. Ez az egyik legegyszerűbb kalóriaszabályozási módszer.' },
                  { ikon: '🧠', cim: '10. Tudatosan egyék', szoveg: 'Az ún. "mindful eating" (tudatos evés) módszer lassabb evési tempót és a teltségjelzések jobb érzékelését eredményezi. Tegyük le az evőeszközt falatok között, rágjunk lassabban – a jóllakottság érzése 15–20 perccel az evés után alakul ki.' },
                ].map((t, i) => (
                  <div key={i} className={styles.tippKartya}>
                    <span className={styles.tippIkon}>{t.ikon}</span>
                    <h3>{t.cim}</h3>
                    <p>{t.szoveg}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Kor szerinti táblázat */}
          <section className={styles.tartalomSzekció} style={{background:'#fff'}}>
            <div className={styles.container}>
              <article className={styles.cikk}>
                <h2>Napi kalóriaszükséglet kor és nem szerint – Átlagos értékek</h2>
                <p>
                  Az alábbi táblázat tájékoztató jelleggel mutatja be az átlagos <strong>napi kalóriaszükségletet</strong> különböző korcsoportokban, mérsékelt aktivitási szint (PAL 1,55) esetén. Az egyéni szükséglet a testmagasságtól, testsúlytól és az aktuális aktivitástól függően lényegesen eltérhet – éppen ezért ajánlott a fenti <strong>kalória kalkulátor</strong> személyes használata.
                </p>
              </article>
              <div className={styles.tablaWrap} style={{marginTop:'20px'}}>
                <table className={styles.tabla}>
                  <thead>
                    <tr>
                      <th>Korcsoport</th>
                      <th>Férfiak (kcal/nap)</th>
                      <th>Nők (kcal/nap)</th>
                      <th>Fogyáshoz – Férfi</th>
                      <th>Fogyáshoz – Nő</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['18–25 év', '2 600–2 800', '2 000–2 200', '2 100–2 300', '1 500–1 700'],
                      ['26–35 év', '2 400–2 700', '1 900–2 100', '1 900–2 200', '1 400–1 600'],
                      ['36–45 év', '2 300–2 600', '1 800–2 000', '1 800–2 100', '1 300–1 500'],
                      ['46–55 év', '2 200–2 500', '1 700–1 900', '1 700–2 000', '1 200–1 400'],
                      ['56–65 év', '2 100–2 400', '1 600–1 800', '1 600–1 900', '1 100–1 300'],
                      ['65+ év',   '1 900–2 200', '1 500–1 700', '1 400–1 700', '1 000–1 200'],
                    ].map((sor, i) => (
                      <tr key={i}>{sor.map((c, j) => <td key={j}>{c} {j > 0 ? 'kcal' : ''}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tablaMegjegyzes}>* PAL 1,55 (mérsékelten aktív) és átlagos testmagasság/testsúly alapján. Pontosabb értékért használja kalória kalkulátorát.</p>
            </div>
          </section>

          {/* SEO tartalom 2 */}
          <section className={styles.tartalomSzekció}>
            <div className={styles.container}>
              <article className={styles.cikk}>
                <h2>Fogyás kalóriával – Kalóriadeficit a hatékony testsúlycsökkentéshez</h2>
                <p>
                  A <strong>fogyás</strong> alapelve megdönthetetlen: <strong>kalóriadeficitre</strong> van szükség, azaz kevesebb kalóriát kell bevinni, mint amennyit a szervezet felhasznál. 1 kg testzsír elégetéséhez kb. 7 700 kcal deficitre van szükség. Napi 500 kcal hiánnyal ez hetente kb. 0,5 kg fogyást jelent – ez az egészségesnek tartott ütem, amellyel megőrizhető az izomtömeg és elkerülhető a jojó-effektus.
                </p>
                <p>
                  Kalória kalkulátorunk a "Fogyás" célnál automatikusan 500 kcal-lal csökkentett <strong>kalóriabeviteli keretet</strong> számít ki. Fontos biztonsági határ: nők esetén ne csökkentse a bevitelt 1 200 kcal alá, férfiaknál 1 500 kcal az ajánlott minimum – ez alatt az anyagcsere lelassul, és a szervezet izomfehérjét is lebont.
                </p>

                <h2>Kalóriaszükséglet izomnöveléshez – Tömegelés kalória kalkulátorral</h2>
                <p>
                  Az <strong>izomnövelés</strong> (hipertrófia) megköveteli, hogy a szervezet kalóriatöbbletből gazdálkodjon. Az ajánlott napi <strong>kalóriatöbblét</strong> izomnöveléshez 200–400 kcal – ennél nagyobb felesleg esetén a fölösleges energia zsírszövet formájában raktározódik el. A fehérjebevitel ugyanilyen fontos: a szakmai ajánlás szerint testsúlykilogrammonként napi 1,6–2,2 g fehérje szükséges az izomfehérje-szintézishez.
                </p>
                <p>
                  Kalória kalkulátorunk az izomnövelési célhoz automatikusan +300 kcal-os többletet és emelt fehérjeajánlást számít: testsúlykilogrammonként 2 g fehérjét. Ez az optimális arány, amely maximalizálja az izomépítést és minimalizálja a felesleges zsírgyarapodást.
                </p>

                <h2>BMI kalkulátor – Testtömegindex kiszámítása</h2>
                <p>
                  A <strong>BMI</strong> (Body Mass Index, testtömegindex) a testsúly és a testmagasság négyzetének hányadosa: BMI = kg / m². Bár önmagában nem ad teljes képet az egészségi állapotról – nem veszi figyelembe az izom- és zsírarány különbségét –, mégis hasznos mutatója az általános testsúlykategóriának. A WHO-ajánlás szerint a normális BMI tartomány 18,5 és 24,9 közé esik; 25 felett túlsúlyról, 30 felett elhízásról, 18,5 alatt alulsúlyról beszélünk.
                </p>
                <p>
                  Kalória kalkulátorunk az eredmények között automatikusan kiszámítja az Ön <strong>BMI értékét</strong>, és kategorizálja az eredményt. Emellett megjeleníti a <strong>Devine-képleten</strong> alapuló ideális testsúlyt is.
                </p>

                <h2>Miért fontos a kalóriaszámítás? – 10 érv a kalória kalkulátor mellett</h2>
                <p>
                  A kalóriaszámítás napjaink egyik legtudományosabban alátámasztott és legszélesebb körben alkalmazott testsúlykezelési módszere. Az alábbi érvek összefoglalják, miért érdemes rendszeresen használni a <strong>kalória kalkulátort</strong> és vezetni étkezési naplót.
                </p>
                <p>
                  A <strong>tudatosság</strong> az egyik legfontosabb hatás: a kalóriaszámlálás rámutat az "üres kalóriák" forrásaira – például a finomított cukrokra, alkoholra és ultrafeldolgozott élelmiszerekre –, amelyek rengeteg energiát adnak, de alig telítenek. A <strong>rugalmasság</strong> szintén kiemelendő: ellentétben a tiltólistás diétákkal, a kalóriaszámlálás esetén nincs tiltott étel – csupán a mennyiség számít. Ez fenntarthatóbbá teszi a módszert hosszú távon, és csökkenti a "tiltott gyümölcs" effektust. Végül a <strong>mérhetőség</strong>: a kalóriaszámítás lehetővé teszi az előrehaladás objektív nyomon követését, ami bizonyítottan növeli a motivációt és az elköteleződést.
                </p>
              </article>
            </div>
          </section>

          {/* GYIK */}
          <section id="gyik" className={styles.gyikSzekció}>
            <div className={styles.container}>
              <h2 className={styles.szekcióCím}>GYIK – Kalória Kalkulátor és Kalóriaszükséglet</h2>
              <div className={styles.gyikLista}>
                {[
                  { k: 'Mennyi kalóriára van szükségem naponta?', v: 'A napi kalóriaszükséglet egyénenként eltér – függ a nemtől, kortól, magasságtól, testsúlytól és aktivitástól. Átlagosan nők 1 800–2 200 kcal-t, férfiak 2 200–2 800 kcal-t igényelnek naponta. Kalória kalkulátorunk pontosan kiszámítja az Ön személyes szükségletét a Mifflin-St. Jeor vagy Harris-Benedict képlettel.' },
                  { k: 'Mi az alapanyagcsere és hogyan kell kiszámítani?', v: 'Az alapanyagcsere (BMR – Basal Metabolic Rate) az a kalóriamennyiség, amelyet a szervezet teljes nyugalomban használ fel az életfenntartó folyamatokhoz. Kiszámítása: Mifflin-St. Jeor képlettel (nők esetén: 10×kg + 6,25×cm − 5×kor − 161). Az alapanyagcsere az összes napi kalóriafelhasználás 60–75%-a.' },
                  { k: 'Hány kalória kell a fogyáshoz naponta?', v: 'A fogyáshoz kalóriadeficit szükséges: napi 500 kcal hiány körülbelül heti 0,5 kg fogyást eredményez. Ez az egészséges és fenntartható ütem. Kalória kalkulátorunk automatikusan kiszámítja az Önnek szükséges fogyási kalóriabevitelt. Soha ne csökkentse 1 200 kcal (nők) illetve 1 500 kcal (férfiak) alá a bevitelt.' },
                  { k: 'Melyik jobb: a Mifflin-St. Jeor vagy a Harris-Benedict képlet?', v: 'Általában a Mifflin-St. Jeor képletet tartják pontosabbnak a mai, jellemzően ülő életmódot folytató emberekre. A Harris-Benedict képlet idősebb (1919), de szintén megbízható, és a világ számos kalóriaszámláló alkalmazása – köztük a kaloriabazis.hu – ezt alkalmazza. Kalória kalkulátorunkban mindkét lehetőséget megtalálja.' },
                  { k: 'Mi a BMI normál értéke?', v: 'A BMI (testtömegindex) normális értéke 18,5–24,9 között van. 18,5 alatt alulsúlyról, 25–29,9 között túlsúlyról, 30 felett elhízásról beszélünk. Fontos tudni, hogy a BMI nem veszi figyelembe az izom- és zsírarányt – egy sportoló magas BMI-je ellenére egészséges lehet. Kalória kalkulátorunk automatikusan megadja a BMI értékét.' },
                  { k: 'Hogyan növelhetem az anyagcserét?', v: 'Az anyagcsere növelésének legjobb módjai: (1) Izomtömeg növelése – az izmok 3–4-szer több kalóriát égetnek pihenőállapotban, mint a zsírszövet. (2) Rendszeres erőedzés és HIIT. (3) Magas fehérjebevitel (fehérje termikus hatása 20–30%). (4) Zöld tea és koffein mérsékelt fogyasztása. (5) Hideg vízfogyasztás.' },
                ].map((e, i) => (
                  <details key={i} className={styles.gyikElem}>
                    <summary className={styles.gyikKerdes}>{e.k}</summary>
                    <p className={styles.gyikValasz}>{e.v}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

        </main>

        <footer className={styles.lábléc}>
          <div className={styles.container}>
            <div className={styles.láblécTeteje}>
              <div className={styles.láblécBrand}>
                <div className={styles.logo} style={{marginBottom:'10px'}}>
                  <span className={styles.logoFire}>🔥</span>
                  <span style={{color:'#fff',fontWeight:800}}>Kalória<span className={styles.accent}>Kalkulátor</span>.hu</span>
                </div>
                <p>Ingyenes online kalória kalkulátor Magyarország számára. Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét és makrotápanyagait pontosan és egyszerűen.</p>
              </div>
              <div className={styles.láblécLinkek}>
                <a href="#kalkulator">Kalória Kalkulátor</a>
                <a href="#elelmiszertablazat">Kalóriatáblázat</a>
                <a href="#tippek">Fogyási tippek</a>
                <a href="#gyik">GYIK</a>
              </div>
            </div>
            <p className={styles.láblécJegyzet}>
              © 2026 Kalória-Kalkulátor.hu — Minden jog fenntartva. Az itt megjelenő kalóriaadatok és számítások tájékoztató jellegűek, nem helyettesítik orvos vagy dietetikus tanácsát. Az oldal Harris-Benedict és Mifflin-St. Jeor képleteket alkalmaz.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
