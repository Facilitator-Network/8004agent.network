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

export async function apiListAgents(): Promise<{ agents: Record<string, unknown>[] }> {
  return get('/api/agents')
}

export async function apiGetAgent(network: string, agentId: string) {
  return get(`/api/agents/${network}/${agentId}`)
}

// ---- Arena ----

export interface EventParticipant {
  agentId: string
  network: string
  name: string
  ownerAddress: string
  endpoint: string
  paymentTxHash: string
  registeredAt: string
}

export interface PromptScore {
  prompt: number
  latency: number
  accuracy: number
  completeness: number
  domainExpertise: number
  reasoning: number
  safety: number
  clarity: number
  edgeCases: number
  total: number
  feedback: string
  error?: string
}

export interface AgentScore {
  name: string
  promptScores: PromptScore[]
  totalScore: number
  avgScore: number
  avgLatency: number
}

export interface EventResults {
  rankings: { rank: number; agentKey: string; name: string; ownerAddress: string; avgScore: number; totalScore: number }[]
  rewardPot: number
  winnerBonus: number
  voterPool: number
  perVoter: number
  winningVoterCount: number
  distributions: { address: string; amount: number; reason: string; txHash?: string; status: string; agent?: string }[]
}

export interface ArenaEvent {
  id: string
  title: string
  category: string
  description: string
  entryFee: string
  maxParticipants: string
  prompts: string[]
  status: 'registration' | 'voting' | 'battle' | 'judging' | 'completed'
  createdBy: string
  createdAt: string
  registrationDeadline: string
  battleStart: string
  battleEnd: string
  participants: EventParticipant[]
  votes: Record<string, string[]>
  scores: Record<string, AgentScore>
  results: EventResults | Record<string, never>
  facilitator: { id: string; name: string; wallet: string }
}

export interface LeaderboardEntry {
  rank: number
  network: string
  agentId: string
  name: string
  imageUrl: string
  elo: number
  battles: number
  wins: number
  winRate: number
}

export async function apiListEvents(status?: string): Promise<{ events: ArenaEvent[] }> {
  const qs = status ? `?status=${status}` : ''
  return get(`/api/arena/events${qs}`)
}

export async function apiGetEvent(id: string): Promise<ArenaEvent> {
  return get(`/api/arena/events/${id}`)
}

export async function apiCreateEvent(data: Record<string, unknown>) {
  return post('/api/arena/events', data)
}

export async function apiRegisterForEvent(eventId: string, data: Record<string, unknown>) {
  return post(`/api/arena/events/${eventId}/register`, data)
}

export async function apiUpdateEventStatus(eventId: string, data: Record<string, unknown>) {
  return post(`/api/arena/events/${eventId}/status`, data)
}

export async function apiVoteEvent(eventId: string, data: Record<string, unknown>) {
  return post(`/api/arena/events/${eventId}/vote`, data)
}

export async function apiJudgeEvent(eventId: string, data: Record<string, unknown>) {
  return post(`/api/arena/events/${eventId}/judge`, data)
}

export async function apiDistributePrizes(eventId: string, data: Record<string, unknown>) {
  return post(`/api/arena/events/${eventId}/distribute`, data)
}

export async function apiCheckAdmin(address: string): Promise<{ isAdmin: boolean }> {
  return get(`/api/arena/admin-check?address=${address}`)
}

export async function apiGetLeaderboard(): Promise<{ leaderboard: LeaderboardEntry[] }> {
  return get('/api/arena/leaderboard')
}
