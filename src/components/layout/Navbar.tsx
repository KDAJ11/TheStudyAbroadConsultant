'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setResourcesOpen(false)
    setMobileResourcesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
              aria-label="The Study Abroad Consultant - Home"
              className={`font-display font-semibold text-lg tracking-tight transition-colors ${
                showTransparent ? 'text-white' : 'text-navy-900'
              }`}
            >
              The Study Abroad<br className="sm:hidden" /> Consultant
            </Link>

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

            <button
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

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy-900 lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6 pt-[72px]">
            {navLinks.map((link) => {
              if (isDropdown(link)) {
                return (
                  <div key={link.label} className="flex flex-col items-center">
                    <button
                      onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                      aria-expanded={mobileResourcesOpen}
                      aria-label="Resources menu"
                      className="flex items-center gap-2 text-white text-display-sm font-display hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileResourcesOpen && (
                      <div className="mt-3 flex flex-col items-center gap-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-white/70 text-body-lg font-display hover:text-sky-300 transition-colors"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-display-sm font-display hover:text-sky-300 transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-4">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a Consultation on WhatsApp"
                className="inline-flex items-center justify-center gap-2 font-display font-semibold text-body-lg px-8 py-4 min-h-[52px] bg-white text-navy-900 rounded-[4px] transition-all duration-200 hover:bg-sky-50"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
