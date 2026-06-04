import { useParams, Link } from 'react-router-dom'
import { courses, tools, projects, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import DetailHeader from '../components/DetailHeader'
import QuestionList from '../components/QuestionList'
import RelatedSection from '../components/RelatedSection'

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <div className="content-container py-16 text-center">
        <p className="text-slate-400 text-lg mb-4">课程不存在</p>
        <Link to="/courses" className="link text-sm">
          ← 返回课程列表
        </Link>
      </div>
    )
  }

  const relatedTools = tools.filter((t) => course.relatedTools.includes(t.id))
  const relatedProjects = projects.filter((p) => course.relatedProjects.includes(p.id))
  const relatedJobs = jobs.filter((j) => course.relatedJobs.includes(j.id))

  const toolItems = relatedTools.map((t) => ({ id: t.id, label: t.name, to: `/tools/${t.id}` }))
  const projectItems = relatedProjects.map((p) => ({ id: p.id, label: p.title, to: `/projects/${p.id}` }))
  const jobItems = relatedJobs.map((j) => ({ id: j.id, label: j.title, to: `/jobs/${j.id}` }))

  const hasStats = toolItems.length > 0 || projectItems.length > 0 || jobItems.length > 0

  type DirItem = { id: string; title: string; summary?: string; count: number }
  const unitDirectory: DirItem[] | null = course.units
    ? course.units.map((u) => ({ id: u.id, title: u.title, summary: u.summary, count: u.knowledgePoints.length }))
    : course.chapters
      ? course.chapters.map((ch, i) => ({ id: String(i), title: ch.title, summary: ch.summary, count: ch.keyPoints.length }))
      : null
  const hasDirectory = unitDirectory !== null

  return (
    <div className="content-container py-8">
      <DetailHeader
        returnTo="/courses"
        returnLabel="返回课程列表"
        title={course.title}
        description={course.description}
        tags={course.tags}
        badges={
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[course.difficulty]}`}>
              {course.difficulty}
            </span>
            <span className="text-xs text-slate-400">{course.category}</span>
          </div>
        }
      />

      {/* 概览统计卡片 */}
      {hasStats && (
        <div className="mt-8 grid grid-cols-3 gap-3">
          {toolItems.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-blue-700">{toolItems.length}</div>
              <div className="text-xs text-blue-500 mt-0.5">相关工具</div>
            </div>
          )}
          {projectItems.length > 0 && (
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-purple-700">{projectItems.length}</div>
              <div className="text-xs text-purple-500 mt-0.5">相关项目</div>
            </div>
          )}
          {jobItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-orange-700">{jobItems.length}</div>
              <div className="text-xs text-orange-500 mt-0.5">相关岗位</div>
            </div>
          )}
        </div>
      )}

      {/* 课程导读 */}
      {course.overview && (
        <section className="mt-8 bg-brand-50/50 border border-brand-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-brand-800 mb-1.5">课程导读</h2>
          <p className="text-sm text-brand-700 leading-relaxed">{course.overview}</p>
        </section>
      )}

      {course.interviewQuestions && course.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={course.interviewQuestions} />
      )}

      {/* 学习单元目录 */}
      {hasDirectory && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">学习单元</h2>
          <p className="text-xs text-slate-400 mb-6">
            共 {unitDirectory!.length} 个单元，点击查看详细知识点、练习和验收标准。
          </p>
          <div className="space-y-0">
            {unitDirectory!.map((item, i) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                  {i < unitDirectory!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-brand-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < unitDirectory!.length - 1 ? 'pb-4' : ''}`}>
                  <Link
                    to={`/courses/${course.id}/units/${item.id}`}
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
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-400">{item.count} 个知识点</span>
                        </div>
                      </div>
                      <span className="text-xs text-brand-600 border border-brand-200 bg-brand-50 px-2 py-1 rounded-md group-hover:bg-brand-100 transition-colors shrink-0 font-medium">
                        查看单元 →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 学习内容区域（无目录时展示） */}
      {!hasDirectory && (<>
      {course.learningObjectives && course.learningObjectives.length > 0 && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">学习目标</h2>
          <ul className="space-y-2">
            {course.learningObjectives.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.prerequisites && course.prerequisites.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">先修知识</h2>
          <ul className="space-y-1.5">
            {course.prerequisites.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="text-slate-300 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.chapters && course.chapters.length > 0 && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">章节目录</h2>
          <p className="text-xs text-slate-400 mb-4">按以下章节顺序学习，每章包含核心知识点和练习建议</p>
          <div className="space-y-0">
            {course.chapters.map((ch, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                  {i < course.chapters!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-brand-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < course.chapters!.length - 1 ? 'pb-4' : ''}`}>
                  <div className="card p-4">
                    <div className="text-sm font-semibold text-slate-800 mb-1">{ch.title}</div>
                    <p className="text-xs text-slate-500 mb-3">{ch.summary}</p>
                    <div className="mb-2">
                      <span className="text-xs text-slate-400 font-medium">核心知识点</span>
                      <ul className="mt-1 space-y-0.5">
                        {ch.keyPoints.map((kp) => (
                          <li key={kp} className="flex gap-1.5 text-xs text-slate-600">
                            <span className="text-brand-300 shrink-0">•</span>
                            {kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {ch.exercises && ch.exercises.length > 0 && (
                      <div>
                        <span className="text-xs text-slate-400 font-medium">练习建议</span>
                        <ul className="mt-1 space-y-0.5">
                          {ch.exercises.map((ex) => (
                            <li key={ex} className="flex gap-1.5 text-xs text-slate-500">
                              <span className="text-slate-300 shrink-0">◦</span>
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {course.practiceTasks && course.practiceTasks.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">实践任务</h2>
          <ul className="space-y-1.5">
            {course.practiceTasks.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="text-brand-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.recommendedResources && course.recommendedResources.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-3">推荐资源</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {course.recommendedResources.map((r, i) => (
              <div key={i} className="flex items-center gap-2 card px-3 py-2.5">
                <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded shrink-0 font-medium">
                  {r.type}
                </span>
                <span className="text-sm text-slate-700">{r.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {course.externalResources && course.externalResources.length > 0 && (
        <section className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">外部学习资源</h2>
          <p className="text-xs text-slate-400 mb-3">来自 The Odin Project、freeCodeCamp、Codecademy、MDN 等平台的真实课程与练习</p>
          <div className="space-y-2">
            {course.externalResources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block card-hover p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-medium text-brand-700 truncate">{r.title}</span>
                      {r.isRequired ? (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-500 border border-red-100 shrink-0 font-medium">必修</span>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-100 shrink-0 font-medium">选修</span>
                      )}
                    </div>
                    {r.note && (
                      <p className="text-xs text-slate-500 mb-1">{r.note}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{r.source}</span>
                      <span>{r.type === 'course' ? '课程' : r.type === 'tutorial' ? '教程' : r.type === 'exercise' ? '练习' : r.type === 'project' ? '项目' : r.type === 'tool' ? '工具' : '参考'}</span>
                      {r.difficulty && <span>{r.difficulty}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 mt-1">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {course.learningTips && course.learningTips.length > 0 && (
        <section className="mt-6 mb-4">
          <h2 className="text-base font-semibold text-slate-800 mb-3">学习建议</h2>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <ul className="space-y-2">
              {course.learningTips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-800">
                  <span className="shrink-0">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      </>)}
      {(toolItems.length > 0 || projectItems.length > 0 || jobItems.length > 0) && (
        <div className="mt-8 border-t border-slate-100 pt-6">
          {toolItems.length > 0 && (
            <RelatedSection title="相关工具" items={toolItems} className="mt-0" />
          )}
          {projectItems.length > 0 && (
            <RelatedSection title="相关项目" items={projectItems} className="mt-6" />
          )}
          {jobItems.length > 0 && (
            <RelatedSection title="相关岗位" items={jobItems} className="mt-6 mb-4" />
          )}
        </div>
      )}
    </div>
  )
}
