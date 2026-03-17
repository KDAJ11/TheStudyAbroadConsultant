import Link from 'next/link'
import { SectionFade } from '@/components/ui/SectionFade'

const destinations = [
  { name: 'Canada', slug: 'canada', flag: '🇨🇦', stat: 'Up to 3yr Post-Study Work', gradient: 'linear-gradient(135deg, #8B0000, #CC0000, #FF4444)' },
  { name: 'United Kingdom', slug: 'uk', flag: '🇬🇧', stat: '2yr Graduate Visa', gradient: 'linear-gradient(135deg, #012169, #C8102E, #8B0000)' },
  { name: 'USA', slug: 'usa', flag: '🇺🇸', stat: '12–36mo OPT', gradient: 'linear-gradient(135deg, #002868, #3C3B6E, #BF0A30)' },
  { name: 'Ireland', slug: 'ireland', flag: '🇮🇪', stat: 'EU Access · English-Speaking', gradient: 'linear-gradient(135deg, #169B62, #1a7a4a, #0d5c35)' },
  { name: 'Germany', slug: 'germany', flag: '🇩🇪', stat: 'Near-Zero Tuition Available', gradient: 'linear-gradient(135deg, #1a1a1a, #2d2d2d, #D4A017)' },
  { name: 'Australia', slug: 'australia', flag: '🇦🇺', stat: 'Unlimited Work Rights', gradient: 'linear-gradient(135deg, #00843D, #2d7a3e, #FFCD00)' },
]

export function DestinationCards() {
  return (
    <section id="destinations" className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Destinations</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Where Will You Study?
            </h2>
          </div>
        </SectionFade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <SectionFade key={dest.slug} delay={i * 0.08}>
              <Link
                href={`/destinations/${dest.slug}`}
                className="group relative block overflow-hidden rounded-card min-h-[280px] cursor-pointer"
              >
                {/* Gradient background */}
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ background: dest.gradient }}
                />
                {/* Noise texture overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden="true">
                  <filter id={`noise-${dest.slug}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
                  </filter>
                  <rect width="100%" height="100%" filter={`url(#noise-${dest.slug})`} />
                </svg>
                {/* Ireland navy overlay */}
                {dest.slug === 'ireland' && (
                  <div className="absolute inset-0 bg-navy-900/40" />
                )}
                {/* Flag decorative */}
                <span
                  className="absolute top-4 right-4 text-5xl opacity-60 transition-transform duration-300 group-hover:-translate-y-1.5"
                  aria-hidden="true"
                >
                  {dest.flag}
                </span>
                {/* Country info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-white text-display-sm mb-1">{dest.name}</h3>
                  <p className="text-white/80 text-body-sm">{dest.stat}</p>
                </div>
                {/* Hover ring */}
                <div className="absolute inset-0 rounded-card ring-0 group-hover:ring-2 ring-sky-400/40 transition-all duration-300" />
              </Link>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
