import { useParams, Link } from 'react-router-dom'
import { paths, courses, tools, projects, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'

export default function PathDetail() {
  const { id } = useParams<{ id: string }>()
  const path = paths.find((p) => p.id === id)

  if (!path) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">学习路径不存在</p>
        <Link to="/paths" className="text-blue-600 text-sm hover:underline">
          ← 返回学习路径
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => (path.relatedCourses ?? []).includes(c.id))
  const relatedTools = tools.filter((t) =>
    (path.relatedTools ?? []).some((ref) => ref.toLowerCase() === t.name.toLowerCase())
  )
  const relatedProjects = projects.filter((p) => (path.relatedProjects ?? []).includes(p.id))
  const relatedJobs = jobs.filter((j) => (path.relatedJobs ?? []).includes(j.id))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/paths" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
        ← 返回学习路径
      </Link>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-3">
          {path.difficulty && (
            <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[path.difficulty]}`}>
              {path.difficulty}
            </span>
          )}
          <span className="text-xs text-gray-400">目标岗位：{path.targetJob}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{path.title}</h1>
        <p className="text-gray-500">{path.description}</p>

        {path.tags && path.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {path.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* 阶段内容 */}
      <section className="mt-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">学习阶段</h2>
        <div className="space-y-4">
          {path.stages.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-600 mb-2">
                阶段 {i + 1}：{s.name}
              </div>
              <ul className="space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-gray-300 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 面试问题 */}
      {path.interviewQuestions && path.interviewQuestions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">常见面试问题</h2>
          <ul className="space-y-2">
            {path.interviewQuestions.map((q, i) => (
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

      {/* 相关项目 */}
      {relatedProjects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">相关项目</h2>
          <div className="flex flex-wrap gap-2">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
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
