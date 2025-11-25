import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  
  return (
    <Link href={`/authors/${author.slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center">
        {/* Avatar */}
        {avatar && (
          <img
            src={`${avatar.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
            alt={name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 group-hover:ring-4 ring-primary-100 transition-all"
          />
        )}
        
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        
        {/* Bio */}
        {bio && (
          <p className="text-gray-600 line-clamp-3">
            {bio}
          </p>
        )}
        
        {/* View Profile Link */}
        <div className="mt-4 flex items-center justify-center text-primary-600 font-medium">
          View profile
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  )
}