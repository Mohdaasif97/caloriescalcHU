export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';

export const alt = 'TDEE Kalkulátor – Teljes Napi Energiafelhasználás';

export default function Image() {
  return createOgImage({
    title: 'TDEE Kalkulátor',
    subtitle: 'Számítsa ki teljes napi energiafelhasználását aktivitási szint alapján.',
    icon: '⚡',
    type: 'calculator',
  });
}
