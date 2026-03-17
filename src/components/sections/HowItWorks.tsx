'use client'

import { useEffect, useRef } from 'react'
import { Phone, ClipboardList, Plane, GraduationCap } from 'lucide-react'
import { SITE } from '@/lib/constants'

const steps = [
  {
    icon: Phone,
    title: 'Book a Consultation',
    description: 'We learn your academic background, goals, and target countries.',
  },
  {
    icon: ClipboardList,
    title: 'Profile Assessment',
    description: 'We match you to the right universities based on your GPA, budget, and ambitions.',
  },
  {
    icon: Plane,
    title: 'Application & Visa Support',
    description: 'We handle documents, applications, and visa preparation end-to-end.',
  },
  {
    icon: GraduationCap,
    title: 'You Land & Thrive',
    description: 'Post-arrival orientation, accommodation tips, and ongoing support.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

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

      // Animate step cards
      const stepEls = sectionRef.current.querySelectorAll('.process-step')
      gsap.from(stepEls, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Animate connecting line (desktop)
      if (lineRef.current) {
        const totalLength = lineRef.current.getTotalLength?.() || 800
        lineRef.current.style.strokeDasharray = `${totalLength}`
        lineRef.current.style.strokeDashoffset = `${totalLength}`

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
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
    <section ref={sectionRef} className="how-it-works-section bg-surface-2 py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Your Journey</p>
          <h2 className="text-display-lg font-display font-bold text-navy-900">
            How We Get You There.
          </h2>
        </div>

        {/* Desktop: horizontal process */}
        <div className="hidden lg:block relative">
          {/* SVG connecting line */}
          <div className="absolute top-[32px] left-[12.5%] right-[12.5%] h-0.5">
            <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#2D7DD2"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Background line */}
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#E4EAF4"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="process-step text-center">
                  <div className="w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center mx-auto relative z-10 shadow-cta-sky">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="mt-1 mb-2">
                    <span className="text-label text-text-muted">Step {i + 1}</span>
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 text-body-md">{step.title}</h3>
                  <p className="text-text-secondary text-body-sm mt-2 max-w-[220px] mx-auto">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="process-step flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-cta-sky">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-surface-4 my-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-label text-text-muted">Step {i + 1}</span>
                  <h3 className="font-display font-semibold text-navy-900 text-body-md mt-1">{step.title}</h3>
                  <p className="text-text-secondary text-body-sm mt-1">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
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
