export type ReportCase = {
  id: string
  createdAt: string
  category: 'fee' | 'scam' | 'threat' | 'rumour' | 'other'
  location: string
  summary: string
  anonymous: boolean
  status: 'new' | 'triaged' | 'escalated'
}

const KEY = 'markettrust_cases_v1'

export function loadCases(): ReportCase[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as ReportCase[]
  } catch {
    return []
  }
}

export function saveCase(
  input: Omit<ReportCase, 'id' | 'createdAt' | 'status'>,
): ReportCase {
  const item: ReportCase = {
    ...input,
    id: `MT-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  }
  const all = [item, ...loadCases()].slice(0, 50)
  localStorage.setItem(KEY, JSON.stringify(all))
  return item
}

export function updateCaseStatus(id: string, status: ReportCase['status']) {
  const all = loadCases().map((c) => (c.id === id ? { ...c, status } : c))
  localStorage.setItem(KEY, JSON.stringify(all))
  return all
}
