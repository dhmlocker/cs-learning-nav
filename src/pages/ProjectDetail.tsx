import { useParams, Link } from 'react-router-dom'
import { projects, courses, tools, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import DetailHeader from '../components/DetailHeader'
import RelatedSection from '../components/RelatedSection'

const STATUS_LABELS: Record<string, string> = {
  verified: '已验证',
  pending: '待验证',
  needs_review: '待审核',
}

const STATUS_COLORS: Record<string, string> = {
  verified: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  needs_review: 'bg-red-50 text-red-600 border-red-200',
}


export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="content-container py-16 text-center">
        <p className="text-slate-400 text-lg mb-4">项目不存在</p>
        <Link to="/projects" className="link text-sm">← 返回项目列表</Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => project.relatedCourses.includes(c.id))
  const relatedTools = tools.filter((t) => project.relatedTools.includes(t.id))
  const relatedJobs = jobs.filter((j) => project.relatedJobs.includes(j.id))

  const courseItems = relatedCourses.map((c) => ({ id: c.id, label: c.title, to: `/courses/${c.id}` }))
  const toolItems = relatedTools.map((t) => ({ id: t.id, label: t.name, to: `/tools/${t.id}` }))
  const jobItems = relatedJobs.map((j) => ({ id: j.id, label: j.title, to: `/jobs/${j.id}` }))

  type DirItem = { id: string; title: string; summary?: string; count: number }
  const taskDirectory: DirItem[] | null = project.taskFlow
    ? project.taskFlow.map((t) => ({ id: t.id, title: t.title, summary: t.deliverable, count: t.knowledgePoints.length }))
    : project.featureModules
      ? project.featureModules.map((fm, i) => ({ id: String(i), title: fm.title, summary: fm.description, count: fm.tasks.length }))
      : project.developmentSteps
        ? project.developmentSteps.map((ds, i) => ({ id: String(i), title: ds.title, summary: ds.description, count: ds.checklist.length }))
        : null
  const hasDirectory = taskDirectory !== null
  const directoryLabel = project.taskFlow ? '任务流程' : project.featureModules ? '功能模块' : '开发步骤'
  const directoryUnit = project.taskFlow ? '个任务' : project.featureModules ? '个模块' : '个步骤'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <DetailHeader
        returnTo="/projects"
        returnLabel="返回项目列表"
        title={project.title}
        description={project.description}
        tags={project.tags}
        badges={
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-slate-400">{project.category}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[project.difficulty]}`}>
              {project.difficulty}
            </span>
            {hasDirectory && (
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                项目驱动学习
              </span>
            )}
          </div>
        }
      />

      {/* 项目概览信息 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.finalOutcome && (
          <div className="bg-brand-50/50 border border-brand-100 rounded-xl p-5">
            <div className="text-xs text-brand-400 font-medium mb-1">最终产出</div>
            <p className="text-sm text-brand-800">{project.finalOutcome}</p>
          </div>
        )}
        <div className="space-y-3">
          {project.sourceBasis && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-slate-400">来源依据：</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{project.sourceBasis}</span>
            </div>
          )}
          {project.resourceStatus && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-slate-400">资源状态：</span>
              <span className={`px-1.5 py-0.5 rounded border text-xs font-medium ${STATUS_COLORS[project.resourceStatus]}`}>
                {STATUS_LABELS[project.resourceStatus]}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 适合人群 + 前置要求 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.targetUsers && project.targetUsers.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-2">适合人群</h2>
            <ul className="space-y-1">
              {project.targetUsers.map((item, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-600">
                  <span className="text-slate-300 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.prerequisites && project.prerequisites.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-2">前置要求</h2>
            <ul className="space-y-1">
              {project.prerequisites.map((item, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-600">
                  <span className="text-brand-400 shrink-0 font-medium">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 统一目录 */}
      {hasDirectory && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">{directoryLabel}</h2>
          <p className="text-xs text-slate-400 mb-6">
            共 {taskDirectory!.length} {directoryUnit}，按顺序完成。点击查看每个任务的详细知识点、资源和验收标准。
          </p>
          <div className="space-y-0">
            {taskDirectory!.map((item, i) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                  {i < taskDirectory!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-brand-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < taskDirectory!.length - 1 ? 'pb-4' : ''}`}>
                  <Link
                    to={`/projects/${project.id}/tasks/${item.id}`}
                    className="block card-hover p-4 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.summary}</p>
                        )}
                        {item.count > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-slate-400">{item.count} 个检查项</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-brand-600 border border-brand-200 bg-brand-50 px-2 py-1 rounded-md group-hover:bg-brand-100 transition-colors shrink-0 font-medium">
                        查看任务 →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 旧版详细内容（无目录时展示） */}
      {!hasDirectory && (
        <>
          {project.projectGoals && project.projectGoals.length > 0 && (
            <section className="mt-8">
              <h2 className="text-base font-semibold text-slate-800 mb-3">项目目标</h2>
              <ul className="space-y-2">
                {project.projectGoals.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.featureModules && project.featureModules.length > 0 && (
            <section className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-base font-semibold text-slate-800 mb-1">功能模块</h2>
              <p className="text-xs text-slate-400 mb-4">将项目拆解为若干独立模块，每个模块可单独开发和测试</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.featureModules.map((m, i) => (
                  <div key={i} className="card p-4">
                    <div className="text-sm font-semibold text-slate-800 mb-1">{m.title}</div>
                    <p className="text-xs text-slate-500 mb-3">{m.description}</p>
                    <ul className="space-y-0.5">
                      {m.tasks.map((t) => (
                        <li key={t} className="flex gap-1.5 text-xs text-slate-600">
                          <span className="text-brand-300 shrink-0">◦</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.developmentSteps && project.developmentSteps.length > 0 && (
            <section className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-base font-semibold text-slate-800 mb-1">开发步骤</h2>
              <p className="text-xs text-slate-400 mb-4">按以下顺序逐步实现，每步完成后检查清单确认质量</p>
              <div className="space-y-0">
                {project.developmentSteps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                        {i + 1}
                      </div>
                      {i < project.developmentSteps!.length - 1 && (
                        <div className="w-0.5 flex-1 min-h-[16px] bg-brand-200 my-0.5" />
                      )}
                    </div>
                    <div className={`flex-1 ${i < project.developmentSteps!.length - 1 ? 'pb-4' : ''}`}>
                      <div className="card p-4">
                        <div className="text-sm font-semibold text-slate-800 mb-1">{step.title}</div>
                        <p className="text-xs text-slate-500 mb-3">{step.description}</p>
                        <div>
                          <span className="text-xs text-slate-400 font-medium">完成检查清单</span>
                          <ul className="mt-1 space-y-0.5">
                            {step.checklist.map((cl) => (
                              <li key={cl} className="flex gap-1.5 text-xs text-slate-600">
                                <span className="text-emerald-400 shrink-0">☐</span>
                                {cl}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.acceptanceCriteria && project.acceptanceCriteria.length > 0 && (
            <section className="mt-6">
              <h2 className="text-base font-semibold text-slate-800 mb-3">验收标准</h2>
              <ul className="space-y-1.5">
                {project.acceptanceCriteria.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-emerald-600 font-medium shrink-0">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {/* 关联内容 */}
      {courseItems.length > 0 && (
        <RelatedSection
          title="相关课程"
          items={courseItems}
          className="mt-8 border-t border-slate-100 pt-6"
        />
      )}
      {toolItems.length > 0 && (
        <RelatedSection title="相关工具" items={toolItems} />
      )}
      {jobItems.length > 0 && (
        <RelatedSection title="相关岗位" items={jobItems} className="mt-4 mb-4" />
      )}
    </div>
  )
}
