import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])
  
  // Sort posts by created_at date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return dateB - dateA
  })
  
  const featuredPost = sortedPosts[0]
  const recentPosts = sortedPosts.slice(1)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insightful articles on technology, lifestyle, and more from our talented authors.
        </p>
      </section>
      
      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <CategoryBadge name={category.metadata.name} />
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
          <Link href={`/posts/${featuredPost.slug}`} className="block group">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {featuredPost.metadata?.featured_image && (
                <div className="aspect-[21/9] overflow-hidden">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    width={1400}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-8">
                {featuredPost.metadata?.category && (
                  <CategoryBadge name={featuredPost.metadata.category.metadata?.name || featuredPost.metadata.category.title} />
                )}
                <h3 className="text-3xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-primary-600 transition-colors">
                  {featuredPost.title}
                </h3>
                {featuredPost.metadata?.author && (
                  <div className="flex items-center gap-3">
                    {featuredPost.metadata.author.metadata?.avatar && (
                      <img
                        src={`${featuredPost.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={featuredPost.metadata.author.title}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="text-gray-600">
                      By {featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                    </span>
                  </div>
                )}
              </div>
            </article>
          </Link>
        </section>
      )}
      
      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
      
      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}