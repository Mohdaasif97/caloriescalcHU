import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KalóriaKalkulátor.hu – Ingyenes Magyar Kalóriaszámoló';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #16192e 0%, #1e1b4b 45%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <span style={{ fontSize: '64px' }}>🔥</span>
          <span style={{ fontSize: '48px', fontWeight: 900, color: '#fff' }}>
            Kalória
            <span style={{ color: '#f97316' }}>Kalkulátor</span>
            .hu
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.5,
            marginBottom: '40px',
          }}
        >
          Ingyenes kalória, BMI, TDEE és makró kalkulátor
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🔥 Kalória', '📊 BMI', '⚡ TDEE', '🥗 Makró'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(249,115,22,0.2)',
                border: '1px solid rgba(249,115,22,0.5)',
                color: '#fdba74',
                padding: '10px 24px',
                borderRadius: '100px',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
