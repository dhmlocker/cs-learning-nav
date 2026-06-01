import { useParams, Link } from 'react-router-dom'
import { jobs, courses, projects } from '../data'

const STATUS_LABELS: Record<string, string> = {
  verified: '已验证',
  pending: '待验证',
  needs_review: '待审核',
}

const STATUS_COLORS: Record<string, string> = {
  verified: 'bg-green-50 text-green-600 border-green-200',
  pending: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  needs_review: 'bg-red-50 text-red-600 border-red-200',
}

const RES_TYPE_LABELS: Record<string, string> = {
  doc: '文档',
  tutorial: '教程',
  exercise: '练习',
  video: '视频',
  repo: '仓库',
}

export default function JobModuleDetail() {
  const { jobId, moduleId } = useParams<{ jobId: string; moduleId: string }>()
  const job = jobs.find((j) => j.id === jobId)

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">岗位不存在</p>
        <Link to="/jobs" className="text-blue-600 text-sm hover:underline">
          ← 返回岗位列表
        </Link>
      </div>
    )
  }

  const modFromModules = job.skillModules?.find((m) => m.id === moduleId)
  const lpIndex = !modFromModules ? parseInt(moduleId ?? '') : -1
  const lp = !modFromModules && lpIndex >= 0 ? job.learningPlan?.[lpIndex] : undefined

  const module = modFromModules ?? (lp ? {
    id: moduleId!,
    title: lp.phase,
    goal: lp.focus,
    summary: undefined,
    skills: [],
    relatedCourses: [],
    relatedProjects: [],
    resources: [],
    interviewQuestions: undefined,
    portfolioAdvice: undefined,
    acceptanceCriteria: [],
    sourceBasis: undefined,
    resourceStatus: 'needs_review' as const,
  } : undefined) as typeof modFromModules

  if (!module) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">能力模块不存在</p>
        <Link to={`/jobs/${jobId}`} className="text-blue-600 text-sm hover:underline">
          ← 返回 {job.title}
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => module.relatedCourses?.includes(c.id))
  const relatedProjects = projects.filter((p) => module.relatedProjects?.includes(p.id))
  const moduleIndex = modFromModules
    ? (job.skillModules?.findIndex((m) => m.id === moduleId) ?? -1)
    : lpIndex
  const moduleNumber = moduleIndex >= 0 ? moduleIndex + 1 : null
  const totalModules = (job.skillModules?.length ?? job.learningPlan?.length) ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to={`/jobs/${jobId}`}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        ← 返回 {job.title}
      </Link>

      <div className="mb-6">
        {moduleNumber && (
          <span className="text-xs text-gray-400">
            模块 {moduleNumber} / {totalModules}
          </span>
        )}
        <h1 className="text-xl font-bold text-gray-900 mt-1">{module.title}</h1>
      </div>

      {module.goal && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">能力目标</h2>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
            {module.goal}
          </p>
        </section>
      )}

      {module.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">模块说明</h2>
          <p className="text-sm text-gray-600">{module.summary}</p>
        </section>
      )}

      {module.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">具体技能点</h2>
          <div className="flex flex-wrap gap-1.5">
            {module.skills.map((s) => (
              <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {relatedCourses.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联课程</h2>
          <div className="flex flex-wrap gap-1.5">
            {relatedCourses.map((c) => (
              <Link
                key={c.id}
                to={`/courses/${c.id}`}
                className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联项目</h2>
          <div className="flex flex-wrap gap-1.5">
            {relatedProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {module.interviewQuestions && module.interviewQuestions.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">面试准备</h2>
          <ul className="space-y-1">
            {module.interviewQuestions.map((iq) => (
              <li key={iq} className="flex gap-2 text-sm text-gray-600">
                <span className="text-red-400 shrink-0">Q:</span>
                {iq}
              </li>
            ))}
          </ul>
        </section>
      )}

      {module.portfolioAdvice && module.portfolioAdvice.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">作品集建议</h2>
          <ul className="space-y-1">
            {module.portfolioAdvice.map((pa) => (
              <li key={pa} className="flex gap-2 text-sm text-gray-600">
                <span className="text-purple-400 shrink-0">✦</span>
                {pa}
              </li>
            ))}
          </ul>
        </section>
      )}

      {module.resources.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">外部资源</h2>
          <div className="space-y-2">
            {module.resources.map((r, j) => (
              <a
                key={j}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs p-2.5 rounded bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-500 shrink-0">
                  {RES_TYPE_LABELS[r.type] || r.type}
                </span>
                <span className="font-medium text-gray-800 flex-1 min-w-0">{r.title}</span>
                <span className="text-gray-400 shrink-0">{r.source}</span>
                <span className={`text-xs px-1 py-0 rounded border shrink-0 ${STATUS_COLORS[r.status]}`}>
                  {STATUS_LABELS[r.status]}
                </span>
                {r.isRequired && (
                  <span className="text-xs px-1 py-0 rounded bg-red-50 text-red-500 border border-red-100 shrink-0">必修</span>
                )}
                <span className="text-blue-400 shrink-0">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {module.acceptanceCriteria.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">验收标准</h2>
          <ul className="space-y-1">
            {module.acceptanceCriteria.map((ac) => (
              <li key={ac} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 shrink-0">☐</span>
                {ac}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(module.sourceBasis || module.resourceStatus) && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">资源依据</h2>
          <div className="text-xs text-gray-500 space-y-1">
            {module.sourceBasis && (
              <div className="flex gap-2">
                <span className="text-gray-400">来源：</span>
                <span>{module.sourceBasis}</span>
              </div>
            )}
            {module.resourceStatus && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">状态：</span>
                <span className={`px-1.5 py-0.5 rounded border ${STATUS_COLORS[module.resourceStatus]}`}>
                  {STATUS_LABELS[module.resourceStatus]}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          to={`/jobs/${jobId}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← 返回 {job.title}
        </Link>
      </div>
    </div>
  )
}
