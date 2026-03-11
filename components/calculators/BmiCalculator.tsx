'use client';

import { useState } from 'react';
import { bmiKategoria } from '@/lib/calculator';
import styles from './BmiCalculator.module.css';

export default function BmiCalculator() {
  const [suly, setSuly] = useState('');
  const [magassag, setMagassag] = useState('');
  const [eredmeny, setEredmeny] = useState<{ bmi: number; kategoria: { label: string; color: string }; idealis: { min: number; max: number } } | null>(null);
  const [hiba, setHiba] = useState('');

  const kiszamit = () => {
    const s = parseFloat(suly);
    const m = parseFloat(magassag);
    if (!s || !m || s < 30 || s > 300 || m < 100 || m > 250) {
      setHiba('Kérjük érvényes adatokat adjon meg! (Magasság: 100–250 cm, Súly: 30–300 kg)');
      return;
    }
    setHiba('');
    const bmi = parseFloat((s / (m / 100) ** 2).toFixed(1));
    const kategoria = bmiKategoria(bmi);
    const mM = m / 100;
    const idealis = { min: Math.round(18.5 * mM * mM), max: Math.round(24.9 * mM * mM) };
    setEredmeny({ bmi, kategoria, idealis });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>BMI Kalkulátor – Testtömegindex kiszámítása</h2>
        <p>Adja meg magasságát és súlyát a BMI értékének kiszámításához.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="magassag">Magasság</label>
          <div className={styles.inputWrap}>
            <input id="magassag" type="number" min={100} max={250} placeholder="pl. 175" value={magassag}
              onChange={(e) => { setMagassag(e.target.value); setEredmeny(null); }} />
            <span>cm</span>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="suly">Testsúly</label>
          <div className={styles.inputWrap}>
            <input id="suly" type="number" min={30} max={300} placeholder="pl. 75" value={suly}
              onChange={(e) => { setSuly(e.target.value); setEredmeny(null); }} />
            <span>kg</span>
          </div>
        </div>
      </div>

      {hiba && <div className={styles.hiba}>⚠️ {hiba}</div>}
      <button className={styles.btn} onClick={kiszamit}>📊 BMI kiszámítása</button>

      {eredmeny && (
        <div className={styles.result}>
          <div className={styles.bmiNum} style={{ color: eredmeny.kategoria.color }}>
            {eredmeny.bmi}
          </div>
          <div className={styles.bmiLabel} style={{ color: eredmeny.kategoria.color }}>
            {eredmeny.kategoria.label}
          </div>
          <p className={styles.idealis}>
            Normális tartomány az Ön magasságához:{' '}
            <strong>{eredmeny.idealis.min}–{eredmeny.idealis.max} kg</strong>
          </p>
          <button className={styles.btnUjra} onClick={() => setEredmeny(null)}>← Újra számítás</button>
        </div>
      )}
    </div>
  );
}
