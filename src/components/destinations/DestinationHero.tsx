import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SITE } from '@/lib/constants'
import type { Destination } from '@/types'

interface DestinationHeroProps {
  destination: Destination
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0" style={{ background: destination.gradient }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden="true">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
      {destination.slug === 'ireland' && <div className="absolute inset-0 bg-navy-900/40" />}
      <span className="absolute top-8 right-8 text-8xl opacity-60 hidden lg:block" aria-hidden="true">
        {destination.flag}
      </span>
      <div className="relative z-10 w-full pb-16 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="sky" className="mb-4">
            {destination.visaSuccess} Visa Success Rate
          </Badge>
          <h1 className="text-display-2xl font-display font-bold text-white max-w-4xl">
            {destination.h1}
          </h1>
          <p className="mt-4 text-white/80 text-body-xl max-w-2xl">
            Expert guidance for Nigerian students. {destination.visaSuccess} visa success rate. Full Naira cost breakdown included.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
              Start Your {destination.name} Application
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
