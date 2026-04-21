import { ImageResponse } from 'next/og';
import { CATEGORIES, categoryLabels, categoryDescriptions, Category } from '@/lib/constants';

export const alt = 'Easy Automation — category hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generate a single OG image per category route at build time.
// Returning only the matching id keeps each page's og:image unique.
export async function generateImageMetadata({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category as Category;
  if (!CATEGORIES.includes(category)) return [];
  return [
    {
      id: category,
      alt: `${categoryLabels[category]} — Easy Automation`,
      size,
      contentType,
    },
  ];
}

export default async function OgImage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category as Category;
  const label = categoryLabels[category] ?? 'Easy Automation';
  const blurb = categoryDescriptions[category] ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #FFF 0%, #FEF1E4 50%, #FFD9B8 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#FF6210',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            EA
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#1a1a1a' }}>
            Easy Automation
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              padding: '8px 18px',
              background: '#FF6210',
              color: '#fff',
              fontSize: 22,
              fontWeight: 600,
              borderRadius: 999,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            Expert guides to automate your {label.toLowerCase().replace(' automation', '')} workflows.
          </div>
          <div style={{ fontSize: 26, color: '#555', maxWidth: 1000, lineHeight: 1.35 }}>
            {blurb}
          </div>
        </div>

        <div style={{ fontSize: 22, color: '#888' }}>easyautomation.io</div>
      </div>
    ),
    { ...size },
  );
}
