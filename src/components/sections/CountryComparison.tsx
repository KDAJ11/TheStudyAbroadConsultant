'use client'

import { useState } from 'react'
import { SectionFade } from '@/components/ui/SectionFade'
import { Button } from '@/components/ui/Button'
import { SITE, NAIRA_RATES } from '@/lib/constants'

type CountryKey = 'canada' | 'uk' | 'usa' | 'ireland' | 'germany' | 'australia'

interface CountryData {
  name: string
  flag: string
  currency: string
  tuition: string
  tuitionRange: [number, number]
  living: string
  livingRange: [number, number]
  workRights: string
  postStudy: string
  visaProcessing: string
  community: string
  prPathway: string
}

const countries: Record<CountryKey, CountryData> = {
  canada: {
    name: 'Canada', flag: '🇨🇦', currency: 'CAD',
    tuition: 'CAD 13,000–30,000/yr', tuitionRange: [13000, 30000],
    living: 'CAD 10,000–15,000/yr', livingRange: [10000, 15000],
    workRights: '20hrs/wk + full-time breaks',
    postStudy: 'Up to 3yr PGWP',
    visaProcessing: '8–12 weeks',
    community: 'Large',
    prPathway: 'Yes',
  },
  uk: {
    name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP',
    tuition: 'GBP 10,000–38,000/yr', tuitionRange: [10000, 38000],
    living: 'GBP 12,000–15,000/yr', livingRange: [12000, 15000],
    workRights: '20hrs during term',
    postStudy: '2yr Graduate Visa',
    visaProcessing: '~3 weeks',
    community: 'Large',
    prPathway: 'Limited',
  },
  usa: {
    name: 'USA', flag: '🇺🇸', currency: 'USD',
    tuition: 'USD 20,000–55,000/yr', tuitionRange: [20000, 55000],
    living: 'USD 15,000–25,000/yr', livingRange: [15000, 25000],
    workRights: 'On-campus only',
    postStudy: '12–36mo OPT',
    visaProcessing: '2–3 months',
    community: 'Large',
    prPathway: 'No (complex)',
  },
  ireland: {
    name: 'Ireland', flag: '🇮🇪', currency: 'EUR',
    tuition: 'EUR 9,000–25,000/yr', tuitionRange: [9000, 25000],
    living: 'EUR 10,000–12,000/yr', livingRange: [10000, 12000],
    workRights: '20hrs term, full-time holidays',
    postStudy: '1–2yr Stay Back',
    visaProcessing: '4–6 weeks',
    community: 'Growing',
    prPathway: 'Possible (Stamp 4)',
  },
  germany: {
    name: 'Germany', flag: '🇩🇪', currency: 'EUR',
    tuition: 'EUR 0–20,000/yr', tuitionRange: [0, 20000],
    living: 'EUR 10,000–12,000/yr', livingRange: [10000, 12000],
    workRights: '20hrs/wk during term',
    postStudy: '18mo job-seeker visa',
    visaProcessing: '6–8 weeks',
    community: 'Smaller',
    prPathway: 'Yes (5yr)',
  },
  australia: {
    name: 'Australia', flag: '🇦🇺', currency: 'AUD',
    tuition: 'AUD 20,000–45,000/yr', tuitionRange: [20000, 45000],
    living: 'AUD 21,000–27,000/yr', livingRange: [21000, 27000],
    workRights: '48hrs/fortnight',
    postStudy: '2–4yr Subclass 485',
    visaProcessing: '4–6 weeks',
    community: 'Growing',
    prPathway: 'Yes (skilled)',
  },
}

const countryKeys = Object.keys(countries) as CountryKey[]

function formatNairaRange(min: number, max: number, currency: string) {
  const rate = NAIRA_RATES[currency] || 1
  const nMin = (min * rate / 1000000).toFixed(1)
  const nMax = (max * rate / 1000000).toFixed(1)
  return `≈ ₦${nMin}M–₦${nMax}M`
}

const rows = [
  { label: 'Tuition Range', key: 'tuition' as const, rangeKey: 'tuitionRange' as const },
  { label: 'Living Costs', key: 'living' as const, rangeKey: 'livingRange' as const },
  { label: 'Work Rights', key: 'workRights' as const },
  { label: 'Post-Study Visa', key: 'postStudy' as const },
  { label: 'Visa Processing', key: 'visaProcessing' as const },
  { label: 'Nigerian Community', key: 'community' as const },
  { label: 'PR Pathway', key: 'prPathway' as const },
]

function isBetter(rowLabel: string, valA: string, valB: string): 'a' | 'b' | 'none' {
  if (rowLabel === 'PR Pathway') {
    if (valA.startsWith('Yes') && !valB.startsWith('Yes')) return 'a'
    if (valB.startsWith('Yes') && !valA.startsWith('Yes')) return 'b'
  }
  if (rowLabel === 'Nigerian Community') {
    const rank: Record<string, number> = { Large: 3, Growing: 2, Smaller: 1 }
    if ((rank[valA] || 0) > (rank[valB] || 0)) return 'a'
    if ((rank[valB] || 0) > (rank[valA] || 0)) return 'b'
  }
  return 'none'
}

export function CountryComparison() {
  const [countryA, setCountryA] = useState<CountryKey>('canada')
  const [countryB, setCountryB] = useState<CountryKey>('uk')
  const a = countries[countryA]
  const b = countries[countryB]

  return (
    <section className="bg-surface-3 py-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-10">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Compare</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Country Comparison Tool
            </h2>
          </div>
        </SectionFade>

        <SectionFade delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <select
              value={countryA}
              onChange={(e) => setCountryA(e.target.value as CountryKey)}
              className="w-full sm:w-auto px-4 py-3 rounded-btn border border-surface-4 bg-white font-display font-medium text-navy-900 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none min-h-[44px]"
              aria-label="Select first country"
            >
              {countryKeys.map((key) => (
                <option key={key} value={key}>{countries[key].flag} {countries[key].name}</option>
              ))}
            </select>
            <span className="font-display font-semibold text-text-muted">vs</span>
            <select
              value={countryB}
              onChange={(e) => setCountryB(e.target.value as CountryKey)}
              className="w-full sm:w-auto px-4 py-3 rounded-btn border border-surface-4 bg-white font-display font-medium text-navy-900 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none min-h-[44px]"
              aria-label="Select second country"
            >
              {countryKeys.map((key) => (
                <option key={key} value={key}>{countries[key].flag} {countries[key].name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-surface-4">
                    <th className="px-6 py-4 font-display font-semibold text-text-muted text-body-sm"></th>
                    <th className="px-6 py-4 font-display font-semibold text-navy-900 text-body-md">
                      {a.flag} {a.name}
                    </th>
                    <th className="px-6 py-4 font-display font-semibold text-navy-900 text-body-md">
                      {b.flag} {b.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const valA = a[row.key] as string
                    const valB = b[row.key] as string
                    const better = isBetter(row.label, valA, valB)
                    const nairaA = row.rangeKey ? formatNairaRange(a[row.rangeKey][0], a[row.rangeKey][1], a.currency) : null
                    const nairaB = row.rangeKey ? formatNairaRange(b[row.rangeKey][0], b[row.rangeKey][1], b.currency) : null

                    return (
                      <tr key={row.label} className="border-b border-surface-4 last:border-0">
                        <td className="px-6 py-4 font-display font-medium text-text-secondary text-body-sm whitespace-nowrap">
                          {row.label}
                        </td>
                        <td className={`px-6 py-4 text-body-sm ${better === 'a' ? 'bg-sky-50 text-sky-700 font-medium' : 'text-text-primary'}`}>
                          <div>{valA}</div>
                          {nairaA && <div className="text-text-muted text-body-sm mt-0.5">{nairaA}</div>}
                        </td>
                        <td className={`px-6 py-4 text-body-sm ${better === 'b' ? 'bg-sky-50 text-sky-700 font-medium' : 'text-text-primary'}`}>
                          <div>{valB}</div>
                          {nairaB && <div className="text-text-muted text-body-sm mt-0.5">{nairaB}</div>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
              Talk to Us About {a.name} vs {b.name}
            </Button>
          </div>
        </SectionFade>
      </div>
    </section>
  )
}
