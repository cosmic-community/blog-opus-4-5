import { getCategories } from '@/lib/cosmic'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getCategories()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Categories
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our content organized by topic
        </p>
      </header>
      
      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-2xl">🏷️</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.metadata.name}
                </h2>
              </div>
              {category.metadata?.description && (
                <p className="text-gray-600 line-clamp-2">
                  {category.metadata.description}
                </p>
              )}
              <div className="mt-4 flex items-center text-primary-600 font-medium">
                View posts
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No categories yet.</p>
        </div>
      )}
    </div>
  )
}