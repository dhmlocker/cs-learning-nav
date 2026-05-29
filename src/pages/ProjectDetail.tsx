import { useParams, Link } from 'react-router-dom'
import { projects, courses, tools, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">项目不存在</p>
        <Link to="/projects" className="text-blue-600 text-sm hover:underline">
          ← 返回项目列表
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => project.relatedCourses.includes(c.id))
  const relatedTools = tools.filter((t) =>
    project.relatedTools.some((ref) => ref.toLowerCase() === t.name.toLowerCase())
  )
  const relatedJobs = jobs.filter((j) => project.relatedJobs.includes(j.id))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/projects" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← 返回项目列表
      </Link>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-gray-400">{project.category}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
        <p className="text-gray-500">{project.description}</p>

        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.map((t) => (
            <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>

      {/* 项目亮点 */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">项目亮点</h2>
          <ul className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 font-medium shrink-0">{i + 1}.</span>
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 可扩展点 */}
      {project.extensions && project.extensions.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">可扩展点</h2>
          <ul className="space-y-1.5">
            {project.extensions.map((e, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-yellow-400 font-medium shrink-0">{i + 1}.</span>
                {e}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 面试讲法 */}
      {project.interviewTalkingPoints && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">面试讲法</h2>
          <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
            {project.interviewTalkingPoints}
          </p>
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

      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <section className="mt-6">
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

      {/* 相关岗位 */}
      {relatedJobs.length > 0 && (
        <section className="mt-6 mb-4">
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
