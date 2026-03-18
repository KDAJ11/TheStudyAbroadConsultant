'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionFadeProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}

export function SectionFade({ children, delay = 0, direction = 'up', className }: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const directionOffsets = {
    up: { y: 28, x: 0 },
    left: { y: 0, x: -28 },
    right: { y: 0, x: 28 },
    none: { y: 0, x: 0 },
  }

  const offset = directionOffsets[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: 'transform' }}
      initial={{
        opacity: 0,
        ...(prefersReducedMotion ? {} : { y: offset.y, x: offset.x }),
      }}
      animate={isInView ? {
        opacity: 1,
        ...(prefersReducedMotion ? {} : { y: 0, x: 0 }),
      } : {}}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}
