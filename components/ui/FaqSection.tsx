import styles from './FaqSection.module.css';

export interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
  title?: string;
}

export default function FaqSection({ items, title = 'GYIK – Gyakran Ismételt Kérdések' }: Props) {
  return (
    <section className={styles.section} id="gyik">
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.list}>
          {items.map((e) => (
            <details key={e.q} className={styles.item}>
              <summary className={styles.question}>{e.q}</summary>
              <p className={styles.answer}>{e.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
