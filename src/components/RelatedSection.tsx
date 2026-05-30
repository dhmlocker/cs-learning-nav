import { Link } from 'react-router-dom'

interface RelatedItem {
  id: string
  label: string
  to: string
}

interface RelatedSectionProps {
  title: string
  items: RelatedItem[]
  className?: string
}

export default function RelatedSection({ title, items, className = 'mt-4' }: RelatedSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-base font-semibold text-gray-800 mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
