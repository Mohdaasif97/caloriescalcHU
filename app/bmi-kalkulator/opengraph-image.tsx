export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';

export const alt = 'BMI Kalkulátor – Testtömegindex Kiszámítása';

export default function Image() {
  return createOgImage({
    title: 'BMI Kalkulátor',
    subtitle: 'Számítsa ki testtömegindexét és ideális testsúlyát.',
    icon: '📊',
    type: 'calculator',
  });
}
