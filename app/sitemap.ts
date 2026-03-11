import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.kaloriakalkulator9.hu';
  const now = new Date('2026-03-01');

  const calculators = [
    '/kaloria-kalkulator',
    '/bmi-kalkulator',
    '/tdee-kalkulator',
    '/makro-kalkulator',
  ];

  const articles = [
    '/mennyi-kaloria-kell-egy-nap',
    '/kaloria-deficit-mi-az',
    '/fogyas-kaloria-szamitas',
    '/napi-kaloria-szukseglet',
  ];

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    ...calculators.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...articles.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
