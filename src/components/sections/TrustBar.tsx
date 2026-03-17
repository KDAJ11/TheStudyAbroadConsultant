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
    'University of Birmingham',
    'Carleton University',
    'University College Dublin',
    'Griffith University',
  ]

  const doubled = [...universities, ...universities]

  return (
    <section className="bg-surface-2 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-label text-text-muted uppercase tracking-widest text-center mb-6">
          Trusted by Students Admitted to
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-3">
          {doubled.map((uni, i) => (
            <span
              key={`${uni}-${i}`}
              className="px-5 py-2 rounded-full border border-black/[0.12] text-navy-900 text-body-sm font-medium bg-white whitespace-nowrap transition-colors duration-200 hover:bg-navy-900 hover:text-white hover:border-navy-900 cursor-default select-none"
            >
              {uni}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: auto;
            max-width: 64rem;
            margin: 0 auto;
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  )
}
