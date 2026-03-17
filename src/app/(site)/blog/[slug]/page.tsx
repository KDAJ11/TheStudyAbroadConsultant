import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Clock, ArrowLeft, MessageCircle } from 'lucide-react'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${SITE.url}/blog/${post.slug}`,
    },
  }
}

// MDX components
const components = {
  Callout: ({ type = 'info', children }: { type?: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
    const styles = {
      tip: 'bg-green-50 border-green-400 text-green-900',
      warning: 'bg-amber-50 border-amber-400 text-amber-900',
      info: 'bg-sky-50 border-sky-400 text-sky-900',
    }
    return (
      <div className={`border-l-4 rounded-badge p-4 my-6 ${styles[type]}`}>
        {children}
      </div>
    )
  },
  CostTable: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse bg-white rounded-card shadow-sm border border-surface-4">
        {children}
      </table>
    </div>
  ),
  WhatsAppCTA: ({ text = "Need help with your application?" }: { text?: string }) => (
    <div className="bg-surface-2 rounded-card p-6 my-8 text-center">
      <p className="font-display font-semibold text-navy-900 text-body-lg mb-3">{text}</p>
      <Button variant="primary" size="md" href={SITE.whatsapp} showWhatsAppIcon>
        Chat With Us on WhatsApp
      </Button>
    </div>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-display-sm font-display font-bold text-navy-900 mt-10 mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-body-lg font-display font-semibold text-navy-900 mt-8 mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-text-secondary text-body-md leading-relaxed mb-4" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 text-text-secondary text-body-md mb-4 ml-4" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 text-text-secondary text-body-md mb-4 ml-4" {...props}>{children}</ol>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="text-sky-500 hover:text-sky-600 underline underline-offset-2" {...props}>{children}</a>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6"><table className="w-full text-body-sm border-collapse" {...props}>{children}</table></div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 bg-navy-900 text-white text-left font-display font-semibold text-body-sm" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 border-b border-surface-4 text-text-secondary" {...props}>{children}</td>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-navy-900" {...props}>{children}</strong>
  ),
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3)

  const breadcrumbs = [
    { name: 'Home', url: SITE.url },
    { name: 'Blog', url: `${SITE.url}/blog` },
    { name: post.title, url: `${SITE.url}/blog/${post.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ title: post.title, description: post.excerpt, url: `${SITE.url}/blog/${post.slug}`, publishedAt: post.publishedAt, author: post.author })) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      <section className="bg-navy-900 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-body-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 rounded-badge bg-sky-500/20 text-sky-300 text-body-sm font-medium mb-4">
            {post.category}
          </span>
          <h1 className="text-display-xl font-display font-bold text-white">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-white/60 text-body-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readingTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-10 lg:gap-12">
            {/* Article */}
            <article className="lg:col-span-7 max-w-none">
              <MDXRemote source={post.content} components={components} />

              {/* Author card */}
              <div className="mt-12 pt-8 border-t border-surface-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-navy-900/10 flex items-center justify-center">
                    <span className="text-lg font-display font-bold text-navy-900">TSA</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-navy-900">{post.author}</p>
                    <p className="text-text-muted text-body-sm">Helping Nigerian students study abroad since 2014</p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 bg-brand-red rounded-card p-8 text-center">
                <h3 className="text-display-sm font-display font-bold text-white mb-3">
                  Ready to Take the Next Step?
                </h3>
                <p className="text-white/90 text-body-md mb-6">
                  Get expert, personalised guidance for your study abroad journey.
                </p>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-brand-red font-display font-bold rounded-btn px-6 py-3 text-body-md hover:scale-[1.02] transition-all min-h-[44px]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start Your Free Consultation
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-3 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-[100px] space-y-6">
                {/* WhatsApp CTA Box */}
                <div className="bg-surface-2 rounded-card p-6">
                  <h3 className="font-display font-semibold text-navy-900 text-body-md mb-3">Need Expert Guidance?</h3>
                  <p className="text-text-secondary text-body-sm mb-4">Chat with us on WhatsApp for a free consultation.</p>
                  <Button variant="whatsapp" size="md" href={SITE.whatsapp} showWhatsAppIcon className="w-full">
                    Chat Now
                  </Button>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-surface-2 rounded-card p-6">
                    <h3 className="font-display font-semibold text-navy-900 text-body-md mb-4">Related Articles</h3>
                    <div className="space-y-3">
                      {relatedPosts.map(rp => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block group">
                          <p className="text-body-sm font-medium text-navy-900 group-hover:text-sky-500 transition-colors line-clamp-2">{rp.title}</p>
                          <p className="text-text-muted text-body-sm mt-0.5">{rp.readingTime}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
