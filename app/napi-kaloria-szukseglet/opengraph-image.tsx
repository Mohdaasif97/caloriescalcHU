export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';
export const alt = 'Napi Kalória Szükséglet – Minden Amit Tudni Kell';
export default function Image() {
  return createOgImage({ title: 'Napi Kalória Szükséglet', subtitle: 'Mi befolyásolja, hogyan számítható ki és mire kell figyelni.', icon: '🍽️', type: 'article' });
}
