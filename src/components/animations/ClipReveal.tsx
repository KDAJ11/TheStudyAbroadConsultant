'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface ClipRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** Override direction: default 'up', also supports 'left' and 'right' */
  direction?: 'up' | 'left' | 'right'
}

/**
 * ClipReveal — the global scroll-reveal animation wrapper.
 *
 * Wraps children in an overflow:hidden container.
 * Child animates: initial { y: 40, opacity: 0 } → whileInView { y: 0, opacity: 1 }
 * Uses expo ease-out [0.16, 1, 0.3, 1] for cinematic, trust-building motion.
 *
 * Reduced motion: renders children directly with no animation.
 */
export function ClipReveal({ children, delay = 0, className, direction = 'up' }: ClipRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const offsets = {
    up: { x: 0, y: 40 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
  }

  const offset = offsets[direction]

  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <motion.div
        initial={{ opacity: 0, x: offset.x, y: offset.y }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ willChange: 'transform' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
