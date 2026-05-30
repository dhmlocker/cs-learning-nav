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

      {project.highlights && project.highlights.length > 0 && (
        <QuestionList title="项目亮点" items={project.highlights} colorClass="text-green-400" />
      )}

      {project.extensions && project.extensions.length > 0 && (
        <QuestionList title="可扩展点" items={project.extensions} colorClass="text-yellow-400" className="mt-6" />
      )}

      {project.interviewTalkingPoints && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">面试讲法</h2>
          <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
            {project.interviewTalkingPoints}
          </p>
        </section>
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
