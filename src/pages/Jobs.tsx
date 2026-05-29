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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">岗位地图</h1>
      <p className="text-gray-500 text-sm mb-4">技术岗位方向与技能要求</p>

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
        <p className="text-gray-400 text-sm py-12 text-center">没有匹配的岗位，试试调整筛选条件</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((j) => (
            <Link
              to={`/jobs/${j.id}`}
              key={j.id}
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400">{j.category}</span>
              </div>
              <h3 className="font-semibold text-gray-800">{j.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{j.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {j.tags.map((t) => (
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
