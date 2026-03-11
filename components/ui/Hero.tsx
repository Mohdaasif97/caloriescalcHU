import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from './Hero.module.css';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface HeroProps {
  pill?: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  badges?: string[];
  stats?: { num: string; label: string }[];
  breadcrumb?: BreadcrumbItem[]; // items after "Főoldal"
}

// Exported so page files can use it inside JSX passed as `title` prop
export function OrangeSpan({ children }: { children: React.ReactNode }) {
  return <span className={styles.orange}>{children}</span>;
}

export default function Hero({ pill, title, subtitle, badges, stats, breadcrumb }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          {pill && <div className={styles.pill}>{pill}</div>}
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.sub}>{subtitle}</p>
          {badges && (
            <div className={styles.badges}>
              {badges.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          )}
        </div>

        {stats && (
          <div className={styles.right}>
            <div className={styles.statsBox}>
              {stats.map((s, i) => (
                <div key={i}>
                  {i > 0 && <div className={styles.divider} />}
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>{s.num}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
