import type { Metadata } from 'next'
import { getDestination } from '@/lib/destinations'
import { DestinationLayout } from '@/components/destinations/DestinationLayout'

const destination = getDestination('canada')!

export const metadata: Metadata = {
  title: destination.metaTitle,
  description: destination.metaDescription,
  openGraph: {
    title: destination.metaTitle,
    description: destination.metaDescription,
    url: `https://thestudyabroadconsultant.ca/destinations/canada`,
  },
}

export default function CanadaPage() {
  return <DestinationLayout destination={destination} />
}
