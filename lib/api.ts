import { API_BASE } from './deploy-constants'

async function post(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || res.statusText || `HTTP ${res.status}`)
  }
  return data
}

async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || res.statusText || `HTTP ${res.status}`)
  }
  return data
}

export async function apiCheckAgent(name?: string, url?: string): Promise<{ nameTaken: boolean; urlTaken: boolean }> {
  const params = new URLSearchParams()
  if (name) params.set('name', name)
  if (url) params.set('url', url)
  return get(`/api/agents/check?${params.toString()}`)
}

export async function apiCreateCircleWallet(agentId: string) {
  return post('/api/circle/create-wallet', { agentId })
}

export async function apiStoreAgent(agentData: Record<string, unknown>) {
  return post('/api/agents', agentData)
}
