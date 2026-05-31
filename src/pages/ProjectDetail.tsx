import { useParams, Link } from 'react-router-dom'
import { projects, courses, tools, jobs } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import DetailHeader from '../components/DetailHeader'
import QuestionList from '../components/QuestionList'
import RelatedSection from '../components/RelatedSection'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

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

  const relatedCourses = courses.filter((c) => project.relatedCourses.includes(c.id))
  const relatedTools = tools.filter((t) => project.relatedTools.includes(t.id))
  const relatedJobs = jobs.filter((j) => project.relatedJobs.includes(j.id))

  const courseItems = relatedCourses.map((c) => ({ id: c.id, label: c.title, to: `/courses/${c.id}` }))
  const toolItems = relatedTools.map((t) => ({ id: t.id, label: t.name, to: `/tools/${t.id}` }))
  const jobItems = relatedJobs.map((j) => ({ id: j.id, label: j.title, to: `/jobs/${j.id}` }))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DetailHeader
        returnTo="/projects"
        returnLabel="返回项目列表"
        title={project.title}
        description={project.description}
        tags={project.tags}
        badges={
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-gray-400">{project.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>
        }
      />

      {/* ===== 项目实战内容区域 ===== */}
      {project.projectGoals && project.projectGoals.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">项目目标</h2>
          <ul className="space-y-1.5">
            {project.projectGoals.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.targetUsers && project.targetUsers.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">适合人群</h2>
          <ul className="space-y-1.5">
            {project.targetUsers.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-gray-300 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.prerequisites && project.prerequisites.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">前置知识</h2>
          <ul className="space-y-1.5">
            {project.prerequisites.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.featureModules && project.featureModules.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">功能模块</h2>
          <p className="text-xs text-gray-400 mb-4">将项目拆解为若干独立模块，每个模块可单独开发和测试</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.featureModules.map((m, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-800 mb-1">{m.title}</div>
                <p className="text-xs text-gray-500 mb-3">{m.description}</p>
                <ul className="space-y-0.5">
                  {m.tasks.map((t) => (
                    <li key={t} className="flex gap-1.5 text-xs text-gray-600">
                      <span className="text-blue-300 shrink-0">◦</span>
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
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">开发步骤</h2>
          <p className="text-xs text-gray-400 mb-4">按以下顺序逐步实现，每步完成后检查清单确认质量</p>
          <div className="space-y-0">
            {project.developmentSteps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </div>
                  {i < project.developmentSteps!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-blue-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < project.developmentSteps!.length - 1 ? 'pb-4' : ''}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-800 mb-1">{step.title}</div>
                    <p className="text-xs text-gray-500 mb-3">{step.description}</p>
                    <div>
                      <span className="text-xs text-gray-400 font-medium">完成检查清单</span>
                      <ul className="mt-1 space-y-0.5">
                        {step.checklist.map((cl) => (
                          <li key={cl} className="flex gap-1.5 text-xs text-gray-600">
                            <span className="text-green-400 shrink-0">☐</span>
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
          <h2 className="text-base font-semibold text-gray-800 mb-3">验收标准</h2>
          <ul className="space-y-1.5">
            {project.acceptanceCriteria.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-600 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== 原有项目管理内容 ===== */}
      {project.highlights && project.highlights.length > 0 && (
        <QuestionList title="项目亮点" items={project.highlights} colorClass="text-green-400" />
      )}

      {project.extensions && project.extensions.length > 0 && (
        <QuestionList title="可扩展方向" items={project.extensions} colorClass="text-yellow-400" className="mt-6" />
      )}

      {project.interviewTalkingPoints && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">面试讲法</h2>
          <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
            {project.interviewTalkingPoints}
          </p>
        </section>
      )}

      {project.interviewFollowups && project.interviewFollowups.length > 0 && (
        <QuestionList title="面试追问" items={project.interviewFollowups} colorClass="text-orange-400" className="mt-6" />
      )}

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
      {jobItems.length > 0 && (
        <RelatedSection title="相关岗位" items={jobItems} className="mt-4 mb-4" />
      )}
    </div>
  )
}
