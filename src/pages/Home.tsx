import { Link } from 'react-router-dom'

const modules = [
  {
    to: '/courses',
    title: '课程知识库',
    desc: '计算机专业核心课程体系，从数据结构到机器学习',
    color: 'bg-blue-50 text-blue-700',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    to: '/tools',
    title: '工具手册',
    desc: '开发工具、工程工具、AI 工具与部署工具',
    color: 'bg-emerald-50 text-emerald-700',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-4.25 4.25a1.035 1.035 0 0 1-1.46-1.46l4.25-4.25m5.35-5.35l4.25-4.25a1.035 1.035 0 0 1 1.46 1.46l-4.25 4.25m-1.65 2.2a2.5 2.5 0 1 1 3.54 3.54 2.5 2.5 0 0 1-3.54-3.54Z" />
      </svg>
    ),
  },
  {
    to: '/projects',
    title: '项目库',
    desc: '不同方向、不同难度的实战项目',
    color: 'bg-purple-50 text-purple-700',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    to: '/jobs',
    title: '岗位地图',
    desc: '技术岗位方向、能力要求与面试重点',
    color: 'bg-orange-50 text-orange-700',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    to: '/paths',
    title: '学习路径',
    desc: '目标导向的阶段化学习路线',
    color: 'bg-teal-50 text-teal-700',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
  },
]

const startHere = [
  {
    title: '大一 / 大二学生',
    desc: '从核心课程开始，打好理论基础',
    steps: ['浏览课程知识库，了解专业课程体系', '选择入门语言开始编程', '跟随数据结构完成配套练习'],
    to: '/courses',
    accent: 'border-l-blue-500 bg-blue-50/50',
    btnClass: 'text-blue-700 bg-blue-50 hover:bg-blue-100',
  },
  {
    title: '大三 / 应届生',
    desc: '准备项目经历与面试，明确求职方向',
    steps: ['查看目标岗位能力要求和学习计划', '完成 1-2 个实战项目放入作品集', '参考面试重点和常见问题准备面试'],
    to: '/jobs',
    accent: 'border-l-orange-500 bg-orange-50/50',
    btnClass: 'text-orange-700 bg-orange-50 hover:bg-orange-100',
  },
  {
    title: '转行 / 自学者',
    desc: '明确学习路线，系统补全核心短板',
    steps: ['选择推荐学习路径作为主线', '边学课程边做项目巩固知识', '关注岗位地图了解业界要求'],
    to: '/paths',
    accent: 'border-l-emerald-500 bg-emerald-50/50',
    btnClass: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100',
  },
]

const paths = [
  {
    id: 'lp1',
    title: '后端开发',
    desc: '从零基础到合格后端开发工程师',
    stages: ['基础编程与数据结构', 'Web 框架与数据库', '项目实战与面试准备'],
    color: 'bg-blue-500',
  },
  {
    id: 'lp2',
    title: 'AI 开发',
    desc: '从 Python 入门到 AI 应用开发',
    stages: ['Python 与数学基础', '机器学习核心算法', '深度学习与项目实战'],
    color: 'bg-purple-500',
  },
  {
    id: 'lp3',
    title: '全栈开发',
    desc: '前端 + 后端全栈能力培养',
    stages: ['前端基础三件套', 'React 与工程化', '后端与部署上线'],
    color: 'bg-emerald-500',
  },
]

export default function Home() {
  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50/60 via-transparent to-transparent" />
        <div className="relative max-w-page mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full text-xs font-medium text-brand-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            项目驱动学习平台
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight tracking-tight">
            连接知识与实践
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            把课程、知识点、工具、项目、岗位和学习路径连接起来，帮你搞清楚学什么、怎么学、用在哪
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses" className="btn-primary text-base px-6 py-3 shadow-sm">
              开始学习
            </Link>
            <Link to="/paths" className="btn-outline text-base px-6 py-3">
              查看学习路径
            </Link>
            <Link to="/search" className="btn-ghost text-base px-6 py-3">
              搜索全站
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 从哪里开始 ===== */}
      <section className="page-container py-14">
        <div className="text-center mb-8">
          <h2 className="section-title mb-2">从哪里开始？</h2>
          <p className="text-sm text-slate-400">根据你当前所处的阶段，选择最适合的入口</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {startHere.map((entry) => (
            <div
              key={entry.title}
              className={`card border-l-4 ${entry.accent} p-5`}
            >
              <h3 className="font-semibold text-slate-800 mb-1">{entry.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{entry.desc}</p>
              <ol className="space-y-2 mb-5">
                {entry.steps.map((s, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center text-2xs font-medium text-slate-400 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <Link
                to={entry.to}
                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${entry.btnClass}`}
              >
                进入 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 知识关系 ===== */}
      <section className="page-container pb-10">
        <div className="card p-6 sm:p-8 bg-slate-50/80">
          <h2 className="text-sm font-semibold text-slate-800 mb-5 text-center">内容之间的关联</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: '课程 → 项目', desc: '每门课程关联对应项目，学完就能练', color: 'text-blue-600' },
              { label: '项目 → 岗位', desc: '每个项目标注对口岗位，积累作品集有方向', color: 'text-purple-600' },
              { label: '工具 → 课程', desc: '每个工具关联相关课程，学工具知其所以然', color: 'text-emerald-600' },
              { label: '路径 → 全部', desc: '学习路径串联课程、项目、工具和岗位', color: 'text-orange-600' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={`text-xs font-semibold ${item.color} mb-1`}>{item.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 核心模块 ===== */}
      <section className="page-container pb-10">
        <h2 className="section-title mb-6 text-center">核心模块</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="card-hover p-5 group flex flex-col"
            >
              <div className={`w-9 h-9 rounded-lg ${m.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {m.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-brand-600 transition-colors">
                {m.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-auto">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 推荐学习路径 ===== */}
      <section className="page-container pb-14">
        <h2 className="section-title mb-6 text-center">推荐学习路径</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {paths.map((lp) => (
            <Link
              key={lp.id}
              to={`/paths/${lp.id}`}
              className="card-hover p-5 group"
            >
              <div className={`w-2 h-2 rounded-full ${lp.color} mb-3`} />
              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-brand-600 transition-colors">
                {lp.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4">{lp.desc}</p>
              <div className="space-y-2">
                {lp.stages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-2xs font-medium text-slate-400">
                      {i + 1}
                    </span>
                    <span className="truncate">{stage}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
