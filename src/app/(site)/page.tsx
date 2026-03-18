import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyNotDIY } from '@/components/sections/WhyNotDIY'
import { DestinationCards } from '@/components/sections/DestinationCards'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { LoanEligibilityChecker } from '@/components/sections/LoanEligibilityChecker'
import { localBusinessSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: "Nigeria's Most Trusted Study Abroad Consultant | UK, Canada, USA",
  description: "Expert guidance for Nigerian students studying in the UK, Canada, USA, Ireland, Germany & Australia. 700+ students placed. 98% visa success rate.",
  openGraph: {
    title: "Nigeria's Most Trusted Study Abroad Consultant",
    description: '700+ Nigerian students placed. 98% visa success rate.',
    url: 'https://thestudyabroadconsultant.ca',
    locale: 'en_NG',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <Hero />
      <TrustBar />
      <WhyNotDIY />
      <DestinationCards />
      <HowItWorks />
      <LoanEligibilityChecker />
      <BlogPreview />
    </>
  )
}
