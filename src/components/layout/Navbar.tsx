'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/blog', label: 'Blog' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const isHome = pathname === '/'
  const showTransparent = isHome && !isScrolled

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-btn focus:font-display focus:font-semibold"
      >
        Skip to main content
      </a>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showTransparent
            ? 'bg-transparent'
            : 'bg-white/98 backdrop-blur-sm shadow-nav'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link
              href="/"
              className={`font-display font-semibold text-lg tracking-tight transition-colors ${
                showTransparent ? 'text-white' : 'text-navy-900'
              }`}
            >
              The Study Abroad<br className="sm:hidden" /> Consultant
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-body-sm font-medium rounded-btn transition-colors relative ${
                      showTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-text-secondary hover:text-navy-900'
                    } ${isActive ? (showTransparent ? 'text-white' : 'text-navy-900') : ''}`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-500 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="hidden lg:block">
              <Button variant="primary" size="sm" href={SITE.whatsapp} showWhatsAppIcon>
                Free Consultation
              </Button>
            </div>

            <button
              className={`lg:hidden p-2 rounded-btn transition-colors ${
                showTransparent ? 'text-white' : 'text-navy-900'
              }`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy-900 lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pt-[72px]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-white text-display-sm font-display hover:text-sky-300 transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
                className="mt-4"
              >
                <Button variant="whatsapp" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
