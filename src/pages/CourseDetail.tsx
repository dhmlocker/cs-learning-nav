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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">课程不存在</p>
        <Link to="/courses" className="text-blue-600 text-sm hover:underline">
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DetailHeader
        returnTo="/courses"
        returnLabel="返回课程列表"
        title={course.title}
        description={course.description}
        tags={course.tags}
        badges={
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[course.difficulty]}`}>
              {course.difficulty}
            </span>
            <span className="text-xs text-gray-400">{course.category}</span>
          </div>
        }
      />

      {/* 概览统计卡片 */}
      {hasStats && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {toolItems.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-blue-700">{toolItems.length}</div>
              <div className="text-xs text-blue-500">相关工具</div>
            </div>
          )}
          {projectItems.length > 0 && (
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-purple-700">{projectItems.length}</div>
              <div className="text-xs text-purple-500">相关项目</div>
            </div>
          )}
          {jobItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-orange-700">{jobItems.length}</div>
              <div className="text-xs text-orange-500">相关岗位</div>
            </div>
          )}
        </div>
      )}

      {course.interviewQuestions && course.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={course.interviewQuestions} />
      )}

      {/* ===== 学习内容区域（仅对填充了详情的课程展示） ===== */}
      {course.learningObjectives && course.learningObjectives.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">学习目标</h2>
          <ul className="space-y-1.5">
            {course.learningObjectives.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.prerequisites && course.prerequisites.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">先修知识</h2>
          <ul className="space-y-1.5">
            {course.prerequisites.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-gray-300 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.chapters && course.chapters.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">章节目录</h2>
          <p className="text-xs text-gray-400 mb-4">按以下章节顺序学习，每章包含核心知识点和练习建议</p>
          <div className="space-y-0">
            {course.chapters.map((ch, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </div>
                  {i < course.chapters!.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[16px] bg-blue-200 my-0.5" />
                  )}
                </div>
                <div className={`flex-1 ${i < course.chapters!.length - 1 ? 'pb-4' : ''}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-800 mb-1">{ch.title}</div>
                    <p className="text-xs text-gray-500 mb-3">{ch.summary}</p>
                    <div className="mb-2">
                      <span className="text-xs text-gray-400 font-medium">核心知识点</span>
                      <ul className="mt-1 space-y-0.5">
                        {ch.keyPoints.map((kp) => (
                          <li key={kp} className="flex gap-1.5 text-xs text-gray-600">
                            <span className="text-blue-300 shrink-0">•</span>
                            {kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {ch.exercises && ch.exercises.length > 0 && (
                      <div>
                        <span className="text-xs text-gray-400 font-medium">练习建议</span>
                        <ul className="mt-1 space-y-0.5">
                          {ch.exercises.map((ex) => (
                            <li key={ex} className="flex gap-1.5 text-xs text-gray-500">
                              <span className="text-gray-300 shrink-0">◦</span>
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
          <h2 className="text-base font-semibold text-gray-800 mb-3">实践任务</h2>
          <ul className="space-y-1.5">
            {course.practiceTasks.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.recommendedResources && course.recommendedResources.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">推荐资源</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {course.recommendedResources.map((r, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shrink-0">
                  {r.type}
                </span>
                <span className="text-sm text-gray-700">{r.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {course.learningTips && course.learningTips.length > 0 && (
        <section className="mt-6 mb-4">
          <h2 className="text-base font-semibold text-gray-800 mb-3">学习建议</h2>
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <ul className="space-y-1.5">
              {course.learningTips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-yellow-500 shrink-0">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(toolItems.length > 0 || projectItems.length > 0 || jobItems.length > 0) && (
        <div className="mt-8 border-t border-gray-100 pt-6">
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
