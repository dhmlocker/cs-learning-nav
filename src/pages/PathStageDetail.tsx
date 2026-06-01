import { useParams, Link } from 'react-router-dom'
import { paths, courses, tools, projects } from '../data'

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

export default function PathStageDetail() {
  const { pathId, stageId } = useParams<{ pathId: string; stageId: string }>()
  const path = paths.find((p) => p.id === pathId)

  if (!path) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">学习路径不存在</p>
        <Link to="/paths" className="text-blue-600 text-sm hover:underline">
          ← 返回学习路径列表
        </Link>
      </div>
    )
  }

  const stageFromDetails = path.stageDetails?.find((s) => s.id === stageId)
  const lsIndex = !stageFromDetails ? parseInt(stageId ?? '') : -1
  const ls = !stageFromDetails && lsIndex >= 0 ? path.learningStages?.[lsIndex] : undefined

  const stage = stageFromDetails ?? (ls ? {
    id: stageId!,
    title: ls.name,
    goal: ls.goals[0],
    summary: ls.description,
    duration: undefined,
    courseIds: ls.courseIds,
    projectIds: ls.projectIds,
    toolIds: ls.toolIds,
    knowledgePoints: [],
    resources: [],
    outcomes: ls.goals,
    checklist: ls.checklist,
    sourceBasis: undefined,
    resourceStatus: 'needs_review' as const,
  } : undefined) as typeof stageFromDetails

  if (!stage) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">学习阶段不存在</p>
        <Link to={`/paths/${pathId}`} className="text-blue-600 text-sm hover:underline">
          ← 返回 {path.title}
        </Link>
      </div>
    )
  }

  const stageCourses = courses.filter((c) => stage.courseIds.includes(c.id))
  const stageProjects = projects.filter((p) => stage.projectIds.includes(p.id))
  const stageTools = tools.filter((t) => stage.toolIds.includes(t.id))
  const stageNumber = stageFromDetails
    ? (path.stageDetails?.findIndex((s) => s.id === stageId) ?? -1) + 1
    : lsIndex + 1
  const totalStages = (path.stageDetails?.length ?? path.learningStages?.length) ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to={`/paths/${pathId}`}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        ← 返回 {path.title}
      </Link>

      <div className="mb-6">
        {stageNumber && (
          <span className="text-xs text-gray-400">
            阶段 {stageNumber} / {totalStages}
          </span>
        )}
        <h1 className="text-xl font-bold text-gray-900 mt-1">{stage.title}</h1>
        {stage.duration && (
          <span className="text-xs text-gray-400 mt-1 inline-block">{stage.duration}</span>
        )}
      </div>

      {stage.goal && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">阶段目标</h2>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
            {stage.goal}
          </p>
        </section>
      )}

      {stage.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">阶段概要</h2>
          <p className="text-sm text-gray-600">{stage.summary}</p>
        </section>
      )}

      {stage.knowledgePoints.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">核心知识点</h2>
          <div className="flex flex-wrap gap-1.5">
            {stage.knowledgePoints.map((kp) => (
              <span key={kp} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                {kp}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 关联课程 */}
      {stageCourses.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联课程</h2>
          <div className="flex flex-wrap gap-1.5">
            {stageCourses.map((c) => (
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

      {/* 关联项目 */}
      {stageProjects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联项目</h2>
          <div className="flex flex-wrap gap-1.5">
            {stageProjects.map((p) => (
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

      {/* 关联工具 */}
      {stageTools.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联工具</h2>
          <div className="flex flex-wrap gap-1.5">
            {stageTools.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-100 hover:bg-green-100 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 阶段产出 */}
      {stage.outcomes.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">阶段产出</h2>
          <ul className="space-y-1">
            {stage.outcomes.map((o) => (
              <li key={o} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-400 shrink-0">✓</span>
                {o}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 外部资源 */}
      {stage.resources.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">外部资源</h2>
          <div className="space-y-2">
            {stage.resources.map((r, j) => (
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

      {/* 检查清单 */}
      {stage.checklist.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">完成检查清单</h2>
          <ul className="space-y-1">
            {stage.checklist.map((cl) => (
              <li key={cl} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 shrink-0">☐</span>
                {cl}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(stage.sourceBasis || stage.resourceStatus) && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">资源依据</h2>
          <div className="text-xs text-gray-500 space-y-1">
            {stage.sourceBasis && (
              <div className="flex gap-2">
                <span className="text-gray-400">来源：</span>
                <span>{stage.sourceBasis}</span>
              </div>
            )}
            {stage.resourceStatus && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">状态：</span>
                <span className={`px-1.5 py-0.5 rounded border ${STATUS_COLORS[stage.resourceStatus]}`}>
                  {STATUS_LABELS[stage.resourceStatus]}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          to={`/paths/${pathId}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← 返回 {path.title}
        </Link>
      </div>
    </div>
  )
}
