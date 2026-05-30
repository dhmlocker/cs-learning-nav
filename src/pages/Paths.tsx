import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../data'
import SearchFilter from '../components/SearchFilter'

export default function Paths() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const difficulties = useMemo(() => {
    const set = new Set(
      paths.map((p) => p.difficulty).filter(Boolean) as string[]
    )
    return Array.from(set).sort()
  }, [])

  const filtered = useMemo(() => {
    return paths.filter((p) => {
      if (keyword) {
        const kw = keyword.toLowerCase()
        const matchTitle = p.title.toLowerCase().includes(kw)
        const matchDesc = p.description.toLowerCase().includes(kw)
        const matchTags = p.tags?.some((t) => t.toLowerCase().includes(kw))
        const matchJob = p.targetJob.toLowerCase().includes(kw)
        if (!matchTitle && !matchDesc && !matchTags && !matchJob) return false
      }
      if (difficulty && p.difficulty !== difficulty) return false
      return true
    })
  }, [keyword, difficulty])

  const reset = () => {
    setKeyword('')
    setCategory('')
    setDifficulty('')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">学习路径</h1>
      <p className="text-gray-500 text-sm mb-6">根据不同目标方向组织的阶段化学习路线</p>

      <SearchFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        categories={[]}
        difficulties={difficulties}
        onReset={reset}
        resultCount={filtered.length}
        totalCount={paths.length}
        placeholder="搜索路径名称、描述、目标岗位…"
        label="条路径"
      />

      <div className="space-y-6">
        {filtered.map((p) => (
          <Link
            to={`/paths/${p.id}`}
            key={p.id}
            className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
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
          </Link>
        ))}
      </div>
    </div>
  )
}
