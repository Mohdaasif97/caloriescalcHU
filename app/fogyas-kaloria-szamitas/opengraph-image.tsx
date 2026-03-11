export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';
export const alt = 'Fogyás Kalória Számítás – Lépésről Lépésre';
export default function Image() {
  return createOgImage({ title: 'Fogyás Kalória Számítás', subtitle: 'BMR → TDEE → célkalória: a teljes folyamat magyarázata lépésről lépésre.', icon: '⚖️', type: 'article' });
}
