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
  { quote: "I applied to 4 universities and got offers from 3. The visa interview prep was what made the difference — I walked into the embassy completely calm.", name: 'Emeka A.', city: 'Abuja', dest: 'University of Manitoba', flag: '🇨🇦', country: 'Canada' },
  { quote: "They got my WAEC and transcript documents right the first time. I had friends who paid for failed visa applications before finding this team.", name: 'Blessing O.', city: 'Lagos', dest: 'University of Essex', flag: '🇬🇧', country: 'UK' },
  { quote: "The Naira cost breakdown helped my parents understand exactly what we were committing to. No surprises.", name: 'Taiwo F.', city: 'Ibadan', dest: 'University of Limerick', flag: '🇮🇪', country: 'Ireland' },
  { quote: "My IELTS was 6.5 and they still found me three strong options in Canada.", name: 'Yusuf M.', city: 'Kano', dest: 'University of Regina', flag: '🇨🇦', country: 'Canada' },
  { quote: "They told me about a scholarship during the process. It covered 40% of my first year.", name: 'Adaeze N.', city: 'Enugu', dest: 'Griffith University', flag: '🇦🇺', country: 'Australia' },
  { quote: "10 months from first WhatsApp message to landing at Heathrow. Everything went to plan.", name: 'Chidi U.', city: 'Port Harcourt', dest: 'Nottingham Trent', flag: '🇬🇧', country: 'UK' },
  { quote: "I was worried about the blocked account process for Germany. They walked me through every step and I had it set up in 3 weeks.", name: 'Ngozi K.', city: 'Abuja', dest: 'TU Berlin', flag: '🇩🇪', country: 'Germany' },
  { quote: "After being rejected once on my own, I came to them. Second attempt — approved. The difference was in the document preparation.", name: 'Samuel E.', city: 'Lagos', dest: 'Arizona State University', flag: '🇺🇸', country: 'USA' },
  { quote: "They found me a university in Australia that offered a 30% scholarship. I didn't even know that was possible.", name: 'Aisha B.', city: 'Kano', dest: 'Deakin University', flag: '🇦🇺', country: 'Australia' },
]

const featuredStory = {
  name: 'Chidinma O.',
  from: 'Lagos, Nigeria',
  to: 'University of Manchester, UK',
  program: 'MSc Public Health',
  quote: "When I first messaged The Study Abroad Consultant on WhatsApp, I had a second-class upper from the University of Lagos, an IELTS score of 7.0, and absolutely no idea where to start. I knew I wanted to study Public Health abroad, but the process felt overwhelming — especially the financial requirements and visa documentation.",
  story: [
    "My consultant matched me with three UK universities, including Manchester, which had been my dream school. They helped me craft a personal statement that highlighted my volunteer work with a Lagos NGO, and guided me through the CAS letter process.",
    "The financial evidence was the hardest part. The 28-day bank statement rule was confusing, but my consultant mapped out exactly what I needed and when. I had to show £1,334 per month for 9 months plus my tuition deposit — about ₦28 million in total.",
    "I got my visa 3 weeks after biometrics. When I landed at Manchester Airport, I already had accommodation arranged and a list of Nigerian churches and supermarkets nearby. That first week would have been terrifying without the post-arrival support.",
    "I'm now halfway through my MSc and I've already been offered a research assistant position. Manchester has a strong Nigerian community and I feel completely at home. None of this would have happened if I'd tried to do it alone.",
  ],
}

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <p className="text-text-muted text-body-sm">{t.city} → {t.dest}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-body-sm text-text-secondary">{t.flag} {t.country}</span>
                  </div>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Journey */}
      <section className="bg-surface-2 py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <div className="text-center mb-8">
              <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Featured Journey</p>
              <h2 className="text-display-lg font-display font-bold text-navy-900">{featuredStory.name}&apos;s Story</h2>
              <p className="text-text-secondary text-body-md mt-2">{featuredStory.from} → {featuredStory.to} · {featuredStory.program}</p>
            </div>
          </SectionFade>

          <SectionFade delay={0.1}>
            <div className="bg-white rounded-card shadow-card p-8">
              <p className="text-text-secondary text-body-lg italic mb-6 border-l-4 border-sky-500 pl-4">&ldquo;{featuredStory.quote}&rdquo;</p>
              <div className="space-y-4">
                {featuredStory.story.map((p, i) => (
                  <p key={i} className="text-text-secondary text-body-md leading-relaxed">{p}</p>
                ))}
              </div>
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
