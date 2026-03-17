'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'

export function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-brand-green text-white shadow-cta-green hover:brightness-110 transition-all duration-200"
      >
        <span className="absolute inset-0 rounded-full bg-brand-green animate-[pulse-ring_3.5s_ease-out_infinite]" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-btn bg-navy-900 text-white text-body-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          Chat with us
        </span>
      </a>
    </motion.div>
  )
}
