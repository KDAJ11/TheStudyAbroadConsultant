'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </LazyMotion>
  )
}
