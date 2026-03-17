import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getFeaturedPost, getAllCategories } from '@/lib/blog'
import { SectionFade } from '@/components/ui/SectionFade'
import { Badge } from '@/components/ui/Badge'
import { Clock, ArrowRight } from 'lucide-react'
import { webPageSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { BlogCategoryFilter } from './BlogCategoryFilter'

export const metadata: Metadata = {
  title: 'Study Abroad Blog for Nigerian Students | Expert Guides & Resources',
  description: 'Expert guides and resources for Nigerian students planning to study abroad. Visa guides, cost breakdowns in Naira, scholarship updates, and destination insights.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featured = getFeaturedPost()
  const categories = getAllCategories()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema('Study Abroad Blog', metadata.description as string, `${SITE.url}/blog`)) }}
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-2xl font-display font-bold text-white">
            Study Abroad Blog for Nigerian Students
          </h1>
          <p className="mt-4 text-white/70 text-body-xl max-w-2xl mx-auto">
            Expert guides, cost breakdowns, visa tips, and scholarship updates — all written for Nigerian students.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="bg-white py-12 border-b border-surface-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionFade>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="bg-surface-2 rounded-card p-8 hover:shadow-card-hover transition-shadow">
                  <Badge variant="sky" className="mb-3">Featured</Badge>
                  <h2 className="text-display-md font-display font-bold text-navy-900 group-hover:text-sky-500 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-text-secondary text-body-lg max-w-2xl">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-body-sm text-text-muted">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readingTime}</span>
                    <span>{featured.category}</span>
                    <span className="flex items-center gap-1 text-sky-500 font-medium">Read Article <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </Link>
            </SectionFade>
          </div>
        </section>
      )}

      {/* Blog Grid with Category Filter */}
      <BlogCategoryFilter posts={posts} categories={categories} />
    </>
  )
}
