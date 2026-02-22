import { API_BASE } from './deploy-constants'

type FetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>

async function post(path: string, body: Record<string, unknown>, fetchFn?: FetchFn | null) {
  const doFetch = fetchFn || fetch
  const res = await doFetch(`${API_BASE}${path}`, {
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

async function get(path: string, fetchFn?: FetchFn | null) {
  const doFetch = fetchFn || fetch
  const res = await doFetch(`${API_BASE}${path}`)
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

export async function apiCreateEvent(data: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post('/api/arena/events', data, signedFetch)
}

export async function apiRegisterForEvent(eventId: string, data: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post(`/api/arena/events/${eventId}/register`, data, signedFetch)
}

export async function apiUpdateEventStatus(eventId: string, data: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post(`/api/arena/events/${eventId}/status`, data, signedFetch)
}

export async function apiVoteEvent(eventId: string, data: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post(`/api/arena/events/${eventId}/vote`, data, signedFetch)
}

export async function apiJudgeEvent(eventId: string, data: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post(`/api/arena/events/${eventId}/judge`, data, signedFetch)
}

export async function apiDistributePrizes(eventId: string, data: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post(`/api/arena/events/${eventId}/distribute`, data, signedFetch)
}

export async function apiCheckAdmin(address: string): Promise<{ isAdmin: boolean }> {
  return get(`/api/arena/admin-check?address=${address}`)
}

export async function apiGetLeaderboard(): Promise<{ leaderboard: LeaderboardEntry[] }> {
  return get('/api/arena/leaderboard')
}

// ---- Agent Verification (ERC-8126) ----

export interface VerificationProof {
  proofType: string
  score: number
  details: Record<string, unknown>
  timestamp: string
}

export interface VerificationResult {
  agentId: string
  network: string
  overallScore: number
  riskTier: string
  proofs: VerificationProof[]
  txHash?: string
  verifiedAt: string
}

export async function apiVerifyAgent(network: string, agentId: string, signedFetch?: FetchFn | null): Promise<VerificationResult> {
  return post(`/api/verify/${network}/${agentId}`, {}, signedFetch)
}

export async function apiGetVerification(network: string, agentId: string): Promise<VerificationResult | null> {
  return get(`/api/verify/${network}/${agentId}`)
}

export async function apiStoreAgent(agentData: Record<string, unknown>, signedFetch?: FetchFn | null) {
  return post('/api/agents', agentData, signedFetch)
}

// ---- Hire System ----

export interface HirePlan {
  calls: number
  days: number
  price: number
  label: string
}

export interface HireRecord {
  hireId: string
  network: string
  agentId: string
  buyerAddress: string
  plan: string
  callsTotal: number
  callsUsed: number
  daysValid: number
  pricePaid: string
  paymentTxHash: string
  status: string
  createdAt: string
  expiresAt: string
  agent?: Record<string, unknown>
}

export async function apiGetPlans(network: string, agentId: string): Promise<{ free: boolean; plans: Record<string, HirePlan> | null; perCallPrice?: number; relayerAddress?: string }> {
  return get(`/api/hire/plans/${network}/${agentId}`)
}

export async function apiBridgeInitiate(data: {
  sourceChain: string
  paymentTxHash: string
  amount: string
  finalRecipient: string
  purpose: string
}): Promise<{ bridgeId: string; status: string }> {
  return post('/api/bridge/initiate', data)
}

export async function apiRecordHire(data: Record<string, unknown>): Promise<{ ok: boolean; hireId: string; hire: HireRecord }> {
  return post('/api/hire', data)
}

export async function apiGetMyHires(address: string): Promise<{ hires: HireRecord[] }> {
  return get(`/api/hire/my/${address}`)
}

export async function apiGetHireStatus(hireId: string): Promise<HireRecord> {
  return get(`/api/hire/status/${hireId}`)
}

export async function apiCheckActiveHire(address: string, network: string, agentId: string): Promise<{ active: boolean; hire: HireRecord | null }> {
  return get(`/api/hire/active/${address}/${network}/${agentId}`)
}

// ---- Workspace ----

export interface WorkspaceMessage {
  userMessage: string
  agentResponse: string
  timestamp: string
  hasFiles: boolean
}

export async function apiWorkspaceCall(hireId: string, message: string, files?: { name: string; data: string; mimeType: string }[]): Promise<{ response: string; callsUsed: number; callsTotal: number }> {
  return post('/api/workspace/call', { hireId, message, files })
}

export async function apiWorkspaceHistory(hireId: string): Promise<{ history: WorkspaceMessage[] }> {
  return get(`/api/workspace/history/${hireId}`)
}

export async function apiWorkspaceClear(hireId: string): Promise<{ ok: boolean }> {
  return post(`/api/workspace/clear/${hireId}`, {})
}

// ---- Withdraw (Circle wallet → owner wallet) ----

export async function apiWithdraw(data: {
  agentId: string
  network: string
  toAddress: string
  amount: string
  ownerAddress: string
  usdcAddress: string
  message?: string
  signature?: string
}, signedFetch?: FetchFn | null): Promise<{ ok: boolean; circleTxId?: string; txHash?: string }> {
  return post('/api/circle/withdraw', data, signedFetch)
}

export async function apiWithdrawStatus(circleTxId: string): Promise<{ status: string; txHash?: string | null }> {
  return get(`/api/circle/withdraw-status/${circleTxId}`)
}
