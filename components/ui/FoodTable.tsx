import { ELELMISZEREK } from '@/lib/calculator';
import styles from './FoodTable.module.css';

export default function FoodTable() {
  return (
    <section className={styles.section} id="elelmiszertablazat">
      <div className={styles.container}>
        <h2 className={styles.title}>Magyar élelmiszerek kalóriatáblázata</h2>
        <p className={styles.intro}>
          Az alábbi <strong>kalóriatáblázat</strong> a leggyakrabban fogyasztott magyar élelmiszerek{' '}
          <strong>kalóriatartalmát</strong> mutatja be – 100 grammonként feltüntetve a fehérje,
          szénhidrát és zsírtartalmat is.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
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
              {ELELMISZEREK.map((e) => (
                <tr key={e.nev}>
                  <td>
                    <strong>{e.nev}</strong>
                  </td>
                  <td className={styles.kcal}>{e.kcal} kcal</td>
                  <td>{e.feherje} g</td>
                  <td>{e.szenhidrat} g</td>
                  <td>{e.zsir} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>
          * Az adatok 100 grammra vonatkoznak, kivéve ahol jelölve van. Forrás: USDA, Európai
          Élelmiszerbiztonság.
        </p>
      </div>
    </section>
  );
}
