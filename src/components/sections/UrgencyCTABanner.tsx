import { SITE } from '@/lib/constants'
import { SectionFade } from '@/components/ui/SectionFade'

export function UrgencyCTABanner() {
  return (
    <section className="bg-brand-red py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionFade>
          <h2 className="text-display-md font-display font-bold text-white">
            2025/2026 Intake Deadlines Are Approaching
          </h2>
          <p className="mt-4 text-white/90 text-body-lg max-w-2xl mx-auto">
            Most universities close applications 4–6 months before intake. Starting early dramatically increases your options.
          </p>
          <div className="mt-8">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-red font-display font-bold rounded-btn px-8 py-4 text-body-lg transition-all duration-250 hover:scale-[1.02] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red min-h-[52px]"
            >
              Secure Your Consultation Now
            </a>
          </div>
          <p className="mt-4 text-white/70 text-body-sm">
            Free initial consultation · Limited monthly slots
          </p>
        </SectionFade>
      </div>
    </section>
  )
}
