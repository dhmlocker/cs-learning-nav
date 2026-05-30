import { courses, tools, projects, jobs, paths } from '../data'

export interface SearchResult {
  type: 'course' | 'tool' | 'project' | 'job' | 'path'
  id: string
  title: string
  description: string
  tags: string[]
  category?: string
  to: string
}

interface Matchable {
  title?: string
  name?: string
  description: string
  tags: string[]
  category?: string
}

function matches(kw: string, item: Matchable): boolean {
  if (item.title?.toLowerCase().includes(kw)) return true
  if (item.name?.toLowerCase().includes(kw)) return true
  if (item.description.toLowerCase().includes(kw)) return true
  if (item.tags.some((t) => t.toLowerCase().includes(kw))) return true
  if (item.category?.toLowerCase().includes(kw)) return true
  return false
}

export function searchAll(keyword: string): Record<string, SearchResult[]> {
  if (!keyword.trim()) {
    return { courses: [], tools: [], projects: [], jobs: [], paths: [] }
  }

  const kw = keyword.toLowerCase()

  return {
    courses: courses.filter((c) => matches(kw, c)).map((c) => ({
      type: 'course' as const, id: c.id, title: c.title,
      description: c.description, tags: c.tags, category: c.category,
      to: `/courses/${c.id}`,
    })),
    tools: tools.filter((t) => matches(kw, t)).map((t) => ({
      type: 'tool' as const, id: t.id, title: t.name,
      description: t.description, tags: t.tags, category: t.category,
      to: `/tools/${t.id}`,
    })),
    projects: projects.filter((p) => matches(kw, p)).map((p) => ({
      type: 'project' as const, id: p.id, title: p.title,
      description: p.description, tags: p.tags, category: p.category,
      to: `/projects/${p.id}`,
    })),
    jobs: jobs.filter((j) => matches(kw, j)).map((j) => ({
      type: 'job' as const, id: j.id, title: j.title,
      description: j.description, tags: j.tags, category: j.category,
      to: `/jobs/${j.id}`,
    })),
    paths: paths.filter((p) => matches(kw, { ...p, tags: p.tags ?? [] })).map((p) => ({
      type: 'path' as const, id: p.id, title: p.title,
      description: p.description, tags: p.tags ?? [], category: p.targetJob,
      to: `/paths/${p.id}`,
    })),
  }
}

export const GROUP_LABELS: Record<string, string> = {
  courses: '课程',
  tools: '工具',
  projects: '项目',
  jobs: '岗位',
  paths: '学习路径',
}
