import type { Metadata } from 'next'
import { getDestination } from '@/lib/destinations'
import { DestinationLayout } from '@/components/destinations/DestinationLayout'

const destination = getDestination('usa')!

export const metadata: Metadata = {
  title: destination.metaTitle,
  description: destination.metaDescription,
  openGraph: {
    title: destination.metaTitle,
    description: destination.metaDescription,
    url: `https://thestudyabroadconsultant.ca/destinations/usa`,
  },
}

export default function USAPage() {
  return <DestinationLayout destination={destination} />
}
