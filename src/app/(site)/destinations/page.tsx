import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionFade } from '@/components/ui/SectionFade'
import { getAllDestinations } from '@/lib/destinations'
import { webPageSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Study Abroad Destinations for Nigerian Students | UK, Canada, USA & More',
  description: 'Explore study abroad destinations for Nigerian students. Compare costs in Naira, visa requirements, and post-study work options for UK, Canada, USA, Ireland, Germany & Australia.',
}

export default function DestinationsPage() {
  const destinations = getAllDestinations()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('Study Abroad Destinations', metadata.description as string, `${SITE.url}/destinations`)) }}
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            Where Will You Study?
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-2xl mx-auto">
            Compare study abroad destinations for Nigerian students. Full Naira cost breakdowns, visa guides, and expert support for every country.
          </p>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <SectionFade key={dest.slug} delay={i * 0.08}>
                <Link href={`/destinations/${dest.slug}`} className="group relative block overflow-hidden rounded-card min-h-[280px]">
                  <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]" style={{ background: dest.gradient }} />
                  {dest.slug === 'ireland' && <div className="absolute inset-0 bg-navy-900/40" />}
                  <span className="absolute top-4 right-4 text-5xl opacity-60 transition-transform duration-300 group-hover:-translate-y-1.5" aria-hidden="true">{dest.flag}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h2 className="font-display font-bold text-white text-display-sm mb-1">{dest.name}</h2>
                    <p className="text-white/80 text-body-sm">{dest.keyStat}</p>
                    <p className="text-white/60 text-body-sm mt-1">{dest.visaSuccess} visa success rate</p>
                  </div>
                  <div className="absolute inset-0 rounded-card ring-0 group-hover:ring-2 ring-sky-400/40 transition-all duration-300" />
                </Link>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
