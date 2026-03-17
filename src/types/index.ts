export interface Destination {
  slug: string
  name: string
  flag: string
  gradient: string
  accent: string
  keyStat: string
  visaSuccess: string
  tuition: { min: number; max: number; currency: string; note?: string }
  living: { min: number; max: number; currency: string }
  workRights: string
  postStudy: string
  visaProcessing: string
  community: string
  communitySize: string
  prPathway: string
  whyChoose: Array<{ icon: string; title: string; description: string }>
  communityFacts: string[]
  timeline: Array<{ week: string; title: string; description: string; callout?: string }>
  faqs: Array<{ question: string; answer: string }>
  costTable: Array<{ item: string; foreign: string; naira: string }>
  quizQuestions: Array<{ question: string; options: string[] }>
  relatedDestinations: string[]
  h1: string
  metaTitle: string
  metaDescription: string
  healthInsurance: { foreign: string; naira: string }
}

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured: boolean
  ogImage: string
  content: string
  readingTime: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Scholarship {
  name: string
  country: string
  level: string
  funding: string
  deadline: string
  amount: string
  description: string
  eligibility: string[]
  link: string
}
