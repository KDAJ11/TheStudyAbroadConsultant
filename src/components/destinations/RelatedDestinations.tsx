import Link from 'next/link'
import { SectionFade } from '@/components/ui/SectionFade'
import { ArrowRight } from 'lucide-react'
import { destinations } from '@/lib/destinations'

interface RelatedDestinationsProps {
  slugs: string[]
}

export function RelatedDestinations({ slugs }: RelatedDestinationsProps) {
  const related = slugs.map(slug => destinations[slug]).filter(Boolean)

  return (
    <section className="bg-white py-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <h2 className="text-display-md font-display font-bold text-navy-900 text-center mb-8">
            Also Consider
          </h2>
        </SectionFade>

        <div className="grid sm:grid-cols-2 gap-6">
          {related.map((dest, i) => (
            <SectionFade key={dest.slug} delay={i * 0.1}>
              <Link href={`/destinations/${dest.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-card min-h-[180px]">
                  <div className="absolute inset-0" style={{ background: dest.gradient }} />
                  {dest.slug === 'ireland' && <div className="absolute inset-0 bg-navy-900/40" />}
                  <span className="absolute top-4 right-4 text-4xl opacity-60" aria-hidden="true">{dest.flag}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-display font-bold text-white text-display-sm mb-1">{dest.name}</h3>
                    <p className="text-white/80 text-body-sm">{dest.keyStat}</p>
                    <span className="inline-flex items-center gap-1 text-white/60 text-body-sm mt-2 group-hover:text-white transition-colors">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-card ring-0 group-hover:ring-2 ring-sky-400/40 transition-all duration-300" />
                </div>
              </Link>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
