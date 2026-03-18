import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thestudyabroadconsultant.ca'),
  title: {
    default: "Nigeria's Most Trusted Study Abroad Consultant | UK, Canada, USA",
    template: '%s | The Study Abroad Consultant',
  },
  description: 'Expert guidance for Nigerian students studying in the UK, Canada, USA, Ireland, Germany & Australia. 700+ students placed. 98% visa success rate.',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://thestudyabroadconsultant.ca',
    siteName: 'The Study Abroad Consultant',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
