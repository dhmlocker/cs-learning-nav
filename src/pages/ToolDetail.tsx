import { useParams, Link } from 'react-router-dom'
import { tools, courses } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'

export default function ToolDetail() {
  const { id } = useParams<{ id: string }>()
  const tool = tools.find((t) => t.id === id)

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">工具不存在</p>
        <Link to="/tools" className="text-blue-600 text-sm hover:underline">
          ← 返回工具列表
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => tool.relatedCourses.includes(c.id))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/tools" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← 返回工具列表
      </Link>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-gray-400">{tool.category}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[tool.difficulty]}`}>
            {tool.difficulty}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h1>
        <p className="text-gray-500">{tool.description}</p>

        <div className="flex flex-wrap gap-1 mt-3">
          {tool.tags.map((t) => (
            <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>

      {/* 常见问题 */}
      {tool.faq && tool.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">常见问题</h2>
          <ul className="space-y-2">
            {tool.faq.map((q, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-400 font-medium shrink-0">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 相关课程 */}
      {relatedCourses.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">相关课程</h2>
          <div className="flex flex-wrap gap-2">
            {relatedCourses.map((c) => (
              <Link
                key={c.id}
                to={`/courses/${c.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
