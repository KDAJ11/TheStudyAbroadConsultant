'use client'

import { useEffect, useRef } from 'react'
import { XCircle, CheckCircle, X, ShieldCheck } from 'lucide-react'
import { SITE } from '@/lib/constants'

const painPoints = [
  'Visa rejection from documentation errors',
  'Months wasted on wrong universities',
  'Non-refundable fees with no guidance',
  'Missing scholarship deadlines',
  'No support after arrival',
]

const benefits = [
  'Expert document review & preparation',
  'Matched to the right university for your profile',
  'Clear fee structure, no surprises',
  'Scholarship deadline tracking included',
  'Post-arrival support & check-ins',
]

export function WhyNotDIY() {
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

      const beforeCol = sectionRef.current.querySelector('.before-col')
      const afterCol = sectionRef.current.querySelector('.after-col')

      if (beforeCol) {
        gsap.from(beforeCol, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }

      if (afterCol) {
        gsap.from(afterCol, {
          x: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    initGsap()
    return () => cleanup?.()
  }, [])

  return (
    <section ref={sectionRef} className="before-after-section bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-label text-sky-500 uppercase tracking-widest mb-3">The Hard Truth</p>
          <h2 className="text-display-lg font-display font-bold text-navy-900 max-w-2xl mx-auto">
            Most Students Who Apply Alone Get It Wrong.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Going It Alone */}
          <div className="before-col border-l-4 border-red-500 bg-[#1a0505] rounded-2xl p-8 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-body-lg">Going It Alone</h3>
            </div>
            <ul className="space-y-4">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-red-200/80 text-body-md">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Our Team */}
          <div className="after-col border-l-4 border-emerald-400 bg-[#0a1628] rounded-2xl p-8 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-body-lg">With Our Team</h3>
            </div>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-emerald-100/80 text-body-md">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-secondary text-body-lg mb-6">Stop guessing. Get expert guidance.</p>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a Consultation on WhatsApp"
            className="inline-flex items-center justify-center gap-2 font-display font-semibold text-body-lg px-8 py-4 min-h-[52px] bg-brand-red text-white rounded-[4px] shadow-cta-red transition-all duration-200 hover:bg-brand-red-hover hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
