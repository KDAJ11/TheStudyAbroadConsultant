import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { faqSchema } from '@/lib/schema'
import type { Destination } from '@/types'

interface DestinationFAQProps {
  destination: Destination
}

export function DestinationFAQ({ destination }: DestinationFAQProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(destination.faqs)) }}
      />
      <FAQAccordion
        faqs={destination.faqs}
        title={`${destination.name} FAQ for Nigerian Students`}
        className="bg-surface-2"
      />
    </>
  )
}
