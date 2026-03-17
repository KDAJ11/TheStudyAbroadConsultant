import { SectionFade } from '@/components/ui/SectionFade'
import type { Destination } from '@/types'
import { NAIRA_RATES } from '@/lib/constants'

interface DestinationCostTableProps {
  destination: Destination
}

export function DestinationCostTable({ destination }: DestinationCostTableProps) {
  const currency = destination.tuition.currency
  const rate = NAIRA_RATES[currency] || 1

  return (
    <section className="bg-white py-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-10">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Costs</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Full Cost Breakdown in Naira
            </h2>
          </div>
        </SectionFade>

        <SectionFade delay={0.1}>
          <div className="bg-white rounded-card shadow-card border border-surface-4 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-6 py-4 text-left font-display font-semibold text-body-sm">Item</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-body-sm">{currency}</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-body-sm">₦ Naira</th>
                  </tr>
                </thead>
                <tbody>
                  {destination.costTable.map((row, i) => (
                    <tr key={row.item} className={`border-b border-surface-4 ${i === destination.costTable.length - 1 ? 'bg-surface-2 font-semibold' : ''}`}>
                      <td className="px-6 py-4 text-body-md text-navy-900">{row.item}</td>
                      <td className="px-6 py-4 text-body-md text-text-secondary">{row.foreign}</td>
                      <td className="px-6 py-4 text-body-md text-navy-900 font-medium">{row.naira}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-surface-2 border-t border-surface-4">
              <p className="text-text-muted text-body-sm">
                Naira figures at approx ₦{rate.toLocaleString()}/{currency}. Verify current rates at CBN.
              </p>
            </div>
          </div>
        </SectionFade>
      </div>
    </section>
  )
}
