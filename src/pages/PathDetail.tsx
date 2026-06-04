import { useParams, Link } from 'react-router-dom'
import { paths, courses, tools, projects, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import DetailHeader from '../components/DetailHeader'
import QuestionList from '../components/QuestionList'
import RelatedSection from '../components/RelatedSection'

export default function PathDetail() {
  const { id } = useParams<{ id: string }>()
  const path = paths.find((p) => p.id === id)

  if (!path) {
    return (
      <div className="content-container py-16 text-center">
        <p className="text-slate-400 text-lg mb-4">学习路径不存在</p>
        <Link to="/paths" className="link text-sm">← 返回学习路径</Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => (path.relatedCourses ?? []).includes(c.id))
  const relatedTools = tools.filter((t) => (path.relatedTools ?? []).includes(t.id))
  const relatedProjects = projects.filter((p) => (path.relatedProjects ?? []).includes(p.id))
  const relatedJobs = jobs.filter((j) => (path.relatedJobs ?? []).includes(j.id))

  const courseItems = relatedCourses.map((c) => ({ id: c.id, label: c.title, to: `/courses/${c.id}` }))
  const toolItems = relatedTools.map((t) => ({ id: t.id, label: t.name, to: `/tools/${t.id}` }))
  const projectItems = relatedProjects.map((p) => ({ id: p.id, label: p.title, to: `/projects/${p.id}` }))
  const jobItems = relatedJobs.map((j) => ({ id: j.id, label: j.title, to: `/jobs/${j.id}` }))

  type DirItem = { id: string; title: string; summary?: string; goal?: string; courses: number; projects: number }
  const stageDirectory: DirItem[] | null = path.stageDetails
    ? path.stageDetails.map((s) => ({ id: s.id, title: s.title, summary: s.goal, goal: s.goal, courses: s.courseIds.length, projects: s.projectIds.length }))
    : path.learningStages
      ? path.learningStages.map((ls, i) => ({ id: String(i), title: ls.name, summary: ls.description, goal: ls.goals[0], courses: ls.courseIds.length, projects: ls.projectIds.length }))
      : null
  const hasDirectory = stageDirectory !== null

  return (
    <div className="content-container py-8">
      <DetailHeader
        returnTo="/paths"
        returnLabel="返回学习路径列表"
        title={path.title}
        description={path.description}
        tags={path.tags}
        badges={
          <div className="flex items-center gap-3">
            {path.difficulty && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[path.difficulty]}`}>
                {path.difficulty}
              </span>
            )}
            <span className="text-xs text-slate-400">目标岗位：{path.targetJob}</span>
          </div>
        }
      />

      {/* 概览摘要卡片 */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-blue-700">{path.stages.length}</div>
          <div className="text-xs text-blue-500 mt-0.5">学习阶段</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-emerald-700">{courseItems.length}</div>
          <div className="text-xs text-emerald-500 mt-0.5">相关课程</div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-purple-700">{projectItems.length}</div>
          <div className="text-xs text-purple-500 mt-0.5">可做项目</div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-orange-700">{jobItems.length}</div>
          <div className="text-xs text-orange-500 mt-0.5">对应岗位</div>
        </div>
      </div>

      {/* 阶段学习顺序 */}
      <section className="mt-8">
        <h2 className="text-base font-semibold text-slate-800 mb-1">阶段学习顺序</h2>
        <p className="text-xs text-slate-400 mb-4">按以下顺序逐步学习，完成一个阶段后再进入下一阶段</p>
        <div className="space-y-0">
          {path.stages.map((s, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                {i < path.stages.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[16px] bg-brand-200 my-0.5" />
                )}
              </div>
              <div className={`flex-1 ${i < path.stages.length - 1 ? 'pb-4' : ''}`}>
                <div className="card p-4">
                  <div className="text-sm font-semibold text-slate-800 mb-2">{s.name}</div>
                  <ul className="space-y-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-slate-300 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 学习阶段目录 */}
      {hasDirectory && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">学习阶段</h2>
          <p className="text-xs text-slate-400 mb-6">
            共 {stageDirectory!.length} 个阶段，点击查看详细知识点、关联资源和验收标准。
          </p>
          <div className="space-y-0">
            {stageDirectory!.map((item, i) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                  {i < stageDirectory!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-emerald-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < stageDirectory!.length - 1 ? 'pb-4' : ''}`}>
                  <Link
                    to={`/paths/${path.id}/stages/${item.id}`}
                    className="block card-hover p-4 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.summary}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          {item.courses > 0 && <span className="text-xs text-slate-400">{item.courses} 门课程</span>}
                          {item.projects > 0 && <span className="text-xs text-slate-400">{item.projects} 个项目</span>}
                        </div>
                      </div>
                      <span className="text-xs text-emerald-600 border border-emerald-200 bg-emerald-50 px-2 py-1 rounded-md group-hover:bg-emerald-100 transition-colors shrink-0 font-medium">
                        查看阶段 →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 旧版详细学习计划（无目录时展示） */}
      {!hasDirectory && path.learningStages && path.learningStages.length > 0 && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">详细学习计划</h2>
          <p className="text-xs text-slate-400 mb-4">每个阶段的具体目标、关联资源和完成检查清单</p>
          <div className="space-y-0">
            {path.learningStages.map((ls, i) => {
              const lsCourses = courses.filter((c) => ls.courseIds.includes(c.id))
              const lsProjects = projects.filter((p) => ls.projectIds.includes(p.id))
              const lsTools = tools.filter((t) => ls.toolIds.includes(t.id))
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </div>
                    {i < path.learningStages!.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[16px] bg-emerald-200 my-0.5" />
                    )}
                  </div>
                  <div className={`flex-1 ${i < path.learningStages!.length - 1 ? 'pb-4' : ''}`}>
                    <div className="card p-4">
                      <div className="text-sm font-semibold text-slate-800 mb-1">
                        {ls.name}
                        {ls.duration && (
                          <span className="ml-2 text-xs font-normal text-slate-400">({ls.duration})</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{ls.description}</p>

                      {(lsCourses.length > 0 || lsProjects.length > 0 || lsTools.length > 0) && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {lsCourses.map((c) => (
                            <Link key={c.id} to={`/courses/${c.id}`}
                              className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
                              📖 {c.title}
                            </Link>
                          ))}
                          {lsProjects.map((p) => (
                            <Link key={p.id} to={`/projects/${p.id}`}
                              className="text-xs px-2 py-0.5 rounded bg-purple-50 text-purple-600 hover:bg-purple-100 font-medium">
                              🔧 {p.title}
                            </Link>
                          ))}
                          {lsTools.map((t) => (
                            <Link key={t.id} to={`/tools/${t.id}`}
                              className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-medium">
                              🛠 {t.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      <div className="mb-2">
                        <span className="text-xs text-slate-400 font-medium">学习目标</span>
                        <ul className="mt-1 space-y-0.5">
                          {ls.goals.map((g) => (
                            <li key={g} className="flex gap-1.5 text-xs text-slate-600">
                              <span className="text-emerald-400 shrink-0">✓</span>
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400 font-medium">完成检查清单</span>
                        <ul className="mt-1 space-y-0.5">
                          {ls.checklist.map((cl) => (
                            <li key={cl} className="flex gap-1.5 text-xs text-slate-600">
                              <span className="text-emerald-400 shrink-0">☐</span>
                              {cl}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {ls.externalResources && ls.externalResources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <span className="text-xs text-slate-400 font-medium mb-2 block">
                            学什么 → 去哪里学 → 做什么练习 → 做什么项目 → 如何验收
                          </span>
                          <div className="space-y-1.5">
                            {ls.externalResources.map((r, j) => (
                              <a
                                key={j}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 text-xs p-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-100 hover:border-brand-200 transition-colors"
                              >
                                <span className="shrink-0 mt-0.5">
                                  {r.type === 'course' ? '📖' : r.type === 'tutorial' ? '📝' : r.type === 'exercise' ? '🏋' : r.type === 'project' ? '🔧' : '📚'}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-medium text-slate-800 truncate">{r.title}</span>
                                    {r.isRequired ? (
                                      <span className="text-xs px-1 py-0 rounded bg-red-50 text-red-500 shrink-0">必修</span>
                                    ) : (
                                      <span className="text-xs px-1 py-0 rounded bg-slate-100 text-slate-400 shrink-0">选修</span>
                                    )}
                                  </div>
                                  <span className="text-slate-400">{r.source}</span>
                                  {r.note && <span className="text-slate-500 ml-1">— {r.note}</span>}
                                </div>
                                <span className="text-brand-400 shrink-0 mt-0.5">↗</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 最终成果 */}
      {path.finalOutcomes && path.finalOutcomes.length > 0 && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">完成后你将具备</h2>
          <ul className="space-y-2">
            {path.finalOutcomes.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="text-brand-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 可放入作品集的项目 */}
      {path.portfolioProjects && path.portfolioProjects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">可放入作品集的项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {path.portfolioProjects.map((pp, i) => (
              <div key={i} className="card p-4">
                <div className="text-sm font-semibold text-slate-800 mb-1">{pp.title}</div>
                <p className="text-xs text-slate-500 mb-2">{pp.description}</p>
                <div className="flex flex-wrap gap-1">
                  {pp.techStack.map((ts) => (
                    <span key={ts} className="tag">{ts}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 求职准备 */}
      {path.jobReadiness && path.jobReadiness.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">求职准备清单</h2>
          <ul className="space-y-1.5">
            {path.jobReadiness.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="text-orange-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 border-t border-slate-100" />

      {courseItems.length > 0 && (
        <RelatedSection title="相关课程" items={courseItems} className="mt-6" />
      )}
      {toolItems.length > 0 && (
        <RelatedSection title="相关工具" items={toolItems} className="mt-6" />
      )}
      {projectItems.length > 0 && (
        <RelatedSection title="可做项目" items={projectItems} className="mt-6" />
      )}
      {jobItems.length > 0 && (
        <RelatedSection title="对应岗位" items={jobItems} className="mt-6" />
      )}

      {path.interviewQuestions && path.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={path.interviewQuestions} />
      )}
    </div>
  )
}
