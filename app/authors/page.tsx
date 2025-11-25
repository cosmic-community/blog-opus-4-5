import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export default async function AuthorsPage() {
  const authors = await getAuthors()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Our Authors
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the talented writers behind our content
        </p>
      </header>
      
      {/* Authors Grid */}
      {authors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No authors yet.</p>
        </div>
      )}
    </div>
  )
}