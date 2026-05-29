import { paths } from '../data'

export default function Paths() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">学习路径</h1>
      <p className="text-gray-500 text-sm mb-6">根据不同目标方向组织的阶段化学习路线</p>
      <div className="space-y-6">
        {paths.map((p) => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-800">{p.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5 mb-4">
              {p.description} · 目标岗位：{p.targetJob}
            </p>
            <div className="flex flex-wrap gap-4">
              {p.stages.map((s, i) => (
                <div key={i} className="flex-1 min-w-[180px]">
                  <div className="text-xs font-medium text-blue-600 mb-2">
                    阶段 {i + 1}：{s.name}
                  </div>
                  <ul className="space-y-1">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
