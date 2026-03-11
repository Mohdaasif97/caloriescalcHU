// Server component - no 'use client' needed
// Renders JSON-LD structured data for SEO

interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function StructuredData({ data }: Props) {
  const json = Array.isArray(data)
    ? data.map((d) => JSON.stringify(d))
    : [JSON.stringify(data)];

  return (
    <>
      {json.map((j, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: j }}
        />
      ))}
    </>
  );
}
