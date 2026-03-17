import type { Metadata } from 'next'
import { getDestination } from '@/lib/destinations'
import { DestinationLayout } from '@/components/destinations/DestinationLayout'

const destination = getDestination('ireland')!

export const metadata: Metadata = {
  title: destination.metaTitle,
  description: destination.metaDescription,
  openGraph: {
    title: destination.metaTitle,
    description: destination.metaDescription,
    url: `https://thestudyabroadconsultant.ca/destinations/ireland`,
  },
}

export default function IrelandPage() {
  return <DestinationLayout destination={destination} />
}
