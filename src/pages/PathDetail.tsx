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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">学习路径不存在</p>
        <Link to="/paths" className="text-blue-600 text-sm hover:underline">
          ← 返回学习路径
        </Link>
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* ===== 区域一：路径概览 ===== */}
      <DetailHeader
        returnTo="/paths"
        returnLabel="返回学习路径列表"
        title={path.title}
        description={path.description}
        tags={path.tags}
        badges={
          <div className="flex items-center gap-3 mb-3">
            {path.difficulty && (
              <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[path.difficulty]}`}>
                {path.difficulty}
              </span>
            )}
            <span className="text-xs text-gray-400">目标岗位：{path.targetJob}</span>
          </div>
        }
      />

      {/* 概览摘要卡片 */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-blue-700">{path.stages.length}</div>
          <div className="text-xs text-blue-500">学习阶段</div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-green-700">{courseItems.length}</div>
          <div className="text-xs text-green-500">相关课程</div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-purple-700">{projectItems.length}</div>
          <div className="text-xs text-purple-500">可做项目</div>
        </div>
      </div>

      {/* ===== 区域二：阶段学习顺序 ===== */}
      <section className="mt-8">
        <h2 className="text-base font-semibold text-gray-800 mb-1">阶段学习顺序</h2>
        <p className="text-xs text-gray-400 mb-4">按以下顺序逐步学习，完成一个阶段后再进入下一阶段</p>
        <div className="space-y-0">
          {path.stages.map((s, i) => (
            <div key={i} className="flex gap-3">
              {/* 左侧：步骤编号 + 连接线 */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </div>
                {i < path.stages.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[16px] bg-blue-200 my-0.5" />
                )}
              </div>
              {/* 右侧：阶段卡片 */}
              <div className={`flex-1 ${i < path.stages.length - 1 ? 'pb-4' : ''}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    {s.name}
                  </div>
                  <ul className="space-y-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-gray-300 shrink-0">•</span>
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

      {/* 分隔线 */}
      <div className="mt-8 border-t border-gray-100" />

      {/* ===== 区域三～七：关联内容 ===== */}
      {courseItems.length > 0 && (
        <RelatedSection
          title="相关课程"
          items={courseItems}
          className="mt-6"
        />
      )}
      {toolItems.length > 0 && (
        <RelatedSection
          title="相关工具"
          items={toolItems}
          className="mt-6"
        />
      )}
      {projectItems.length > 0 && (
        <RelatedSection
          title="可做项目"
          items={projectItems}
          className="mt-6"
        />
      )}
      {jobItems.length > 0 && (
        <RelatedSection
          title="对应岗位"
          items={jobItems}
          className="mt-6"
        />
      )}

      {path.interviewQuestions && path.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={path.interviewQuestions} />
      )}
    </div>
  )
}
