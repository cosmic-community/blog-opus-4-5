// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    notFound()
  }
  
  const posts = await getPostsByAuthor(author.id)
  
  // Sort posts by created_at date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return dateB - dateA
  })
  
  const avatar = author.metadata?.avatar
  const bio = author.metadata?.bio
  const name = author.metadata?.name || author.title
  
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
            <Link href="/authors" className="hover:text-primary-600 transition-colors">
              Authors
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">
            {name}
          </li>
        </ol>
      </nav>
      
      {/* Author Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {avatar && (
            <img
              src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {name}
            </h1>
            {bio && (
              <p className="text-xl text-gray-600 max-w-2xl">
                {bio}
              </p>
            )}
            <p className="text-gray-500 mt-4">
              {sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
        </div>
      </header>
      
      {/* Author's Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Posts by {name}
        </h2>
        {sortedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No posts by this author yet.</p>
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
      </section>
    </div>
  )
}