interface QuestionListProps {
  title: string
  items: string[]
  colorClass?: string
  className?: string
}

export default function QuestionList({
  title,
  items,
  colorClass = 'text-brand-500',
  className = 'mt-8',
}: QuestionListProps) {
  return (
    <section className={`${className} border-t border-slate-100 pt-6`}>
      <h2 className="text-base font-semibold text-slate-800 mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
            <span className={`${colorClass} font-medium shrink-0`}>{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
