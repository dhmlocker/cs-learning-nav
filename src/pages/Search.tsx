import { Fragment } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchAll, GROUP_LABELS, type SearchResult } from '../utils/search'

const GROUP_ORDER = ['courses', 'tools', 'projects', 'jobs', 'paths'] as const

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') || ''

  const setKeyword = (value: string) => {
    if (value.trim()) {
      setSearchParams({ q: value }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const results = searchAll(keyword)
  const hasResults = GROUP_ORDER.some((k) => results[k].length > 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-4">全站搜索</h1>

      <input
        type="text"
        placeholder="搜索课程、工具、项目、岗位、学习路径…"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        autoFocus
      />

      {!keyword.trim() && (
        <p className="text-center text-gray-400 text-sm mt-12">
          输入关键词搜索课程、工具、项目、岗位和学习路径
        </p>
      )}

      {keyword.trim() && !hasResults && (
        <p className="text-center text-gray-400 text-sm mt-12">
          未找到与 "{keyword}" 相关的结果
        </p>
      )}

      {hasResults && (
        <div className="space-y-6">
          {GROUP_ORDER.map((group) => {
            const items = results[group]
            if (items.length === 0) return null
            return <ResultGroup key={group} group={group} items={items} keyword={keyword} />
          })}
        </div>
      )}
    </div>
  )
}

function Highlight({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) return <>{text}</>

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-gray-900 rounded-sm">{part}</mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}

function ResultGroup({ group, items, keyword }: { group: string; items: SearchResult[]; keyword: string }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        {GROUP_LABELS[group]}
        <span className="ml-1 text-xs text-gray-400 font-normal">({items.length})</span>
      </h2>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={`${group}-${item.id}`}
            to={item.to}
            className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-blue-600">
                <Highlight text={item.title} keyword={keyword} />
              </span>
              {item.category && (
                <span className="text-xs text-gray-400">
                  <Highlight text={item.category} keyword={keyword} />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">
              <Highlight text={item.description} keyword={keyword} />
            </p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((t) => (
                  <span key={t} className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                    <Highlight text={t} keyword={keyword} />
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
