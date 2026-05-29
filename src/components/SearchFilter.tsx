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
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3 p-4 bg-white border border-gray-200 rounded-lg">
        <input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
        >
          <option value="">全部分类</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {difficulties.length > 0 && (
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="">全部难度</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        )}
        <button
          onClick={onReset}
          className="px-4 py-1.5 text-sm text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          重置
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        共 {resultCount} {label}
        {(keyword || category || difficulty) && ` · 已筛选`}
        {resultCount !== totalCount && `（共 ${totalCount} 条）`}
      </p>
    </div>
  )
}
