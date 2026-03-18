'use client'

import { Phone, ClipboardList, Plane, GraduationCap } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ClipReveal } from '@/components/animations/ClipReveal'
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

const ease = [0.16, 1, 0.3, 1] as const

/* ─── Animated SVG circle for step number ─── */
function AnimatedStepCircle({
  icon: Icon,
  delay,
  size = 64,
}: {
  icon: typeof Phone
  delay: number
  size?: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const r = (size - 4) / 2
  const circumference = 2 * Math.PI * r

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="#2D7DD2"
          className="shadow-cta-sky"
        />
        {/* Animated stroke */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#60a8e8"
          strokeWidth={3}
          strokeLinecap="round"
          initial={
            prefersReducedMotion
              ? { strokeDashoffset: 0 }
              : { strokeDashoffset: circumference }
          }
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : delay,
            ease,
          }}
          style={{
            strokeDasharray: circumference,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ─── Desktop connecting dashed line ─── */
function ConnectingLine({ delay }: { delay: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex-1 flex items-center mx-2" style={{ height: 4 }}>
      <svg className="w-full h-1 overflow-visible" preserveAspectRatio="none">
        {/* Background track */}
        <line x1="0" y1="2" x2="100%" y2="2" stroke="#E4EAF4" strokeWidth="2" strokeDasharray="6 4" />
        {/* Animated draw line */}
        <motion.line
          x1="0"
          y1="2"
          x2="100%"
          y2="2"
          stroke="#2D7DD2"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { pathLength: 0, opacity: 0.4 }
          }
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : delay,
            ease,
          }}
          style={{ willChange: 'transform' }}
        />
      </svg>
    </div>
  )
}

/* ─── Step content (title + desc) with fade-up ─── */
function StepContent({
  title,
  description,
  stepNumber,
  delay,
}: {
  title: string
  description: string
  stepNumber: number
  delay: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.35,
        delay: prefersReducedMotion ? 0 : delay,
        ease,
      }}
    >
      <div className="mt-1 mb-2">
        <span className="text-label text-text-muted">Step {stepNumber}</span>
      </div>
      <h3 className="font-display font-semibold text-navy-900 text-body-md">{title}</h3>
      <p className="text-text-secondary text-body-sm mt-2 max-w-[220px] mx-auto">{description}</p>
    </motion.div>
  )
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  // Timing: each step = circle draw (0.4s) + content fade (0.35s) + line draw (0.4s)
  // Step 1: circle 0, content 0.3, line 0.6
  // Step 2: circle 0.9, content 1.1, line 1.3
  // Step 3: circle 1.6, content 1.8, line 2.0
  // Step 4: circle 2.3, content 2.5
  const timings = [
    { circle: 0, content: 0.3, lineAfter: 0.6 },
    { circle: 0.9, content: 1.1, lineAfter: 1.3 },
    { circle: 1.6, content: 1.8, lineAfter: 2.0 },
    { circle: 2.3, content: 2.5, lineAfter: null },
  ]

  return (
    <section ref={sectionRef} className="how-it-works-section bg-surface-2 py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClipReveal>
          <div className="text-center mb-16">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Your Journey</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              How We Get You There.
            </h2>
          </div>
        </ClipReveal>

        {/* Desktop: horizontal process with connecting lines */}
        <div className="hidden lg:block relative">
          {/* Row of circles + connecting lines */}
          <div className="flex items-center justify-between mb-0">
            {steps.map((step, i) => {
              const timing = timings[i]
              const Icon = step.icon
              return (
                <div key={step.title} className="contents">
                  <div className="flex flex-col items-center text-center" style={{ flex: '0 0 auto' }}>
                    <AnimatedStepCircle

                      icon={Icon}
                      delay={timing.circle}
                    />
                    <StepContent
                      title={step.title}
                      description={step.description}
                      stepNumber={i + 1}
                      delay={timing.content}
                    />
                  </div>
                  {i < steps.length - 1 && (
                    <ConnectingLine delay={timing.lineAfter!} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical with dashed border */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            const timing = timings[i]
            return (
              <div key={step.title} className="process-step flex gap-4">
                <div className="flex flex-col items-center">
                  <AnimatedStepCircle
                    icon={Icon}
                    delay={timing.circle}
                    size={48}
                  />
                  {i < steps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-2"
                      style={{
                        borderLeft: '2px dashed #2D7DD240',
                        minHeight: '2rem',
                      }}
                    />
                  )}
                </div>
                <div className="pb-8">
                  <StepContent
                    title={step.title}
                    description={step.description}
                    stepNumber={i + 1}
                    delay={timing.content}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <ClipReveal delay={0.3}>
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
        </ClipReveal>
      </div>
    </section>
  )
}
