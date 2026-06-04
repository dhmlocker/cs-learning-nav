import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { jobs } from '../data'
import SearchFilter from '../components/SearchFilter'
import { getUniqueOptions, matchKeyword } from '../utils/filter'

export default function Jobs() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')

  const categories = useMemo(() => getUniqueOptions(jobs, 'category'), [])

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (keyword && !matchKeyword(j, keyword)) return false
      if (category && j.category !== category) return false
      return true
    })
  }, [keyword, category])

  const reset = () => {
    setKeyword('')
    setCategory('')
  }

  return (
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">岗位地图</h1>
        <p className="text-sm text-slate-500">技术岗位方向与技能要求</p>
      </div>

      <SearchFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
        difficulty=""
        onDifficultyChange={() => {}}
        categories={categories}
        difficulties={[]}
        onReset={reset}
        resultCount={filtered.length}
        totalCount={jobs.length}
        placeholder="搜索岗位名称、描述、标签…"
        label="个岗位"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400 text-sm">没有匹配的岗位，试试调整筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((j) => (
            <Link
              to={`/jobs/${j.id}`}
              key={j.id}
              className="card-hover p-5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-400">{j.category}</span>
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                {j.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{j.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {j.tags.map((t) => (
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
