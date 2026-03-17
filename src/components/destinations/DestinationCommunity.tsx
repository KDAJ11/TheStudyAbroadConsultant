import { SectionFade } from '@/components/ui/SectionFade'
import { Badge } from '@/components/ui/Badge'
import { Users } from 'lucide-react'
import type { Destination } from '@/types'

interface DestinationCommunityProps {
  destination: Destination
}

export function DestinationCommunity({ destination }: DestinationCommunityProps) {
  return (
    <section className="bg-surface-2 py-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 mb-4">
              <Users className="w-7 h-7 text-sky-500" />
            </div>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Nigerian Students in {destination.name}
            </h2>
            <Badge variant="sky" className="mt-3">{destination.communitySize} Community</Badge>
          </div>
        </SectionFade>

        <SectionFade delay={0.1}>
          <p className="text-text-secondary text-body-lg text-center max-w-2xl mx-auto mb-8">
            {destination.community}
          </p>
        </SectionFade>

        <SectionFade delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {destination.communityFacts.map((fact) => (
              <span key={fact} className="px-4 py-2 rounded-pill bg-white border border-surface-4 text-text-secondary text-body-sm font-medium shadow-xs">
                {fact}
              </span>
            ))}
          </div>
        </SectionFade>
      </div>
    </section>
  )
}
