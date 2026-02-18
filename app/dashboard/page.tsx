"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { CONTRACTS } from "@/lib/deploy-constants"
import {
  apiListAgents,
  apiListEvents,
  apiGetLeaderboard,
  apiGetVerification,
  apiGetUserHires,
  type ArenaEvent,
  type LeaderboardEntry,
  type VerificationResult,
} from "@/lib/api"
import {
  fetchAgentUsdcBalance,
  fetchAgentReputation,
  fetchAgentFeedbacks,
  type FeedbackEntry,
} from "@/lib/dashboard"
import { useWallet } from "@/components/wallet-provider"

// ---- Types ----
interface Agent {
  agentId: string
  name: string
  url: string
  imageUrl: string
  description: string
  version: string
  author: string
  license: string
  mcpEndpoint: string
  a2aEndpoint: string
  skills: string[]
  domains: string[]
  trustModels: string[]
  x402Payment: string
  metadataStorage: string
  status: string
  hirePrice: string
  network: string
  ownerAddress: string
  registrationTx: string
  registeredAt: string
  agentWalletAddress: string
  circleWalletId: string
}

interface HiredAgent extends Agent {
  paymentAmount: number
  paymentTxHash: string
}

// ---- Unique agents: group by name across networks ----
function deduplicateAgents(agents: Agent[]): Agent[] {
  const seen = new Map<string, Agent>()
  for (const a of agents) {
    const key = a.name.toLowerCase()
    if (!seen.has(key)) seen.set(key, a)
  }
  return Array.from(seen.values())
}

// ---- Corner Brackets ----
function CornerBrackets({ opacity = 20 }: { opacity?: number }) {
  const cls = `border-foreground/${opacity}`
  return (
    <>
      <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${cls}`} />
      <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r ${cls}`} />
      <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l ${cls}`} />
      <div className={`absolute bottom-2 right-2 w-3 h-3 border-b border-r ${cls}`} />
    </>
  )
}

// ---- Truncate Address ----
function truncAddr(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// ---- Tier Styles ----
const TIER_STYLES: Record<string, string> = {
  MINIMAL: "border-green-500/60 text-green-500 bg-green-500/5",
  LOW: "border-cyan-500/60 text-cyan-500 bg-cyan-500/5",
  MEDIUM: "border-yellow-500/60 text-yellow-500 bg-yellow-500/5",
  HIGH: "border-red-400/60 text-red-400 bg-red-400/5",
  CRITICAL: "border-red-600/60 text-red-600 bg-red-600/10",
}

const STATUS_COLORS: Record<string, string> = {
  registration: "text-system-green border-system-green/40",
  voting: "text-info-blue border-info-blue/40",
  battle: "text-warning-amber border-warning-amber/40",
  judging: "text-purple-400 border-purple-400/40",
  completed: "text-muted-foreground border-border",
}

// ---- Main Page ----
export default function DashboardPage() {
  const { walletAddress, isConnecting, connect } = useWallet()

  // Data states
  const [myAgents, setMyAgents] = useState<Agent[]>([])
  const [allEvents, setAllEvents] = useState<ArenaEvent[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [hiredAgents, setHiredAgents] = useState<HiredAgent[]>([])
  const [balances, setBalances] = useState<Record<string, number>>({})
  const [reputations, setReputations] = useState<Record<string, { count: number; avg: number }>>({})
  const [verifications, setVerifications] = useState<Record<string, VerificationResult | null>>({})
  const [feedbacks, setFeedbacks] = useState<Record<string, FeedbackEntry[]>>({})
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  // Loading states
  const [loadingAgents, setLoadingAgents] = useState(true)
  const [loadingArena, setLoadingArena] = useState(true)
  const [loadingHires, setLoadingHires] = useState(true)
  const [loadingBalances, setLoadingBalances] = useState(false)

  // Primary data fetch
  useEffect(() => {
    if (!walletAddress) return

    const addr = walletAddress.toLowerCase()

    // Fetch agents
    apiListAgents()
      .then((data) => {
        const all = (data.agents || []) as unknown as Agent[]
        const owned = all.filter((a) => a.ownerAddress?.toLowerCase() === addr)
        setMyAgents(deduplicateAgents(owned))
      })
      .catch(() => {})
      .finally(() => setLoadingAgents(false))

    // Fetch arena events + leaderboard in parallel
    Promise.all([
      apiListEvents().catch(() => ({ events: [] })),
      apiGetLeaderboard().catch(() => ({ leaderboard: [] })),
    ]).then(([evtData, lbData]) => {
      setAllEvents((evtData.events || []) as ArenaEvent[])
      setLeaderboard((lbData.leaderboard || []) as LeaderboardEntry[])
    }).finally(() => setLoadingArena(false))

    // Fetch hired agents
    apiGetUserHires(walletAddress)
      .then((data) => setHiredAgents((data.hires || []) as unknown as HiredAgent[]))
      .catch(() => {})
      .finally(() => setLoadingHires(false))
  }, [walletAddress])

  // Secondary data: balances, reputation, verification (after agents loaded)
  useEffect(() => {
    if (myAgents.length === 0) return
    setLoadingBalances(true)

    const fetchSecondary = async () => {
      const balMap: Record<string, number> = {}
      const repMap: Record<string, { count: number; avg: number }> = {}
      const verMap: Record<string, VerificationResult | null> = {}

      await Promise.allSettled(
        myAgents.map(async (agent) => {
          const key = `${agent.network}:${agent.agentId}`

          // Balance
          if (agent.agentWalletAddress) {
            balMap[key] = await fetchAgentUsdcBalance(agent.agentWalletAddress)
          }

          // Reputation
          repMap[key] = await fetchAgentReputation(agent.network, agent.agentId)

          // Verification
          try {
            const v = await apiGetVerification(agent.network, agent.agentId)
            verMap[key] = v && v.riskTier ? v : null
          } catch {
            verMap[key] = null
          }
        })
      )

      setBalances(balMap)
      setReputations(repMap)
      setVerifications(verMap)
      setLoadingBalances(false)
    }

    fetchSecondary()
  }, [myAgents])

  // Load feedbacks on agent expand
  const handleExpand = useCallback(async (agent: Agent) => {
    const key = `${agent.network}:${agent.agentId}`
    if (expandedAgent === key) {
      setExpandedAgent(null)
      return
    }
    setExpandedAgent(key)
    if (!feedbacks[key]) {
      const fb = await fetchAgentFeedbacks(agent.network, agent.agentId)
      setFeedbacks((prev) => ({ ...prev, [key]: fb }))
    }
  }, [expandedAgent, feedbacks])

  // ---- Computed stats ----
  const totalBalance = Object.values(balances).reduce((s, b) => s + b, 0)
  const repValues = Object.values(reputations).filter((r) => r.count > 0)
  const avgReputation = repValues.length > 0
    ? repValues.reduce((s, r) => s + r.avg, 0) / repValues.length
    : 0

  // Arena stats for my agents
  const myAgentKeys = new Set(myAgents.map((a) => `${a.network}:${a.agentId}`))
  const myLeaderboardEntries = leaderboard.filter((e) => myAgentKeys.has(`${e.network}:${e.agentId}`))
  const totalWins = myLeaderboardEntries.reduce((s, e) => s + e.wins, 0)
  const totalBattles = myLeaderboardEntries.reduce((s, e) => s + e.battles, 0)

  // Events my agents participated in
  const myEvents = allEvents.filter((evt) =>
    evt.participants?.some((p) => p.ownerAddress?.toLowerCase() === walletAddress?.toLowerCase())
  )

  // Prize money earned
  const prizeMoney = myEvents.reduce((sum, evt) => {
    if (!evt.results?.distributions) return sum
    return sum + evt.results.distributions
      .filter((d) => d.address?.toLowerCase() === walletAddress?.toLowerCase() && d.status === "success")
      .reduce((s, d) => s + (d.amount || 0), 0)
  }, 0)

  // ---- Not connected ----
  if (!walletAddress) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-border p-8 relative text-center max-w-md"
          >
            <CornerBrackets />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">
              Wallet Required
            </span>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
              Connect your wallet to view your agents, earnings, reputation, and arena performance.
            </p>
            <button
              onClick={connect}
              disabled={isConnecting}
              className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-30"
            >
              {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  // ---- Connected ----
  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground">
              DASHBOARD
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-2">
              {truncAddr(walletAddress)}
            </p>
          </motion.div>

          {/* ═══════════ Section 1: Portfolio Overview ═══════════ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <SectionLabel label="Portfolio Overview" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <StatCard
                label="My Agents"
                value={loadingAgents ? "..." : String(myAgents.length)}
                loading={loadingAgents}
              />
              <StatCard
                label="Total Earned"
                value={loadingBalances ? "..." : `$${totalBalance.toFixed(2)}`}
                subtext="USDC"
                color="text-system-green"
                loading={loadingBalances}
              />
              <StatCard
                label="Avg Reputation"
                value={loadingBalances ? "..." : avgReputation > 0 ? `${avgReputation.toFixed(1)}` : "N/A"}
                subtext={avgReputation > 0 ? "/ 5.0" : ""}
                loading={loadingBalances}
              />
              <StatCard
                label="Arena Record"
                value={loadingArena ? "..." : `${totalWins}W / ${totalBattles - totalWins}L`}
                subtext={totalBattles > 0 ? `${((totalWins / totalBattles) * 100).toFixed(0)}% win rate` : ""}
                loading={loadingArena}
              />
            </div>
          </motion.div>

          {/* ═══════════ Section 2: My Agents ═══════════ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionLabel label="My Agents" count={myAgents.length} />
            {loadingAgents ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : myAgents.length === 0 ? (
              <div className="border border-border p-8 text-center mb-10">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
                  No agents registered yet. Deploy your first agent to get started.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {myAgents.map((agent) => {
                  const key = `${agent.network}:${agent.agentId}`
                  return (
                    <DashboardAgentCard
                      key={key}
                      agent={agent}
                      balance={balances[key]}
                      reputation={reputations[key]}
                      verification={verifications[key]}
                      feedbackList={feedbacks[key]}
                      isExpanded={expandedAgent === key}
                      loadingBalance={loadingBalances}
                      onToggle={() => handleExpand(agent)}
                    />
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* ═══════════ Section 3: Earnings & Payments ═══════════ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <SectionLabel label="Earnings & Payments" />
            <div className="border border-border p-5 relative mb-10">
              <CornerBrackets />
              {loadingBalances || loadingAgents ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 w-32 bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-3/4 bg-muted-foreground/10 rounded" />
                </div>
              ) : myAgents.length === 0 ? (
                <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-widest">
                  No agents to show earnings for
                </span>
              ) : (
                <>
                  <div className="mb-5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">
                      Total Balance
                    </span>
                    <span className="font-mono text-3xl font-bold text-system-green">
                      ${totalBalance.toFixed(2)}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60 ml-2">USDC</span>
                  </div>

                  <div className="space-y-2 mb-5">
                    {myAgents.map((agent) => {
                      const key = `${agent.network}:${agent.agentId}`
                      const bal = balances[key] || 0
                      return (
                        <BalanceBar
                          key={key}
                          name={agent.name}
                          balance={bal}
                          total={totalBalance}
                        />
                      )
                    })}
                  </div>

                  {prizeMoney > 0 && (
                    <div className="border-t border-border pt-3 mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">
                        Arena Prize Money Earned
                      </span>
                      <span className="font-mono text-lg font-bold text-warning-amber">
                        ${prizeMoney.toFixed(2)} USDC
                      </span>
                    </div>
                  )}

                  <div className="border border-border/60 bg-foreground/[0.02] p-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">
                      Withdraw
                    </span>
                    <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                      To withdraw USDC from your agent wallets, use the 8004agent CLI:
                    </p>
                    <code className="font-mono text-xs text-foreground bg-foreground/5 px-2 py-1 mt-2 inline-block border border-border/40">
                      npx 8004agent withdraw
                    </code>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* ═══════════ Section 4: Reputation & Feedback ═══════════ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SectionLabel label="Reputation & Feedback" />
            <div className="border border-border p-5 relative mb-10">
              <CornerBrackets />
              {loadingBalances || loadingAgents ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-6 w-24 bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                </div>
              ) : repValues.length === 0 ? (
                <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-widest">
                  No feedback received yet
                </span>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">
                        Total Feedbacks
                      </span>
                      <span className="font-mono text-2xl font-bold text-foreground">
                        {repValues.reduce((s, r) => s + r.count, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">
                        Average Score
                      </span>
                      <span className="font-mono text-2xl font-bold text-foreground">
                        {avgReputation.toFixed(1)}
                        <span className="text-sm text-muted-foreground/40"> / 5</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {myAgents.map((agent) => {
                      const key = `${agent.network}:${agent.agentId}`
                      const rep = reputations[key]
                      if (!rep || rep.count === 0) return null
                      return (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-foreground">{agent.name}</span>
                            <span className="font-mono text-[9px] text-muted-foreground/50 border border-border px-1.5 py-0.5">
                              {CONTRACTS[agent.network]?.name || agent.network}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-muted-foreground">{rep.count} review{rep.count !== 1 ? "s" : ""}</span>
                            <span className="font-mono text-xs font-bold text-foreground">{rep.avg.toFixed(1)}/5</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* ═══════════ Section 5: Arena Performance ═══════════ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <SectionLabel label="Arena Performance" />
            <div className="border border-border p-5 relative mb-10">
              <CornerBrackets />
              {loadingArena ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-6 w-32 bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-3/4 bg-muted-foreground/10 rounded" />
                </div>
              ) : myEvents.length === 0 && myLeaderboardEntries.length === 0 ? (
                <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-widest">
                  No arena participation yet
                </span>
              ) : (
                <>
                  {/* ELO Rankings */}
                  {myLeaderboardEntries.length > 0 && (
                    <div className="mb-5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-3">
                        ELO Rankings
                      </span>
                      <div className="space-y-2">
                        {myLeaderboardEntries.map((entry) => (
                          <div key={`${entry.network}:${entry.agentId}`} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-foreground">#{entry.rank}</span>
                              <span className="font-mono text-xs uppercase tracking-wider text-foreground">{entry.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-xs text-info-blue font-bold">{entry.elo} ELO</span>
                              <span className="font-mono text-[10px] text-system-green">{entry.wins}W</span>
                              <span className="font-mono text-[10px] text-error-red">{entry.battles - entry.wins}L</span>
                              <span className="font-mono text-[10px] text-muted-foreground">{entry.winRate}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Event History */}
                  {myEvents.length > 0 && (
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-3">
                        Event History
                      </span>
                      <div className="space-y-2">
                        {myEvents.slice(0, 10).map((evt) => {
                          const myParticipant = evt.participants?.find(
                            (p) => p.ownerAddress?.toLowerCase() === walletAddress?.toLowerCase()
                          )
                          const agentKey = myParticipant ? `${myParticipant.network}:${myParticipant.agentId}` : ""
                          const score = agentKey && evt.scores?.[agentKey] ? evt.scores[agentKey] : null
                          const rank = evt.results?.rankings?.find((r) => r.agentKey === agentKey)

                          return (
                            <div key={evt.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={cn("font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border shrink-0", STATUS_COLORS[evt.status] || STATUS_COLORS.completed)}>
                                  {evt.status}
                                </span>
                                <span className="font-mono text-xs text-foreground truncate">{evt.title}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                {myParticipant && (
                                  <span className="font-mono text-[10px] text-muted-foreground">{myParticipant.name}</span>
                                )}
                                {score && (
                                  <span className="font-mono text-xs text-info-blue">{score.avgScore?.toFixed(1)} pts</span>
                                )}
                                {rank && (
                                  <span className={cn(
                                    "font-mono text-xs font-bold",
                                    rank.rank === 1 ? "text-warning-amber" : "text-muted-foreground"
                                  )}>
                                    #{rank.rank}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* ═══════════ Section 6: Agents I've Hired ═══════════ */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SectionLabel label="Agents I've Hired" />
            <div className="mb-10">
              {loadingHires ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : hiredAgents.length === 0 ? (
                <div className="border border-border p-8 text-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
                    No hire history found
                  </span>
                  <p className="font-mono text-[10px] text-muted-foreground/40 mt-2">
                    Only recent hires on Avalanche Fuji are tracked
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hiredAgents.map((agent, i) => (
                    <HiredAgentCard key={`hired-${i}`} agent={agent} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════
// ---- Sub-Components ----
// ═══════════════════════════════════════════

function SectionLabel({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">{label}</h2>
      {count !== undefined && (
        <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">({count})</span>
      )}
      <div className="flex-1 h-[1px] bg-border" />
    </div>
  )
}

function StatCard({ label, value, subtext, color, loading }: {
  label: string
  value: string
  subtext?: string
  color?: string
  loading?: boolean
}) {
  return (
    <div className="border border-border p-5 relative">
      <CornerBrackets />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">
        {label}
      </span>
      {loading ? (
        <div className="h-8 w-20 bg-muted-foreground/10 animate-pulse rounded" />
      ) : (
        <>
          <span className={cn("font-mono text-2xl md:text-3xl font-bold block", color || "text-foreground")}>
            {value}
          </span>
          {subtext && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 mt-1 block">
              {subtext}
            </span>
          )}
        </>
      )}
    </div>
  )
}

function BalanceBar({ name, balance, total }: { name: string; balance: number; total: number }) {
  const pct = total > 0 ? (balance / total) * 100 : 0
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="font-mono text-xs uppercase tracking-wider text-foreground w-28 truncate">{name}</span>
      <div className="flex-1 h-2 bg-muted-foreground/10 relative overflow-hidden">
        <div
          className="h-full bg-system-green transition-all duration-700"
          style={{ width: `${Math.max(pct, 1)}%` }}
        />
      </div>
      <span className="font-mono text-xs text-foreground w-24 text-right">${balance.toFixed(2)}</span>
    </div>
  )
}

function DashboardAgentCard({ agent, balance, reputation, verification, feedbackList, isExpanded, loadingBalance, onToggle }: {
  agent: Agent
  balance?: number
  reputation?: { count: number; avg: number }
  verification?: VerificationResult | null
  feedbackList?: FeedbackEntry[]
  isExpanded: boolean
  loadingBalance: boolean
  onToggle: () => void
}) {
  const networkName = CONTRACTS[agent.network]?.name || agent.network
  const isActive = agent.status === "active"
  const skills = Array.isArray(agent.skills) ? agent.skills : []
  const hp = parseFloat(agent.hirePrice || "0")

  return (
    <div className={cn("border p-5 relative transition-colors", isExpanded ? "border-foreground/30 col-span-1 md:col-span-2 lg:col-span-3" : "border-border hover:border-foreground/20")}>
      <CornerBrackets />

      {/* Header - clickable */}
      <button type="button" onClick={onToggle} className="w-full text-left cursor-pointer">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={cn("h-2 w-2 rounded-full shrink-0", isActive ? "bg-system-green" : "bg-error-red")} />
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground truncate">{agent.name}</span>
          {agent.agentId && agent.agentId !== "pending" && (
            <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">#{agent.agentId}</span>
          )}
          {verification && (
            <span className={cn("font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 border shrink-0", TIER_STYLES[verification.riskTier] || "border-border text-muted-foreground")}>
              {verification.riskTier} {verification.overallScore}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 border border-border px-1.5 py-0.5">{networkName}</span>
          <span className={cn("font-mono text-[9px] uppercase tracking-wider", hp > 0 ? "text-system-green" : "text-muted-foreground/40")}>
            {hp > 0 ? `$${hp.toFixed(2)} USDC` : "FREE"}
          </span>
          <span className="flex-1" />
          {loadingBalance ? (
            <span className="h-4 w-16 bg-muted-foreground/10 animate-pulse rounded" />
          ) : balance !== undefined ? (
            <span className="font-mono text-[10px] font-bold text-system-green">
              ${balance.toFixed(2)}
            </span>
          ) : null}
        </div>

        {!isExpanded && agent.description && (
          <p className="font-mono text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{agent.description}</p>
        )}

        {!isExpanded && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 3).map((s) => (
              <span key={s} className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border border-border/60 px-1.5 py-0.5">{s}</span>
            ))}
            {skills.length > 3 && <span className="font-mono text-[9px] text-muted-foreground/40">+{skills.length - 3}</span>}
          </div>
        )}
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border mt-4 pt-4 space-y-4">
              {agent.description && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">Description</span>
                  <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{agent.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.mcpEndpoint && (
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">MCP Endpoint</span>
                    <span className="font-mono text-[11px] text-foreground break-all">{agent.mcpEndpoint}</span>
                  </div>
                )}
                {agent.a2aEndpoint && (
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">A2A Endpoint</span>
                    <span className="font-mono text-[11px] text-foreground break-all">{agent.a2aEndpoint}</span>
                  </div>
                )}
                {agent.agentWalletAddress && (
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">Agent Wallet</span>
                    <span className="font-mono text-[11px] text-foreground">{agent.agentWalletAddress}</span>
                  </div>
                )}
                {agent.registrationTx && (
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">Registration Tx</span>
                    <span className="font-mono text-[11px] text-foreground">{truncAddr(agent.registrationTx)}</span>
                  </div>
                )}
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border border-border/60 px-1.5 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reputation */}
              {reputation && reputation.count > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">Feedback</span>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-xs text-foreground">{reputation.count} review{reputation.count !== 1 ? "s" : ""}</span>
                    <span className="font-mono text-xs font-bold text-foreground">{reputation.avg.toFixed(1)} / 5</span>
                  </div>

                  {feedbackList && feedbackList.length > 0 && (
                    <div className="space-y-2">
                      {feedbackList.slice(0, 5).map((fb, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-muted-foreground">{truncAddr(fb.clientAddress)}</span>
                            {fb.tag1 && <span className="font-mono text-[9px] text-muted-foreground/60 border border-border/40 px-1 py-0.5">{fb.tag1}</span>}
                            {fb.tag2 && <span className="font-mono text-[9px] text-muted-foreground/60 border border-border/40 px-1 py-0.5">{fb.tag2}</span>}
                          </div>
                          <span className={cn(
                            "font-mono text-xs font-bold",
                            fb.value >= 4 ? "text-system-green" : fb.value >= 2 ? "text-warning-amber" : "text-error-red"
                          )}>
                            {fb.value}/5
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feedbackList === undefined && (
                    <div className="h-3 w-32 bg-muted-foreground/10 animate-pulse rounded" />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HiredAgentCard({ agent }: { agent: HiredAgent }) {
  const networkName = CONTRACTS[agent.network]?.name || agent.network
  const isActive = agent.status === "active"

  return (
    <div className="border border-border p-5 relative">
      <CornerBrackets />
      <div className="flex items-center gap-2 mb-1.5">
        <span className={cn("h-2 w-2 rounded-full shrink-0", isActive ? "bg-system-green" : "bg-error-red")} />
        <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground truncate">{agent.name}</span>
        {agent.agentId && agent.agentId !== "pending" && (
          <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">#{agent.agentId}</span>
        )}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 border border-border px-1.5 py-0.5">{networkName}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-info-blue">
          Paid ${agent.paymentAmount.toFixed(2)} USDC
        </span>
      </div>
      {agent.description && (
        <p className="font-mono text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{agent.description}</p>
      )}
      {agent.paymentTxHash && (
        <div className="flex items-center gap-1">
          <span className="font-mono text-[9px] text-muted-foreground/40">TX:</span>
          <span className="font-mono text-[9px] text-muted-foreground/60">{truncAddr(agent.paymentTxHash)}</span>
        </div>
      )}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="border border-border p-5 relative animate-pulse">
      <CornerBrackets opacity={10} />
      <div className="h-4 w-2/3 bg-muted-foreground/10 rounded mb-3" />
      <div className="h-3 w-1/3 bg-muted-foreground/10 rounded mb-4" />
      <div className="h-3 w-full bg-muted-foreground/10 rounded mb-2" />
      <div className="h-3 w-4/5 bg-muted-foreground/10 rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-muted-foreground/10 rounded" />
        <div className="h-5 w-16 bg-muted-foreground/10 rounded" />
      </div>
    </div>
  )
}
