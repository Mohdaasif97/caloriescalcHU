'use client';

import { useState, useCallback } from 'react';
import { PAL_SZINTEK, CELOK, szamitKalorit, type KalkulatorEredmeny } from '@/lib/calculator';
import styles from './CalorieCalculator.module.css';

export default function CalorieCalculator() {
  const [nem, setNem] = useState('ferfi');
  const [kor, setKor] = useState('');
  const [magassag, setMagassag] = useState('');
  const [suly, setSuly] = useState('');
  const [aktivitas, setAktivitas] = useState(1);
  const [cel, setCel] = useState(0);
  const [modszer, setModszer] = useState<'mifflin' | 'harris'>('mifflin');
  const [eredmeny, setEredmeny] = useState<KalkulatorEredmeny | null>(null);
  const [hiba, setHiba] = useState('');

  const kiszamit = useCallback(() => {
    const k = parseFloat(kor);
    const m = parseFloat(magassag);
    const s = parseFloat(suly);

    if (!k || !m || !s || k < 10 || k > 110 || m < 100 || m > 250 || s < 30 || s > 300) {
      setHiba(
        'Kérjük érvényes adatokat adjon meg! (Kor: 10–110, Magasság: 100–250 cm, Súly: 30–300 kg)'
      );
      return;
    }
    setHiba('');
    setEredmeny(szamitKalorit({ nem, kor: k, magassag: m, suly: s, aktivitas, cel, modszer }));
  }, [nem, kor, magassag, suly, aktivitas, cel, modszer]);

  const reset = () => setEredmeny(null);

  return (
    <div className={styles.card}>
      {!eredmeny ? (
        <>
          <div className={styles.cardHeader}>
            <h2>Kalória Kalkulátor – Adja meg adatait</h2>
            <p>Töltse ki az alábbi mezőket, és kalkulátorunk azonnal kiszámítja napi szükségletét.</p>
          </div>

          {/* Method selector */}
          <div className={styles.methodRow}>
            <span className={styles.methodLabel}>Számítási képlet:</span>
            <div className={styles.methodBtns}>
              <button
                className={`${styles.methodBtn} ${modszer === 'mifflin' ? styles.methodActive : ''}`}
                onClick={() => setModszer('mifflin')}
              >
                Mifflin-St. Jeor <span className={styles.methodTag}>Pontosabb</span>
              </button>
              <button
                className={`${styles.methodBtn} ${modszer === 'harris' ? styles.methodActive : ''}`}
                onClick={() => setModszer('harris')}
              >
                Harris-Benedict <span className={styles.methodTag}>Klasszikus</span>
              </button>
            </div>
          </div>

          {/* Step 1 */}
          <div className={styles.step}>
            <div className={styles.stepHead}>
              <span className={styles.stepNum}>1</span> Személyes adatok
            </div>

            <div className={styles.nemRow}>
              <button
                className={`${styles.nemBtn} ${nem === 'ferfi' ? styles.nemActive : ''}`}
                onClick={() => { setNem('ferfi'); reset(); }}
              >
                <span>👨</span> Férfi
              </button>
              <button
                className={`${styles.nemBtn} ${nem === 'no' ? styles.nemActive : ''}`}
                onClick={() => { setNem('no'); reset(); }}
              >
                <span>👩</span> Nő
              </button>
            </div>

            <div className={styles.inputGrid}>
              {[
                { id: 'kor', label: 'Kor', unit: 'év', val: kor, set: setKor, min: 10, max: 110, ph: 'pl. 30' },
                { id: 'magassag', label: 'Magasság', unit: 'cm', val: magassag, set: setMagassag, min: 100, max: 250, ph: 'pl. 175' },
                { id: 'suly', label: 'Testsúly', unit: 'kg', val: suly, set: setSuly, min: 30, max: 300, ph: 'pl. 75' },
              ].map(({ id, label, unit, val, set, min, max, ph }) => (
                <div key={id} className={styles.field}>
                  <label className={styles.label} htmlFor={id}>{label}</label>
                  <div className={styles.inputWrap}>
                    <input
                      id={id}
                      type="number"
                      min={min}
                      max={max}
                      placeholder={ph}
                      className={styles.input}
                      value={val}
                      onChange={(e) => { set(e.target.value); reset(); }}
                    />
                    <span className={styles.unit}>{unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.step}>
            <div className={styles.stepHead}>
              <span className={styles.stepNum}>2</span> Aktivitási szint (PAL-faktor)
            </div>
            <div className={styles.aktivitasLista}>
              {PAL_SZINTEK.map((p, i) => (
                <label key={i} className={`${styles.aktivitasElem} ${aktivitas === i ? styles.aktivitasAktiv : ''}`}>
                  <input
                    type="radio"
                    name="aktivitas"
                    checked={aktivitas === i}
                    onChange={() => { setAktivitas(i); reset(); }}
                  />
                  <span>{p.icon}</span>
                  <span className={styles.aktivitasText}>{p.label}</span>
                  <span className={styles.aktivitasPal}>PAL {p.pal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.step}>
            <div className={styles.stepHead}>
              <span className={styles.stepNum}>3</span> Célom
            </div>
            <div className={styles.celGrid}>
              {CELOK.map((c, i) => (
                <button
                  key={i}
                  className={`${styles.celBtn} ${cel === i ? styles.celAktiv : ''}`}
                  style={cel === i ? { borderColor: c.color, background: c.color + '18' } : {}}
                  onClick={() => { setCel(i); reset(); }}
                >
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
        <Results eredmeny={eredmeny} modszer={modszer} onReset={reset} />
      )}
    </div>
  );
}

function Results({
  eredmeny,
  modszer,
  onReset,
}: {
  eredmeny: KalkulatorEredmeny;
  modszer: string;
  onReset: () => void;
}) {
  return (
    <div className={styles.eredmenyek}>
      <div className={styles.eredmenyFej}>
        <h2>Az Ön kalóriaszükséglete</h2>
        <p>
          {eredmeny.celLabel} · {eredmeny.palLabel.split('(')[0].trim()}
        </p>
      </div>

      <div className={styles.foSzamok}>
        {[
          {
            cim: 'Alapanyagcsere (BMR)',
            szam: eredmeny.alapanyagcsere,
            megjegyzes: 'Nyugalmi energiafelhasználás',
            kiemelt: false,
          },
          {
            cim: 'Összes csere (TDEE)',
            szam: eredmeny.osszesCsere,
            megjegyzes: 'Aktivitással együtt',
            kiemelt: false,
          },
          {
            cim: '🎯 Célkalória',
            szam: eredmeny.celKcal,
            megjegyzes:
              eredmeny.celDelta < 0
                ? `${Math.abs(eredmeny.celDelta)} kcal deficit`
                : eredmeny.celDelta > 0
                ? `+${eredmeny.celDelta} kcal többlet`
                : 'Fenntartó kalória',
            kiemelt: true,
          },
        ].map(({ cim, szam, megjegyzes, kiemelt }, i) => (
          <div key={i} className={`${styles.foKartya} ${kiemelt ? styles.foKartyaKiemelt : ''}`}>
            <span className={styles.foKartyaCim}>{cim}</span>
            <span className={styles.foKartyaSzam}>{szam.toLocaleString('hu-HU')}</span>
            <span className={styles.foKartyaEgyseg}>kcal/nap</span>
            <span className={styles.foKartyaMegjegyzes}>{megjegyzes}</span>
          </div>
        ))}
      </div>

      {/* Macros */}
      <div className={styles.makroSzekcio}>
        <h3 className={styles.makroCim}>Ajánlott makrotápanyag-bevitel</h3>
        <div className={styles.makroRacs}>
          {[
            { icon: '🥩', nev: 'Fehérje', g: eredmeny.feherjeG, kcal: eredmeny.feherjeG * 4, cls: styles.makroFeherje },
            { icon: '🥑', nev: 'Zsír', g: eredmeny.zsirG, kcal: eredmeny.zsirG * 9, cls: styles.makroZsir },
            { icon: '🍚', nev: 'Szénhidrát', g: eredmeny.szenhidratG, kcal: eredmeny.szenhidratG * 4, cls: styles.makroSzenh },
          ].map(({ icon, nev, g, kcal, cls }) => (
            <div key={nev} className={`${styles.makroKartya} ${cls}`}>
              <span className={styles.makroIkon}>{icon}</span>
              <span className={styles.makroNev}>{nev}</span>
              <span className={styles.makroG}>{g} g</span>
              <span className={styles.makroKcal}>{kcal.toLocaleString('hu-HU')} kcal</span>
            </div>
          ))}
        </div>
      </div>

      {/* BMI */}
      <div className={styles.bmiSor}>
        <div className={styles.bmiElem}>
          <span className={styles.bmiCimke}>BMI:</span>
          <span className={styles.bmiErtek}>{eredmeny.bmi}</span>
          <span className={styles.bmiStatus} style={{ color: eredmeny.bmiInfo.color }}>
            {eredmeny.bmiInfo.label}
          </span>
        </div>
        <div className={styles.bmiElvalaszto} />
        <div className={styles.bmiElem}>
          <span className={styles.bmiCimke}>Ideális testsúly:</span>
          <span className={styles.bmiErtek}>{eredmeny.idealisSuly} kg</span>
          <span className={styles.bmiStatus} style={{ color: '#888' }}>Devine-képlet</span>
        </div>
      </div>

      <p className={styles.eredmenyMegjegyzes}>
        Az értékek a{' '}
        <strong>{modszer === 'mifflin' ? 'Mifflin-St. Jeor' : 'Harris-Benedict'}</strong> képleten
        alapulnak, tájékoztató jellegűek. Egyéni eltérések ±10%-ban lehetségesek.
      </p>

      <button className={styles.btnUjra} onClick={onReset}>
        ← Újra számítás
      </button>
    </div>
  );
}
