interface SearchFilterProps {
  keyword: string
  onKeywordChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  difficulty: string
  onDifficultyChange: (value: string) => void
  categories: string[]
  difficulties: string[]
  onReset: () => void
  resultCount: number
  totalCount: number
  placeholder?: string
  label?: string
}

const hasFilter = (keyword: string, category: string, difficulty: string) =>
  keyword || category || difficulty

export default function SearchFilter({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  categories,
  difficulties,
  onReset,
  resultCount,
  totalCount,
  placeholder = '搜索名称、描述、标签…',
  label = '条',
}: SearchFilterProps) {
  const active = hasFilter(keyword, category, difficulty)

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2.5 p-3 card">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder={placeholder}
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
          />
        </div>
        {categories.length > 0 && (
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="select"
          >
            <option value="">全部分类</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
        {difficulties.length > 0 && (
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="select"
          >
            <option value="">全部难度</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        )}
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-slate-500 border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          重置
        </button>
      </div>

      <div className="flex items-center gap-2 mt-2.5">
        <p className="text-xs text-slate-400">
          共 {resultCount} {label}
        </p>
        {active && (
          <>
            <span className="text-slate-300 text-xs">·</span>
            <span className="text-xs text-brand-600 font-medium">已筛选</span>
            {resultCount !== totalCount && (
              <span className="text-xs text-slate-400">（共 {totalCount} 条）</span>
            )}
          </>
        )}
      </div>
    </div>
  )
}
