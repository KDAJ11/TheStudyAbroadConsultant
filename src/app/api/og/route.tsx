import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const SITE_NAME = 'The Study Abroad Consultant'
const TAGLINE = "Nigeria's Most Trusted Study Abroad Consultant"

const countryGradients: Record<string, string> = {
  canada: 'linear-gradient(135deg, #8B0000, #CC0000)',
  uk: 'linear-gradient(135deg, #012169, #C8102E)',
  usa: 'linear-gradient(135deg, #002868, #BF0A30)',
  ireland: 'linear-gradient(135deg, #169B62, #0d5c35)',
  germany: 'linear-gradient(135deg, #1a1a1a, #D4A017)',
  australia: 'linear-gradient(135deg, #00843D, #FFCD00)',
}

const countryFlags: Record<string, string> = {
  canada: '🇨🇦', uk: '🇬🇧', usa: '🇺🇸', ireland: '🇮🇪', germany: '🇩🇪', australia: '🇦🇺',
}

const countryH1s: Record<string, string> = {
  canada: 'Study in Canada from Nigeria',
  uk: 'Study in the UK from Nigeria',
  usa: 'Study in the USA from Nigeria',
  ireland: 'Study in Ireland from Nigeria',
  germany: 'Study in Germany from Nigeria',
  australia: 'Study in Australia from Nigeria',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'default'
  const country = searchParams.get('country') || ''
  const title = searchParams.get('title') || ''
  const category = searchParams.get('category') || ''

  if (type === 'destination' && country) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px',
            background: countryGradients[country] || '#0A2540',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ position: 'absolute', top: 40, right: 60, fontSize: 120, opacity: 0.3, display: 'flex' }}>
            {countryFlags[country] || ''}
          </div>
          <div style={{ position: 'absolute', top: 40, left: 60, display: 'flex', color: 'rgba(255,255,255,0.7)', fontSize: 20, fontWeight: 600 }}>
            {SITE_NAME}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', background: 'rgba(45,125,210,0.3)', borderRadius: 8, padding: '6px 16px', color: '#93c5fd', fontSize: 18, fontWeight: 600 }}>
                98% Visa Success Rate
              </div>
            </div>
            <div style={{ color: 'white', fontSize: 52, fontWeight: 700, lineHeight: 1.1, maxWidth: 800, display: 'flex' }}>
              {countryH1s[country] || `Study in ${country}`}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 22, display: 'flex' }}>
              Expert guidance for Nigerian students · Free consultation
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  if (type === 'blog' && title) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            background: 'linear-gradient(135deg, #0A2540, #102e74)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, display: 'flex' }}>
            <svg width="100%" height="100%"><pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2D7DD2" /></pattern><rect width="100%" height="100%" fill="url(#dots)" /></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
            {category && (
              <div style={{ display: 'flex' }}>
                <div style={{ background: 'rgba(45,125,210,0.3)', borderRadius: 8, padding: '6px 16px', color: '#93c5fd', fontSize: 18, fontWeight: 600, display: 'flex' }}>
                  {category}
                </div>
              </div>
            )}
            <div style={{ color: 'white', fontSize: 48, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000, display: 'flex', flexWrap: 'wrap' }}>
              {title.length > 80 ? title.slice(0, 80) + '...' : title}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, display: 'flex', marginTop: 12 }}>
              Read on thestudyabroadconsultant.ca
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: 60, color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: 600, display: 'flex' }}>
            {SITE_NAME}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  // Default
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0A2540, #102e74)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, display: 'flex' }}>
          <svg width="100%" height="100%"><pattern id="dots2" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2D7DD2" /></pattern><rect width="100%" height="100%" fill="url(#dots2)" /></svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative' }}>
          <div style={{ color: 'white', fontSize: 56, fontWeight: 700, textAlign: 'center', maxWidth: 900, lineHeight: 1.1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {SITE_NAME}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 24, textAlign: 'center', display: 'flex' }}>
            {TAGLINE}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {['1,000+ Students', '98% Visa Success', '50+ Universities', '10+ Years'].map((stat) => (
              <div key={stat} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '8px 20px', color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 600, display: 'flex' }}>
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
