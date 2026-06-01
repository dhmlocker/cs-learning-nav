import { Link } from 'react-router-dom'

const navItems = [
  { to: '/courses', label: '课程' },
  { to: '/tools', label: '工具' },
  { to: '/projects', label: '项目' },
  { to: '/jobs', label: '岗位' },
  { to: '/paths', label: '学习路径' },
  { to: '/search', label: '搜索' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-blue-700">
            CodeAtlas｜项目驱动学习平台
          </Link>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        CodeAtlas｜项目驱动学习平台 — 以真实项目任务反推具体知识点
      </footer>
    </div>
  )
}
