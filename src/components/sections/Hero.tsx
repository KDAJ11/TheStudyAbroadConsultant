'use client'

import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { HeroBackground } from '@/components/sections/HeroBackground'

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration: number, startDelay: number, enabled: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }

    let raf: number
    let startTime: number | null = null

    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (!startTime) startTime = ts
        const elapsed = ts - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, startDelay * 1000)

    return () => {
      clearTimeout(timer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, duration, startDelay, enabled])

  return value
}

/* ─── Word stagger component ─── */
function StaggeredHeadline() {
  const prefersReducedMotion = useReducedMotion()
  const words = ['Your', 'Journey', 'to', 'a', 'World-Class', 'Education', 'Starts', 'Here.']

  if (prefersReducedMotion) {
    return (
      <h1 className="mt-6 text-display-2xl text-white font-display font-bold">
        Your Journey to a <span className="text-sky-300">World-Class Education</span> Starts Here.
      </h1>
    )
  }

  return (
    <h1 className="mt-6 text-display-2xl text-white font-display font-bold">
      {words.map((word, i) => {
        const isHighlighted = word === 'World-Class' || word === 'Education'
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
            <motion.span
              className={`inline-block ${isHighlighted ? 'text-sky-300' : ''}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ willChange: 'transform' }}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </h1>
  )
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const reduced = !!prefersReducedMotion

  const studentsCount = useCountUp(700, 1.8, 0.8, !reduced)
  const visaCount = useCountUp(98, 1.5, 0.8, !reduced)

  // Expo ease-out for framer variants
  const ease = [0.16, 1, 0.3, 1] as const

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0, ease }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-sky-500/15 border border-sky-400/30 text-sky-300 text-body-sm font-medium">
              🇳🇬 Nigeria&apos;s Most Trusted Study Abroad Service
            </span>
          </motion.div>

          {/* Headline with word stagger */}
          <StaggeredHeadline />

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-body-xl text-white/70 max-w-lg"
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            Expert guidance for Nigerian students applying to the UK, Canada, USA, Ireland, Germany & Australia. From your WAEC results to your first day on campus — we handle everything.
          </motion.p>

          {/* CTA Buttons — fade up at 1.2s */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2, ease }}
            style={{ willChange: 'transform' }}
          >
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
          </motion.div>

          {/* Stats with count-up */}
          <motion.p
            className="mt-6 text-white/50 text-body-sm"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
          >
            ✓ {reduced ? '700' : studentsCount}+ Students Placed&nbsp;&nbsp;✓ {reduced ? '98' : visaCount}% Visa Success Rate&nbsp;&nbsp;
            <motion.span
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease }}
            >
              ✓ UK, Canada, USA & More
            </motion.span>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
