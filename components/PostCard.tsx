import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  showAuthor?: boolean
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Featured Image */}
        {featuredImage && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Category */}
          {category && (
            <div className="mb-3">
              <CategoryBadge name={category.metadata?.name || category.title} size="sm" />
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {/* Meta */}
          <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
            {showAuthor && author && (
              <div className="flex items-center gap-2">
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                    alt={author.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span>{author.metadata?.name || author.title}</span>
              </div>
            )}
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}