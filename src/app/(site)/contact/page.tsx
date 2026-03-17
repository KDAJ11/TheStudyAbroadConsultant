import type { Metadata } from 'next'
import { MessageCircle, Mail, Send } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'
import { Button } from '@/components/ui/Button'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { SITE } from '@/lib/constants'
import { localBusinessSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: "Contact Us | The Study Abroad Consultant Nigeria",
  description: "Get in touch with Nigeria's most trusted study abroad consultant. Free consultation via WhatsApp, email, or our contact form. We respond within 24 hours.",
}

const contactFAQs = [
  { question: 'Is the first consultation really free?', answer: 'Yes — your initial consultation is completely free with no obligation. We\'ll discuss your goals, qualifications, and budget to determine the best path forward.' },
  { question: 'How quickly do you respond?', answer: 'We typically respond to WhatsApp messages within 2–4 hours during business hours (Mon–Fri, 9am–6pm WAT). Email responses within 24 hours.' },
  { question: 'Do I need to have my IELTS before contacting you?', answer: 'No. Many of our students contact us before taking IELTS. We can advise on target scores for your preferred destinations and recommend preparation strategies.' },
  { question: 'Can I use your services from outside Lagos?', answer: 'Absolutely. We work with students across Nigeria and our entire process can be conducted remotely via WhatsApp, email, and video calls.' },
  { question: 'What documents should I have ready for my first consultation?', answer: 'Just bring your academic records (WAEC, transcripts, degree certificate if applicable) and a rough idea of your budget. We\'ll guide you on everything else.' },
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(contactFAQs)) }}
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            Let&apos;s Talk About Your Journey
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-xl mx-auto">
            Your first consultation is free. No pressure, no commitment.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-white py-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <SectionFade delay={0}>
              <div className="bg-white rounded-card p-8 text-center ring-2 ring-brand-green/30 shadow-card h-full flex flex-col">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-brand-green" />
                </div>
                <h2 className="font-display font-semibold text-navy-900 text-body-lg mb-2">WhatsApp</h2>
                <p className="text-text-secondary text-body-sm mb-2">Fastest response — usually within 2 hours</p>
                <p className="text-navy-900 font-display font-medium text-body-md mb-4">{SITE.phone}</p>
                <div className="mt-auto">
                  <Button variant="whatsapp" size="md" href={SITE.whatsapp} showWhatsAppIcon className="w-full">
                    Chat Now
                  </Button>
                </div>
              </div>
            </SectionFade>

            <SectionFade delay={0.1}>
              <div className="bg-white rounded-card p-8 text-center border border-surface-4 shadow-sm h-full flex flex-col">
                <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-sky-500" />
                </div>
                <h2 className="font-display font-semibold text-navy-900 text-body-lg mb-2">Email</h2>
                <p className="text-text-secondary text-body-sm mb-2">We respond within 24 hours</p>
                <a href={`mailto:${SITE.email}`} className="text-sky-500 font-medium text-body-sm break-all mb-4">
                  {SITE.email}
                </a>
                <div className="mt-auto">
                  <Button variant="secondary" size="md" href={`mailto:${SITE.email}`} icon={<Mail className="w-4 h-4" />} className="w-full">
                    Send Email
                  </Button>
                </div>
              </div>
            </SectionFade>

            <SectionFade delay={0.2}>
              <div className="bg-white rounded-card p-8 text-center border border-surface-4 shadow-sm h-full flex flex-col">
                <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-sky-500" />
                </div>
                <h2 className="font-display font-semibold text-navy-900 text-body-lg mb-2">Contact Form</h2>
                <p className="text-text-secondary text-body-sm mb-4">Leave your details and we&apos;ll reach out</p>
                <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-3 mt-auto">
                  <label htmlFor="name" className="sr-only">Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-btn border border-surface-4 bg-surface-3 text-navy-900 text-body-sm placeholder:text-text-muted focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none min-h-[44px]"
                  />
                  <label htmlFor="email" className="sr-only">Your email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 rounded-btn border border-surface-4 bg-surface-3 text-navy-900 text-body-sm placeholder:text-text-muted focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none min-h-[44px]"
                  />
                  <label htmlFor="message" className="sr-only">Your message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your study abroad plans..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-btn border border-surface-4 bg-surface-3 text-navy-900 text-body-sm placeholder:text-text-muted focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none resize-none"
                  />
                  <Button variant="primary" size="md" type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </SectionFade>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="bg-surface-2 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
          <SectionFade>
            <div className="bg-white rounded-card shadow-sm p-6">
              <h3 className="font-display font-semibold text-navy-900 text-body-lg mb-3">Business Hours</h3>
              <div className="space-y-1 text-text-secondary text-body-sm">
                <p>Monday – Friday: 9:00 AM – 6:00 PM (WAT)</p>
                <p>Saturday: 10:00 AM – 2:00 PM (WAT)</p>
                <p>Sunday: Closed</p>
              </div>
              <p className="text-text-muted text-body-sm mt-3">WhatsApp messages received outside hours are answered next business day.</p>
            </div>
          </SectionFade>
        </div>
      </section>

      <FAQAccordion
        faqs={contactFAQs}
        title="Common Questions"
        className="bg-white"
      />

      {/* Reassurance */}
      <section className="bg-surface-2 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionFade>
            <h2 className="text-display-md font-display font-bold text-navy-900 mb-4">Still Not Sure?</h2>
            <p className="text-text-secondary text-body-lg mb-6">
              We understand this is a big decision. That&apos;s why your first consultation is free — no forms to fill, no commitment. Just a conversation about your goals.
            </p>
            <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon>
              Start a Free Conversation
            </Button>
          </SectionFade>
        </div>
      </section>
    </>
  )
}
