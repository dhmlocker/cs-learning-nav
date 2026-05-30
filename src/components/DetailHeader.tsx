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
      <div className="pb-3 mb-6 border-b border-gray-100">
        <Link to={returnTo} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
          ← {returnLabel}
        </Link>
      </div>

      <div className="mt-2">
        {badges}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
