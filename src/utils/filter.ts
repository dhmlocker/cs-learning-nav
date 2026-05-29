export const DIFFICULTY_COLORS: Record<string, string> = {
  '入门': 'bg-green-50 text-green-600',
  '基础': 'bg-blue-50 text-blue-600',
  '进阶': 'bg-yellow-50 text-yellow-600',
  '高级': 'bg-red-50 text-red-600',
}

export interface Searchable {
  title?: string
  name?: string
  description: string
  tags: string[]
}

export function getUniqueOptions<T, K extends keyof T>(items: T[], key: K): string[] {
  const set = new Set(items.map((item) => item[key] as unknown as string))
  return [...set].sort()
}

export function matchKeyword(item: Searchable, keyword: string): boolean {
  const kw = keyword.toLowerCase()
  if (item.title?.toLowerCase().includes(kw)) return true
  if (item.name?.toLowerCase().includes(kw)) return true
  if (item.description.toLowerCase().includes(kw)) return true
  if (item.tags.some((t) => t.toLowerCase().includes(kw))) return true
  return false
}
