import type { Metadata } from 'next'
import { CheckCircle, ShieldCheck, Crown, GraduationCap, FileText, MessageSquare, ClipboardList, Home } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'
import { Button } from '@/components/ui/Button'
import { UrgencyCTABanner } from '@/components/sections/UrgencyCTABanner'
import { SITE } from '@/lib/constants'
import { webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Study Abroad Services | The Study Abroad Consultant Nigeria',
  description: 'End-to-end study abroad support for Nigerian students. University selection, application assistance, visa support, document preparation, interview coaching & post-arrival support.',
}

const tiers = [
  {
    name: 'Application Support',
    icon: FileText,
    popular: false,
    inclusions: [
      'University matching (3 options)',
      'Application document review',
      'Personal statement guidance',
      'Email support throughout',
      'Application submission support',
    ],
  },
  {
    name: 'Full Visa Package',
    icon: ShieldCheck,
    popular: true,
    inclusions: [
      'Everything in Application Support',
      'University matching (5 options)',
      'Complete visa documentation',
      'Financial evidence preparation',
      'Embassy interview coaching (2 sessions)',
      'Application tracking & updates',
      'Scholarship identification',
    ],
  },
  {
    name: 'Premium White Glove',
    icon: Crown,
    popular: false,
    inclusions: [
      'Everything in Full Visa Package',
      'Unlimited university options',
      'Priority response (same-day)',
      'Unlimited interview coaching',
      'Accommodation search assistance',
      'Pre-departure orientation',
      '3 months post-arrival support',
      'Airport pickup coordination',
    ],
  },
]

const serviceDetails = [
  { icon: GraduationCap, title: 'University Selection & Matching', description: 'We analyse your academic profile, budget, career goals, and personal preferences to match you with universities where you have the strongest chance of admission.' },
  { icon: FileText, title: 'Application & Documentation', description: 'Complete preparation of your application package including personal statements, reference letter guidance, and document authentication for Nigerian qualifications.' },
  { icon: ShieldCheck, title: 'Visa Application Support', description: 'End-to-end visa documentation with our 98% success rate methodology. Financial evidence structuring, form completion, and embassy-specific preparation.' },
  { icon: MessageSquare, title: 'Interview Coaching', description: 'Mock interview sessions tailored to each country\'s visa process. Specific preparation for US F-1 interviews, UK credibility interviews, and Canadian study permit requirements.' },
  { icon: ClipboardList, title: 'Scholarship Identification', description: 'We identify scholarship opportunities you qualify for and guide you through the application process to reduce your overall costs.' },
  { icon: Home, title: 'Post-Arrival Support', description: 'Accommodation guidance, bank account setup, local registration, and community connections for up to 3 months after you arrive at your destination.' },
]

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('Study Abroad Services', metadata.description as string, `${SITE.url}/services`)) }}
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            End-to-End Study Abroad Support — From Application to Arrival
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-2xl mx-auto">
            Choose the level of support that fits your needs. Every package includes expert guidance from our team of Nigerian study abroad specialists.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <SectionFade key={tier.name} delay={i * 0.1}>
                <div className={`bg-white rounded-card p-8 h-full flex flex-col ${tier.popular ? 'ring-2 ring-sky-500 shadow-card-hover relative' : 'border border-surface-4 shadow-sm'}`}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white text-body-sm font-semibold rounded-pill">
                      Most Popular
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center mb-4">
                    <tier.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <h3 className="font-display font-bold text-navy-900 text-display-sm mb-4">{tier.name}</h3>
                  <ul className="space-y-3 flex-1">
                    {tier.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                        <span className="text-text-secondary text-body-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-surface-4">
                    <p className="text-text-muted text-body-sm mb-4">Contact for pricing</p>
                    <Button variant={tier.popular ? 'primary' : 'secondary'} size="md" href={SITE.whatsapp} showWhatsAppIcon className="w-full">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="bg-surface-2 py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <h2 className="text-display-lg font-display font-bold text-navy-900 text-center mb-12">What&apos;s Included</h2>
          </SectionFade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDetails.map((s, i) => (
              <SectionFade key={s.title} delay={i * 0.08}>
                <div className="bg-white rounded-card p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 text-body-lg mb-2">{s.title}</h3>
                  <p className="text-text-secondary text-body-md">{s.description}</p>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* What If Rejected */}
      <section className="bg-white py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <div className="bg-surface-2 rounded-card p-8 text-center">
              <ShieldCheck className="w-12 h-12 text-sky-500 mx-auto mb-4" />
              <h2 className="text-display-md font-display font-bold text-navy-900 mb-4">What If My Visa Is Rejected?</h2>
              <p className="text-text-secondary text-body-lg mb-4">
                With a 98% visa success rate, rejection is rare. But if it happens, we review your case, identify the issue, and reapply at no additional consultation cost. We stand behind our work.
              </p>
              <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
                Discuss Your Situation
              </Button>
            </div>
          </SectionFade>
        </div>
      </section>

      <UrgencyCTABanner />
    </>
  )
}
