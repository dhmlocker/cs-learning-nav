import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data'
import SearchFilter from '../components/SearchFilter'
import { DIFFICULTY_COLORS, getUniqueOptions, matchKeyword } from '../utils/filter'

export default function Projects() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const categories = useMemo(() => getUniqueOptions(projects, 'category'), [])
  const difficulties = useMemo(() => getUniqueOptions(projects, 'difficulty'), [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (keyword && !matchKeyword(p, keyword)) return false
      if (category && p.category !== category) return false
      if (difficulty && p.difficulty !== difficulty) return false
      return true
    })
  }, [keyword, category, difficulty])

  const reset = () => {
    setKeyword('')
    setCategory('')
    setDifficulty('')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">项目库</h1>
      <p className="text-gray-500 text-sm mb-4">不同方向、不同难度的实战项目</p>

      <SearchFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        categories={categories}
        difficulties={difficulties}
        onReset={reset}
        resultCount={filtered.length}
        totalCount={projects.length}
        placeholder="搜索项目名称、描述、标签…"
        label="个项目"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">没有匹配的项目，试试调整筛选条件</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <Link
              to={`/projects/${p.id}`}
              key={p.id}
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400">{p.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[p.difficulty]}`}>
                  {p.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
