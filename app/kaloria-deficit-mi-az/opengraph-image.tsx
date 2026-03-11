export { runtime, size, contentType } from '@/lib/og-image';
import { createOgImage } from '@/lib/og-image';
export const alt = 'Kalória Deficit – Mi Az és Hogyan Alkalmazzuk?';
export default function Image() {
  return createOgImage({ title: 'Kalória Deficit – Mi Az?', subtitle: 'A fogyás tudományosan igazolt alapelve – hogyan alkalmazza biztonságosan.', icon: '📉', type: 'article' });
}
