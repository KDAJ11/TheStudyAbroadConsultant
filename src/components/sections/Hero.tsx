'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CounterStat } from '@/components/ui/CounterStat'
import { SITE } from '@/lib/constants'

const placementCards = [
  { flag: '🇨🇦', country: 'Canada', student: 'Adaeze N., Lagos', uni: 'University of Manitoba' },
  { flag: '🇬🇧', country: 'United Kingdom', student: 'Emeka O., Abuja', uni: 'University of Essex' },
  { flag: '🇦🇺', country: 'Australia', student: 'Fatima A., Kano', uni: 'Griffith University' },
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const stagger = (delay: number) => ({
    initial: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 28 }) },
    animate: { opacity: 1, ...(prefersReducedMotion ? {} : { y: 0 }) },
    transition: {
      duration: prefersReducedMotion ? 0.3 : 0.6,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  })

  return (
    <section className="relative min-h-[92vh] bg-navy-900 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(8deg, #0A2540 0%, #102e74 100%)' }} />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #2D7DD2 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* World map outline SVG */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-auto opacity-[0.06] pointer-events-none hidden lg:block"
        viewBox="0 0 800 400"
        fill="none"
        stroke="#2D7DD2"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <path d="M160,120 Q200,80 260,100 Q300,60 340,90 Q360,70 400,80 Q440,60 480,90 Q520,80 540,100 Q560,90 580,110 Q620,90 660,120" />
        <path d="M200,140 Q240,130 280,150 Q320,130 360,160 Q400,140 440,170 Q480,150 520,180 Q540,160 560,190" />
        <path d="M120,200 Q160,180 200,210 Q240,190 280,220 Q320,200 360,230" />
        <path d="M400,200 Q440,180 480,210 Q520,200 560,230 Q600,210 640,240 Q660,220 680,250" />
        <path d="M180,280 Q220,260 260,290 Q300,270 340,300" />
        <path d="M440,260 Q480,240 520,270 Q560,260 600,290 Q620,270 640,300" />
      </svg>
      {/* Radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-400/[0.08] rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 lg:pt-40 lg:pb-0">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center lg:min-h-[calc(92vh-160px)]">
          {/* Left column */}
          <div className="lg:col-span-3 pb-12 lg:pb-0">
            <motion.div {...stagger(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-sky-500/15 border border-sky-400/30 text-sky-300 text-body-sm font-medium">
                🇳🇬 Nigeria&apos;s Most Trusted Study Abroad Service
              </span>
            </motion.div>

            <motion.h1
              {...stagger(0.1)}
              className="mt-6 text-display-2xl text-white font-display font-bold"
            >
              Your Journey to a{' '}
              <span className="text-sky-300">World-Class Education</span>{' '}
              Starts Here.
            </motion.h1>

            <motion.p
              {...stagger(0.2)}
              className="mt-6 text-body-xl text-white/70 max-w-lg"
            >
              Expert guidance for Nigerian students applying to the UK, Canada, USA, Ireland, Germany & Australia. From your WAEC results to your first day on campus — we handle everything.
            </motion.p>

            <motion.div {...stagger(0.35)} className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
                Start Your Free Consultation
              </Button>
              <Button variant="outline-white" size="lg" href="#destinations" icon={<ArrowDown className="w-5 h-5" />}>
                Explore Destinations
              </Button>
            </motion.div>

            <motion.p
              {...stagger(0.55)}
              className="mt-6 text-white/50 text-body-sm"
            >
              ✓ Free consultation&nbsp;&nbsp;✓ No upfront commitment&nbsp;&nbsp;✓ 98% visa success rate
            </motion.p>
          </div>

          {/* Right column - Placement cards */}
          <div className="hidden lg:block lg:col-span-2 relative h-[380px]">
            {placementCards.map((card, i) => (
              <motion.div
                key={card.country}
                className="absolute bg-white rounded-card shadow-card-hover p-4 w-[260px]"
                style={{
                  top: `${i * 20}px`,
                  right: `${i * 20}px`,
                  zIndex: 3 - i,
                }}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.8 + i * 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden="true">{card.flag}</span>
                  <span className="font-display font-semibold text-navy-900 text-body-sm">{card.country}</span>
                </div>
                <p className="text-text-secondary text-body-sm">{card.student}</p>
                <p className="text-navy-900 font-medium text-body-sm">{card.uni}</p>
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-badge bg-green-500/15 text-green-600 text-body-sm font-medium">
                  Admitted ✓
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat bar */}
      <div className="relative z-10 bg-white border-t border-surface-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <CounterStat value={SITE.stats.students.value} suffix="+" label={SITE.stats.students.label} />
            <CounterStat value={SITE.stats.visaSuccess.value} suffix="%" label={SITE.stats.visaSuccess.label} />
            <CounterStat value={SITE.stats.universities.value} suffix="+" label={SITE.stats.universities.label} />
            <CounterStat value={SITE.stats.years.value} suffix="+" label={SITE.stats.years.label} />
          </div>
        </div>
      </div>
    </section>
  )
}
