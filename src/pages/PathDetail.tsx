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

      {/* 阶段内容 */}
      <section className="mt-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">学习阶段</h2>
        <div className="space-y-4">
          {path.stages.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-600 mb-2">
                阶段 {i + 1}：{s.name}
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
          ))}
        </div>
      </section>

      {path.interviewQuestions && path.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={path.interviewQuestions} />
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
      {projectItems.length > 0 && (
        <RelatedSection title="相关项目" items={projectItems} />
      )}
      {jobItems.length > 0 && (
        <RelatedSection title="相关岗位" items={jobItems} className="mt-4 mb-4" />
      )}
    </div>
  )
}
