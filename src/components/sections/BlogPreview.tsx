import Link from 'next/link'
import { SectionFade } from '@/components/ui/SectionFade'
import { Clock, ArrowRight } from 'lucide-react'

const previewPosts = [
  {
    slug: 'study-in-canada-from-nigeria-2025',
    title: 'Study in Canada from Nigeria in 2025: Visas, Costs in Naira & Universities',
    excerpt: 'Everything Nigerian students need to know about studying in Canada — from IELTS requirements to PGWP work permits and the PR pathway.',
    category: 'Canada',
    categoryColor: 'bg-red-500',
    readTime: '8 min',
  },
  {
    slug: 'how-to-study-abroad-from-nigeria-2025',
    title: 'How to Study Abroad from Nigeria in 2025: A Step-by-Step Guide',
    excerpt: 'The complete roadmap for Nigerian students — choosing a destination, university applications, visa process, and pre-departure preparation.',
    category: 'Visa Guide',
    categoryColor: 'bg-sky-500',
    readTime: '9 min',
  },
  {
    slug: 'scholarships-for-nigerian-students-abroad-2025',
    title: 'Scholarships for Nigerian Students Abroad 2025: Fully Funded & Partially Funded',
    excerpt: 'Chevening, DAAD, Australia Awards, Fulbright, and 8 more scholarships — eligibility, deadlines, and how to apply from Nigeria.',
    category: 'Scholarships',
    categoryColor: 'bg-amber-500',
    readTime: '7 min',
  },
]

export function BlogPreview() {
  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Resources</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Latest Guides for Nigerian Students
            </h2>
          </div>
        </SectionFade>

        <div className="grid md:grid-cols-3 gap-6">
          {previewPosts.map((post, i) => (
            <SectionFade key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-white rounded-card shadow-sm border border-surface-4 overflow-hidden h-full flex flex-col hover:shadow-card-hover transition-shadow duration-250">
                  <div className={`h-1 ${post.categoryColor}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`inline-block self-start px-2.5 py-0.5 rounded-badge text-white text-body-sm font-medium ${post.categoryColor} mb-3`}>
                      {post.category}
                    </span>
                    <h3 className="font-display font-semibold text-navy-900 text-body-lg group-hover:text-sky-500 transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-body-sm flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-4">
                      <span className="flex items-center gap-1.5 text-text-muted text-body-sm">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-sky-500 text-body-sm font-medium group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
