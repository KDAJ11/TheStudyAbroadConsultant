'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CounterStatProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export function CounterStat({ value, suffix = '', prefix = '', label }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setCount(value)
      return
    }

    const duration = 2000
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, prefersReducedMotion])

  return (
    <div ref={ref} className="text-center min-w-[140px]">
      <div className="font-display font-bold text-display-md text-navy-900">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-body-sm text-text-secondary mt-1">{label}</div>
    </div>
  )
}
