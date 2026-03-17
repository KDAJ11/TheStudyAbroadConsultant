import { XCircle, CheckCircle, X, ShieldCheck } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

const painPoints = [
  'Visa rejection from documentation errors',
  'Months wasted on wrong universities',
  'Non-refundable fees with no guidance',
  'Missing scholarship deadlines',
  'No support after arrival',
]

const benefits = [
  'University matching by GPA, budget & goals',
  '98% visa success rate',
  'Pre-vetted universities with Nigerian communities',
  'Scholarship identification included',
  '3 months post-arrival support',
]

export function WhyNotDIY() {
  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <p className="text-label text-sky-500 uppercase tracking-widest mb-3">The Hard Truth</p>
          <h2 className="text-display-lg font-display font-bold text-navy-900 max-w-2xl">
            Most Students Who Apply Alone Get It Wrong.
          </h2>
        </SectionFade>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <SectionFade delay={0.1}>
            <div className="border-l-4 border-red-400 bg-red-50/50 rounded-card p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-body-lg">Going It Alone</h3>
              </div>
              <ul className="space-y-4">
                {painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-text-secondary text-body-md">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionFade>

          <SectionFade delay={0.2}>
            <div className="border-l-4 border-sky-500 bg-sky-50/50 rounded-card p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-sky-500" />
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-body-lg">With Our Team</h3>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
                    <span className="text-text-secondary text-body-md">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionFade>
        </div>

        <SectionFade delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-text-secondary text-body-lg mb-6">Stop guessing. Get expert guidance.</p>
            <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
              Start Free Consultation Today
            </Button>
          </div>
        </SectionFade>
      </div>
    </section>
  )
}
