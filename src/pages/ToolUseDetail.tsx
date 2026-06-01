import { useParams, Link } from 'react-router-dom'
import { tools, courses } from '../data'

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

export default function ToolUseDetail() {
  const { toolId, useId } = useParams<{ toolId: string; useId: string }>()
  const tool = tools.find((t) => t.id === toolId)

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

  const usageFromScenarios = tool.usageScenarios?.find((u) => u.id === useId)
  const ucIndex = !usageFromScenarios ? parseInt(useId ?? '') : -1
  const uc = !usageFromScenarios && ucIndex >= 0 ? tool.useCases?.[ucIndex] : undefined

  const usage = usageFromScenarios ?? (uc ? {
    id: useId!,
    title: uc,
    knowledgePoints: [],
    relatedProjectTasks: [],
    relatedCourses: [],
    resources: [],
    acceptanceCriteria: [],
    sourceBasis: undefined,
    resourceStatus: 'needs_review' as const,
  } : undefined) as typeof usageFromScenarios

  if (!usage) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">使用场景不存在</p>
        <Link to={`/tools/${toolId}`} className="text-blue-600 text-sm hover:underline">
          ← 返回 {tool.name}
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => usage.relatedCourses?.includes(c.id))
  const usageNumber = usageFromScenarios
    ? (tool.usageScenarios?.findIndex((u) => u.id === useId) ?? -1) + 1
    : ucIndex + 1
  const totalUsages = (tool.usageScenarios?.length ?? tool.useCases?.length) ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to={`/tools/${toolId}`}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        ← 返回 {tool.name}
      </Link>

      <div className="mb-6">
        {usageNumber && (
          <span className="text-xs text-gray-400">
            用法 {usageNumber} / {totalUsages}
          </span>
        )}
        <h1 className="text-xl font-bold text-gray-900 mt-1">{usage.title}</h1>
      </div>

      {usage.problem && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">解决的问题</h2>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
            {usage.problem}
          </p>
        </section>
      )}

      {usage.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">场景说明</h2>
          <p className="text-sm text-gray-600">{usage.summary}</p>
        </section>
      )}

      {usage.knowledgePoints.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">涉及知识点</h2>
          <div className="flex flex-wrap gap-1.5">
            {usage.knowledgePoints.map((kp) => (
              <span key={kp} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                {kp}
              </span>
            ))}
          </div>
        </section>
      )}

      {usage.steps && usage.steps.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">最小操作流程</h2>
          <ul className="space-y-1">
            {usage.steps.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-500 font-medium shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
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
                className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-100 hover:bg-green-100 transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {usage.resources.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">外部资源</h2>
          <div className="space-y-2">
            {usage.resources.map((r, j) => (
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

      {usage.acceptanceCriteria.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">验收标准</h2>
          <ul className="space-y-1">
            {usage.acceptanceCriteria.map((ac) => (
              <li key={ac} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 shrink-0">☐</span>
                {ac}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(usage.sourceBasis || usage.resourceStatus) && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">资源依据</h2>
          <div className="text-xs text-gray-500 space-y-1">
            {usage.sourceBasis && (
              <div className="flex gap-2">
                <span className="text-gray-400">来源：</span>
                <span>{usage.sourceBasis}</span>
              </div>
            )}
            {usage.resourceStatus && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">状态：</span>
                <span className={`px-1.5 py-0.5 rounded border ${STATUS_COLORS[usage.resourceStatus]}`}>
                  {STATUS_LABELS[usage.resourceStatus]}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          to={`/tools/${toolId}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← 返回 {tool.name}
        </Link>
      </div>
    </div>
  )
}
