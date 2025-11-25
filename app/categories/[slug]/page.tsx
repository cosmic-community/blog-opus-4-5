// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(category.id)
  
  // Sort posts by created_at date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return dateB - dateA
  })
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/categories" className="hover:text-primary-600 transition-colors">
              Categories
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">
            {category.metadata.name}
          </li>
        </ol>
      </nav>
      
      {/* Header */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-3 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
          <span className="text-2xl">🏷️</span>
          <span className="font-medium">Category</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {category.metadata.name}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600 max-w-3xl">
            {category.metadata.description}
          </p>
        )}
        <p className="text-gray-500 mt-4">
          {sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>
      
      {/* Posts Grid */}
      {sortedPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">No posts in this category yet.</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      )}
    </div>
  )
}