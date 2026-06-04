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
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">项目库</h1>
        <p className="text-sm text-slate-500">选择一个项目开始学习，以项目任务反推具体知识点</p>
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
        totalCount={projects.length}
        placeholder="搜索项目名称、描述、标签…"
        label="个项目"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400 text-sm">没有匹配的项目，试试调整筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <Link
              to={`/projects/${p.id}`}
              key={p.id}
              className="card-hover p-5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-400">{p.category}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${DIFFICULTY_COLORS[p.difficulty]}`}>
                  {p.difficulty}
                </span>
                {p.taskFlow && p.taskFlow.length > 0 && (
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">图谱</span>
                )}
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
