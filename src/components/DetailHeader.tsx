import { Link } from 'react-router-dom'

interface DetailHeaderProps {
  returnTo: string
  returnLabel: string
  title: string
  description: string
  tags?: string[]
  badges?: React.ReactNode
}

export default function DetailHeader({
  returnTo,
  returnLabel,
  title,
  description,
  tags,
  badges,
}: DetailHeaderProps) {
  return (
    <>
      <div className="pb-4 mb-6 border-b border-slate-100">
        <Link to={returnTo} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {returnLabel}
        </Link>
      </div>

      <div>
        {badges && <div className="mb-3">{badges}</div>}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-500 leading-relaxed">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
