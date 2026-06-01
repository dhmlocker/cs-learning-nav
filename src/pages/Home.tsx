import { Link } from 'react-router-dom'

const modules = [
  { to: '/courses', title: '课程知识库', desc: '计算机专业核心课程体系', color: 'bg-blue-50 text-blue-700' },
  { to: '/tools', title: '工具手册', desc: '开发工具、工程工具、AI 工具', color: 'bg-green-50 text-green-700' },
  { to: '/projects', title: '项目库', desc: '不同方向、不同难度的实战项目', color: 'bg-purple-50 text-purple-700' },
  { to: '/jobs', title: '岗位地图', desc: '技术岗位方向与技能要求', color: 'bg-orange-50 text-orange-700' },
  { to: '/paths', title: '学习路径', desc: '目标导向的阶段化学习路线', color: 'bg-teal-50 text-teal-700' },
]

const startHere = [
  {
    title: '大一 / 大二学生',
    desc: '从计算机核心课程开始，打好理论基础',
    steps: ['浏览课程知识库，了解专业课程体系', '选择一门入门语言（Python 或 C）开始编程', '跟随数据结构课程完成配套练习'],
    to: '/courses',
    color: 'border-blue-200 bg-blue-50',
  },
  {
    title: '大三 / 应届生',
    desc: '准备项目经历与面试，明确求职方向',
    steps: ['选择目标岗位查看能力要求和学习计划', '完成 1-2 个对应的实战项目放入作品集', '参考面试重点和常见问题准备面试'],
    to: '/jobs',
    color: 'border-orange-200 bg-orange-50',
  },
  {
    title: '转行 / 自学者',
    desc: '明确学习路线，系统补全核心短板',
    steps: ['选择一条推荐学习路径作为主线', '边学课程边做对应项目巩固知识', '关注岗位地图了解业界要求'],
    to: '/paths',
    color: 'border-green-200 bg-green-50',
  },
]

export default function Home() {
  return (
    <div>
      {/* ===== 区域一：Hero ===== */}
      <section className="py-16 text-center bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">CodeAtlas｜项目驱动学习平台</h1>
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
          <Link to="/search" className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            搜索全站
          </Link>
        </div>
      </section>

      {/* ===== 区域二：从哪里开始 ===== */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">从哪里开始？</h2>
        <p className="text-xs text-gray-400 mb-6">根据你当前所处的阶段，选择最适合的入口</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startHere.map((entry) => (
            <div key={entry.title} className={`border rounded-lg p-5 ${entry.color}`}>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{entry.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{entry.desc}</p>
              <ol className="space-y-1.5 mb-4">
                {entry.steps.map((s, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-gray-600">
                    <span className="text-blue-500 font-medium shrink-0">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
              <Link to={entry.to} className="text-xs text-blue-600 hover:underline font-medium">
                进入 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 区域三：知识关系说明 ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">内容之间的关联</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xs text-blue-600 font-medium mb-1">课程 → 项目</div>
              <p className="text-xs text-gray-500">每门课程都关联了对应项目，学完就能练</p>
            </div>
            <div className="text-center">
              <div className="text-xs text-purple-600 font-medium mb-1">项目 → 岗位</div>
              <p className="text-xs text-gray-500">每个项目都标注了对口岗位，积累作品集更有方向</p>
            </div>
            <div className="text-center">
              <div className="text-xs text-green-600 font-medium mb-1">工具 → 课程</div>
              <p className="text-xs text-gray-500">每个工具都关联了相关课程，学工具知其所以然</p>
            </div>
            <div className="text-center">
              <div className="text-xs text-orange-600 font-medium mb-1">路径 → 全部</div>
              <p className="text-xs text-gray-500">学习路径串联课程、项目、工具和岗位，形成完整学习方案</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 区域四：核心模块 ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
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

      {/* ===== 区域五：推荐学习路径 ===== */}
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
              to={`/paths/${lp.id}`}
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
