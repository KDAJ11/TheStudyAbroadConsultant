'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const destinations = [
  { name: 'Canada', slug: 'canada', flag: '🇨🇦', benefit: 'Up to 3yr Post-Study Work', accentColor: '#FF0000' },
  { name: 'United Kingdom', slug: 'uk', flag: '🇬🇧', benefit: '2yr Graduate Visa', accentColor: '#012169' },
  { name: 'USA', slug: 'usa', flag: '🇺🇸', benefit: '12–36mo OPT Work Rights', accentColor: '#B22234' },
  { name: 'Ireland', slug: 'ireland', flag: '🇮🇪', benefit: 'EU Access · English-Speaking', accentColor: '#169B62' },
  { name: 'Germany', slug: 'germany', flag: '🇩🇪', benefit: 'Near-Zero Tuition Available', accentColor: '#FFCE00' },
  { name: 'Australia', slug: 'australia', flag: '🇦🇺', benefit: 'Unlimited Work Rights', accentColor: '#00843D' },
]

export function DestinationCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let cleanup: (() => void) | undefined

    async function initGsap() {
      const gsapModule = await import('gsap')
      const scrollModule = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.default
      const ScrollTrigger = scrollModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.destination-card')
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    initGsap()
    return () => cleanup?.()
  }, [])

  return (
    <section id="destinations" ref={sectionRef} className="destinations-section bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Destinations</p>
          <h2 className="text-display-lg font-display font-bold text-navy-900">
            Where Will You Study?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              aria-label={`Learn more about studying in ${dest.name}`}
              className="destination-card group block bg-white rounded-2xl border border-surface-4 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              style={{
                borderTopWidth: '2px',
                borderTopColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderTopColor = dest.accentColor
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderTopColor = 'transparent'
              }}
            >
              <span className="text-4xl block mb-3" aria-hidden="true">{dest.flag}</span>
              <h3 className="font-display font-semibold text-navy-900 text-lg">{dest.name}</h3>
              <p className="text-text-secondary text-body-sm mt-1">{dest.benefit}</p>
              <span className="inline-flex items-center gap-1 text-sky-500 text-body-sm font-medium mt-4 group-hover:gap-2 transition-all">
                Learn More →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/destinations"
            aria-label="Explore all study destinations"
            className="inline-flex items-center gap-1 text-sky-500 font-display font-semibold text-body-lg hover:text-sky-600 transition-colors hover:gap-2"
          >
            Explore All Destinations →
          </Link>
        </div>
      </div>
    </section>
  )
}
