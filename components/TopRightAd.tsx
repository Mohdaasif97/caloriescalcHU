'use client';

import Script from 'next/script';

export default function TopRightAd() {
  return (
    <>
      <Script
        id="adsterra-options"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.atOptions = {
              key: '45a4581a1bc99ad3f4532f951fe3e91d',
              format: 'iframe',
              height: 250,
              width: 300,
              params: {},
            };
          `,
        }}
      />
      <Script
        src="https://www.highperformanceformat.com/45a4581a1bc99ad3f4532f951fe3e91d/invoke.js"
        strategy="lazyOnload"
      />
    </>
  );
}