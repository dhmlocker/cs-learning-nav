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

      {job.skills && job.skills.length > 0 && (
        <QuestionList title="核心能力" items={job.skills} colorClass="text-green-400" />
      )}

      {job.tasks && job.tasks.length > 0 && (
        <QuestionList title="典型任务" items={job.tasks} colorClass="text-yellow-400" className="mt-6" />
      )}

      {job.interviewQuestions && job.interviewQuestions.length > 0 && (
        <QuestionList title="常见面试问题" items={job.interviewQuestions} className="mt-6" />
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
        <RelatedSection title="相关项目" items={projectItems} className="mt-4 mb-4" />
      )}
    </div>
  )
}
