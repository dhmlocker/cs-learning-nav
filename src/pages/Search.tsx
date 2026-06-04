import { Fragment, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchAll, GROUP_LABELS, type SearchResult } from '../utils/search'

const GROUP_ORDER = ['courses', 'tools', 'projects', 'jobs', 'paths'] as const

const FILTER_TABS = [
  { key: 'all', label: '全部' },
  { key: 'courses', label: '课程' },
  { key: 'tools', label: '工具' },
  { key: 'projects', label: '项目' },
  { key: 'jobs', label: '岗位' },
  { key: 'paths', label: '学习路径' },
] as const

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const [filter, setFilter] = useState('all')

  const setKeyword = (value: string) => {
    if (value.trim()) {
      setSearchParams({ q: value }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const results = searchAll(keyword)
  const hasResults = GROUP_ORDER.some((k) => results[k].length > 0)

  const typeCounts: Record<string, number> = {
    all: GROUP_ORDER.reduce((sum, k) => sum + results[k].length, 0),
    ...Object.fromEntries(GROUP_ORDER.map((k) => [k, results[k].length])),
  }

  const showTabs = keyword.trim() !== ''

  return (
    <div className="content-container py-8">
      <h1 className="text-xl font-bold text-slate-900 mb-5">全站搜索</h1>

      <div className="relative mb-5">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          placeholder="搜索课程、工具、项目、岗位、学习路径…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl text-sm bg-white shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
          autoFocus
        />
      </div>

      {showTabs && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                filter === tab.key
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              {tab.label}
              <span className={`ml-1 ${filter === tab.key ? 'text-white/70' : 'text-slate-400'}`}>
                ({typeCounts[tab.key]})
              </span>
            </button>
          ))}
        </div>
      )}

      {!keyword.trim() && (
        <div className="text-center text-slate-400 mt-16">
          <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-sm">输入关键词搜索课程、工具、项目、岗位和学习路径</p>
        </div>
      )}

      {keyword.trim() && !hasResults && (
        <div className="text-center text-slate-400 mt-16">
          <p className="text-sm">未找到与 "{keyword}" 相关的结果</p>
          <p className="text-xs mt-1 text-slate-300">试试其他关键词</p>
        </div>
      )}

      {keyword.trim() && hasResults && filter !== 'all' && results[filter].length === 0 && (
        <p className="text-center text-slate-400 text-sm mt-12">
          {GROUP_LABELS[filter]} 分类暂无匹配结果
        </p>
      )}

      {hasResults && (
        <div className="space-y-8">
          {GROUP_ORDER.map((group) => {
            if (filter !== 'all' && filter !== group) return null
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
          <mark key={i} className="bg-amber-100 text-amber-900 rounded-sm px-0.5">{part}</mark>
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
      <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        {GROUP_LABELS[group]}
        <span className="text-xs text-slate-400 font-normal">({items.length})</span>
      </h2>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={`${group}-${item.id}`}
            to={item.to}
            className="block p-3.5 card-hover"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-brand-700">
                <Highlight text={item.title} keyword={keyword} />
              </span>
              {item.category && (
                <span className="text-xs text-slate-400">
                  <Highlight text={item.category} keyword={keyword} />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              <Highlight text={item.description} keyword={keyword} />
            </p>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((t) => (
                  <span key={t} className="tag">
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
