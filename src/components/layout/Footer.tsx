import Link from 'next/link'
import { SITE } from '@/lib/constants'

const destinations = [
  { href: '/destinations/canada', label: 'Study in Canada' },
  { href: '/destinations/uk', label: 'Study in UK' },
  { href: '/destinations/usa', label: 'Study in USA' },
  { href: '/destinations/ireland', label: 'Study in Ireland' },
  { href: '/destinations/germany', label: 'Study in Germany' },
  { href: '/destinations/australia', label: 'Study in Australia' },
]

const services = [
  { href: '/services', label: 'University Selection' },
  { href: '/services', label: 'Application Assistance' },
  { href: '/services', label: 'Visa Support' },
  { href: '/services', label: 'Document Preparation' },
  { href: '/services', label: 'Interview Coaching' },
  { href: '/services', label: 'Post-Arrival Support' },
]

const company = [
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{SITE.name}</h3>
            <p className="text-white/60 text-body-sm mb-4">{SITE.tagline}</p>
            <div className="space-y-2 text-body-sm">
              <a href={SITE.whatsapp} className="block text-white/70 hover:text-sky-300 transition-colors">
                WhatsApp: {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="block text-white/70 hover:text-sky-300 transition-colors">
                {SITE.email}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-body-md mb-4">Destinations</h4>
            <ul className="space-y-2">
              {destinations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white text-body-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-body-md mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-white/60 hover:text-white text-body-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-body-md mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white text-body-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-white/40 text-body-sm text-center">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. | Website by{' '}
            <a href="https://dotxlabs.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sky-300 transition-colors">
              DOTxLabs
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
