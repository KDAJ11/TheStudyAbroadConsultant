import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'sky' | 'green' | 'red' | 'navy' | 'muted'
  className?: string
}

const variantStyles = {
  sky: 'bg-sky-500/15 text-sky-500 border-sky-400/30',
  green: 'bg-green-500/15 text-green-600 border-green-400/30',
  red: 'bg-red-500/15 text-red-600 border-red-400/30',
  navy: 'bg-navy-900/10 text-navy-900 border-navy-900/20',
  muted: 'bg-surface-3 text-text-secondary border-surface-4',
}

export function Badge({ children, variant = 'sky', className }: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-badge border text-body-sm font-medium',
          variantStyles[variant],
          className
        )
      )}
    >
      {children}
    </span>
  )
}
