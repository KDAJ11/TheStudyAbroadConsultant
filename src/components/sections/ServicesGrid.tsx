import { GraduationCap, FileText, ShieldCheck, ClipboardList, MessageSquare, Home } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'

const services = [
  {
    icon: GraduationCap,
    title: 'University Selection',
    description: 'Matched to your GPA, budget, and career goals from 50+ partner universities.',
  },
  {
    icon: FileText,
    title: 'Application Assistance',
    description: 'Complete application prep including personal statements and supporting documents.',
  },
  {
    icon: ShieldCheck,
    title: 'Visa Support',
    description: '98% success rate with end-to-end visa application guidance and interview prep.',
  },
  {
    icon: ClipboardList,
    title: 'Document Preparation',
    description: 'WAEC, transcripts, financial evidence — prepared exactly as embassies require.',
  },
  {
    icon: MessageSquare,
    title: 'Interview Coaching',
    description: 'Mock interviews and strategy sessions specific to each country\'s visa process.',
  },
  {
    icon: Home,
    title: 'Post-Arrival Support',
    description: 'Accommodation guidance, bank setup, and community connections for 3 months after arrival.',
  },
]

export function ServicesGrid() {
  return (
    <section className="bg-surface-2 py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              End-to-End Study Abroad Support
            </h2>
          </div>
        </SectionFade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <SectionFade key={service.title} delay={i * 0.08}>
              <div className="bg-white rounded-card shadow-sm p-6 h-full group hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250">
                <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-body-lg mb-2">{service.title}</h3>
                <p className="text-text-secondary text-body-md">{service.description}</p>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
