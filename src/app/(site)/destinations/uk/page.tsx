import type { Metadata } from 'next'
import { getDestination } from '@/lib/destinations'
import { DestinationLayout } from '@/components/destinations/DestinationLayout'

const destination = getDestination('uk')!

export const metadata: Metadata = {
  title: destination.metaTitle,
  description: destination.metaDescription,
  openGraph: {
    title: destination.metaTitle,
    description: destination.metaDescription,
    url: `https://thestudyabroadconsultant.ca/destinations/uk`,
  },
}

export default function UKPage() {
  return <DestinationLayout destination={destination} />
}
