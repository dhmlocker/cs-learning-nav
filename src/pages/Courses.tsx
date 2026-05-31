import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../data'
import SearchFilter from '../components/SearchFilter'
import { DIFFICULTY_COLORS, getUniqueOptions, matchKeyword } from '../utils/filter'

export default function Courses() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const categories = useMemo(() => getUniqueOptions(courses, 'category'), [])
  const difficulties = useMemo(() => getUniqueOptions(courses, 'difficulty'), [])

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (keyword && !matchKeyword(c, keyword)) return false
      if (category && c.category !== category) return false
      if (difficulty && c.difficulty !== difficulty) return false
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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">课程知识库</h1>
      <p className="text-gray-500 text-sm mb-4">计算机专业核心课程体系</p>

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
        totalCount={courses.length}
        placeholder="搜索课程名称、描述、标签…"
        label="门课程"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">没有匹配的课程，试试调整筛选条件</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => {
            const toolCount = c.relatedTools.length
            const projCount = c.relatedProjects.length
            const jobCount = c.relatedJobs.length
            const hasStats = toolCount > 0 || projCount > 0 || jobCount > 0
            return (
              <Link
                to={`/courses/${c.id}`}
                key={c.id}
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[c.difficulty]}`}>
                    {c.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">{c.category}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{c.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.tags.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                {hasStats && (
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    {toolCount > 0 && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                        {toolCount} 工具
                      </span>
                    )}
                    {projCount > 0 && (
                      <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                        {projCount} 项目
                      </span>
                    )}
                    {jobCount > 0 && (
                      <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded">
                        {jobCount} 岗位
                      </span>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
