import { DestinationHero } from './DestinationHero'
import { DestinationStats } from './DestinationStats'
import { DestinationCommunity } from './DestinationCommunity'
import { DestinationCostTable } from './DestinationCostTable'
import { DestinationTimeline } from './DestinationTimeline'
import { CountryQuiz } from './CountryQuiz'
import { DestinationFAQ } from './DestinationFAQ'
import { RelatedDestinations } from './RelatedDestinations'
import { SectionFade } from '@/components/ui/SectionFade'
import { SITE } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'
import type { Destination } from '@/types'
import * as LucideIcons from 'lucide-react'

interface DestinationLayoutProps {
  destination: Destination
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp: LucideIcons.TrendingUp,
  DollarSign: LucideIcons.DollarSign,
  Briefcase: LucideIcons.Briefcase,
  Users: LucideIcons.Users,
  Building: LucideIcons.Building,
  GraduationCap: LucideIcons.GraduationCap,
  Award: LucideIcons.Award,
  Clock: LucideIcons.Clock,
  Globe: LucideIcons.Globe,
  Trophy: LucideIcons.Trophy,
  Lightbulb: LucideIcons.Lightbulb,
  BookOpen: LucideIcons.BookOpen,
  Heart: LucideIcons.Heart,
  Sun: LucideIcons.Sun,
}

export function DestinationLayout({ destination }: DestinationLayoutProps) {
  const breadcrumbs = [
    { name: 'Home', url: SITE.url },
    { name: 'Destinations', url: `${SITE.url}/destinations` },
    { name: destination.name, url: `${SITE.url}/destinations/${destination.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      <DestinationHero destination={destination} />
      <DestinationStats destination={destination} />

      {/* Why Choose Section */}
      <section className="bg-white py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <div className="text-center mb-12">
              <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Why {destination.name}</p>
              <h2 className="text-display-lg font-display font-bold text-navy-900">
                Why Nigerian Students Choose {destination.name}
              </h2>
            </div>
          </SectionFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.whyChoose.map((reason, i) => {
              const Icon = iconMap[reason.icon] || LucideIcons.CheckCircle
              return (
                <SectionFade key={reason.title} delay={i * 0.08}>
                  <div className="bg-surface-2 rounded-card p-6 h-full">
                    <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-sky-500" />
                    </div>
                    <h3 className="font-display font-semibold text-navy-900 text-body-lg mb-2">{reason.title}</h3>
                    <p className="text-text-secondary text-body-md">{reason.description}</p>
                  </div>
                </SectionFade>
              )
            })}
          </div>
        </div>
      </section>

      <DestinationCommunity destination={destination} />
      <DestinationCostTable destination={destination} />
      <DestinationTimeline destination={destination} />
      <CountryQuiz destination={destination} />
      <DestinationFAQ destination={destination} />

      {/* CTA before related */}
      <section className="bg-brand-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md font-display font-bold text-white">
            Ready to Study in {destination.name}?
          </h2>
          <p className="mt-3 text-white/90 text-body-lg">
            Your first consultation is free. Let&apos;s discuss your goals and create a plan.
          </p>
          <div className="mt-6">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-red font-display font-bold rounded-btn px-8 py-4 text-body-lg hover:scale-[1.02] transition-all min-h-[52px]"
            >
              Start Your Free Consultation
            </a>
          </div>
        </div>
      </section>

      <RelatedDestinations slugs={destination.relatedDestinations} />
    </>
  )
}
