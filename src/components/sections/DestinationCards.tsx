'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ClipReveal } from '@/components/animations/ClipReveal'

/* ─── Destination data ─── */
const destinations = [
  {
    name: 'Canada',
    slug: 'canada',
    flag: '🇨🇦',
    benefit: 'Up to 3yr Post-Study Work',
    visa: '99% Visa Success Rate',
    gradient: 'bg-gradient-to-br from-red-50 to-white',
    borderColor: 'border-l-red-500',
    accentHex: '#EF4444',
    backPoints: [
      'Up to 3yr Post-Study Work Permit',
      'Strong pathway to PR',
      'World-class universities',
    ],
  },
  {
    name: 'United Kingdom',
    slug: 'uk',
    flag: '🇬🇧',
    benefit: '2yr Graduate Visa',
    visa: '97% Visa Success Rate',
    gradient: 'bg-gradient-to-br from-blue-50 to-white',
    borderColor: 'border-l-blue-600',
    accentHex: '#2563EB',
    backPoints: [
      '2yr Graduate Route Visa',
      'Shorter degree durations save cost',
      'Global career recognition',
    ],
  },
  {
    name: 'USA',
    slug: 'usa',
    flag: '🇺🇸',
    benefit: '12–36mo OPT Work Rights',
    visa: '96% Visa Success Rate',
    gradient: 'bg-gradient-to-br from-red-50 via-white to-blue-50',
    borderColor: 'border-l-blue-800',
    accentHex: '#1E40AF',
    backPoints: [
      '12–36 month OPT work rights',
      'Top-ranked global universities',
      'Diverse student communities',
    ],
  },
  {
    name: 'Ireland',
    slug: 'ireland',
    flag: '🇮🇪',
    benefit: 'EU Access · English-Speaking',
    visa: '97% Visa Success Rate',
    gradient: 'bg-gradient-to-br from-green-50 to-white',
    borderColor: 'border-l-green-600',
    accentHex: '#16A34A',
    backPoints: [
      'EU access from English-speaking country',
      '2yr stay-back option',
      'Tech hub with strong job market',
    ],
  },
  {
    name: 'Germany',
    slug: 'germany',
    flag: '🇩🇪',
    benefit: 'Near-Zero Tuition Available',
    visa: '94% Visa Success Rate',
    gradient: 'bg-gradient-to-br from-yellow-50 to-white',
    borderColor: 'border-l-yellow-500',
    accentHex: '#EAB308',
    backPoints: [
      'Near-zero tuition at public universities',
      '18-month job seeker visa',
      'Strong engineering reputation',
    ],
  },
  {
    name: 'Australia',
    slug: 'australia',
    flag: '🇦🇺',
    benefit: 'Unlimited Work Rights',
    visa: '96% Visa Success Rate',
    gradient: 'bg-gradient-to-br from-yellow-50 via-white to-red-50',
    borderColor: 'border-l-yellow-600',
    accentHex: '#CA8A04',
    backPoints: [
      'Unlimited work rights during study',
      'Post-study visa up to 6 years',
      'High quality of life',
    ],
  },
]

/* ─── SVG Landmark Icons (simplified stroke paths) ─── */
const landmarkPaths: Record<string, { paths: string[]; loopAnim: string }> = {
  canada: {
    // Maple leaf
    paths: [
      'M24 6 L26 14 L33 10 L28 17 L35 20 L28 22 L31 30 L26 25 L24 33 L22 25 L17 30 L20 22 L13 20 L20 17 L15 10 L22 14 Z',
      'M24 33 L24 44',
    ],
    loopAnim: 'pulse',
  },
  uk: {
    // Big Ben tower
    paths: [
      'M20 44 L20 18 L22 16 L22 10 L24 5 L26 10 L26 16 L28 18 L28 44',
      'M18 44 L30 44',
      'M20 26 L28 26',
      'M20 36 L28 36',
    ],
    loopAnim: 'tick',
  },
  usa: {
    // Statue of Liberty torch
    paths: [
      'M22 44 L23 22 L21 20 L23 15',
      'M25 15 L27 20 L25 22 L26 44',
      'M24 15 Q21 9 24 3 Q27 9 24 15',
    ],
    loopAnim: 'flicker',
  },
  ireland: {
    // Shamrock
    paths: [
      'M24 22 C20 18 17 13 21 10 C25 7 24 14 24 14 C24 14 23 7 27 10 C31 13 28 18 24 22',
      'M24 22 C19 20 14 17 15 13 C16 9 21 12 24 22',
      'M24 22 C29 20 34 17 33 13 C32 9 27 12 24 22',
      'M24 22 L24 42 L21 38',
    ],
    loopAnim: 'sway',
  },
  germany: {
    // Brandenburg Gate
    paths: [
      'M10 44 L10 16 M18 44 L18 16 M24 44 L24 16 M30 44 L30 16 M38 44 L38 16',
      'M8 16 L40 16 L40 12 L8 12 Z',
      'M18 12 L24 5 L30 12',
    ],
    loopAnim: 'none',
  },
  australia: {
    // Opera House sails
    paths: [
      'M6 40 Q14 14 24 10',
      'M14 40 Q22 18 32 12',
      'M22 40 Q30 20 40 14',
      'M4 40 L44 40',
    ],
    loopAnim: 'wave',
  },
}

/* ─── Animated Landmark Icon Component ─── */
function LandmarkIcon({ slug, accentHex, isInView }: { slug: string; accentHex: string; isInView: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const landmark = landmarkPaths[slug]
  if (!landmark) return null

  const drawDuration = 1.2

  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      className="absolute top-4 right-4 w-12 h-12 sm:w-12 sm:h-12"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      {landmark.paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={accentHex}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={
            isInView
              ? prefersReducedMotion
                ? { pathLength: 1 }
                : { pathLength: 1 }
              : prefersReducedMotion
                ? { pathLength: 1 }
                : { pathLength: 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: drawDuration, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
          }
        />
      ))}
      {/* Subtle loop animation overlay (pulse for Canada, etc.) */}
      {!prefersReducedMotion && isInView && landmark.loopAnim === 'pulse' && (
        <motion.circle
          cx={24}
          cy={20}
          r={14}
          stroke={accentHex}
          strokeWidth={0.5}
          fill="none"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {!prefersReducedMotion && isInView && landmark.loopAnim === 'flicker' && (
        <motion.path
          d="M24 15 Q21 9 24 3 Q27 9 24 15"
          stroke={accentHex}
          strokeWidth={1}
          fill="none"
          initial={{ scaleY: 1, opacity: 0.8 }}
          animate={{ scaleY: [1, 1.1, 1], opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '24px 15px' }}
        />
      )}
    </svg>
  )
}

/* ─── Flip Card Component ─── */
function DestinationFlipCard({ dest, index }: { dest: (typeof destinations)[number]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleFlip = () => {
    if (prefersReducedMotion) return
    if (isMobile) setIsFlipped(!isFlipped)
  }

  // Reduced motion: show front only, no animation
  if (prefersReducedMotion) {
    return (
      <div
        className={`destination-card relative block ${dest.gradient} rounded-2xl border border-surface-4 border-l-4 ${dest.borderColor} p-6`}
      >
        <LandmarkIcon slug={dest.slug} accentHex={dest.accentHex} isInView />
        <span className="text-4xl block mb-3" aria-hidden="true">
          {dest.flag}
        </span>
        <h3 className="font-display font-semibold text-navy-900 text-lg">{dest.name}</h3>
        <p className="text-text-secondary text-body-sm mt-1">{dest.benefit}</p>
        <Link
          href={`/destinations/${dest.slug}`}
          aria-label={`Learn more about studying in ${dest.name}`}
          className="inline-flex items-center gap-1 text-sky-500 text-body-sm font-medium mt-4 hover:gap-2 transition-all"
        >
          Learn More <span>→</span>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setIsInView(true)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.5, ease: [0.42, 0, 0.58, 1] }}
        onHoverStart={() => { if (!isMobile) setIsFlipped(true) }}
        onHoverEnd={() => { if (!isMobile) setIsFlipped(false) }}
        onClick={handleFlip}
      >
        {/* ── Front face ── */}
        <div
          className={`destination-card relative block ${dest.gradient} rounded-2xl border border-surface-4 border-l-4 ${dest.borderColor} p-6`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', willChange: 'transform' }}
        >
          <LandmarkIcon slug={dest.slug} accentHex={dest.accentHex} isInView={isInView} />
          <span className="text-4xl block mb-3" aria-hidden="true">
            {dest.flag}
          </span>
          <h3 className="font-display font-semibold text-navy-900 text-lg">{dest.name}</h3>
          <p className="text-text-secondary text-body-sm mt-1">{dest.benefit}</p>
          <span className="inline-flex items-center gap-1 text-sky-500 text-body-sm font-medium mt-4">
            Learn More <span>→</span>
          </span>
          {/* Mobile tap hint */}
          {isMobile && (
            <span className="absolute bottom-3 right-3 w-6 h-6 flex items-center justify-center text-text-muted text-xs rounded-full border border-surface-4 bg-white/80" aria-hidden="true">
              ↻
            </span>
          )}
        </div>

        {/* ── Back face ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-navy-900 p-6 flex flex-col justify-center border border-navy-800"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', willChange: 'transform' }}
        >
          <span className="text-[40px] block mb-3" aria-hidden="true">
            {dest.flag}
          </span>
          <p className="font-display font-bold text-white text-xl mb-4">{dest.visa}</p>
          <ul className="space-y-2 mb-5">
            {dest.backPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-white/80 text-body-sm">
                <span className="text-sky-400 mt-0.5 shrink-0">✓</span>
                {point}
              </li>
            ))}
          </ul>
          <Link
            href={`/destinations/${dest.slug}`}
            aria-label={`Learn more about studying in ${dest.name}`}
            className="inline-flex items-center gap-1 font-medium text-body-sm mt-auto hover:gap-2 transition-all"
            style={{ color: dest.accentHex }}
            onClick={(e) => e.stopPropagation()}
          >
            Learn More <span>→</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Section ─── */
export function DestinationCards() {
  return (
    <section id="destinations" className="destinations-section bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <ClipReveal>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Destinations</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Where Will You Study?
            </h2>
          </div>
        </ClipReveal>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestinationFlipCard key={dest.slug} dest={dest} index={index} />
          ))}
        </div>

        <ClipReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/destinations"
              aria-label="Explore all study destinations"
              className="inline-flex items-center gap-1 text-sky-500 font-display font-semibold text-body-lg hover:text-sky-600 transition-colors hover:gap-2"
            >
              Explore All Destinations →
            </Link>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
