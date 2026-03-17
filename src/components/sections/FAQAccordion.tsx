'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
  title?: string
  subtitle?: string
  className?: string
}

export function FAQAccordion({ faqs, title = 'Frequently Asked Questions', subtitle, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`py-section ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-10">
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-text-secondary text-body-lg">{subtitle}</p>}
          </div>
        </SectionFade>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <SectionFade key={i} delay={i * 0.05}>
              <div className="bg-white rounded-card border border-surface-4 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left min-h-[44px] focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-${i}`}
                >
                  <span className="font-display font-semibold text-navy-900 text-body-md pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.1 : 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-text-secondary text-body-md leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
