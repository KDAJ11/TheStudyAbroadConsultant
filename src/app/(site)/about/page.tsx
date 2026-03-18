import type { Metadata } from 'next'
import { CheckCircle, Heart, Settings, Globe } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'
import { CounterStat } from '@/components/ui/CounterStat'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'
import { webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About Us | The Study Abroad Consultant Nigeria — 10+ Years, 700+ Students',
  description: "Learn about Nigeria's most trusted study abroad consultancy. 10+ years helping Nigerian students achieve their international education goals with a 98% visa success rate.",
}

const values = [
  { icon: Heart, title: 'Honesty First', description: "We only take clients we genuinely believe we can help. If a destination or program isn't right for you, we'll tell you." },
  { icon: Settings, title: 'Systematic Process', description: 'Every student follows our proven 24-week process. No shortcuts, no guesswork — just methodical, expert guidance.' },
  { icon: Globe, title: 'Nigeria-Specific Expertise', description: 'We understand WAEC, NYSC, CBN forex requirements, and every unique challenge Nigerian students face.' },
]

const differentiators = [
  'Nigeria-only specialisation — we know the challenges you face',
  'CBN forex, NYSC, and WAEC expertise built into every process',
  'Direct relationships with university admission staff',
  '98% visa success rate across all destinations',
  'We only take clients we can genuinely help',
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('About Us', metadata.description as string, `${SITE.url}/about`)) }}
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            10+ Years Helping Nigerian Students Reach the World
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-2xl mx-auto">
            We started because too many Nigerian students were getting rejected — not because they weren&apos;t qualified, but because they didn&apos;t have the right guidance.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-white py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <div className="prose-like">
              <p className="text-text-secondary text-body-lg leading-relaxed">
                The Study Abroad Consultant was founded with a simple mission: to give every qualified Nigerian student a fair shot at international education. Too many talented young Nigerians were losing money to failed visa applications, choosing the wrong universities, and navigating complex processes without expert support.
              </p>
              <p className="text-text-secondary text-body-lg leading-relaxed mt-4">
                Over the past decade, we&apos;ve helped over 700 students secure admission and visas to universities across 6 countries. Our 98% visa success rate isn&apos;t luck — it&apos;s the result of deep expertise, systematic processes, and relationships with university admission offices built over years.
              </p>
              <p className="text-text-secondary text-body-lg leading-relaxed mt-4">
                Today, we remain focused on what we do best: helping Nigerian students — and only Nigerian students — navigate the entire study abroad journey from first consultation to first day on campus.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Stat Bar */}
      <section className="bg-surface-2 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <CounterStat value={700} suffix="+" label="Students Placed" />
            <CounterStat value={98} suffix="%" label="Visa Success Rate" />
            <CounterStat value={50} suffix="+" label="Partner Universities" />
            <CounterStat value={10} suffix="+" label="Years of Excellence" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <h2 className="text-display-lg font-display font-bold text-navy-900 text-center mb-12">Our Values</h2>
          </SectionFade>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <SectionFade key={v.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-sky-500" />
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 text-body-lg mb-2">{v.title}</h3>
                  <p className="text-text-secondary text-body-md">{v.description}</p>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="bg-surface-2 py-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <div className="bg-white rounded-card shadow-card p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-navy-900/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-display font-bold text-navy-900">TSA</span>
              </div>
              <h3 className="font-display font-semibold text-navy-900 text-display-sm">The Study Abroad Consultant Team</h3>
              <p className="text-text-secondary text-body-md mt-2 max-w-lg mx-auto">
                Our team of experienced education consultants specialises exclusively in helping Nigerian students navigate the study abroad process. Every team member has first-hand international education experience.
              </p>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-white py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <h2 className="text-display-lg font-display font-bold text-navy-900 text-center mb-10">What Sets Us Apart</h2>
          </SectionFade>
          <div className="space-y-4">
            {differentiators.map((d, i) => (
              <SectionFade key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-sky-500 mt-1 shrink-0" />
                  <p className="text-text-secondary text-body-lg">{d}</p>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md font-display font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="mt-3 text-white/90 text-body-lg">Your first consultation is free. No pressure, no commitment.</p>
          <div className="mt-6">
            <Button variant="outline-white" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
              Start Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
