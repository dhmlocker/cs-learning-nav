import { useParams, Link } from 'react-router-dom'
import { projects, courses, tools } from '../data'

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

export default function ProjectTaskDetail() {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>()
  const project = projects.find((p) => p.id === projectId)

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

  const taskFromFlow = project.taskFlow?.find((t) => t.id === taskId)
  const idx = !taskFromFlow ? parseInt(taskId ?? '') : -1
  const fm = !taskFromFlow && idx >= 0 ? project.featureModules?.[idx] : undefined
  const ds = !taskFromFlow && !fm && idx >= 0 ? project.developmentSteps?.[idx] : undefined

  const task = taskFromFlow ?? (fm ? {
    id: taskId!,
    title: fm.title,
    goal: fm.description,
    deliverable: fm.tasks.join('；'),
    knowledgePoints: [],
    relatedCourses: [],
    relatedTools: [],
    resources: [],
    acceptanceCriteria: fm.tasks.map((t: string) => `完成：${t}`),
  } : ds ? {
    id: taskId!,
    title: ds.title,
    goal: ds.description,
    deliverable: ds.checklist.join('；'),
    knowledgePoints: [],
    relatedCourses: [],
    relatedTools: [],
    resources: [],
    acceptanceCriteria: ds.checklist,
  } : undefined) as typeof taskFromFlow

  if (!task) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">任务不存在</p>
        <Link to={`/projects/${projectId}`} className="text-blue-600 text-sm hover:underline">
          ← 返回 {project.title}
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => task.relatedCourses?.includes(c.id))
  const relatedTools = tools.filter((t) => task.relatedTools?.includes(t.id))

  // 任务序号
  const taskIndex = taskFromFlow
    ? (project.taskFlow?.findIndex((t) => t.id === taskId) ?? -1)
    : idx
  const taskNumber = taskIndex >= 0 ? taskIndex + 1 : null
  const totalTasks = taskFromFlow
    ? (project.taskFlow?.length ?? 0)
    : (fm ? (project.featureModules?.length ?? 0) : (project.developmentSteps?.length ?? 0))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 返回导航 */}
      <Link
        to={`/projects/${projectId}`}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        ← 返回 {project.title}
      </Link>

      {/* 任务标题区 */}
      <div className="mb-6">
        {taskNumber && (
          <span className="text-xs text-gray-400">
            任务 {taskNumber} / {totalTasks}
          </span>
        )}
        <h1 className="text-xl font-bold text-gray-900 mt-1">{task.title}</h1>
      </div>

      {/* 任务目标 */}
      {task.goal && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">任务目标</h2>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
            {task.goal}
          </p>
        </section>
      )}

      {/* 最小产出 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">最小产出</h2>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-sm text-blue-800">{task.deliverable}</p>
        </div>
      </section>

      {/* 具体知识点 */}
      {task.knowledgePoints.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">具体知识点</h2>
          <div className="flex flex-wrap gap-1.5">
            {task.knowledgePoints.map((kp) => (
              <span key={kp} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                {kp}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 关联课程 */}
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

      {/* 关联练习 */}
      {task.relatedExercises && task.relatedExercises.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">关联练习</h2>
          <ul className="space-y-1">
            {task.relatedExercises.map((ex) => (
              <li key={ex} className="flex gap-2 text-sm text-gray-600">
                <span className="text-gray-300 shrink-0">◦</span>
                {ex}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 关联工具 */}
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

      {/* 外部资源 */}
      {task.resources.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">外部资源</h2>
          <div className="space-y-2">
            {task.resources.map((r, j) => (
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
                {r.note && (
                  <span className="text-gray-400 shrink-0 hidden sm:inline">{r.note}</span>
                )}
                <span className="text-blue-400 shrink-0">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 验收标准 */}
      {task.acceptanceCriteria.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">验收标准</h2>
          <ul className="space-y-1">
            {task.acceptanceCriteria.map((ac) => (
              <li key={ac} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-400 shrink-0">☐</span>
                {ac}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 常见踩坑 */}
      {task.commonMistakes && task.commonMistakes.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">容易踩坑</h2>
          <ul className="space-y-1">
            {task.commonMistakes.map((cm) => (
              <li key={cm} className="flex gap-2 text-sm text-gray-500">
                <span className="text-orange-300 shrink-0">⚠</span>
                {cm}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 底部返回 */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link
          to={`/projects/${projectId}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← 返回 {project.title}
        </Link>
      </div>
    </div>
  )
}
