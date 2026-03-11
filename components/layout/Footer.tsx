import Link from 'next/link';
import styles from './Footer.module.css';

const calculators = [
  { href: '/kaloria-kalkulator', label: 'Kalória Kalkulátor' },
  { href: '/bmi-kalkulator', label: 'BMI Kalkulátor' },
  { href: '/tdee-kalkulator', label: 'TDEE Kalkulátor' },
  { href: '/makro-kalkulator', label: 'Makró Kalkulátor' },
];

const articles = [
  { href: '/mennyi-kaloria-kell-egy-nap', label: 'Mennyi kalória kell egy nap?' },
  { href: '/kaloria-deficit-mi-az', label: 'Kalória deficit – mi az?' },
  { href: '/fogyas-kaloria-szamitas', label: 'Fogyás kalória számítás' },
  { href: '/napi-kaloria-szukseglet', label: 'Napi kalória szükséglet' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span>🔥</span>
              <span>
                Kalória<span className={styles.accent}>Kalkulátor</span>.hu
              </span>
            </Link>
            <p>
              Ingyenes online kalória kalkulátor Magyarország számára. Számítsa ki napi
              kalóriaszükségletét, alapanyagcseréjét és makrotápanyagait pontosan.
            </p>
          </div>

          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Kalkulátorok</h3>
            <nav aria-label="Kalkulátorok">
              {calculators.map(({ href, label }) => (
                <Link key={href} href={href} className={styles.link}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.linkGroup}>
            <h3 className={styles.groupTitle}>Cikkek</h3>
            <nav aria-label="Cikkek">
              {articles.map(({ href, label }) => (
                <Link key={href} href={href} className={styles.link}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className={styles.copyright}>
          © 2026 KalóriaKalkulátor.hu — Minden jog fenntartva. Az itt megjelenő adatok
          tájékoztató jellegűek, nem helyettesítik orvos vagy dietetikus tanácsát.
        </p>
      </div>
    </footer>
  );
}
