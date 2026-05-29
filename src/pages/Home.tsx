import { Link } from 'react-router-dom'

const modules = [
  { to: '/courses', title: '课程知识库', desc: '计算机专业核心课程体系', color: 'bg-blue-50 text-blue-700' },
  { to: '/tools', title: '工具手册', desc: '开发工具、工程工具、AI 工具', color: 'bg-green-50 text-green-700' },
  { to: '/projects', title: '项目库', desc: '不同方向、不同难度的实战项目', color: 'bg-purple-50 text-purple-700' },
  { to: '/jobs', title: '岗位地图', desc: '技术岗位方向与技能要求', color: 'bg-orange-50 text-orange-700' },
  { to: '/paths', title: '学习路径', desc: '目标导向的阶段化学习路线', color: 'bg-teal-50 text-teal-700' },
]

export default function Home() {
  return (
    <div>
      <section className="py-16 text-center bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">计算机学习导航</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          把课程、知识点、工具、项目、岗位和学习路径连接起来，帮你搞清楚学什么、怎么学、用在哪
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/courses" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            开始学习
          </Link>
          <Link to="/paths" className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            查看学习路径
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">核心模块</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="p-5 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <span className={`inline-block px-2 py-0.5 text-xs rounded ${m.color}`}>
                {m.title}
              </span>
              <p className="mt-2 text-sm text-gray-500">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">推荐学习路径</h2>
        <div className="space-y-3">
          {[
            { id: 'lp1', title: '后端开发学习路径', desc: '从零基础到合格后端开发工程师', stages: 3 },
            { id: 'lp2', title: 'AI 开发学习路径', desc: '从 Python 入门到 AI 应用开发', stages: 3 },
            { id: 'lp3', title: '全栈开发学习路径', desc: '前端 + 后端全栈能力培养', stages: 3 },
          ].map((lp) => (
            <Link
              key={lp.id}
              to="/paths"
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-medium text-gray-800 text-sm">{lp.title}</span>
                <span className="ml-2 text-xs text-gray-400">{lp.desc}</span>
              </div>
              <span className="text-xs text-gray-400">{lp.stages} 个阶段</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
