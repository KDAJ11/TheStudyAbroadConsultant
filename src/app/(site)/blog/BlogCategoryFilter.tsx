'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { SectionFade } from '@/components/ui/SectionFade'
import type { BlogPost } from '@/lib/blog'

interface BlogCategoryFilterProps {
  posts: BlogPost[]
  categories: string[]
}

const categoryColors: Record<string, string> = {
  'General': 'bg-sky-500',
  'Canada': 'bg-red-500',
  'UK': 'bg-blue-700',
  'USA': 'bg-blue-900',
  'Germany': 'bg-yellow-600',
  'Ireland': 'bg-emerald-500',
  'Australia': 'bg-green-600',
  'Visa Guide': 'bg-sky-500',
  'Scholarships': 'bg-amber-500',
  'IELTS': 'bg-purple-500',
  'Costs': 'bg-teal-500',
}

export function BlogCategoryFilter({ posts, categories }: BlogCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 9

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <section className="bg-white py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => { setActiveCategory('All'); setPage(1) }}
            className={`px-4 py-2 rounded-pill text-body-sm font-medium transition-colors min-h-[36px] ${
              activeCategory === 'All' ? 'bg-navy-900 text-white' : 'bg-surface-3 text-text-secondary hover:bg-surface-4'
            }`}
          >
            All ({posts.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1) }}
              className={`px-4 py-2 rounded-pill text-body-sm font-medium transition-colors min-h-[36px] ${
                activeCategory === cat ? 'bg-navy-900 text-white' : 'bg-surface-3 text-text-secondary hover:bg-surface-4'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((post, i) => {
            const color = categoryColors[post.category] || 'bg-sky-500'
            return (
              <SectionFade key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="bg-white rounded-card shadow-sm border border-surface-4 overflow-hidden h-full flex flex-col hover:shadow-card-hover transition-shadow">
                    <div className={`h-1 ${color}`} />
                    <div className="p-6 flex flex-col flex-1">
                      <span className={`inline-block self-start px-2.5 py-0.5 rounded-badge text-white text-body-sm font-medium ${color} mb-3`}>
                        {post.category}
                      </span>
                      <h3 className="font-display font-semibold text-navy-900 text-body-lg group-hover:text-sky-500 transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-body-sm flex-1 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-4">
                        <span className="flex items-center gap-1.5 text-text-muted text-body-sm">
                          <Clock className="w-4 h-4" />{post.readingTime}
                        </span>
                        <span className="flex items-center gap-1 text-sky-500 text-body-sm font-medium group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </SectionFade>
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-btn font-display font-medium text-body-sm transition-colors ${
                  page === p ? 'bg-navy-900 text-white' : 'bg-surface-3 text-text-secondary hover:bg-surface-4'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
