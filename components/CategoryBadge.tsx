interface CategoryBadgeProps {
  name: string
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ name, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  }
  
  return (
    <span className={`inline-block bg-primary-100 text-primary-700 font-medium rounded-full ${sizeClasses[size]} hover:bg-primary-200 transition-colors`}>
      {name}
    </span>
  )
}