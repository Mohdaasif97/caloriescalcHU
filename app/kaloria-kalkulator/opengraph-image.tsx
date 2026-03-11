export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';

export const alt = 'Kalória Kalkulátor – Napi Kalóriaszükséglet Kiszámítása';

export default function Image() {
  return createOgImage({
    title: 'Kalória Kalkulátor',
    subtitle: 'Számítsa ki napi kalóriaszükségletét, alapanyagcseréjét és BMI-jét.',
    icon: '🔥',
    type: 'calculator',
  });
}
