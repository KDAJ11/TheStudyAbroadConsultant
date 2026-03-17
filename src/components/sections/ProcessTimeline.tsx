'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { SectionFade } from '@/components/ui/SectionFade'

const steps = [
  { week: 'Week 1', title: 'Initial Consultation', description: 'Free assessment of your goals, qualifications, and budget. We create your personalised roadmap.' },
  { week: 'Weeks 2–3', title: 'University Shortlisting', description: 'We match you with 3–5 universities based on your GPA, career goals, and financial capacity.' },
  { week: 'Weeks 4–8', title: 'Application Prep', description: 'Personal statements, document preparation, and application submission to your chosen universities.' },
  { week: 'Weeks 12–16', title: 'Offer & Acceptance', description: 'Receive offers, compare options, and formally accept your place. Scholarship applications where eligible.' },
  { week: 'Weeks 16–20', title: 'Visa Application', description: 'Complete visa documentation, financial evidence, and interview preparation with 98% success rate.' },
  { week: 'Weeks 20–24', title: 'Pre-Departure & Arrival', description: 'Accommodation, travel, orientation prep, and 3 months of post-arrival support.' },
]

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Your Journey</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              From First Call to First Day on Campus
            </h2>
          </div>
        </SectionFade>

        {/* Desktop: horizontal */}
        <div ref={ref} className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-0 right-0 h-0.5 bg-surface-4">
            <motion.div
              className="h-full bg-sky-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: prefersReducedMotion ? 0.3 : 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>

          <div className="grid grid-cols-6 gap-4 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="text-center"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0.2 : 0.5,
                  delay: prefersReducedMotion ? 0 : i * 0.1 + 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <div className="w-14 h-14 rounded-full bg-sky-500 text-white font-display font-bold text-body-lg flex items-center justify-center mx-auto relative z-10">
                  {i + 1}
                </div>
                <p className="text-label text-sky-500 mt-4">{step.week}</p>
                <h3 className="font-display font-semibold text-navy-900 text-body-sm mt-1">{step.title}</h3>
                <p className="text-text-muted text-body-sm mt-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <SectionFade key={step.title} delay={i * 0.1}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-display font-bold text-body-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-surface-4 my-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-label text-sky-500">{step.week}</p>
                  <h3 className="font-display font-semibold text-navy-900 text-body-md mt-1">{step.title}</h3>
                  <p className="text-text-secondary text-body-sm mt-1">{step.description}</p>
                </div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
