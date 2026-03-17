'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { HeroBackground } from '@/components/sections/HeroBackground'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !contentRef.current) return

    const els = contentRef.current.querySelectorAll<HTMLElement>('[data-hero-animate]')
    els.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
    })

    // Stagger entrance
    els.forEach((el, i) => {
      const delay = i * 120
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s cubic-bezier(0.21,0.47,0.32,0.98), transform 0.6s cubic-bezier(0.21,0.47,0.32,0.98)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, delay + 100)
    })
  }, [])

  return (
    <section className="relative min-h-[92vh] bg-navy-900 overflow-hidden flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(8deg, #0A2540 0%, #102e74 100%)' }} />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #2D7DD2 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* SVG Animated Background */}
      <HeroBackground />

      {/* Radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-400/[0.08] rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-3xl">
          <div data-hero-animate>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-sky-500/15 border border-sky-400/30 text-sky-300 text-body-sm font-medium">
              🇳🇬 Nigeria&apos;s Most Trusted Study Abroad Service
            </span>
          </div>

          <h1 data-hero-animate className="mt-6 text-display-2xl text-white font-display font-bold">
            Your Journey to a{' '}
            <span className="text-sky-300">World-Class Education</span>{' '}
            Starts Here.
          </h1>

          <p data-hero-animate className="mt-6 text-body-xl text-white/70 max-w-lg">
            Expert guidance for Nigerian students applying to the UK, Canada, USA, Ireland, Germany & Australia. From your WAEC results to your first day on campus — we handle everything.
          </p>

          <div data-hero-animate className="mt-8 flex flex-wrap gap-4">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Consultation on WhatsApp"
              className="inline-flex items-center justify-center gap-2 font-display font-semibold text-body-lg px-8 py-4 min-h-[52px] bg-brand-red text-white rounded-[4px] shadow-cta-red transition-all duration-200 hover:bg-brand-red-hover hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Book a Consultation
            </a>
            <a
              href="#destinations"
              aria-label="Explore study destinations"
              className="inline-flex items-center justify-center gap-2 font-display font-semibold text-body-lg px-8 py-4 min-h-[52px] border-2 border-white text-white rounded-[4px] transition-all duration-200 hover:bg-white hover:text-navy-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Explore Destinations
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

          <p data-hero-animate className="mt-6 text-white/50 text-body-sm">
            ✓ 398+ Students Placed&nbsp;&nbsp;✓ 98% Visa Success Rate&nbsp;&nbsp;✓ UK, Canada, USA & More
          </p>
        </div>
      </div>
    </section>
  )
}
