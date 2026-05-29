import { useParams, Link } from 'react-router-dom'
import { courses, tools, projects, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">课程不存在</p>
        <Link to="/courses" className="text-blue-600 text-sm hover:underline">
          ← 返回课程列表
        </Link>
      </div>
    )
  }

  const relatedTools = tools.filter((t) =>
    course.relatedTools.some((ref) => ref.toLowerCase() === t.name.toLowerCase())
  )
  const relatedProjects = projects.filter((p) => course.relatedProjects.includes(p.id))
  const relatedJobs = jobs.filter((j) => course.relatedJobs.includes(j.id))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/courses" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← 返回课程列表
      </Link>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[course.difficulty]}`}>
            {course.difficulty}
          </span>
          <span className="text-xs text-gray-400">{course.category}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-500">{course.description}</p>

        <div className="flex flex-wrap gap-1 mt-3">
          {course.tags.map((t) => (
            <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>

      {/* 面试问题 */}
      {course.interviewQuestions && course.interviewQuestions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">常见面试问题</h2>
          <ul className="space-y-2">
            {course.interviewQuestions.map((q, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-400 font-medium shrink-0">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">相关工具</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 相关项目 */}
      {relatedProjects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">相关项目</h2>
          <div className="flex flex-wrap gap-2">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 相关岗位 */}
      {relatedJobs.length > 0 && (
        <section className="mt-8 mb-4">
          <h2 className="text-base font-semibold text-gray-800 mb-3">相关岗位</h2>
          <div className="flex flex-wrap gap-2">
            {relatedJobs.map((j) => (
              <Link
                key={j.id}
                to={`/jobs/${j.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {j.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
