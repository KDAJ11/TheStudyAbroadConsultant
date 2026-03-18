export const SITE = {
  name: 'The Study Abroad Consultant',
  tagline: "Nigeria's Most Trusted Study Abroad Consultant",
  description: 'Expert guidance for Nigerian students studying in the UK, Canada, USA, Ireland, Germany & Australia. 700+ students placed. 98% visa success rate.',
  url: 'https://thestudyabroadconsultant.ca',
  whatsapp: 'https://wa.me/2348187861554',
  phone: '+234 818 786 1554',
  email: 'cc.canadastudyadvisor@gmail.com',
  socials: {
    facebook: 'https://www.facebook.com/share/1AYxrWfT5f/',
    instagram: 'https://www.instagram.com/thestudyabroad_consultant',
    tiktok: 'https://www.tiktok.com/@thestudyabroadconsultant',
  },
  stats: {
    students: { value: 700, display: '700+', label: 'Students Placed' },
    visaSuccess: { value: 98, display: '98%', label: 'Visa Success Rate' },
    universities: { value: 50, display: '50+', label: 'Partner Universities' },
    years: { value: 10, display: '10+', label: 'Years of Excellence' },
  },
}

export const NAIRA_RATES: Record<string, number> = {
  CAD: 1100, GBP: 1900, USD: 1600, EUR: 1750, AUD: 1050,
}

export const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`

export const formatDualCurrency = (min: number, max: number, currency: string) => {
  const rate = NAIRA_RATES[currency] || 1
  const nairaMin = min * rate
  const nairaMax = max * rate
  return {
    foreign: `${currency} ${min.toLocaleString()}–${max.toLocaleString()}`,
    naira: `₦${(nairaMin / 1000000).toFixed(1)}M–₦${(nairaMax / 1000000).toFixed(1)}M`,
    nairaMin: formatNaira(nairaMin),
    nairaMax: formatNaira(nairaMax),
  }
}
