export function HeroBackground() {
  const lagosX = 490
  const lagosY = 320

  const destinations = [
    { name: 'London', x: 480, y: 170, delay: '0s' },
    { name: 'Toronto', x: 260, y: 180, delay: '1.2s' },
    { name: 'New York', x: 280, y: 210, delay: '2.4s' },
    { name: 'Dublin', x: 450, y: 160, delay: '3.6s' },
    { name: 'Sydney', x: 950, y: 440, delay: '4.8s' },
  ]

  function getArcPath(destX: number, destY: number) {
    const midX = (lagosX + destX) / 2
    const midY = Math.min(lagosY, destY) - Math.abs(destX - lagosX) * 0.25 - 60
    return `M ${lagosX} ${lagosY} Q ${midX} ${midY} ${destX} ${destY}`
  }

  // Deterministic pseudo-random using seed
  function seededRandom(seed: number) {
    const x = Math.sin(seed * 9301 + 49297) * 49297
    return x - Math.floor(x)
  }

  // Generate continent dot clusters deterministically
  const continentDots: Array<{ cx: number; cy: number }> = []
  let seed = 0

  // Helper to add dots for a region
  function addDots(xMin: number, xMax: number, yMin: number, yMax: number, threshold: number) {
    for (let x = xMin; x <= xMax; x += 18) {
      for (let y = yMin; y <= yMax; y += 18) {
        seed++
        if (seededRandom(seed) > threshold) {
          const offsetX = ((seed * 7) % 9) - 4
          const offsetY = ((seed * 13) % 9) - 4
          continentDots.push({ cx: x + offsetX, cy: y + offsetY })
        }
      }
    }
  }

  // Europe
  addDots(440, 560, 130, 220, 0.3)
  // Africa
  addDots(440, 560, 250, 410, 0.35)
  // North America
  addDots(140, 340, 120, 280, 0.35)
  // South America
  addDots(220, 340, 310, 470, 0.4)
  // Asia
  addDots(600, 850, 130, 320, 0.4)
  // Australia
  addDots(880, 1000, 380, 480, 0.35)

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes hero-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        @keyframes hero-arc-draw {
          0% { stroke-dashoffset: 1000; opacity: 0.25; }
          5% { opacity: 0.25; }
          60% { stroke-dashoffset: 0; opacity: 0.25; }
          75% { stroke-dashoffset: 0; opacity: 0.25; }
          85% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 1000; opacity: 0; }
        }
        @keyframes hero-pulse {
          0% { r: 4; opacity: 0; }
          55% { r: 4; opacity: 0; }
          60% { r: 4; opacity: 0.8; }
          75% { r: 4; opacity: 0.8; }
          100% { r: 14; opacity: 0; }
        }
        .hero-map-group {
          animation: hero-drift 20s linear infinite alternate;
        }
        .hero-arc {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          fill: none;
          stroke: rgba(255,255,255,0.25);
          stroke-width: 1;
        }
        .hero-pulse-dot {
          fill: white;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-map-group { animation: none; }
          .hero-arc { stroke-dashoffset: 0; opacity: 0.15; animation: none !important; }
          .hero-pulse-dot { opacity: 0.5; animation: none !important; }
        }
      `}</style>
      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* World map dot grid */}
        <g className="hero-map-group">
          {continentDots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r="1.5"
              fill="white"
              opacity="0.07"
            />
          ))}
        </g>

        {/* Lagos origin dot */}
        <circle cx={lagosX} cy={lagosY} r="5" fill="white" opacity="0.4" />
        <circle cx={lagosX} cy={lagosY} r="2.5" fill="white" opacity="0.8" />

        {/* Flight arcs + destination pulse dots */}
        {destinations.map((dest) => {
          const arcDuration = '6s'
          return (
            <g key={dest.name}>
              <path
                className="hero-arc"
                d={getArcPath(dest.x, dest.y)}
                style={{
                  animation: `hero-arc-draw ${arcDuration} ease-in-out ${dest.delay} infinite`,
                }}
              />
              <circle
                className="hero-pulse-dot"
                cx={dest.x}
                cy={dest.y}
                r="4"
                style={{
                  animation: `hero-pulse ${arcDuration} ease-out ${dest.delay} infinite`,
                }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
