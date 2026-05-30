import { useParams, Link } from 'react-router-dom'
import { jobs, courses, tools, projects } from '../data'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const job = jobs.find((j) => j.id === id)

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">岗位不存在</p>
        <Link to="/jobs" className="text-blue-600 text-sm hover:underline">
          ← 返回岗位地图
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => job.relatedCourses.includes(c.id))
  const relatedTools = tools.filter((t) =>
    job.relatedTools.includes(t.id)
  )
  const relatedProjects = projects.filter((p) =>
    (job.relatedProjects ?? []).includes(p.id)
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="pb-3 mb-6 border-b border-gray-100">
        <Link to="/jobs" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
          ← 返回岗位列表
        </Link>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-400">{job.category}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <p className="text-gray-500">{job.description}</p>

        <div className="flex flex-wrap gap-1 mt-3">
          {job.tags.map((t) => (
            <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>

      {/* 核心能力 */}
      {job.skills && job.skills.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">核心能力</h2>
          <ul className="space-y-1.5">
            {job.skills.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 font-medium shrink-0">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 典型任务 */}
      {job.tasks && job.tasks.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">典型任务</h2>
          <ul className="space-y-1.5">
            {job.tasks.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-yellow-400 font-medium shrink-0">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 面试问题 */}
      {job.interviewQuestions && job.interviewQuestions.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">常见面试问题</h2>
          <ul className="space-y-2">
            {job.interviewQuestions.map((q, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-400 font-medium shrink-0">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 关联内容 */}
      {relatedCourses.length > 0 && (
        <section className="mt-6 border-t border-gray-100 pt-6">
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
        <section className="mt-4">
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
        <section className="mt-4 mb-4">
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
    </div>
  )
}
