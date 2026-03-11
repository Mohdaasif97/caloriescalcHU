export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';
export const alt = 'Mennyi Kalória Kell Egy Nap?';
export default function Image() {
  return createOgImage({ title: 'Mennyi Kalória Kell Egy Nap?', subtitle: 'Napi kalóriaszükséglet kor, nem és aktivitás szerint – részletes táblázatokkal.', icon: '📅', type: 'article' });
}
