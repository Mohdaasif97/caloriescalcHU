import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
  { href: '/kaloria-kalkulator', label: 'Kalória Kalkulátor' },
  { href: '/bmi-kalkulator', label: 'BMI Kalkulátor' },
  { href: '/tdee-kalkulator', label: 'TDEE Kalkulátor' },
  { href: '/makro-kalkulator', label: 'Makró Kalkulátor' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="KalóriaKalkulátor.hu főoldal">
          <span className={styles.fire}>🔥</span>
          <span>
            Kalória<span className={styles.accent}>Kalkulátor</span>.hu
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Fő navigáció">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
