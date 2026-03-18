import type { Metadata } from 'next'
import { SectionFade } from '@/components/ui/SectionFade'
import { CounterStat } from '@/components/ui/CounterStat'
import { SITE } from '@/lib/constants'
import { webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: "Success Stories | 700+ Nigerian Students Placed Abroad",
  description: "Read how 700+ Nigerian students achieved their study abroad dreams. Real stories from students now studying in the UK, Canada, USA, Ireland, Germany & Australia.",
}

const distribution = [
  { country: 'Canada', pct: 35, color: 'bg-red-500' },
  { country: 'UK', pct: 28, color: 'bg-blue-700' },
  { country: 'USA', pct: 15, color: 'bg-blue-900' },
  { country: 'Australia', pct: 10, color: 'bg-green-600' },
  { country: 'Ireland', pct: 8, color: 'bg-emerald-500' },
  { country: 'Germany', pct: 4, color: 'bg-yellow-600' },
]

const testimonials = [
  {
    quote: "I wanted to take a moment to express my heartfelt gratitude for the assistance you provided my son, during the admission process at the University of Manitoba. Your guidance and support were invaluable, and we are truly grateful for your help. Your professionalism and expertise made a significant difference in our experience, and we appreciate the time you took to ensure everything went smoothly. Your dedication to helping students achieve their academic goals is truly commendable.",
    name: 'Mrs. O',
    date: 'Oct 2025',
    dest: 'University of Manitoba',
    flag: '🇨🇦',
    country: 'Canada',
  },
  {
    quote: "My admission and loan process was handled smoothly and faster than I expected. I really appreciate the support. Highly recommend.",
    name: 'Gift',
    date: 'Mar 2026',
    dest: '',
    flag: '',
    country: '',
  },
  {
    quote: "The Study Abroad Consultant handled my admission and loan process very efficiently. Everything was smooth and completed within a short time. I truly appreciate the support and will definitely refer others.",
    name: 'Adepoju O.',
    date: 'Mar 2022',
    dest: '',
    flag: '',
    country: '',
  },
]

export default function SuccessStoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('Success Stories', metadata.description as string, `${SITE.url}/success-stories`)) }}
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            700+ Nigerian Students. 6 Countries. Futures Transformed.
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-2xl mx-auto">
            Real stories from Nigerian students who trusted us with their study abroad journey.
          </p>
        </div>
      </section>

      {/* Stat Bar */}
      <section className="bg-white py-12 border-b border-surface-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <CounterStat value={700} suffix="+" label="Students Placed" />
            <CounterStat value={98} suffix="%" label="Visa Success Rate" />
            <CounterStat value={6} label="Countries" />
            <CounterStat value={50} suffix="+" label="Universities" />
          </div>
        </div>
      </section>

      {/* Country Distribution */}
      <section className="bg-surface-2 py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <h2 className="text-display-md font-display font-bold text-navy-900 text-center mb-8">Where Our Students Go</h2>
          </SectionFade>
          <div className="space-y-4">
            {distribution.map((d, i) => (
              <SectionFade key={d.country} delay={i * 0.08}>
                <div className="flex items-center gap-4">
                  <span className="font-display font-medium text-navy-900 w-24 text-body-sm">{d.country}</span>
                  <div className="flex-1 h-8 bg-surface-4 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full transition-all duration-1000`} style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="font-display font-semibold text-navy-900 w-12 text-right text-body-sm">{d.pct}%</span>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-white py-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <h2 className="text-display-lg font-display font-bold text-navy-900 text-center mb-12">In Their Own Words</h2>
          </SectionFade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <SectionFade key={t.name} delay={i * 0.06}>
                <div className="bg-white rounded-card shadow-card p-6 h-full flex flex-col border border-surface-4">
                  <span className="text-5xl text-sky-100 font-display leading-none select-none" aria-hidden="true">&ldquo;</span>
                  <p className="text-text-secondary text-body-md italic mt-2 flex-1">{t.quote}</p>
                  <div className="mt-4 pt-4 border-t border-surface-4">
                    <p className="font-display font-semibold text-navy-900 text-body-sm">{t.name}</p>
                    <p className="text-text-muted text-body-sm">{t.date}{t.dest ? ` · ${t.dest}` : ''}</p>
                    {t.flag && t.country && (
                      <span className="inline-flex items-center gap-1 mt-1 text-body-sm text-text-secondary">{t.flag} {t.country}</span>
                    )}
                  </div>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof CTA — directs users to socials for more reviews */}
      <section className="bg-surface-2 py-section">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionFade>
            <h2 className="text-display-md font-display font-bold text-navy-900 mb-3">See More Reviews From Our Students</h2>
            <p className="text-text-secondary text-body-lg mb-8">Follow us on social media for the latest success stories, student updates, and study abroad tips.</p>
            <div className="flex items-center justify-center gap-5">
              <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="inline-flex items-center gap-2 bg-white border border-surface-4 rounded-btn px-5 py-3 text-navy-900 font-display font-semibold text-body-sm shadow-card hover:shadow-lg hover:scale-[1.02] transition-all min-h-[44px]">
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                Facebook
              </a>
              <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="inline-flex items-center gap-2 bg-white border border-surface-4 rounded-btn px-5 py-3 text-navy-900 font-display font-semibold text-body-sm shadow-card hover:shadow-lg hover:scale-[1.02] transition-all min-h-[44px]">
                <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123s-.012 3.056-.06 4.122c-.049 1.064-.218 1.791-.465 2.428a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.122-.06c-1.064-.049-1.791-.218-2.428-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                Instagram
              </a>
              <a href={SITE.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="inline-flex items-center gap-2 bg-white border border-surface-4 rounded-btn px-5 py-3 text-navy-900 font-display font-semibold text-body-sm shadow-card hover:shadow-lg hover:scale-[1.02] transition-all min-h-[44px]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48 6.3 6.3 0 001.86-4.49V8.74a8.26 8.26 0 004.84 1.55V6.84a4.84 4.84 0 01-1.12-.15z" /></svg>
                TikTok
              </a>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* Your Story CTA */}
      <section className="bg-brand-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display-md font-display font-bold text-white">Your Story Could Be Next</h2>
          <p className="mt-3 text-white/90 text-body-lg">Join 700+ Nigerian students who turned their study abroad dream into reality.</p>
          <div className="mt-6">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-brand-red font-display font-bold rounded-btn px-8 py-4 text-body-lg hover:scale-[1.02] transition-all min-h-[52px]">
              Start Your Story Today
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
