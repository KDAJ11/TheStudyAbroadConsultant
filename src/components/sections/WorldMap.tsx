'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Link from 'next/link'

/* ─── destination data ─── */
const destinations = [
  { name: 'Canada', slug: 'canada', flag: '🇨🇦', benefit: 'Up to 3yr Post-Study Work', visa: '99% visa success rate', cx: 0.18, cy: 0.28 },
  { name: 'United Kingdom', slug: 'uk', flag: '🇬🇧', benefit: '2yr Graduate Visa', visa: '97% visa success rate', cx: 0.47, cy: 0.30 },
  { name: 'USA', slug: 'usa', flag: '🇺🇸', benefit: '12–36mo OPT Work Rights', visa: '96% visa success rate', cx: 0.20, cy: 0.38 },
  { name: 'Ireland', slug: 'ireland', flag: '🇮🇪', benefit: 'EU Access · English-Speaking', visa: '97% visa success rate', cx: 0.45, cy: 0.31 },
  { name: 'Germany', slug: 'germany', flag: '🇩🇪', benefit: 'Near-Zero Tuition Available', visa: '94% visa success rate', cx: 0.50, cy: 0.32 },
  { name: 'Australia', slug: 'australia', flag: '🇦🇺', benefit: 'Unlimited Work Rights', visa: '96% visa success rate', cx: 0.78, cy: 0.68 },
] as const

type DestSlug = (typeof destinations)[number]['slug']

/* ─── simplified world map SVG paths (Natural Earth inspired, compact) ─── */
const WORLD_PATHS = {
  // North America
  northAmerica: "M 50 95 L 55 80 L 70 72 L 85 65 L 110 58 L 135 52 L 155 48 L 170 50 L 185 55 L 195 62 L 200 72 L 215 80 L 225 90 L 230 100 L 235 115 L 240 130 L 250 140 L 255 150 L 260 160 L 240 165 L 225 160 L 210 155 L 195 150 L 180 148 L 165 152 L 150 155 L 140 150 L 130 145 L 120 140 L 108 135 L 95 130 L 82 128 L 70 125 L 58 118 L 50 110 Z",
  // Canada (highlighted separately)
  canada: "M 70 72 L 85 65 L 110 58 L 135 52 L 155 48 L 170 50 L 185 55 L 195 62 L 200 72 L 205 78 L 195 82 L 185 80 L 175 82 L 165 85 L 155 83 L 145 86 L 135 88 L 125 90 L 115 88 L 105 90 L 95 88 L 85 90 L 75 85 Z",
  // USA (highlighted separately)
  usa: "M 75 85 L 85 90 L 95 88 L 105 90 L 115 88 L 125 90 L 135 88 L 145 86 L 155 90 L 165 92 L 170 98 L 175 105 L 172 112 L 165 115 L 155 118 L 145 120 L 135 118 L 125 115 L 115 112 L 105 110 L 95 108 L 85 105 L 78 100 L 72 95 Z",
  // South America
  southAmerica: "M 175 175 L 185 168 L 195 165 L 205 170 L 215 180 L 220 195 L 225 210 L 228 225 L 225 245 L 220 260 L 212 275 L 205 290 L 195 300 L 185 305 L 178 298 L 172 285 L 168 270 L 170 255 L 175 240 L 178 225 L 175 210 L 172 195 L 170 185 Z",
  // Europe (non-destination)
  europeOther: "M 365 95 L 375 88 L 385 85 L 400 82 L 415 85 L 425 90 L 435 95 L 440 105 L 435 112 L 425 115 L 415 110 L 405 108 L 395 110 L 385 108 L 375 105 L 368 100 Z",
  // UK (highlighted)
  uk: "M 370 90 L 375 85 L 380 82 L 384 85 L 386 92 L 383 98 L 378 100 L 373 97 Z",
  // Ireland (highlighted)
  ireland: "M 362 88 L 367 84 L 372 86 L 373 92 L 369 96 L 364 94 Z",
  // Germany (highlighted)
  germany: "M 395 86 L 402 82 L 410 84 L 414 90 L 412 98 L 406 102 L 398 100 L 394 94 Z",
  // Africa
  africa: "M 370 140 L 385 132 L 400 128 L 420 130 L 440 135 L 455 145 L 465 160 L 470 180 L 468 200 L 462 220 L 455 240 L 445 255 L 430 265 L 415 270 L 400 265 L 388 255 L 378 240 L 372 220 L 368 200 L 365 180 L 362 160 L 365 148 Z",
  // Asia
  asia: "M 445 60 L 470 52 L 500 48 L 530 50 L 560 55 L 585 62 L 610 68 L 630 75 L 645 85 L 650 100 L 645 115 L 635 125 L 620 130 L 600 128 L 580 132 L 565 140 L 545 145 L 525 142 L 510 138 L 495 140 L 480 145 L 465 140 L 455 130 L 448 120 L 442 108 L 438 95 L 440 78 L 442 68 Z",
  // Australia (highlighted)
  australia: "M 575 210 L 595 200 L 618 198 L 640 205 L 652 218 L 655 235 L 648 250 L 635 260 L 618 265 L 600 262 L 585 255 L 575 242 L 570 228 L 572 218 Z",
  // Oceania other (NZ etc)
  oceania: "M 665 260 L 672 255 L 678 258 L 680 265 L 676 272 L 670 270 Z M 668 275 L 674 273 L 678 278 L 675 284 L 670 282 Z",
  // Greenland
  greenland: "M 235 42 L 252 35 L 270 32 L 285 35 L 295 42 L 292 52 L 280 58 L 265 60 L 248 58 L 238 52 Z",
  // Southeast Asia islands
  seAsia: "M 580 148 L 590 145 L 600 148 L 608 155 L 612 165 L 605 170 L 595 168 L 588 162 L 582 155 Z M 618 155 L 628 150 L 638 155 L 640 165 L 632 170 L 622 168 Z",
} as const

/* SVG viewBox dimensions */
const VB_W = 800
const VB_H = 340

interface WorldMapProps {
  hoveredCountry: DestSlug | null
  onCountryHover: (slug: DestSlug | null) => void
}

export function WorldMap({ hoveredCountry, onCountryHover }: WorldMapProps) {
  const prefersReducedMotion = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const [tappedCountry, setTappedCountry] = useState<DestSlug | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // For mobile: first tap shows tooltip, second tap navigates
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const activeCountry = hoveredCountry || tappedCountry

  const getTooltipData = useCallback(() => {
    return destinations.find((d) => d.slug === activeCountry) || null
  }, [activeCountry])

  const handleMarkerEnter = useCallback(
    (slug: DestSlug, _e: React.MouseEvent | React.FocusEvent) => {
      onCountryHover(slug)
      // Calculate tooltip position relative to container
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const svgRect = svgRef.current?.getBoundingClientRect()
        if (svgRect) {
          const dest = destinations.find((d) => d.slug === slug)
          if (dest) {
            const x = svgRect.left - rect.left + svgRect.width * dest.cx
            const y = svgRect.top - rect.top + svgRect.height * dest.cy
            // Clamp so tooltip stays in viewport
            const clampedX = Math.max(100, Math.min(x, rect.width - 100))
            setTooltipPos({ x: clampedX, y: y - 12 })
          }
        }
      }
    },
    [onCountryHover]
  )

  const handleMarkerLeave = useCallback(() => {
    onCountryHover(null)
    setTooltipPos(null)
  }, [onCountryHover])

  const handleTap = useCallback(
    (slug: DestSlug, e: React.MouseEvent | React.TouchEvent) => {
      if (!isMobile) return // Desktop uses hover + click to navigate
      e.preventDefault()
      if (tappedCountry === slug) {
        // Second tap: navigate
        setTappedCountry(null)
        window.location.href = `/destinations/${slug}`
      } else {
        // First tap: show tooltip
        setTappedCountry(slug)
        onCountryHover(slug)
        // Set tooltip position
        if (containerRef.current && svgRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const svgRect = svgRef.current.getBoundingClientRect()
          const dest = destinations.find((d) => d.slug === slug)
          if (dest) {
            const x = svgRect.left - rect.left + svgRect.width * dest.cx
            const y = svgRect.top - rect.top + svgRect.height * dest.cy
            const clampedX = Math.max(100, Math.min(x, rect.width - 100))
            setTooltipPos({ x: clampedX, y: y - 12 })
          }
        }
      }
    },
    [isMobile, tappedCountry, onCountryHover]
  )

  // Dismiss tooltip on outside tap (mobile)
  useEffect(() => {
    if (!isMobile || !tappedCountry) return
    const handler = (e: TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setTappedCountry(null)
        onCountryHover(null)
        setTooltipPos(null)
      }
    }
    document.addEventListener('touchstart', handler, { passive: true })
    return () => document.removeEventListener('touchstart', handler)
  }, [isMobile, tappedCountry, onCountryHover])

  const tooltipData = getTooltipData()

  // Map destination slugs to SVG paths for highlighting
  const countryPathMap: Record<DestSlug, string> = {
    canada: WORLD_PATHS.canada,
    uk: WORLD_PATHS.uk,
    usa: WORLD_PATHS.usa,
    ireland: WORLD_PATHS.ireland,
    germany: WORLD_PATHS.germany,
    australia: WORLD_PATHS.australia,
  }

  return (
    <div ref={containerRef} className="relative w-full mt-10">
      {/* Inline CSS for pulse animation */}
      <style>{`
        @keyframes map-pulse {
          0% { r: 5; opacity: 0.6; }
          100% { r: 22; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-ring { animation: none !important; }
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="World map showing study abroad destinations: Canada, United Kingdom, USA, Ireland, Germany, and Australia"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── All land masses (muted) ── */}
        {Object.entries(WORLD_PATHS).map(([key, path]) => {
          // Skip destination countries here — they render separately
          const destKeys = ['canada', 'uk', 'usa', 'ireland', 'germany', 'australia']
          if (destKeys.includes(key)) return null
          return (
            <path
              key={key}
              d={path}
              fill="#E4EAF4"
              stroke="#D0DAE8"
              strokeWidth={0.5}
            />
          )
        })}

        {/* ── Destination country paths (highlighted) ── */}
        {destinations.map((dest) => (
          <path
            key={`path-${dest.slug}`}
            d={countryPathMap[dest.slug]}
            fill={activeCountry === dest.slug ? 'rgba(45,125,210,0.4)' : 'rgba(45,125,210,0.15)'}
            stroke={activeCountry === dest.slug ? '#2D7DD2' : '#B0C4DE'}
            strokeWidth={activeCountry === dest.slug ? 1.2 : 0.5}
            className="transition-all duration-200"
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => handleMarkerEnter(dest.slug, e)}
            onMouseLeave={handleMarkerLeave}
            onClick={(e) => {
              if (isMobile) {
                handleTap(dest.slug, e)
              }
            }}
          />
        ))}

        {/* ── Markers for each destination ── */}
        {destinations.map((dest) => {
          const cx = VB_W * dest.cx
          const cy = VB_H * dest.cy
          const isActive = activeCountry === dest.slug

          return (
            <g key={`marker-${dest.slug}`}>
              {/* Invisible hit target (44px+ at most viewport sizes) */}
              <circle
                cx={cx}
                cy={cy}
                r={22}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label={`Learn more about studying in ${dest.name}`}
                onMouseEnter={(e) => handleMarkerEnter(dest.slug, e)}
                onMouseLeave={handleMarkerLeave}
                onFocus={(e) => handleMarkerEnter(dest.slug, e)}
                onBlur={handleMarkerLeave}
                onClick={(e) => {
                  if (isMobile) {
                    handleTap(dest.slug, e)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    window.location.href = `/destinations/${dest.slug}`
                  }
                }}
              />

              {/* Pulse ring 1 */}
              <circle
                cx={cx}
                cy={cy}
                r={5}
                fill="none"
                stroke="#2D7DD2"
                strokeWidth={1.5}
                opacity={prefersReducedMotion ? 0.3 : undefined}
                className="pulse-ring"
                style={
                  prefersReducedMotion
                    ? { r: 14, opacity: 0.3 }
                    : {
                        animation: 'map-pulse 2s ease-out infinite',
                      }
                }
              />

              {/* Pulse ring 2 (offset by 1s) */}
              <circle
                cx={cx}
                cy={cy}
                r={5}
                fill="none"
                stroke="#2D7DD2"
                strokeWidth={1.5}
                opacity={prefersReducedMotion ? 0.15 : undefined}
                className="pulse-ring"
                style={
                  prefersReducedMotion
                    ? { r: 18, opacity: 0.15 }
                    : {
                        animation: 'map-pulse 2s ease-out infinite',
                        animationDelay: '1s',
                      }
                }
              />

              {/* Marker dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 8 : 5}
                fill={isActive ? '#2D7DD2' : '#2D7DD2'}
                opacity={isActive ? 1 : 0.85}
                className="transition-all duration-200"
                style={{ willChange: 'transform', pointerEvents: 'none' }}
              />

              {/* Inner bright dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 3 : 2}
                fill="#FFFFFF"
                opacity={isActive ? 0.9 : 0.6}
                className="transition-all duration-200"
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )
        })}
      </svg>

      {/* ── Tooltip ── */}
      {activeCountry && tooltipData && tooltipPos && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div
            className="bg-white rounded-xl shadow-lg px-4 py-3 text-sm border border-surface-4"
            style={{
              opacity: 1,
              animation: prefersReducedMotion ? 'none' : 'tooltip-in 0.2s ease-out',
            }}
            role="tooltip"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <span className="text-[32px] leading-none" aria-hidden="true">
                {tooltipData.flag}
              </span>
              <div>
                <p className="font-display font-semibold text-navy-900">
                  {tooltipData.name}
                </p>
                <p className="text-text-secondary text-body-sm mt-0.5">
                  {tooltipData.benefit}
                </p>
                <p className="text-text-muted text-body-sm">
                  {tooltipData.visa}
                </p>
                <Link
                  href={`/destinations/${tooltipData.slug}`}
                  className="text-sky-500 text-body-sm font-medium mt-1 inline-block pointer-events-auto hover:text-sky-600 transition-colors"
                  tabIndex={-1}
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes tooltip-in {
          from { opacity: 0; transform: translate(-50%, calc(-100% + 4px)); }
          to { opacity: 1; transform: translate(-50%, -100%); }
        }
      `}</style>
    </div>
  )
}
