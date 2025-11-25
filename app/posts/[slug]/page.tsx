// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import CategoryBadge from '@/components/CategoryBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const content = post.metadata?.content || ''
  
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          {category && (
            <>
              <li>
                <Link 
                  href={`/categories/${category.slug}`} 
                  className="hover:text-primary-600 transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              </li>
              <li>/</li>
            </>
          )}
          <li className="text-gray-900 font-medium truncate max-w-xs">
            {post.title}
          </li>
        </ol>
      </nav>
      
      {/* Header */}
      <header className="mb-8">
        {category && (
          <Link href={`/categories/${category.slug}`}>
            <CategoryBadge name={category.metadata?.name || category.title} />
          </Link>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6">
          {post.title}
        </h1>
        
        {/* Author and Date */}
        <div className="flex items-center gap-4">
          {author && (
            <Link 
              href={`/authors/${author.slug}`}
              className="flex items-center gap-3 group"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {author.metadata?.name || author.title}
                </p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </Link>
          )}
          {!author && (
            <p className="text-gray-500">{formattedDate}</p>
          )}
        </div>
      </header>
      
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1600}
            height={800}
            className="w-full h-auto"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      {/* Author Bio */}
      {author && author.metadata?.bio && (
        <div className="mt-12 p-6 bg-gray-100 rounded-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About the Author</h3>
          <Link 
            href={`/authors/${author.slug}`}
            className="flex items-start gap-4 group"
          >
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={author.title}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                {author.metadata?.name || author.title}
              </p>
              <p className="text-gray-600 mt-1">{author.metadata.bio}</p>
            </div>
          </Link>
        </div>
      )}
      
      {/* Back to Blog */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
  )
}