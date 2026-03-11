// Pure calculation functions and constants - no React, safe to import anywhere

export const PAL_SZINTEK = [
  { label: 'Ülő életmód (irodai munka, kevés mozgás)', pal: 1.2, icon: '💼' },
  { label: 'Enyhén aktív (heti 1–2x sport)', pal: 1.375, icon: '🚶' },
  { label: 'Mérsékelten aktív (heti 3–5x sport)', pal: 1.55, icon: '🏃' },
  { label: 'Nagyon aktív (heti 6–7x intenzív edzés)', pal: 1.725, icon: '🏋️' },
  { label: 'Extrém aktív (fizikai munka + napi edzés)', pal: 1.9, icon: '⚡' },
];

export const CELOK = [
  { label: '🔥 Fogyás (−500 kcal/nap)', delta: -500, color: '#ef4444' },
  { label: '⚖️ Súlymegőrzés', delta: 0, color: '#3b82f6' },
  { label: '💪 Izomnövelés (+300 kcal/nap)', delta: 300, color: '#22c55e' },
];

export const ELELMISZEREK = [
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

export function harrisBenedict(nem: string, suly: number, magassag: number, kor: number) {
  if (nem === 'ferfi') {
    return 88.362 + 13.397 * suly + 4.799 * magassag - 5.677 * kor;
  }
  return 447.593 + 9.247 * suly + 3.098 * magassag - 4.33 * kor;
}

export function mifflinStJeor(nem: string, suly: number, magassag: number, kor: number) {
  if (nem === 'ferfi') {
    return 10 * suly + 6.25 * magassag - 5 * kor + 5;
  }
  return 10 * suly + 6.25 * magassag - 5 * kor - 161;
}

export function bmiKategoria(bmi: number) {
  if (bmi < 18.5) return { label: 'Alulsúly', color: '#f59e0b' };
  if (bmi < 25) return { label: 'Normális testsúly ✅', color: '#22c55e' };
  if (bmi < 30) return { label: 'Túlsúly', color: '#f97316' };
  if (bmi < 35) return { label: 'Elhízás (I. fokozat)', color: '#ef4444' };
  return { label: 'Súlyos elhízás (II+)', color: '#991b1b' };
}

export interface KalkulatorEredmeny {
  alapanyagcsere: number;
  osszesCsere: number;
  celKcal: number;
  feherjeG: number;
  zsirG: number;
  szenhidratG: number;
  bmi: number;
  bmiInfo: { label: string; color: string };
  idealisSuly: number;
  palLabel: string;
  celLabel: string;
  celDelta: number;
}

export function szamitKalorit(params: {
  nem: string;
  kor: number;
  magassag: number;
  suly: number;
  aktivitas: number;
  cel: number;
  modszer: 'mifflin' | 'harris';
}): KalkulatorEredmeny {
  const { nem, kor, magassag, suly, aktivitas, cel, modszer } = params;

  const alapanyagcsere =
    modszer === 'harris'
      ? harrisBenedict(nem, suly, magassag, kor)
      : mifflinStJeor(nem, suly, magassag, kor);

  const palSzorzo = PAL_SZINTEK[aktivitas].pal;
  const osszesCsere = Math.round(alapanyagcsere * palSzorzo);
  const celKcal = osszesCsere + CELOK[cel].delta;

  const feherjeGKg = cel === 2 ? 2.0 : 1.7;
  const feherjeG = Math.round(feherjeGKg * suly);
  const zsirKcal = Math.round(celKcal * 0.25);
  const zsirG = Math.round(zsirKcal / 9);
  const szenhidratKcal = celKcal - feherjeG * 4 - zsirKcal;
  const szenhidratG = Math.round(szenhidratKcal / 4);

  const bmi = parseFloat((suly / (magassag / 100) ** 2).toFixed(1));
  const bmiInfo = bmiKategoria(bmi);

  const idealisSuly =
    nem === 'ferfi'
      ? Math.round(50 + 2.3 * ((magassag - 152.4) / 2.54))
      : Math.round(45.5 + 2.3 * ((magassag - 152.4) / 2.54));

  const minKcal = nem === 'ferfi' ? 1500 : 1200;

  return {
    alapanyagcsere: Math.round(alapanyagcsere),
    osszesCsere,
    celKcal: Math.max(celKcal, minKcal),
    feherjeG,
    zsirG,
    szenhidratG,
    bmi,
    bmiInfo,
    idealisSuly,
    palLabel: PAL_SZINTEK[aktivitas].label,
    celLabel: CELOK[cel].label,
    celDelta: CELOK[cel].delta,
  };
}
