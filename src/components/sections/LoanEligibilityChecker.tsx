'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { ClipReveal } from '@/components/animations/ClipReveal'

/* ─── Loan provider data ─── */
const loanProviders = [
  {
    name: 'Prodigy Finance',
    type: 'International' as const,
    maxAmount: 'Up to $220,000 USD',
    interestRate: 'Variable, ~7–15% p.a.',
    eligibility: ['Master\'s', 'PhD'],
    countries: ['UK', 'USA', 'Canada', 'Ireland', 'Germany', 'Australia'],
    minBudgetNaira: 10_000_000,
    note: 'No collateral required. Repay after graduation.',
    url: 'https://prodigyfinance.com',
  },
  {
    name: 'MPOWER Financing',
    type: 'International' as const,
    maxAmount: 'Up to $100,000 USD',
    interestRate: 'Fixed ~12–14% p.a.',
    eligibility: ['Undergraduate', 'Master\'s', 'PhD'],
    countries: ['USA', 'Canada'],
    minBudgetNaira: 5_000_000,
    note: 'No co-signer or collateral needed.',
    url: 'https://mpowerfinancing.com',
  },
  {
    name: 'Sterling Bank Study Abroad Loan',
    type: 'Nigerian Bank' as const,
    maxAmount: 'Up to ₦50M',
    interestRate: 'Competitive — contact branch',
    eligibility: ['Undergraduate', 'Master\'s', 'PhD'],
    countries: ['UK', 'USA', 'Canada', 'Ireland', 'Germany', 'Australia'],
    minBudgetNaira: 0,
    note: 'Requires Nigerian guarantor and admission letter.',
    url: 'https://sterling.ng',
  },
  {
    name: 'Access Bank Study Loan',
    type: 'Nigerian Bank' as const,
    maxAmount: 'Up to ₦30M',
    interestRate: 'Competitive — contact branch',
    eligibility: ['Undergraduate', 'Master\'s', 'PhD'],
    countries: ['UK', 'USA', 'Canada', 'Ireland', 'Germany', 'Australia'],
    minBudgetNaira: 0,
    note: 'Must be existing Access Bank customer.',
    url: 'https://accessbankplc.com',
  },
  {
    name: 'SIEC Education Finance',
    type: 'Nigerian Specialist' as const,
    maxAmount: 'Up to ₦20M',
    interestRate: 'Contact for current rates',
    eligibility: ['Undergraduate', 'Master\'s'],
    countries: ['UK', 'Canada', 'Ireland'],
    minBudgetNaira: 0,
    note: 'Specialises in Nigerian study abroad financing.',
    url: 'https://siec.com.ng',
  },
]

const countryOptions = ['Canada', 'UK', 'USA', 'Ireland', 'Germany', 'Australia']
const levelOptions = ['Undergraduate', 'Master\'s', 'PhD', 'Language Course']
const budgetOptions = [
  { label: 'Under ₦5M', value: 0 },
  { label: '₦5M–₦10M', value: 5_000_000 },
  { label: '₦10M–₦20M', value: 10_000_000 },
  { label: '₦20M+', value: 20_000_000 },
]

type BadgeType = 'International' | 'Nigerian Bank' | 'Nigerian Specialist'

const badgeStyles: Record<BadgeType, string> = {
  International: 'bg-blue-100 text-blue-700',
  'Nigerian Bank': 'bg-green-100 text-green-700',
  'Nigerian Specialist': 'bg-yellow-100 text-yellow-700',
}

export function LoanEligibilityChecker() {
  const [country, setCountry] = useState('')
  const [level, setLevel] = useState('')
  const [budget, setBudget] = useState<number | null>(null)
  const [results, setResults] = useState<typeof loanProviders | null>(null)
  const [hasChecked, setHasChecked] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleCheck = () => {
    if (!country || !level || budget === null) return

    const matched = loanProviders.filter((lender) => {
      if (!lender.countries.includes(country)) return false
      if (!lender.eligibility.includes(level)) return false
      if (budget < lender.minBudgetNaira) return false
      return true
    })

    setResults(matched)
    setHasChecked(true)
  }

  const isFormComplete = country && level && budget !== null

  return (
    <section className="bg-surface-2 py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <ClipReveal>
          <div className="text-center mb-10">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Resources</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Find Your Study Abroad Funding
            </h2>
            <p className="mt-3 text-text-secondary text-body-lg max-w-2xl mx-auto">
              See which loans you may qualify for based on your destination and budget.
            </p>
          </div>
        </ClipReveal>

        {/* Checker card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-surface-4 shadow-sm p-6 sm:p-8">
            {/* Inputs */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="loan-country" className="block text-body-sm font-medium text-navy-900 mb-1.5">
                  Destination country
                </label>
                <select
                  id="loan-country"
                  value={country}
                  onChange={(e) => { setCountry(e.target.value); setHasChecked(false) }}
                  className="w-full px-3 py-2.5 rounded-btn border border-surface-4 bg-white text-body-sm min-h-[44px] focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="">Select country</option>
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="loan-level" className="block text-body-sm font-medium text-navy-900 mb-1.5">
                  Course level
                </label>
                <select
                  id="loan-level"
                  value={level}
                  onChange={(e) => { setLevel(e.target.value); setHasChecked(false) }}
                  className="w-full px-3 py-2.5 rounded-btn border border-surface-4 bg-white text-body-sm min-h-[44px] focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="">Select level</option>
                  {levelOptions.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="loan-budget" className="block text-body-sm font-medium text-navy-900 mb-1.5">
                  Estimated annual budget (₦)
                </label>
                <select
                  id="loan-budget"
                  value={budget === null ? '' : String(budget)}
                  onChange={(e) => { setBudget(e.target.value === '' ? null : Number(e.target.value)); setHasChecked(false) }}
                  className="w-full px-3 py-2.5 rounded-btn border border-surface-4 bg-white text-body-sm min-h-[44px] focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="">Select budget</option>
                  {budgetOptions.map((b) => (
                    <option key={b.label} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Check button */}
            <button
              onClick={handleCheck}
              disabled={!isFormComplete}
              aria-busy={false}
              className={`w-full sm:w-auto inline-flex items-center justify-center font-display font-semibold text-body-sm px-8 py-3 min-h-[44px] rounded-[4px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                isFormComplete
                  ? 'bg-navy-900 text-white hover:bg-navy-800 cursor-pointer'
                  : 'bg-surface-4 text-text-muted cursor-not-allowed'
              }`}
            >
              Check Eligibility
            </button>

            {/* Results */}
            <AnimatePresence mode="wait">
              {hasChecked && results !== null && (
                <motion.div
                  role="region"
                  aria-label="Loan eligibility results"
                  aria-live="polite"
                  style={{ willChange: 'transform' }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 pt-8 border-t border-surface-4">
                    {results.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {results.map((lender) => (
                          <div
                            key={lender.name}
                            className="bg-white rounded-2xl border border-surface-4 shadow-sm p-5 flex flex-col"
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <h3 className="font-display font-semibold text-navy-900 text-body-lg">
                                {lender.name}
                              </h3>
                              <span
                                className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  badgeStyles[lender.type]
                                }`}
                              >
                                {lender.type}
                              </span>
                            </div>

                            <p className="font-display font-bold text-navy-900 text-body-lg mb-1">
                              {lender.maxAmount}
                            </p>
                            <p className="text-text-secondary text-body-sm mb-1">
                              Interest: {lender.interestRate}
                            </p>
                            <p className="text-text-muted text-body-sm italic mb-3">
                              {lender.note}
                            </p>

                            <div className="flex items-center gap-2 mt-auto pt-3 border-t border-surface-4">
                              <span className="text-green-600 text-body-sm font-medium">
                                ✅ Likely eligible
                              </span>
                              <span className="ml-auto">
                                <a
                                  href={lender.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sky-500 text-body-sm font-medium hover:text-sky-600 transition-colors"
                                >
                                  Visit Website →
                                </a>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-text-secondary text-body-lg mb-4">
                          No exact matches — book a consultation and we&apos;ll find the right financing option for your situation.
                        </p>
                        <a
                          href={SITE.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 font-display font-semibold text-body-sm px-6 py-3 min-h-[44px] bg-green-600 text-white rounded-[4px] transition-all duration-200 hover:bg-green-700"
                        >
                          Chat on WhatsApp →
                        </a>
                      </div>
                    )}

                    {/* Always show consultation CTA */}
                    <div className="mt-6 text-center">
                      <p className="text-text-secondary text-body-sm">
                        Not sure which option is right?{' '}
                        <a
                          href={SITE.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 font-medium hover:text-sky-600 transition-colors"
                        >
                          Book a free consultation →
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View all resources link */}
          <ClipReveal delay={0.2}>
            <div className="mt-8 text-center">
              <a
                href="/scholarships"
                className="inline-flex items-center gap-1 text-sky-500 font-display font-semibold text-body-lg hover:text-sky-600 transition-colors hover:gap-2"
              >
                View All Resources →
              </a>
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}
