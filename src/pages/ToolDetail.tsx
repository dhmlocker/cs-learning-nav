import { useParams, Link } from 'react-router-dom'
import { tools, courses } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import DetailHeader from '../components/DetailHeader'
import QuestionList from '../components/QuestionList'
import RelatedSection from '../components/RelatedSection'

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

  const courseItems = relatedCourses.map((c) => ({ id: c.id, label: c.title, to: `/courses/${c.id}` }))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DetailHeader
        returnTo="/tools"
        returnLabel="返回工具列表"
        title={tool.name}
        description={tool.description}
        tags={tool.tags}
        badges={
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-gray-400">{tool.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[tool.difficulty]}`}>
              {tool.difficulty}
            </span>
          </div>
        }
      />

      {tool.faq && tool.faq.length > 0 && (
        <QuestionList title="常见问题" items={tool.faq} />
      )}

      {courseItems.length > 0 && (
        <RelatedSection
          title="相关课程"
          items={courseItems}
          className="mt-8 border-t border-gray-100 pt-6"
        />
      )}
    </div>
  )
}
