'use client'

import { useState } from 'react'
import { CheckCircle, Filter, GraduationCap } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { SITE } from '@/lib/constants'

const scholarships = [
  { name: 'Chevening Scholarship', country: 'UK', level: 'Master\'s', funding: 'Fully Funded', deadline: 'November (annually)', amount: 'Full tuition + living + flights', description: 'UK government\'s global scholarship programme. Covers full tuition, monthly stipend, travel costs, and more.', eligibility: ['Bachelor\'s degree', '2+ years work experience', 'Return to home country for 2 years'], link: '#' },
  { name: 'Commonwealth Shared Scholarship', country: 'UK', level: 'Master\'s', funding: 'Fully Funded', deadline: 'December (annually)', amount: 'Full tuition + living', description: 'For students from developing Commonwealth countries who couldn\'t afford to study in the UK without funding.', eligibility: ['Commonwealth citizen', 'Bachelor\'s degree', 'Cannot self-fund'], link: '#' },
  { name: 'DAAD Scholarship', country: 'Germany', level: 'Master\'s/PhD', funding: 'Fully Funded', deadline: 'October (annually)', amount: '€934/mo (Master\'s) · €1,200/mo (PhD)', description: 'Germany\'s largest scholarship organisation. Multiple programmes for international students.', eligibility: ['Bachelor\'s degree', 'Relevant work experience preferred', 'Language skills'], link: '#' },
  { name: 'Konrad Adenauer Foundation', country: 'Germany', level: 'Master\'s/PhD', funding: 'Partially Funded', deadline: 'July/January', amount: '€934/mo + health insurance', description: 'Political foundation scholarship for academically gifted students with social engagement.', eligibility: ['Bachelor\'s degree', 'Social/political engagement', 'German language skills'], link: '#' },
  { name: 'Government of Ireland Scholarship', country: 'Ireland', level: 'Master\'s/PhD', funding: 'Fully Funded', deadline: 'October (annually)', amount: '€10,000/yr + tuition', description: 'Competitive scholarship for excellence in research at Irish institutions.', eligibility: ['Strong academic record', 'Research proposal', 'Any nationality'], link: '#' },
  { name: 'Fulbright Scholarship', country: 'USA', level: 'Master\'s/PhD', funding: 'Fully Funded', deadline: 'February (annually)', amount: 'Full tuition + living + flights', description: 'Prestigious US government programme promoting international educational exchange.', eligibility: ['Bachelor\'s degree', 'Strong academic record', 'Leadership potential'], link: '#' },
  { name: 'IIE Scholar Rescue Fund', country: 'USA', level: 'PhD/Postdoc', funding: 'Fully Funded', deadline: 'Rolling', amount: 'Up to $25,000', description: 'For threatened and displaced scholars to continue their academic work.', eligibility: ['PhD or equivalent', 'Published research', 'Facing threat'], link: '#' },
  { name: 'Australia Awards Africa', country: 'Australia', level: 'Master\'s/PhD', funding: 'Fully Funded', deadline: 'April (annually)', amount: 'Full tuition + living + flights', description: 'Australian government scholarship for emerging leaders in Africa.', eligibility: ['African citizen', 'Bachelor\'s degree', '2+ years work experience'], link: '#' },
  { name: 'Destination Australia', country: 'Australia', level: 'All levels', funding: 'Partially Funded', deadline: 'Varies by institution', amount: 'Up to AUD 15,000/yr', description: 'Scholarships for students studying at regional Australian institutions.', eligibility: ['International student', 'Study at regional institution', 'Meet academic requirements'], link: '#' },
  { name: 'Manitoba Graduate Fellowship', country: 'Canada', level: 'Master\'s/PhD', funding: 'Partially Funded', deadline: 'Varies', amount: 'CAD 14,000–18,000', description: 'Merit-based fellowship for graduate students at University of Manitoba.', eligibility: ['Full-time graduate student', 'Strong academic record', 'Research involvement'], link: '#' },
  { name: 'Vanier Canada Graduate', country: 'Canada', level: 'PhD', funding: 'Fully Funded', deadline: 'November', amount: 'CAD 50,000/yr for 3 years', description: 'Canada\'s most prestigious doctoral scholarship attracting world-class researchers.', eligibility: ['PhD candidate', 'Academic excellence', 'Research potential', 'Leadership'], link: '#' },
  { name: 'Griffith Remarkable Scholarship', country: 'Australia', level: 'All levels', funding: 'Partially Funded', deadline: 'Varies', amount: '50% tuition reduction', description: 'Academic merit scholarship for outstanding international students at Griffith University.', eligibility: ['High academic achievement', 'Griffith University admission', 'Meet GPA requirement'], link: '#' },
]

const tips = [
  'Start applications 6–12 months before deadlines — most Nigerian applicants underestimate the time needed',
  'Write country-specific personal statements — generic essays are immediately obvious to reviewers',
  'Get your references early — Nigerian academic referees often need 4–6 weeks of follow-up',
  'Check if your university offers additional merit scholarships — many Nigerian students miss these',
  'Apply to multiple scholarships simultaneously — don\'t put all your eggs in one basket',
]

const scholarshipFAQs = [
  { question: 'Can I apply for multiple scholarships at once?', answer: 'Yes — and you should. Apply to every scholarship you\'re eligible for. Some scholarships (like Chevening) don\'t allow concurrent applications with certain other UK government scholarships, but most are independent.' },
  { question: 'Do scholarships cover all my expenses?', answer: 'Fully funded scholarships typically cover tuition, living costs, and sometimes flights. Partially funded scholarships cover tuition only or provide a fixed stipend. Always budget for the gap between scholarship amount and total costs.' },
  { question: 'Do I need IELTS before applying for scholarships?', answer: 'Most scholarships require proof of English proficiency at application. Some allow you to submit scores later. Check each scholarship\'s requirements — Chevening, for example, allows conditional offers with pending IELTS.' },
  { question: 'What makes a strong scholarship application from Nigeria?', answer: 'Clear career goals tied to Nigeria\'s development, strong academic record, relevant work/volunteer experience, and a compelling personal statement that shows both ambition and awareness of your field.' },
]

const countryOptions = ['All', 'UK', 'Canada', 'USA', 'Ireland', 'Germany', 'Australia']
const levelOptions = ['All', 'Master\'s', 'PhD', 'Master\'s/PhD', 'All levels', 'PhD/Postdoc']
const fundingOptions = ['All', 'Fully Funded', 'Partially Funded']

export default function ScholarshipsPage() {
  const [country, setCountry] = useState('All')
  const [level, setLevel] = useState('All')
  const [funding, setFunding] = useState('All')

  // Quiz state
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [showQuizResults, setShowQuizResults] = useState(false)

  const quizQuestions = [
    { q: 'What is your highest qualification?', opts: ['WAEC/NECO', 'Bachelor\'s', 'Master\'s', 'PhD'] },
    { q: 'How many years of work experience do you have?', opts: ['None', '1–2 years', '3–5 years', '5+ years'] },
    { q: 'What is your CGPA (or equivalent)?', opts: ['Below 3.0', '3.0–3.4', '3.5–3.7', '3.8+'] },
    { q: 'What level do you want to study?', opts: ['Bachelor\'s', 'Master\'s', 'PhD', 'Not sure'] },
    { q: 'Which region interests you most?', opts: ['UK/Europe', 'North America', 'Australia', 'Anywhere'] },
  ]

  const filtered = scholarships.filter(s => {
    if (country !== 'All' && s.country !== country) return false
    if (level !== 'All' && s.level !== level) return false
    if (funding !== 'All' && s.funding !== funding) return false
    return true
  })

  const handleQuizNext = (optIndex: number) => {
    const newAnswers = [...quizAnswers, optIndex]
    setQuizAnswers(newAnswers)
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setShowQuizResults(true)
    }
  }

  return (
    <>
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            Scholarships for Nigerian Students Abroad 2025: Fully Funded & Partially Funded
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-2xl mx-auto">
            Chevening, DAAD, Australia Awards, Fulbright, and 8 more scholarships. Eligibility criteria, deadlines, and expert application guidance.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-surface-2 py-8 relative border-b border-surface-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-5 h-5 text-text-muted" />
            <select value={country} onChange={e => setCountry(e.target.value)} className="px-3 py-2 rounded-btn border border-surface-4 bg-white text-body-sm min-h-[44px] focus:ring-2 focus:ring-sky-500 focus:outline-none" aria-label="Filter by country">
              {countryOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} className="px-3 py-2 rounded-btn border border-surface-4 bg-white text-body-sm min-h-[44px] focus:ring-2 focus:ring-sky-500 focus:outline-none" aria-label="Filter by level">
              {levelOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select value={funding} onChange={e => setFunding(e.target.value)} className="px-3 py-2 rounded-btn border border-surface-4 bg-white text-body-sm min-h-[44px] focus:ring-2 focus:ring-sky-500 focus:outline-none" aria-label="Filter by funding">
              {fundingOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <span className="text-text-muted text-body-sm">{filtered.length} scholarships</span>
          </div>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section className="bg-white py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => (
              <SectionFade key={s.name} delay={i * 0.05}>
                <div className="bg-white rounded-card border border-surface-4 shadow-sm p-6 h-full flex flex-col hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={s.funding === 'Fully Funded' ? 'green' : 'sky'}>{s.funding}</Badge>
                    <Badge variant="muted">{s.country}</Badge>
                  </div>
                  <h3 className="font-display font-semibold text-navy-900 text-body-lg mb-2">{s.name}</h3>
                  <p className="text-text-secondary text-body-sm mb-3 flex-1">{s.description}</p>
                  <div className="space-y-2 text-body-sm">
                    <p><span className="font-medium text-navy-900">Level:</span> <span className="text-text-secondary">{s.level}</span></p>
                    <p><span className="font-medium text-navy-900">Amount:</span> <span className="text-text-secondary">{s.amount}</span></p>
                    <p><span className="font-medium text-navy-900">Deadline:</span> <span className="text-text-secondary">{s.deadline}</span></p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-4">
                    <p className="text-body-sm text-text-muted mb-1 font-medium">Eligibility:</p>
                    <ul className="space-y-1">
                      {s.eligibility.map(e => (
                        <li key={e} className="flex items-start gap-1.5 text-body-sm text-text-secondary">
                          <CheckCircle className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* Do I Qualify Quiz */}
      <section className="bg-navy-900 py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display-lg font-display font-bold text-white text-center mb-8">
            Do I Qualify for Scholarships?
          </h2>

          {!showQuizResults ? (
            <div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} />
              </div>
              <h3 className="text-display-sm font-display text-white mb-6">{quizQuestions[quizStep].q}</h3>
              <div className="grid gap-3">
                {quizQuestions[quizStep].opts.map((opt, i) => (
                  <button key={i} onClick={() => handleQuizNext(i)} className="w-full text-left px-6 py-4 rounded-card bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-sky-400 transition-all min-h-[44px]">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <GraduationCap className="w-16 h-16 text-sky-400 mx-auto mb-4" />
              <h3 className="text-display-md font-display font-bold text-sky-300 mb-4">
                Based on your profile, you may qualify for several scholarships!
              </h3>
              <p className="text-white/70 text-body-lg mb-8">
                We can identify the specific scholarships that match your qualifications, experience, and goals. Let&apos;s discuss your options.
              </p>
              <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon className="w-full sm:w-auto">
                Get Personalised Scholarship Guidance
              </Button>
              <button onClick={() => { setQuizStep(0); setQuizAnswers([]); setShowQuizResults(false) }} className="block mx-auto mt-4 text-white/50 hover:text-white text-body-sm min-h-[44px]">
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-white py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionFade>
            <h2 className="text-display-lg font-display font-bold text-navy-900 text-center mb-10">
              5 Tips for Nigerian Scholarship Applicants
            </h2>
          </SectionFade>
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <SectionFade key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-surface-2 rounded-card p-5">
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white font-display font-bold text-body-sm flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-text-secondary text-body-md">{tip}</p>
                </div>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion faqs={scholarshipFAQs} title="Scholarship FAQs" className="bg-surface-2" />
    </>
  )
}
