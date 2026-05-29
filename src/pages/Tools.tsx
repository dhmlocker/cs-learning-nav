import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { tools } from '../data'
import SearchFilter from '../components/SearchFilter'
import { DIFFICULTY_COLORS, getUniqueOptions, matchKeyword } from '../utils/filter'

export default function Tools() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const categories = useMemo(() => getUniqueOptions(tools, 'category'), [])
  const difficulties = useMemo(() => getUniqueOptions(tools, 'difficulty'), [])

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (keyword && !matchKeyword(t, keyword)) return false
      if (category && t.category !== category) return false
      if (difficulty && t.difficulty !== difficulty) return false
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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">工具手册</h1>
      <p className="text-gray-500 text-sm mb-4">常用开发工具、工程工具、AI 工具和部署工具</p>

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
        totalCount={tools.length}
        placeholder="搜索工具名称、描述、标签…"
        label="个工具"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">没有匹配的工具，试试调整筛选条件</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <Link
              to={`/tools/${t.id}`}
              key={t.id}
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400">{t.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[t.difficulty]}`}>
                  {t.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800">{t.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{t.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
