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
      <h2 className="text-sm font-semibold text-slate-700 mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="inline-flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/50 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
