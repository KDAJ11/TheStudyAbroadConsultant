import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

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

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)

      return {
        title: data.title || '',
        slug: data.slug || file.replace('.mdx', ''),
        excerpt: data.excerpt || '',
        category: data.category || '',
        tags: data.tags || [],
        author: data.author || 'The Study Abroad Consultant',
        publishedAt: data.publishedAt || '',
        featured: data.featured || false,
        ogImage: data.ogImage || '',
        content,
        readingTime: stats.text,
      }
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find(p => p.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getFeaturedPost(): BlogPost | undefined {
  return getAllPosts().find(p => p.featured)
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  return Array.from(new Set(posts.map(p => p.category)))
}
