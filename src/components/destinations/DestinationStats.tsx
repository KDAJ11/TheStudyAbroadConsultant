import { NAIRA_RATES, formatNaira } from '@/lib/constants'
import type { Destination } from '@/types'
import { SectionFade } from '@/components/ui/SectionFade'

interface DestinationStatsProps {
  destination: Destination
}

export function DestinationStats({ destination }: DestinationStatsProps) {
  const { tuition, living, workRights, postStudy } = destination
  const rate = NAIRA_RATES[tuition.currency] || 1

  const stats = [
    {
      label: 'Tuition/yr',
      foreign: `${tuition.currency} ${tuition.min.toLocaleString()}–${tuition.max.toLocaleString()}`,
      naira: `${formatNaira(tuition.min * rate)}–${formatNaira(tuition.max * rate)}`,
      note: tuition.note,
    },
    {
      label: 'Living/yr',
      foreign: `${living.currency} ${living.min.toLocaleString()}–${living.max.toLocaleString()}`,
      naira: `${formatNaira(living.min * (NAIRA_RATES[living.currency] || 1))}–${formatNaira(living.max * (NAIRA_RATES[living.currency] || 1))}`,
    },
    { label: 'Work Rights', foreign: workRights },
    { label: 'Post-Study', foreign: postStudy },
  ]

  return (
    <section className="bg-surface-2 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-card p-4 shadow-xs text-center">
                <p className="text-label text-text-muted uppercase mb-2">{stat.label}</p>
                <p className="font-display font-semibold text-navy-900 text-body-md">{stat.foreign}</p>
                {stat.naira && (
                  <p className="text-text-secondary text-body-sm mt-1">{stat.naira}</p>
                )}
                {stat.note && (
                  <p className="text-sky-500 text-body-sm font-medium mt-1">{stat.note}</p>
                )}
              </div>
            ))}
          </div>
        </SectionFade>
      </div>
    </section>
  )
}
