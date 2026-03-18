'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  {
    label: 'Resources',
    children: [
      { href: '/scholarships', label: 'Scholarships' },
      { href: '/blog', label: 'Blog' },
      { href: '/success-stories', label: 'Success Stories' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

type NavLink = (typeof navLinks)[number]

function isDropdown(link: NavLink): link is Extract<NavLink, { children: readonly { href: string; label: string }[] }> {
  return 'children' in link
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setResourcesOpen(false)
    setMobileResourcesOpen(false)
  }, [pathname])

  // Body scroll lock
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Escape key to close drawer
  useEffect(() => {
    if (!isMobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileOpen])

  // Focus trap inside drawer
  useEffect(() => {
    if (!isMobileOpen || !drawerRef.current) return
    // Focus the close button on open
    const timer = setTimeout(() => closeButtonRef.current?.focus(), 50)

    const drawer = drawerRef.current
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusables = drawer.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleTab)
    }
  }, [isMobileOpen])

  // Click outside dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showTransparent = !isScrolled

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false)
    setMobileResourcesOpen(false)
  }, [])

  // Drawer animation variants
  const scrimVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  }

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.15 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  }

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          prefersReducedMotion ? 'duration-0' : 'duration-300'
        } ${
          showTransparent
            ? 'bg-transparent'
            : 'bg-white/98 backdrop-blur-sm shadow-nav'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link
              href="/"
              aria-label="The Study Abroad Consultant - Home"
              className={`font-display font-semibold text-lg tracking-tight transition-colors ${
                showTransparent ? 'text-white' : 'text-navy-900'
              }`}
            >
              The Study Abroad<br className="sm:hidden" /> Consultant
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (isDropdown(link)) {
                  const isChildActive = link.children.some(
                    (child) => pathname === child.href || pathname.startsWith(child.href + '/')
                  )
                  return (
                    <div key={link.label} className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setResourcesOpen(!resourcesOpen)}
                        onMouseEnter={() => setResourcesOpen(true)}
                        aria-expanded={resourcesOpen}
                        aria-haspopup="true"
                        aria-label="Resources menu"
                        className={`flex items-center gap-1 px-3 py-2 text-body-sm font-medium rounded-btn transition-colors cursor-pointer ${
                          showTransparent
                            ? 'text-white/80 hover:text-white'
                            : 'text-text-secondary hover:text-navy-900'
                        } ${isChildActive ? (showTransparent ? 'text-white' : 'text-navy-900') : ''}`}
                      >
                        {link.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {resourcesOpen && (
                        <div
                          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-btn shadow-card border border-surface-4 py-2 z-50"
                          onMouseLeave={() => setResourcesOpen(false)}
                          role="menu"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className="block px-4 py-2.5 text-body-sm text-text-secondary hover:text-navy-900 hover:bg-surface-2 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

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

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a Consultation on WhatsApp"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold text-body-sm px-5 py-2.5 min-h-[40px] bg-navy-900 text-white rounded-[4px] transition-all duration-200 hover:bg-navy-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Book a Consultation
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className={`lg:hidden p-2 rounded-btn transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Scrim */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              variants={scrimVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed right-0 top-0 h-full w-[80vw] max-w-[320px] z-50 bg-navy-900 lg:hidden overflow-y-auto"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 200, damping: 28 }
              }
              style={{ willChange: 'transform' }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[72px]">
                <span className="font-display font-semibold text-lg text-white tracking-tight">
                  The Study Abroad<br className="sm:hidden" /> Consultant
                </span>
                <button
                  ref={closeButtonRef}
                  onClick={closeMobile}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-btn text-white hover:text-sky-300 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-white/15" />

              {/* Nav links */}
              <div className="py-4">
                {navLinks.map((link, index) => {
                  if (isDropdown(link)) {
                    return (
                      <motion.div
                        key={link.label}
                        custom={index}
                        variants={prefersReducedMotion ? undefined : linkVariants}
                        initial={prefersReducedMotion ? undefined : 'hidden'}
                        animate={prefersReducedMotion ? undefined : 'visible'}
                      >
                        <button
                          onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                          aria-expanded={mobileResourcesOpen}
                          aria-label="Resources menu"
                          className="flex items-center justify-between w-full py-4 px-6 text-white text-body-lg font-display font-medium hover:text-sky-300 transition-colors cursor-pointer"
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              mobileResourcesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileResourcesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block py-3 px-10 text-white/70 text-body-md font-display hover:text-sky-300 transition-colors"
                                  onClick={closeMobile}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={link.href}
                      custom={index}
                      variants={prefersReducedMotion ? undefined : linkVariants}
                      initial={prefersReducedMotion ? undefined : 'hidden'}
                      animate={prefersReducedMotion ? undefined : 'visible'}
                    >
                      <Link
                        href={link.href}
                        className="block py-4 px-6 text-white text-body-lg font-display font-medium hover:text-sky-300 transition-colors"
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-white/15" />

              {/* CTA button */}
              <motion.div
                className="px-6 py-6"
                custom={navLinks.length}
                variants={prefersReducedMotion ? undefined : linkVariants}
                initial={prefersReducedMotion ? undefined : 'hidden'}
                animate={prefersReducedMotion ? undefined : 'visible'}
              >
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a Consultation on WhatsApp"
                  className="flex items-center justify-center w-full font-display font-semibold text-body-lg px-8 py-4 min-h-[52px] bg-brand-red text-white rounded-[4px] transition-all duration-200 hover:bg-brand-red-hover"
                  onClick={closeMobile}
                >
                  Book a Consultation
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
