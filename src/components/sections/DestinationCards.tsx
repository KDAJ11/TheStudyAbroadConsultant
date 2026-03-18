'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WorldMap } from './WorldMap'
import { ClipReveal } from '@/components/animations/ClipReveal'

const destinations = [
  { name: 'Canada', slug: 'canada' as const, flag: '🇨🇦', benefit: 'Up to 3yr Post-Study Work', visa: '99% visa success', accentColor: '#FF0000' },
  { name: 'United Kingdom', slug: 'uk' as const, flag: '🇬🇧', benefit: '2yr Graduate Visa', visa: '97% visa success', accentColor: '#012169' },
  { name: 'USA', slug: 'usa' as const, flag: '🇺🇸', benefit: '12–36mo OPT Work Rights', visa: '96% visa success', accentColor: '#B22234' },
  { name: 'Ireland', slug: 'ireland' as const, flag: '🇮🇪', benefit: 'EU Access · English-Speaking', visa: '97% visa success', accentColor: '#169B62' },
  { name: 'Germany', slug: 'germany' as const, flag: '🇩🇪', benefit: 'Near-Zero Tuition Available', visa: '94% visa success', accentColor: '#FFCE00' },
  { name: 'Australia', slug: 'australia' as const, flag: '🇦🇺', benefit: 'Unlimited Work Rights', visa: '96% visa success', accentColor: '#00843D' },
]

type DestSlug = 'canada' | 'uk' | 'usa' | 'ireland' | 'germany' | 'australia'

export function DestinationCards() {
  const [hoveredCountry, setHoveredCountry] = useState<DestSlug | null>(null)

  return (
    <section id="destinations" className="destinations-section bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with ClipReveal */}
        <ClipReveal>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Destinations</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Where Will You Study?
            </h2>
          </div>
        </ClipReveal>

        {/* Cards grid with staggered reveal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => {
            const isHighlighted = hoveredCountry === dest.slug
            return (
              <ClipReveal key={dest.slug} delay={index * 0.1}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  aria-label={`Learn more about studying in ${dest.name}`}
                  className={`destination-card group block bg-white rounded-2xl border border-surface-4 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${
                    isHighlighted ? 'ring-2 ring-sky-500 scale-[1.02] shadow-card-hover' : ''
                  }`}
                  style={{
                    borderTopWidth: '2px',
                    borderTopColor: isHighlighted ? dest.accentColor : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredCountry(dest.slug)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <span
                    className={`text-4xl block mb-3 transition-transform duration-200 ${
                      isHighlighted ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                    aria-hidden="true"
                  >
                    {dest.flag}
                  </span>
                  <h3 className="font-display font-semibold text-navy-900 text-lg">{dest.name}</h3>
                  <p className="text-text-secondary text-body-sm mt-1">{dest.benefit}</p>
                  <span className="inline-flex items-center gap-1 text-sky-500 text-body-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Learn More <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </ClipReveal>
            )
          })}
        </div>

        {/* Interactive World Map */}
        <WorldMap
          hoveredCountry={hoveredCountry}
          onCountryHover={setHoveredCountry}
        />

        <ClipReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/destinations"
              aria-label="Explore all study destinations"
              className="inline-flex items-center gap-1 text-sky-500 font-display font-semibold text-body-lg hover:text-sky-600 transition-colors hover:gap-2"
            >
              Explore All Destinations →
            </Link>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
