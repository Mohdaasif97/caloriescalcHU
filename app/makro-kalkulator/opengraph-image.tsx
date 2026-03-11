export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';

export const alt = 'Makró Kalkulátor – Fehérje, Szénhidrát és Zsír Számítás';

export default function Image() {
  return createOgImage({
    title: 'Makró Kalkulátor',
    subtitle: 'Számítsa ki ajánlott fehérje, szénhidrát és zsír bevitelét.',
    icon: '🥗',
    type: 'calculator',
  });
}
