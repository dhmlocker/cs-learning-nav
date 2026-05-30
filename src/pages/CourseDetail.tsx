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

      {course.interviewQuestions && course.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={course.interviewQuestions} />
      )}

      {toolItems.length > 0 && (
        <RelatedSection
          title="相关工具"
          items={toolItems}
          className="mt-8 border-t border-gray-100 pt-6"
        />
      )}
      {projectItems.length > 0 && (
        <RelatedSection title="相关项目" items={projectItems} />
      )}
      {jobItems.length > 0 && (
        <RelatedSection title="相关岗位" items={jobItems} />
      )}
    </div>
  )
}
