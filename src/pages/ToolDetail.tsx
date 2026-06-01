import { useParams, Link } from 'react-router-dom'
import { tools, courses } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import DetailHeader from '../components/DetailHeader'
import QuestionList from '../components/QuestionList'
import RelatedSection from '../components/RelatedSection'

export default function ToolDetail() {
  const { id } = useParams<{ id: string }>()
  const tool = tools.find((t) => t.id === id)

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg mb-4">工具不存在</p>
        <Link to="/tools" className="text-blue-600 text-sm hover:underline">
          ← 返回工具列表
        </Link>
      </div>
    )
  }

  const relatedCourses = courses.filter((c) => tool.relatedCourses.includes(c.id))
  const courseItems = relatedCourses.map((c) => ({ id: c.id, label: c.title, to: `/courses/${c.id}` }))

  type DirItem = { id: string; title: string; summary?: string; count: number }
  const usageDirectory: DirItem[] | null = tool.usageScenarios
    ? tool.usageScenarios.map((u) => ({ id: u.id, title: u.title, summary: u.problem, count: u.knowledgePoints.length }))
    : tool.useCases
      ? tool.useCases.map((uc, i) => ({ id: String(i), title: uc, summary: undefined, count: 0 }))
      : null
  const hasDirectory = usageDirectory !== null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DetailHeader
        returnTo="/tools"
        returnLabel="返回工具列表"
        title={tool.name}
        description={tool.description}
        tags={tool.tags}
        badges={
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-gray-400">{tool.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[tool.difficulty]}`}>
              {tool.difficulty}
            </span>
          </div>
        }
      />

      {/* ===== 使用场景目录 ===== */}
      {hasDirectory && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">使用场景</h2>
          <p className="text-xs text-gray-400 mb-4">
            共 {usageDirectory!.length} 个场景，点击查看详细知识点、操作流程和资源。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {usageDirectory!.map((item) => (
              <Link
                key={item.id}
                to={`/tools/${tool.id}/uses/${item.id}`}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    {item.summary && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.summary}</p>
                    )}
                    {item.count > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-400">{item.count} 个知识点</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-blue-500 border border-blue-200 bg-blue-50 px-2 py-1 rounded group-hover:bg-blue-100 transition-colors shrink-0">
                    查看用法 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== 旧版详细内容（无目录时展示） ===== */}
      {!hasDirectory && (<>
      {tool.setupSteps && tool.setupSteps.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">安装与配置</h2>
          <ul className="space-y-1.5">
            {tool.setupSteps.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-blue-500 font-medium shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.commonCommands && tool.commonCommands.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">常用命令</h2>
          <div className="space-y-2">
            {tool.commonCommands.map((cmd, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                <code className="text-sm text-gray-800 font-mono break-all">{cmd.command}</code>
                <p className="text-xs text-gray-500 mt-1">{cmd.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tool.workflowTips && tool.workflowTips.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">工作流建议</h2>
          <ul className="space-y-1.5">
            {tool.workflowTips.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-yellow-500 shrink-0">💡</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.commonProblems && tool.commonProblems.length > 0 && (
        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">常见问题与解决</h2>
          <div className="space-y-3">
            {tool.commonProblems.map((cp, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex gap-2 items-start">
                  <span className="text-red-400 text-sm shrink-0 mt-0.5">❓</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{cp.problem}</p>
                    <p className="text-xs text-gray-500 mt-1">{cp.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tool.relatedScenarios && tool.relatedScenarios.length > 0 && (
        <section className="mt-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">相关应用场景</h2>
          <div className="flex flex-wrap gap-2">
            {tool.relatedScenarios.map((s) => (
              <span key={s} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </section>
      )}

      {tool.faq && tool.faq.length > 0 && (
        <QuestionList title="常见问题" items={tool.faq} />
      )}
      </>)}

      {courseItems.length > 0 && (
        <RelatedSection
          title="相关课程"
          items={courseItems}
          className="mt-8 border-t border-gray-100 pt-6"
        />
      )}
    </div>
  )
}
