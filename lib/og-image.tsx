import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OgImageProps {
  title: string;
  subtitle: string;
  icon: string;
  type?: 'calculator' | 'article';
}

export function createOgImage({ title, subtitle, icon, type = 'calculator' }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #16192e 0%, #1e1b4b 50%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 72px',
          fontFamily: 'system-ui, sans-serif',
          justifyContent: 'space-between',
        }}
      >
        {/* Top: site brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '36px' }}>🔥</span>
          <span style={{ fontSize: '28px', fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>
            KalóriaKalkulátor.hu
          </span>
          <div
            style={{
              marginLeft: '16px',
              background: type === 'article' ? 'rgba(99,102,241,0.3)' : 'rgba(249,115,22,0.2)',
              border: `1px solid ${type === 'article' ? 'rgba(99,102,241,0.5)' : 'rgba(249,115,22,0.4)'}`,
              color: type === 'article' ? '#a5b4fc' : '#fdba74',
              padding: '6px 18px',
              borderRadius: '100px',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            {type === 'article' ? '📖 Cikk' : '🧮 Kalkulátor'}
          </div>
        </div>

        {/* Middle: main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '80px' }}>{icon}</div>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '26px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.5,
              maxWidth: '820px',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom: trust badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['✅ Ingyenes', '🇭🇺 Magyar', '⚡ Azonnali eredmény'].map((badge) => (
            <div
              key={badge}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.8)',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
