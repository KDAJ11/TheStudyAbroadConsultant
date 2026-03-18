import { SectionFade } from '@/components/ui/SectionFade'

const testimonials = [
  {
    quote: "I wanted to take a moment to express my heartfelt gratitude for the assistance you provided my son, during the admission process at the University of Manitoba. Your guidance and support were invaluable, and we are truly grateful for your help. Your professionalism and expertise made a significant difference in our experience.",
    name: 'Mrs. O',
    date: 'Oct 2025',
    destination: 'University of Manitoba',
    flag: '🇨🇦',
    country: 'Canada',
  },
  {
    quote: "My admission and loan process was handled smoothly and faster than I expected. I really appreciate the support. Highly recommend.",
    name: 'Gift',
    date: 'Mar 2026',
    destination: '',
    flag: '',
    country: '',
  },
  {
    quote: "The Study Abroad Consultant handled my admission and loan process very efficiently. Everything was smooth and completed within a short time. I truly appreciate the support and will definitely refer others.",
    name: 'Adepoju O.',
    date: 'Mar 2022',
    destination: '',
    flag: '',
    country: '',
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
                  <p className="text-text-muted text-body-sm">{t.date}{t.destination ? ` · ${t.destination}` : ''}</p>
                  {t.flag && t.country && (
                    <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-badge bg-surface-3 text-body-sm font-medium text-text-secondary">
                      {t.flag} {t.country}
                    </span>
                  )}
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
                  <p className="text-text-muted text-body-sm">{t.date}{t.destination ? ` · ${t.destination}` : ''}</p>
                  {t.flag && t.country && (
                    <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-badge bg-surface-3 text-body-sm font-medium text-text-secondary">
                      {t.flag} {t.country}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
