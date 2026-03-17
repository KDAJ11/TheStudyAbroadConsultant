import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyNotDIY } from '@/components/sections/WhyNotDIY'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { DestinationCards } from '@/components/sections/DestinationCards'
import { CountryComparison } from '@/components/sections/CountryComparison'
import { EligibilityQuiz } from '@/components/sections/EligibilityQuiz'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { UrgencyCTABanner } from '@/components/sections/UrgencyCTABanner'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { localBusinessSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: "Nigeria's Most Trusted Study Abroad Consultant | UK, Canada, USA",
  description: "Expert guidance for Nigerian students studying in the UK, Canada, USA, Ireland, Germany & Australia. 1,000+ students placed. 98% visa success rate. Free consultation.",
  openGraph: {
    title: "Nigeria's Most Trusted Study Abroad Consultant",
    description: '1,000+ Nigerian students placed. 98% visa success rate.',
    url: 'https://thestudyabroadconsultant.ca',
    locale: 'en_NG',
    type: 'website',
  },
}

const homeFAQs = [
  {
    question: 'Can I study abroad from Nigeria with WAEC?',
    answer: "Yes — many countries accept WAEC for foundation/pathway programs, and some universities accept WAEC for direct entry. The UK, Canada, Ireland, and Germany all have pathways for WAEC holders.",
  },
  {
    question: 'What is the proof of funds for a Canada student visa from Nigeria?',
    answer: "You need to show at least CAD 10,000 (approx. ₦11 million) in addition to your first year's tuition. The funds must be in a bank account for at least 3-6 months (seasoned funds). CBN documentation is required for Nigerian applicants.",
  },
  {
    question: 'How much is a blocked account for Germany from Nigeria?',
    answer: 'The blocked account for a Germany student visa requires a minimum of EUR 11,904 (approximately ₦20.8 million at current rates). This must be deposited into a German blocked account provider (e.g., Deutsche Bank, Fintiba, or Expatrio) before applying for your visa.',
  },
  {
    question: 'What is the minimum IELTS score for a Canada student visa?',
    answer: 'Most Canadian universities require an overall IELTS score of 6.0-6.5, with no band below 6.0. Some universities accept scores as low as 5.5 with conditions. Your required score depends on your specific program and institution.',
  },
  {
    question: 'Do Nigerian students need an APS certificate for Germany?',
    answer: 'No. Unlike students from India and China, Nigerian students do NOT require an APS (Academic Evaluation Centre) certificate to apply to German universities. Nigerian applicants apply directly with their original academic documents, duly authenticated by the relevant Nigerian authorities.',
  },
  {
    question: 'How long does a UK student visa take from Nigeria?',
    answer: 'A UK student visa typically takes approximately 3 weeks from your biometrics appointment in Nigeria. We recommend applying at least 3 months before your course start date to allow for any delays.',
  },
  {
    question: 'What is the Ireland Stay Back Visa for Nigerian students?',
    answer: "The Irish Graduate Permission (formerly Stay Back Visa) allows international students who graduate from an Irish higher education institution to remain in Ireland to seek graduate-level employment. Master's graduates receive 2 years; Bachelor's graduates receive 1 year. This is extendable with a job offer.",
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFAQs)) }}
      />
      <Hero />
      <TrustBar />
      <WhyNotDIY />
      <ServicesGrid />
      <DestinationCards />
      <CountryComparison />
      <EligibilityQuiz />
      <ProcessTimeline />
      <TestimonialsCarousel />
      <UrgencyCTABanner />
      <BlogPreview />
      <FAQAccordion
        faqs={homeFAQs}
        title="Frequently Asked Questions"
        subtitle="Common questions from Nigerian students about studying abroad"
        className="bg-surface-2"
      />
    </>
  )
}
