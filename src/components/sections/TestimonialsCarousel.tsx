import { SectionFade } from '@/components/ui/SectionFade'

const testimonials = [
  {
    quote: "I applied to 4 universities and got offers from 3. The visa interview prep was what made the difference — I walked into the embassy completely calm.",
    name: 'Emeka A.',
    city: 'Abuja',
    destination: 'University of Manitoba',
    flag: '🇨🇦',
    country: 'Canada',
  },
  {
    quote: "They got my WAEC and transcript documents right the first time. I had friends who paid for failed visa applications before finding this team.",
    name: 'Blessing O.',
    city: 'Lagos',
    destination: 'University of Essex',
    flag: '🇬🇧',
    country: 'UK',
  },
  {
    quote: "The Naira cost breakdown helped my parents understand exactly what we were committing to. No surprises.",
    name: 'Taiwo F.',
    city: 'Ibadan',
    destination: 'University of Limerick',
    flag: '🇮🇪',
    country: 'Ireland',
  },
  {
    quote: "My IELTS was 6.5 and they still found me three strong options in Canada.",
    name: 'Yusuf M.',
    city: 'Kano',
    destination: 'University of Regina',
    flag: '🇨🇦',
    country: 'Canada',
  },
  {
    quote: "They told me about a scholarship during the process. It covered 40% of my first year.",
    name: 'Adaeze N.',
    city: 'Enugu',
    destination: 'Griffith University',
    flag: '🇦🇺',
    country: 'Australia',
  },
  {
    quote: "10 months from first WhatsApp message to landing at Heathrow. Everything went to plan.",
    name: 'Chidi U.',
    city: 'Port Harcourt',
    destination: 'Nottingham Trent',
    flag: '🇬🇧',
    country: 'UK',
  },
]

export function TestimonialsCarousel() {
  return (
    <section className="bg-surface-2 py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Student Stories</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Hear From Our Students
            </h2>
          </div>
        </SectionFade>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <SectionFade key={t.name} delay={i * 0.08}>
              <div className="bg-white rounded-card shadow-card p-6 h-full flex flex-col">
                <span className="text-6xl text-sky-100 font-display leading-none select-none" aria-hidden="true">&ldquo;</span>
                <p className="text-text-secondary text-body-md italic mt-2 flex-1">{t.quote}</p>
                <div className="mt-6 pt-4 border-t border-surface-4">
                  <p className="font-display font-semibold text-navy-900 text-body-md">{t.name}</p>
                  <p className="text-text-muted text-body-sm">{t.city} → {t.destination}</p>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-badge bg-surface-3 text-body-sm font-medium text-text-secondary">
                    {t.flag} {t.country}
                  </span>
                </div>
              </div>
            </SectionFade>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-card shadow-card p-6 min-w-[300px] w-[85vw] snap-center shrink-0 flex flex-col"
              >
                <span className="text-5xl text-sky-100 font-display leading-none select-none" aria-hidden="true">&ldquo;</span>
                <p className="text-text-secondary text-body-md italic mt-2 flex-1">{t.quote}</p>
                <div className="mt-4 pt-4 border-t border-surface-4">
                  <p className="font-display font-semibold text-navy-900 text-body-sm">{t.name}</p>
                  <p className="text-text-muted text-body-sm">{t.city} → {t.destination}</p>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-badge bg-surface-3 text-body-sm font-medium text-text-secondary">
                    {t.flag} {t.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
