import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../data'
import { DIFFICULTY_COLORS } from '../utils/filter'
import SearchFilter from '../components/SearchFilter'

const STATS: { key: string; label: string; color: string }[] = [
  { key: 'stages', label: '阶段', color: 'bg-blue-50 text-blue-600' },
  { key: 'courses', label: '课程', color: 'bg-green-50 text-green-600' },
  { key: 'projects', label: '项目', color: 'bg-purple-50 text-purple-600' },
  { key: 'jobs', label: '岗位', color: 'bg-orange-50 text-orange-600' },
]

function getCounts(p: (typeof paths)[number]) {
  return {
    stages: p.stages.length,
    courses: p.relatedCourses?.length ?? 0,
    projects: p.relatedProjects?.length ?? 0,
    jobs: p.relatedJobs?.length ?? 0,
  }
}

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

      <div className="space-y-4">
        {filtered.map((p) => {
          const counts = getCounts(p)
          return (
            <Link
              to={`/paths/${p.id}`}
              key={p.id}
              className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              {/* 标题行：标题 + 难度 + 标签 */}
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-semibold text-gray-800">{p.title}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  {p.difficulty && (
                    <span className={`text-xs px-2 py-0.5 rounded ${DIFFICULTY_COLORS[p.difficulty]}`}>
                      {p.difficulty}
                    </span>
                  )}
                  {p.tags?.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 描述行 */}
              <p className="text-sm text-gray-500 mb-3">
                {p.description} · 目标岗位：{p.targetJob}
              </p>

              {/* 统计行 */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {STATS.map(({ key, label, color }) => (
                  <span
                    key={key}
                    className={`text-xs px-2 py-0.5 rounded ${color}`}
                  >
                    {counts[key as keyof typeof counts]} {label}
                  </span>
                ))}
              </div>

              {/* 阶段摘要：阶段名连成箭头链 */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="text-gray-500 font-medium">学习路线：</span>
                {p.stages.map((s, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-gray-300">→</span>}
                    <span>{s.name}</span>
                  </span>
                ))}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
