export function TrustBar() {
  const universities = [
    'University of Manchester',
    'University of Manitoba',
    'Trinity College Dublin',
    'Deakin University',
    'Arizona State University',
    'SRH University',
    'University of Limerick',
    'University of Waterloo',
  ]

  return (
    <section className="bg-surface-2 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-label text-text-muted uppercase tracking-widest text-center mb-6">
          Trusted by Students Admitted to
        </p>
      </div>

      {/* Desktop: static grid */}
      <div className="hidden md:block max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {universities.map((uni) => (
            <span
              key={uni}
              className="px-4 py-2 rounded-pill border border-surface-4 text-navy-900 text-body-sm font-medium bg-white"
            >
              {uni}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: marquee */}
      <div className="md:hidden relative">
        <div className="flex animate-[marquee_30s_linear_infinite] w-max">
          {[...universities, ...universities].map((uni, i) => (
            <span
              key={`${uni}-${i}`}
              className="mx-2 px-4 py-2 rounded-pill border border-surface-4 text-navy-900 text-body-sm font-medium bg-white whitespace-nowrap"
            >
              {uni}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
