import { useParams, Link } from 'react-router-dom'
import { jobs, courses, tools, projects } from '../data'
import DetailHeader from '../components/DetailHeader'
import QuestionList from '../components/QuestionList'
import RelatedSection from '../components/RelatedSection'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const job = jobs.find((j) => j.id === id)

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

  const relatedCourses = courses.filter((c) => job.relatedCourses.includes(c.id))
  const relatedTools = tools.filter((t) => job.relatedTools.includes(t.id))
  const relatedProjects = projects.filter((p) => (job.relatedProjects ?? []).includes(p.id))

  const courseItems = relatedCourses.map((c) => ({ id: c.id, label: c.title, to: `/courses/${c.id}` }))
  const toolItems = relatedTools.map((t) => ({ id: t.id, label: t.name, to: `/tools/${t.id}` }))
  const projectItems = relatedProjects.map((p) => ({ id: p.id, label: p.title, to: `/projects/${p.id}` }))

  type DirItem = { id: string; title: string; summary?: string; count: number }
  const moduleDirectory: DirItem[] | null = job.skillModules
    ? job.skillModules.map((m) => ({ id: m.id, title: m.title, summary: m.goal, count: m.skills.length }))
    : job.learningPlan
      ? job.learningPlan.map((lp, i) => ({ id: String(i), title: lp.phase, summary: lp.focus, count: 0 }))
      : null
  const hasDirectory = moduleDirectory !== null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DetailHeader
        returnTo="/jobs"
        returnLabel="返回岗位列表"
        title={job.title}
        description={job.description}
        tags={job.tags}
        badges={
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-400">{job.category}</span>
          </div>
        }
      />

      {/* 核心能力要求 */}
      {job.requiredAbilities && job.requiredAbilities.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">核心能力要求</h2>
          <ul className="space-y-1.5">
            {job.requiredAbilities.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== 能力模块目录 ===== */}
      {hasDirectory && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">准备模块</h2>
          <p className="text-xs text-gray-400 mb-6">
            共 {moduleDirectory!.length} 个模块，点击查看技能点、关联资源、面试准备和验收标准。
          </p>
          <div className="space-y-0">
            {moduleDirectory!.map((item, i) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </div>
                  {i < moduleDirectory!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-orange-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < moduleDirectory!.length - 1 ? 'pb-4' : ''}`}>
                  <Link
                    to={`/jobs/${job.id}/modules/${item.id}`}
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.summary}</p>
                        )}
                        {item.count > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-400">{item.count} 个技能点</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-orange-500 border border-orange-200 bg-orange-50 px-2 py-1 rounded group-hover:bg-orange-100 transition-colors shrink-0">
                        查看模块 →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== 旧版详细内容（无目录时展示） ===== */}
      {!hasDirectory && (<>
      {job.learningPlan && job.learningPlan.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">推荐学习路径</h2>
          <p className="text-xs text-gray-400 mb-4">从零开始准备该岗位的阶段性学习计划</p>
          <div className="space-y-0">
            {job.learningPlan.map((lp, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-7 h-7 rounded-full bg-green-600 text-white text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </div>
                  {i < job.learningPlan!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-green-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < job.learningPlan!.length - 1 ? 'pb-4' : ''}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-800">{lp.phase}</span>
                      <span className="text-xs text-gray-400">{lp.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500">{lp.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 通用能力（skills） */}
      {job.skills && job.skills.length > 0 && (
        <QuestionList title="核心能力" items={job.skills} colorClass="text-green-400" />
      )}

      {/* 典型任务 */}
      {job.tasks && job.tasks.length > 0 && (
        <QuestionList title="典型任务" items={job.tasks} colorClass="text-yellow-400" className="mt-6" />
      )}

      {/* 作品集建议 */}
      {job.portfolioAdvice && job.portfolioAdvice.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">作品集 / 简历建议</h2>
          <ul className="space-y-1.5">
            {job.portfolioAdvice.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-purple-500 shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 面试重点 */}
      {job.interviewFocus && job.interviewFocus.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">面试考察重点</h2>
          <ul className="space-y-1.5">
            {job.interviewFocus.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-red-400 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 常见面试问题 */}
      {job.interviewQuestions && job.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={job.interviewQuestions} className="mt-6" />
      )}

      {/* 职业成长路径 */}
      {job.growthPath && job.growthPath.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">职业成长路径</h2>
          <div className="space-y-2">
            {job.growthPath.map((item, i) => (
              <div key={i} className="flex gap-3 items-start bg-gray-50 border border-gray-100 rounded-lg p-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 pt-0.5">{item}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 常见误区 */}
      {job.commonMistakes && job.commonMistakes.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">新手常见误区</h2>
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <ul className="space-y-1.5">
              {job.commonMistakes.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-red-400 shrink-0">⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      </>)}

      {/* 关联内容 */}
      {courseItems.length > 0 && (
        <RelatedSection
          title="相关课程"
          items={courseItems}
          className="mt-6 border-t border-gray-100 pt-6"
        />
      )}
      {toolItems.length > 0 && (
        <RelatedSection title="相关工具" items={toolItems} />
      )}
      {projectItems.length > 0 && (
        <RelatedSection title="相关项目" items={projectItems} className="mt-4 mb-4" />
      )}
    </div>
  )
}
