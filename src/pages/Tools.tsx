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
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">工具手册</h1>
        <p className="text-sm text-slate-500">常用开发工具、工程工具、AI 工具和部署工具</p>
      </div>

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
        <div className="text-center py-16">
          <p className="text-slate-400 text-sm">没有匹配的工具，试试调整筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <Link
              to={`/tools/${t.id}`}
              key={t.id}
              className="card-hover p-5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-400">{t.category}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[t.difficulty]}`}>
                  {t.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                {t.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{t.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {t.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
