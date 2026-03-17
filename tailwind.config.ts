import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf5', 100: '#c5d0e6', 200: '#9eb0d4', 300: '#7690c2',
          400: '#567ab5', 500: '#3664a8', 600: '#2d549a', 700: '#1e4088',
          800: '#102e74', 900: '#0A2540', 950: '#061828',
        },
        sky: { 400: '#60a8e8', 500: '#2D7DD2', 600: '#1f6ab8', 700: '#155a9e' },
        brand: { red: '#DC2626', 'red-hover': '#B91C1C', green: '#25D366' },
        surface: { DEFAULT: '#FFFFFF', 2: '#F7F9FC', 3: '#EEF2F8', 4: '#E4EAF4', navy: '#0A2540' },
        text: {
          primary: '#0A2540', secondary: '#3D5168', muted: '#7A90A8',
          inverse: '#FFFFFF', sky: '#2D7DD2',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem,6vw,4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-xl':  ['clamp(2.5rem,5vw,3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-lg':  ['clamp(2rem,4vw,3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md':  ['clamp(1.625rem,3vw,2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-sm':  ['clamp(1.375rem,2.5vw,1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-xl': ['1.25rem',  { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem',     { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.65' }],
        'label':   ['0.75rem',  { lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem', '30': '7.5rem',
        'section': '6rem', 'section-lg': '8rem',
      },
      borderRadius: { card: '16px', pill: '9999px', badge: '8px', btn: '10px' },
      boxShadow: {
        xs: '0 1px 3px rgba(10,37,64,0.06)',
        sm: '0 2px 8px rgba(10,37,64,0.08)',
        card: '0 4px 24px rgba(10,37,64,0.08)',
        'card-hover': '0 8px 40px rgba(10,37,64,0.15)',
        nav: '0 2px 20px rgba(10,37,64,0.08)',
        'cta-sky': '0 4px 20px rgba(45,125,210,0.35)',
        'cta-red': '0 4px 20px rgba(220,38,38,0.35)',
        'cta-green': '0 4px 20px rgba(37,211,102,0.35)',
      },
    },
  },
  plugins: [],
}
export default config
