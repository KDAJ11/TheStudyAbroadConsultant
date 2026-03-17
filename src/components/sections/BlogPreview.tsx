'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

const previewPosts = [
  {
    slug: 'study-in-canada-from-nigeria-2025',
    title: 'Study in Canada from Nigeria in 2025: Visas, Costs in Naira & Universities',
    category: 'CANADA',
    categoryColor: 'text-red-500',
    accentColor: '#FF0000',
    readTime: '8 min read',
  },
  {
    slug: 'how-to-study-abroad-from-nigeria-2025',
    title: 'How to Study Abroad from Nigeria in 2025: A Step-by-Step Guide',
    category: 'VISA GUIDE',
    categoryColor: 'text-sky-500',
    accentColor: '#2D7DD2',
    readTime: '9 min read',
  },
  {
    slug: 'scholarships-for-nigerian-students-abroad-2025',
    title: 'Scholarships for Nigerian Students Abroad 2025: Fully & Partially Funded',
    category: 'SCHOLARSHIPS',
    categoryColor: 'text-amber-500',
    accentColor: '#F59E0B',
    readTime: '7 min read',
  },
]

export function BlogPreview() {
  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Resources</p>
          <h2 className="text-display-lg font-display font-bold text-navy-900">
            From the Blog
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              aria-label={`Read article: ${post.title}`}
              className="group block h-full"
            >
              <article
                className="bg-white rounded-2xl border border-surface-4 overflow-hidden h-full flex flex-col transition-all duration-200 hover:-translate-y-[3px] hover:shadow-card-hover"
                style={{ borderTopWidth: '3px', borderTopColor: 'transparent' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = post.accentColor
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = 'transparent'
                }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <span className={`text-label uppercase tracking-widest ${post.categoryColor} mb-3`}>
                    {post.category}
                  </span>
                  <h3 className="font-display font-semibold text-navy-900 text-body-lg group-hover:text-sky-500 transition-colors mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-surface-4 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-text-muted text-body-sm">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-sky-500 text-body-sm font-medium group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            aria-label="View all blog articles"
            className="inline-flex items-center gap-1 text-sky-500 font-display font-semibold text-body-lg hover:text-sky-600 transition-colors hover:gap-2"
          >
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
