import { useParams, Link } from 'react-router-dom'
import { courses, tools } from '../data'

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

export default function CourseUnitDetail() {
  const { courseId, unitId } = useParams<{ courseId: string; unitId: string }>()
  const course = courses.find((c) => c.id === courseId)

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

  // 优先从 units 查找，否则按索引从 chapters 派生
  const unitFromUnits = course.units?.find((u) => u.id === unitId)
  const chIndex = !unitFromUnits ? parseInt(unitId ?? '') : -1
  const ch = !unitFromUnits && chIndex >= 0 ? course.chapters?.[chIndex] : undefined

  const unit = unitFromUnits ?? (ch ? {
    id: unitId!,
    title: ch.title,
    summary: ch.summary,
    knowledgePoints: ch.keyPoints,
    relatedTools: [],
    resources: [],
    acceptanceCriteria: [],
    exercises: ch.exercises,
    sourceBasis: undefined,
    resourceStatus: 'needs_review' as const,
  } : undefined) as typeof unitFromUnits

  if (!unit) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">学习单元不存在</p>
        <Link to={`/courses/${courseId}`} className="text-blue-600 text-sm hover:underline">
          ← 返回 {course.title}
        </Link>
      </div>
    )
  }

  const relatedTools = tools.filter((t) => unit.relatedTools?.includes(t.id))
  const unitNumber = unitFromUnits
    ? (course.units?.findIndex((u) => u.id === unitId) ?? -1) + 1
    : chIndex + 1
  const totalUnits = (course.units?.length ?? course.chapters?.length) ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to={`/courses/${courseId}`}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        ← 返回 {course.title}
      </Link>

      <div className="mb-6">
        {unitNumber && (
          <span className="text-xs text-gray-400">
            单元 {unitNumber} / {totalUnits}
          </span>
        )}
        <h1 className="text-xl font-bold text-gray-900 mt-1">{unit.title}</h1>
      </div>

      {unit.goal && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">学习目标</h2>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
            {unit.goal}
          </p>
        </section>
      )}

      {unit.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">内容概要</h2>
          <p className="text-sm text-gray-600">{unit.summary}</p>
        </section>
      )}

      {unit.knowledgePoints.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">核心知识点</h2>
          <div className="flex flex-wrap gap-1.5">
            {unit.knowledgePoints.map((kp) => (
              <span key={kp} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                {kp}
              </span>
            ))}
          </div>
        </section>
      )}

      {unit.exercises && unit.exercises.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">练习</h2>
          <ul className="space-y-1">
            {unit.exercises.map((ex) => (
              <li key={ex} className="flex gap-2 text-sm text-gray-600">
                <span className="text-gray-300 shrink-0">◦</span>
                {ex}
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联工具</h2>
          <div className="flex flex-wrap gap-1.5">
            {relatedTools.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {unit.resources.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">外部资源</h2>
          <div className="space-y-2">
            {unit.resources.map((r, j) => (
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

      {unit.acceptanceCriteria.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">验收标准</h2>
          <ul className="space-y-1">
            {unit.acceptanceCriteria.map((ac) => (
              <li key={ac} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 shrink-0">☐</span>
                {ac}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(unit.sourceBasis || unit.resourceStatus) && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">资源依据</h2>
          <div className="text-xs text-gray-500 space-y-1">
            {unit.sourceBasis && (
              <div className="flex gap-2">
                <span className="text-gray-400">来源：</span>
                <span>{unit.sourceBasis}</span>
              </div>
            )}
            {unit.resourceStatus && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">状态：</span>
                <span className={`px-1.5 py-0.5 rounded border ${STATUS_COLORS[unit.resourceStatus]}`}>
                  {STATUS_LABELS[unit.resourceStatus]}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          to={`/courses/${courseId}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← 返回 {course.title}
        </Link>
      </div>
    </div>
  )
}
