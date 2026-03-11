import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 – Az oldal nem található | KalóriaKalkulátor.hu',
  description: 'Ez az oldal nem található. Navigáljon vissza kalkulátorainkhoz.',
  robots: { index: false, follow: true },
};

const links = [
  { href: '/kaloria-kalkulator', icon: '🔥', label: 'Kalória Kalkulátor' },
  { href: '/bmi-kalkulator', icon: '📊', label: 'BMI Kalkulátor' },
  { href: '/tdee-kalkulator', icon: '⚡', label: 'TDEE Kalkulátor' },
  { href: '/makro-kalkulator', icon: '🥗', label: 'Makró Kalkulátor' },
];

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Az oldal nem található</h1>
        <p className={styles.sub}>
          A keresett oldal nem létezik vagy áthelyezésre került. Válasszon az alábbi
          kalkulátoraink közül:
        </p>

        <div className={styles.grid}>
          {links.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={styles.card}>
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </Link>
          ))}
        </div>

        <Link href="/" className={styles.home}>
          ← Vissza a főoldalra
        </Link>
      </div>
    </div>
  );
}
