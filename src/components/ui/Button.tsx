'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MessageCircle } from 'lucide-react'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

const variants = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-hover shadow-cta-red hover:shadow-lg',
  secondary: 'bg-sky-500 text-white hover:bg-sky-600 shadow-cta-sky hover:shadow-lg',
  outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white',
  'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy-900',
  ghost: 'text-navy-900 hover:bg-surface-3',
  whatsapp: 'bg-brand-green text-white hover:brightness-110 shadow-cta-green hover:shadow-lg',
} as const

const sizes = {
  sm: 'px-4 py-2 text-body-sm min-h-[36px]',
  md: 'px-6 py-3 text-body-md min-h-[44px]',
  lg: 'px-8 py-4 text-body-lg min-h-[52px]',
} as const

type ButtonVariant = keyof typeof variants
type ButtonSize = keyof typeof sizes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  icon?: React.ReactNode
  showWhatsAppIcon?: boolean
  className?: string
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, icon, showWhatsAppIcon, className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 font-display font-semibold rounded-btn',
      'transition-all duration-250 ease-out',
      'hover:scale-[1.02] active:scale-[0.98]',
      'focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
      'cursor-pointer select-none',
      variants[variant],
      sizes[size],
      className
    )

    const content = (
      <>
        {showWhatsAppIcon && <MessageCircle className="w-5 h-5" />}
        {icon && !showWhatsAppIcon && icon}
        {children}
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
export type { ButtonVariant, ButtonSize }
