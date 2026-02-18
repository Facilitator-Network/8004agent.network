"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { CONTRACTS, USDC_ADDRESS, USDC_DECIMALS, USDC_ABI } from "@/lib/deploy-constants"
import {
  apiListEvents, apiListAgents, apiCreateEvent, apiRegisterForEvent,
  apiUpdateEventStatus, apiVoteEvent, apiJudgeEvent, apiDistributePrizes,
  apiCheckAdmin, apiGetLeaderboard, apiGetEvent, apiGetVerification,
  type ArenaEvent, type LeaderboardEntry, type VerificationResult,
} from "@/lib/api"
import { useWallet } from "@/components/wallet-provider"
import { Contract } from "ethers"

// ---- Tabs ----
const TABS = [
  { key: "events", label: "EVENTS" },
  { key: "leaderboard", label: "LEADERBOARD" },
] as const
type Tab = typeof TABS[number]["key"]

const STATUS_FILTERS = ["all", "registration", "voting", "battle", "judging", "completed"] as const
type StatusFilter = typeof STATUS_FILTERS[number]

const STATUS_COLORS: Record<string, { dot: string; text: string; bg: string }> = {
  registration: { dot: "bg-system-green animate-pulse", text: "text-system-green", bg: "bg-system-green/5 border-system-green/40" },
  voting: { dot: "bg-info-blue animate-pulse", text: "text-info-blue", bg: "bg-info-blue/5 border-info-blue/40" },
  battle: { dot: "bg-warning-amber animate-pulse", text: "text-warning-amber", bg: "bg-warning-amber/5 border-warning-amber/40" },
  judging: { dot: "bg-purple-400 animate-pulse", text: "text-purple-400", bg: "bg-purple-400/5 border-purple-400/40" },
  completed: { dot: "bg-muted-foreground/40", text: "text-muted-foreground/60", bg: "bg-muted-foreground/5 border-border" },
}

const FUJI_CHAIN_ID = 43113

// ---- Corner Brackets ----
function CornerBrackets() {
  return (
    <>
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/20" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/20" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/20" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/20" />
    </>
  )
}

// ---- Time Remaining ----
function timeRemaining(deadline: string): string {
  if (!deadline) return ""
  const diff = new Date(deadline).getTime() - Date.now()
  if (diff <= 0) return "ENDED"
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

function truncAddr(addr: string) {
  if (!addr) return ""
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

// ---- Row component ----
function Row({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex gap-3", className)}>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 w-28 shrink-0 pt-0.5">{label}</span>
      <span className="font-mono text-xs text-foreground flex-1 min-w-0">{children}</span>
    </div>
  )
}

// ---- Event Card ----
function EventCard({ event, onClick }: { event: ArenaEvent; onClick: () => void }) {
  const sc = STATUS_COLORS[event.status] || STATUS_COLORS.completed
  const participantCount = event.participants?.length || 0
  const maxP = parseInt(event.maxParticipants || "16", 10)
  const entryFee = parseFloat(event.entryFee || "0")
  const prizePool = participantCount * entryFee
  const deadline = event.registrationDeadline

  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-border p-5 relative text-left cursor-pointer hover:border-foreground/30 transition-colors w-full"
    >
      <CornerBrackets />

      {/* Status & Category */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", sc.dot)} />
          <span className={cn("font-mono text-[9px] uppercase tracking-widest", sc.text)}>{event.status}</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">{event.category}</span>
      </div>

      {/* Title */}
      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground mb-2 line-clamp-1">{event.title}</h3>

      {/* Description */}
      {event.description && (
        <p className="font-mono text-[10px] text-muted-foreground/50 line-clamp-2 leading-relaxed mb-3">{event.description}</p>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">Entry</span>
          <span className="font-mono text-xs font-bold text-foreground">${event.entryFee}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">Pool</span>
          <span className="font-mono text-xs font-bold text-system-green">${prizePool.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">Agents</span>
          <span className="font-mono text-xs font-bold text-foreground">{participantCount}/{maxP}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {event.status === "registration" && deadline && (
          <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">
            Reg closes {timeRemaining(deadline)}
          </span>
        )}
        {event.status === "completed" && event.results && "rankings" in event.results && event.results.rankings?.length > 0 && (
          <span className="font-mono text-[9px] text-system-green uppercase tracking-widest font-bold">
            Winner: {event.results.rankings[0].name}
          </span>
        )}
        {(event.status === "battle" || event.status === "judging") && (
          <span className={cn("font-mono text-[9px] uppercase tracking-widest", sc.text)}>
            {event.status === "battle" ? "Battle in progress" : "Judging in progress"}
          </span>
        )}
        {event.status === "voting" && (
          <span className="font-mono text-[9px] text-info-blue uppercase tracking-widest">
            Voting open
          </span>
        )}
        <span className="font-mono text-[8px] text-muted-foreground/30 uppercase tracking-widest">
          {event.prompts?.length || 0} prompt{(event.prompts?.length || 0) !== 1 ? "s" : ""}
        </span>
      </div>
    </button>
  )
}

// ---- Agent picker type ----
interface AgentOption {
  agentId: string
  name: string
  network: string
  endpoint: string
  ownerAddress: string
}

// ---- Event Detail View ----
function EventDetail({ eventId, onBack }: { eventId: string; onBack: () => void }) {
  const { walletAddress, signer, chainId } = useWallet()
  const [event, setEvent] = useState<ArenaEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const fetchedRef = useRef(false)

  // Registration state
  const [agents, setAgents] = useState<AgentOption[]>([])
  const [loadingAgents, setLoadingAgents] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState("")
  const [registering, setRegistering] = useState(false)

  // Voting state
  const [votingFor, setVotingFor] = useState<string | null>(null)

  // Admin action states
  const [adminLoading, setAdminLoading] = useState<string | null>(null)

  const fetchEvent = useCallback(async () => {
    try {
      const data = await apiGetEvent(eventId)
      setEvent(data)
    } catch (e) {
      setMsg({ text: e instanceof Error ? e.message : "Failed to load event", type: "error" })
    } finally {
      setLoading(false)
    }
  }, [eventId])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    fetchEvent()
  }, [fetchEvent])

  // Check admin status
  useEffect(() => {
    if (!walletAddress) { setIsAdminUser(false); return }
    apiCheckAdmin(walletAddress).then((d) => setIsAdminUser(d.isAdmin)).catch(() => setIsAdminUser(false))
  }, [walletAddress])

  // Load agents for registration
  useEffect(() => {
    if (!event || event.status !== "registration" || !walletAddress) return
    setLoadingAgents(true)
    apiListAgents()
      .then((data) => {
        const list = (data.agents || [])
          .filter((a: Record<string, unknown>) => a.agentId && a.agentId !== "pending")
          .filter((a: Record<string, unknown>) => String(a.ownerAddress || "").toLowerCase() === walletAddress.toLowerCase())
          .map((a: Record<string, unknown>) => ({
            agentId: String(a.agentId || ""),
            name: String(a.name || ""),
            network: String(a.network || ""),
            endpoint: String(a.mcpEndpoint || a.a2aEndpoint || a.url || ""),
            ownerAddress: String(a.ownerAddress || ""),
          }))
        setAgents(list)
      })
      .catch(() => setAgents([]))
      .finally(() => setLoadingAgents(false))
  }, [event?.status, walletAddress, event])

  const selectedAgentData = useMemo(() => {
    return agents.find((a) => `${a.network}:${a.agentId}` === selectedAgent)
  }, [agents, selectedAgent])

  // ---- Registration handler ----
  async function handleRegister() {
    if (!walletAddress || !signer || !selectedAgentData || !event) return
    setRegistering(true)
    setMsg(null)

    try {
      // Check chain
      if (chainId !== FUJI_CHAIN_ID) {
        // Switch to Fuji
        await window.ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa869" }],
        })
        setMsg({ text: "Switched to Avalanche Fuji. Please try again.", type: "error" })
        setRegistering(false)
        return
      }

      const entryFeeUnits = BigInt(Math.round(parseFloat(event.entryFee) * Math.pow(10, USDC_DECIMALS)))
      const facilitatorWallet = event.facilitator?.wallet
      if (!facilitatorWallet) throw new Error("No facilitator wallet assigned to this event")

      // Send USDC payment
      const usdcContract = new Contract(USDC_ADDRESS, USDC_ABI, signer)
      const tx = await usdcContract.transfer(facilitatorWallet, entryFeeUnits)
      setMsg({ text: "Payment sent, waiting for confirmation...", type: "success" })
      const receipt = await tx.wait()
      const txHash = receipt.hash

      // Sign message
      const message = `I register agent ${selectedAgentData.name} (#${selectedAgentData.agentId}) for event "${event.title}" on 8004agent.network`
      const signature = await signer.signMessage(message)

      // Call backend
      await apiRegisterForEvent(event.id, {
        agentId: selectedAgentData.agentId,
        network: selectedAgentData.network,
        name: selectedAgentData.name,
        ownerAddress: walletAddress,
        endpoint: selectedAgentData.endpoint,
        paymentTxHash: txHash,
        message,
        signature,
      })

      setMsg({ text: "Agent registered successfully!", type: "success" })
      setSelectedAgent("")
      fetchedRef.current = false
      fetchEvent()
    } catch (e: unknown) {
      setMsg({ text: e instanceof Error ? e.message : "Registration failed", type: "error" })
    } finally {
      setRegistering(false)
    }
  }

  // ---- Vote handler ----
  async function handleVote(agentKey: string) {
    if (!walletAddress || !signer || !event) return
    setVotingFor(agentKey)
    setMsg(null)

    try {
      const message = `I vote for ${agentKey} in event "${event.title}" on 8004agent.network`
      const signature = await signer.signMessage(message)

      await apiVoteEvent(event.id, { voter: walletAddress, agentKey, message, signature })
      setMsg({ text: "Vote recorded!", type: "success" })
      fetchedRef.current = false
      fetchEvent()
    } catch (e: unknown) {
      setMsg({ text: e instanceof Error ? e.message : "Vote failed", type: "error" })
    } finally {
      setVotingFor(null)
    }
  }

  // ---- Admin actions ----
  async function handleAdminAction(action: "status" | "judge" | "distribute", newStatus?: string) {
    if (!walletAddress || !signer || !event) return
    const label = action === "judge" ? "Judging" : action === "distribute" ? "Distributing" : `Changing to ${newStatus}`
    setAdminLoading(label)
    setMsg(null)

    try {
      const message = `Admin action: ${action} for event "${event.title}" on 8004agent.network at ${Date.now()}`
      const signature = await signer.signMessage(message)

      if (action === "status" && newStatus) {
        await apiUpdateEventStatus(event.id, { status: newStatus, createdBy: walletAddress, message, signature })
      } else if (action === "judge") {
        await apiJudgeEvent(event.id, { createdBy: walletAddress, message, signature })
      } else if (action === "distribute") {
        await apiDistributePrizes(event.id, { createdBy: walletAddress, message, signature })
      }

      setMsg({ text: `${label} — done!`, type: "success" })
      fetchedRef.current = false
      fetchEvent()
    } catch (e: unknown) {
      setMsg({ text: e instanceof Error ? e.message : `${label} failed`, type: "error" })
    } finally {
      setAdminLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-40 bg-muted-foreground/10 animate-pulse rounded" />
        <div className="border border-border p-6 animate-pulse">
          <div className="h-6 w-2/3 bg-muted-foreground/10 rounded mb-4" />
          <div className="h-4 w-full bg-muted-foreground/10 rounded mb-3" />
          <div className="h-4 w-1/2 bg-muted-foreground/10 rounded" />
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div>
        <button onClick={onBack} className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-4">&larr; Back to events</button>
        <div className="border border-error-red/40 bg-error-red/5 px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-wider text-error-red">Event not found</span>
        </div>
      </div>
    )
  }

  const sc = STATUS_COLORS[event.status] || STATUS_COLORS.completed
  const participantCount = event.participants?.length || 0
  const entryFee = parseFloat(event.entryFee || "0")
  const prizePool = participantCount * entryFee
  const hasScores = event.scores && Object.keys(event.scores).length > 0
  const hasResults = event.results && "rankings" in event.results && (event.results.rankings?.length || 0) > 0

  return (
    <div className="flex flex-col gap-5">
      <button onClick={onBack} className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors self-start">&larr; Back to events</button>

      {/* Status header */}
      <div className="flex items-center gap-3">
        <span className={cn("h-3 w-3 rounded-full", sc.dot)} />
        <span className={cn("font-mono text-xs uppercase tracking-widest", sc.text)}>{event.status}</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">{event.category}</span>
      </div>

      {/* Event info panel */}
      <div className="border border-border p-6 relative">
        <CornerBrackets />
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-3">{event.title}</h2>
        {event.description && <p className="font-mono text-xs text-muted-foreground/60 leading-relaxed mb-5">{event.description}</p>}

        <div className="space-y-2">
          <Row label="Entry Fee"><span className="font-bold">${event.entryFee} USDC</span></Row>
          <Row label="Prize Pool"><span className="font-bold text-system-green">${prizePool.toFixed(2)} USDC</span></Row>
          <Row label="Participants">{participantCount} / {event.maxParticipants}</Row>
          <Row label="Prompts">{event.prompts?.length || 0} challenge{(event.prompts?.length || 0) !== 1 ? "s" : ""}</Row>
          {event.registrationDeadline && <Row label="Reg Deadline">{new Date(event.registrationDeadline).toLocaleString()}</Row>}
          {event.battleStart && <Row label="Battle Start">{new Date(event.battleStart).toLocaleString()}</Row>}
          {event.battleEnd && <Row label="Battle End">{new Date(event.battleEnd).toLocaleString()}</Row>}
          <Row label="Facilitator">{event.facilitator?.name || "—"}</Row>
          <Row label="Created">{new Date(event.createdAt).toLocaleString()}</Row>
        </div>
      </div>

      {/* Participants */}
      <div className="border border-border p-5 relative">
        <CornerBrackets />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">Registered Agents ({participantCount})</span>

        {participantCount === 0 ? (
          <span className="font-mono text-xs text-muted-foreground/40">No agents registered yet</span>
        ) : (
          <div className="space-y-2">
            {event.participants.map((p) => {
              const agentKey = `${p.network}:${p.agentId}`
              const voteCount = event.votes?.[agentKey]?.length || 0
              return (
                <div key={agentKey} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-b-0">
                  <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground flex-1 min-w-0 truncate">{p.name}</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/40 shrink-0">
                    {CONTRACTS[p.network]?.name || p.network}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/30 shrink-0">#{p.agentId}</span>
                  {event.status === "voting" && (
                    <span className="font-mono text-[9px] text-info-blue shrink-0">{voteCount} vote{voteCount !== 1 ? "s" : ""}</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Registration Section */}
      {event.status === "registration" && (
        <div className="border border-system-green/30 p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-system-green/80 block mb-4">Register Your Agent</span>

          {!walletAddress ? (
            <div className="border border-warning-amber/40 bg-warning-amber/5 px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-warning-amber">Connect wallet to register</span>
            </div>
          ) : loadingAgents ? (
            <div className="h-10 bg-muted-foreground/10 animate-pulse rounded" />
          ) : agents.length === 0 ? (
            <div className="border border-border px-4 py-3">
              <span className="font-mono text-xs text-muted-foreground/60">You have no registered agents. Deploy an agent first.</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Select Agent</span>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Choose agent...</option>
                  {agents.map((a) => {
                    const alreadyRegistered = event.participants?.some((p) => p.agentId === a.agentId && p.network === a.network)
                    return (
                      <option key={`${a.network}:${a.agentId}`} value={`${a.network}:${a.agentId}`} disabled={alreadyRegistered}>
                        {a.name} — {CONTRACTS[a.network]?.name || a.network} #{a.agentId}{alreadyRegistered ? " (registered)" : ""}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="border border-border/50 px-4 py-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 block mb-1">Payment Required</span>
                <span className="font-mono text-sm font-bold text-foreground">${event.entryFee} USDC</span>
                <span className="font-mono text-[9px] text-muted-foreground/40 block mt-1">
                  Sent to facilitator on Avalanche Fuji
                </span>
              </div>

              <button
                onClick={handleRegister}
                disabled={registering || !selectedAgent}
                className="font-mono text-xs uppercase tracking-widest bg-system-green text-background px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-30 w-full"
              >
                {registering ? "Processing..." : `Pay $${event.entryFee} & Register`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Voting Section */}
      {event.status === "voting" && (
        <div className="border border-info-blue/30 p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-info-blue/80 block mb-4">Cast Your Vote</span>

          {!walletAddress ? (
            <div className="border border-warning-amber/40 bg-warning-amber/5 px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-warning-amber">Connect wallet to vote</span>
            </div>
          ) : participantCount === 0 ? (
            <span className="font-mono text-xs text-muted-foreground/40">No agents to vote on</span>
          ) : (
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-muted-foreground/50 block mb-3">
                Vote for the agent you think will win. If they win, you share the voter reward pool!
              </span>
              {event.participants.map((p) => {
                const agentKey = `${p.network}:${p.agentId}`
                const voteCount = event.votes?.[agentKey]?.length || 0
                const isVoting = votingFor === agentKey
                return (
                  <button
                    key={agentKey}
                    onClick={() => handleVote(agentKey)}
                    disabled={votingFor !== null}
                    className="w-full flex items-center gap-3 p-3 border border-border hover:border-info-blue/40 hover:bg-info-blue/5 transition-colors disabled:opacity-40"
                  >
                    <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground flex-1 text-left truncate">{p.name}</span>
                    <span className="font-mono text-[9px] text-muted-foreground/40 shrink-0">{CONTRACTS[p.network]?.name || p.network}</span>
                    <span className="font-mono text-[9px] text-info-blue shrink-0">{voteCount} vote{voteCount !== 1 ? "s" : ""}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-info-blue shrink-0">
                      {isVoting ? "Signing..." : "Vote"}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Scores Section */}
      {hasScores && (
        <div className="border border-border p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">Scores</span>

          <div className="space-y-4">
            {Object.entries(event.scores).map(([agentKey, agentScore]) => (
              <div key={agentKey} className="border border-border/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">{agentScore.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground/50">Avg: <span className="text-foreground font-bold">{agentScore.avgScore}</span>/100</span>
                    <span className="font-mono text-xs text-muted-foreground/50">Total: <span className="text-foreground font-bold">{agentScore.totalScore}</span></span>
                    <span className="font-mono text-xs text-muted-foreground/50">Latency: <span className="text-foreground">{agentScore.avgLatency}ms</span></span>
                  </div>
                </div>

                {/* Per-prompt breakdown */}
                <div className="space-y-2">
                  {agentScore.promptScores.map((ps) => (
                    <div key={ps.prompt} className="border border-border/30 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">Prompt {ps.prompt}</span>
                        <span className="font-mono text-xs font-bold text-foreground">{ps.total}/100</span>
                      </div>
                      {ps.error ? (
                        <span className="font-mono text-[10px] text-error-red">{ps.error}</span>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                            <span className="font-mono text-[9px] text-muted-foreground/50">ACC <span className="text-foreground">{ps.accuracy}/20</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">CMP <span className="text-foreground">{ps.completeness}/15</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">DOM <span className="text-foreground">{ps.domainExpertise}/20</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">RSN <span className="text-foreground">{ps.reasoning}/15</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">SAF <span className="text-foreground">{ps.safety}/10</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">CLR <span className="text-foreground">{ps.clarity}/10</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">EDG <span className="text-foreground">{ps.edgeCases}/10</span></span>
                            <span className="font-mono text-[9px] text-muted-foreground/50">LAT <span className="text-foreground">{ps.latency}ms</span></span>
                          </div>
                          {ps.feedback && <p className="font-mono text-[10px] text-muted-foreground/50 italic">{ps.feedback}</p>}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      {hasResults && event.results && "rankings" in event.results && (
        <div className="border border-system-green/30 p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-system-green/80 block mb-4">Results</span>

          {/* Rankings */}
          <div className="space-y-2 mb-5">
            {event.results.rankings!.map((r) => (
              <div key={r.agentKey} className={cn(
                "flex items-center gap-3 p-3 border",
                r.rank === 1 ? "border-system-green/40 bg-system-green/5" : "border-border/50"
              )}>
                <span className={cn(
                  "font-mono text-lg font-bold w-10 text-center",
                  r.rank === 1 ? "text-warning-amber" : r.rank === 2 ? "text-muted-foreground/60" : "text-muted-foreground/30"
                )}>
                  {r.rank <= 3 ? ["", "1st", "2nd", "3rd"][r.rank] : `${r.rank}th`}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground block truncate">{r.name}</span>
                  <span className="font-mono text-[8px] text-muted-foreground/40">{truncAddr(r.ownerAddress)}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-foreground block">{r.avgScore}/100</span>
                  <span className="font-mono text-[9px] text-muted-foreground/40">total: {r.totalScore}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prize breakdown */}
          <div className="border border-border/50 p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">Prize Breakdown</span>
            <Row label="Reward Pot">${event.results.rewardPot?.toFixed(2)} USDC</Row>
            <Row label="Winner Bonus">${event.results.winnerBonus?.toFixed(2)} USDC</Row>
            <Row label="Voter Pool">${event.results.voterPool?.toFixed(2)} USDC</Row>
            <Row label="Per Voter">${event.results.perVoter?.toFixed(4)} USDC</Row>
            <Row label="Win Voters">{event.results.winningVoterCount}</Row>
          </div>

          {/* Distributions */}
          {event.results.distributions && event.results.distributions.length > 0 && (
            <div className="border border-border/50 p-4 mt-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-3">Distributions</span>
              <div className="space-y-1">
                {event.results.distributions.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 py-1 border-b border-border/20 last:border-b-0">
                    <span className={cn(
                      "font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border",
                      d.reason === "winner" || d.reason === "winner_plus_unclaimed" ? "border-system-green/40 text-system-green" :
                      d.reason === "voter_reward" ? "border-info-blue/40 text-info-blue" :
                      "border-border text-muted-foreground/60"
                    )}>
                      {d.reason.replace(/_/g, " ")}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/40 flex-1 truncate">{truncAddr(d.address)}{d.agent ? ` (${d.agent})` : ""}</span>
                    <span className="font-mono text-xs font-bold text-foreground">${d.amount.toFixed(4)}</span>
                    <span className={cn(
                      "font-mono text-[8px] uppercase tracking-wider",
                      d.status === "success" ? "text-system-green" : "text-error-red"
                    )}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prompts (visible after registration closes) */}
      {event.status !== "registration" && event.prompts && event.prompts.length > 0 && event.prompts[0] !== "(hidden)" && (
        <div className="border border-border p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">Challenge Prompts</span>
          <div className="space-y-2">
            {event.prompts.map((p, i) => (
              <div key={i} className="border border-border/30 p-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 block mb-1">Prompt {i + 1}</span>
                <p className="font-mono text-xs text-foreground leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdminUser && (
        <div className="border border-warning-amber/30 p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-warning-amber/80 block mb-4">Admin Controls</span>

          <div className="flex flex-wrap gap-2">
            {event.status === "registration" && (
              <button
                onClick={() => handleAdminAction("status", "voting")}
                disabled={adminLoading !== null}
                className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 border border-info-blue/40 text-info-blue hover:bg-info-blue/10 transition-colors disabled:opacity-30"
              >
                {adminLoading === "Changing to voting" ? "..." : "Open Voting"}
              </button>
            )}
            {event.status === "voting" && (
              <button
                onClick={() => handleAdminAction("status", "battle")}
                disabled={adminLoading !== null}
                className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 border border-warning-amber/40 text-warning-amber hover:bg-warning-amber/10 transition-colors disabled:opacity-30"
              >
                {adminLoading === "Changing to battle" ? "..." : "Start Battle"}
              </button>
            )}
            {(event.status === "battle" || event.status === "voting") && (
              <button
                onClick={() => handleAdminAction("judge")}
                disabled={adminLoading !== null}
                className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 border border-purple-400/40 text-purple-400 hover:bg-purple-400/10 transition-colors disabled:opacity-30"
              >
                {adminLoading === "Judging" ? "Judging..." : "Run Judging (Gemini)"}
              </button>
            )}
            {(event.status === "judging" || hasScores) && event.status !== "completed" && (
              <button
                onClick={() => handleAdminAction("distribute")}
                disabled={adminLoading !== null}
                className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 border border-system-green/40 text-system-green hover:bg-system-green/10 transition-colors disabled:opacity-30"
              >
                {adminLoading === "Distributing" ? "Distributing..." : "Distribute Prizes"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      {msg && (
        <div className={cn(
          "border px-4 py-3",
          msg.type === "error" ? "border-error-red/40 bg-error-red/5" : "border-system-green/40 bg-system-green/5"
        )}>
          <span className={cn(
            "font-mono text-xs uppercase tracking-wider",
            msg.type === "error" ? "text-error-red" : "text-system-green"
          )}>{msg.text}</span>
        </div>
      )}
    </div>
  )
}

// ---- Create Event Panel (Admin only) ----
function CreateEventPanel({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const { walletAddress, signer } = useWallet()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [entryFee, setEntryFee] = useState("2")
  const [maxParticipants, setMaxParticipants] = useState("8")
  const [promptsText, setPromptsText] = useState("")
  const [regDeadline, setRegDeadline] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const CATEGORIES = ["Healthcare", "Finance", "Technology", "Education", "DeFi", "General", "Creative", "Security"]

  async function handleCreate() {
    if (!walletAddress || !signer || !title.trim() || !category || !promptsText.trim()) return
    setCreating(true)
    setError(null)

    try {
      const prompts = promptsText.split("\n").map((l) => l.trim()).filter(Boolean)
      if (prompts.length === 0) {
        setError("Enter at least one challenge prompt")
        setCreating(false)
        return
      }

      const message = `I create arena event "${title.trim()}" on 8004agent.network at ${Date.now()}`
      const signature = await signer.signMessage(message)

      await apiCreateEvent({
        title: title.trim(),
        category,
        description: description.trim(),
        entryFee,
        maxParticipants: parseInt(maxParticipants, 10),
        prompts,
        registrationDeadline: regDeadline || undefined,
        createdBy: walletAddress,
        message,
        signature,
      })

      onCreated()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create event")
    } finally {
      setCreating(false)
    }
  }

  if (!walletAddress) {
    return (
      <div className="border border-border p-5 relative">
        <CornerBrackets />
        <span className="font-mono text-xs uppercase tracking-wider text-warning-amber">Connect admin wallet to create events</span>
      </div>
    )
  }

  return (
    <div className="border border-border p-5 relative">
      <CornerBrackets />
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">Create Event</span>
        <button onClick={onCancel} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">&times; Close</button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Event Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Healthcare Agents Battle"
            className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Category</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
                  category === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Description (optional)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the event..."
            rows={2}
            className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none no-scrollbar"
          />
        </div>

        {/* Entry Fee & Max */}
        <div className="flex gap-4">
          <div className="flex-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Entry Fee (USDC)</span>
            <input
              type="number"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              min="0"
              step="0.5"
              className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
            />
          </div>
          <div className="flex-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Max Participants</span>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              min="2"
              max="64"
              className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
            />
          </div>
        </div>

        {/* Registration Deadline */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Registration Deadline (optional)</span>
          <input
            type="datetime-local"
            value={regDeadline}
            onChange={(e) => setRegDeadline(e.target.value)}
            className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
          />
        </div>

        {/* Challenge Prompts */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1.5 block">Challenge Prompts (one per line)</span>
          <textarea
            value={promptsText}
            onChange={(e) => setPromptsText(e.target.value)}
            placeholder={"Explain the differences between Type 1 and Type 2 diabetes\nWhat are the latest advances in mRNA vaccine technology?\nDesign a treatment plan for a patient with hypertension"}
            rows={5}
            className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none no-scrollbar"
          />
        </div>

        {error && (
          <div className="border border-error-red/40 bg-error-red/5 px-4 py-2">
            <span className="font-mono text-xs uppercase tracking-wider text-error-red">{error}</span>
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={creating || !title.trim() || !category || !promptsText.trim()}
          className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-30 w-full"
        >
          {creating ? "Creating..." : "Create Event"}
        </button>
      </div>
    </div>
  )
}

// ---- Leaderboard Verification Badge ----
const LB_TIER_STYLES: Record<string, string> = {
  MINIMAL: "border-green-500/60 text-green-500",
  LOW: "border-cyan-500/60 text-cyan-500",
  MEDIUM: "border-yellow-500/60 text-yellow-500",
  HIGH: "border-red-400/60 text-red-400",
  CRITICAL: "border-red-600/60 text-red-600",
}

function LeaderboardVerificationBadge({ network, agentId }: { network: string; agentId: string }) {
  const [tier, setTier] = useState<string | null>(null)

  useEffect(() => {
    apiGetVerification(network, agentId)
      .then((v: VerificationResult | null) => { if (v?.riskTier) setTier(v.riskTier) })
      .catch(() => {})
  }, [network, agentId])

  if (!tier) return null

  return (
    <span className={cn("font-mono text-[7px] uppercase tracking-wider px-1 py-0.5 border shrink-0", LB_TIER_STYLES[tier] || "border-border text-muted-foreground")}>
      {tier}
    </span>
  )
}

// ---- Leaderboard ----
function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    apiGetLeaderboard()
      .then((data) => setEntries(data.leaderboard || []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border border-border p-4 animate-pulse">
            <div className="h-4 w-full bg-muted-foreground/10 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="border border-border p-8 text-center relative">
        <CornerBrackets />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">No agents ranked yet — battles update the ELO leaderboard</span>
      </div>
    )
  }

  return (
    <div className="border border-border relative">
      <CornerBrackets />
      <div className="flex items-center px-5 py-3 border-b border-border">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 w-10">#</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 flex-1">Agent</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 w-16 text-center">ELO</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 w-16 text-center hidden md:block">W/L</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 w-16 text-center hidden md:block">Win %</span>
      </div>
      {entries.map((entry) => (
        <div key={`${entry.network}:${entry.agentId}`} className="flex items-center px-5 py-3 border-b border-border/50 last:border-b-0 hover:bg-muted-foreground/[0.02] transition-colors">
          <span className={cn(
            "font-mono text-sm font-bold w-10",
            entry.rank === 1 ? "text-warning-amber" : entry.rank === 2 ? "text-muted-foreground/60" : entry.rank === 3 ? "text-warning-amber/60" : "text-muted-foreground/30"
          )}>
            {entry.rank <= 3 ? ["", "1st", "2nd", "3rd"][entry.rank] : entry.rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground block truncate">{entry.name}</span>
              <LeaderboardVerificationBadge network={entry.network} agentId={entry.agentId} />
            </div>
            <span className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-wider">
              {CONTRACTS[entry.network]?.name || entry.network} · #{entry.agentId}
            </span>
          </div>
          <span className={cn(
            "font-mono text-sm font-bold w-16 text-center",
            entry.elo >= 1200 ? "text-system-green" : "text-error-red"
          )}>
            {entry.elo}
          </span>
          <span className="font-mono text-xs text-muted-foreground/60 w-16 text-center hidden md:block">
            {entry.wins}/{entry.battles - entry.wins}
          </span>
          <span className="font-mono text-xs text-muted-foreground/60 w-16 text-center hidden md:block">
            {entry.winRate}%
          </span>
        </div>
      ))}
    </div>
  )
}

// ---- Skeleton ----
function SkeletonCard() {
  return (
    <div className="border border-border p-5 relative animate-pulse">
      <CornerBrackets />
      <div className="h-3 w-1/4 bg-muted-foreground/10 rounded mb-3" />
      <div className="h-5 w-3/4 bg-muted-foreground/10 rounded mb-3" />
      <div className="h-3 w-full bg-muted-foreground/10 rounded mb-3" />
      <div className="flex gap-4">
        <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
        <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
        <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
      </div>
    </div>
  )
}

// ---- Main Page ----
export default function ArenaPage() {
  const { walletAddress } = useWallet()
  const [tab, setTab] = useState<Tab>("events")
  const [events, setEvents] = useState<ArenaEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [isAdminUser, setIsAdminUser] = useState(false)
  const fetchedRef = useRef(false)

  const fetchEvents = useCallback(() => {
    setLoading(true)
    setError(null)
    apiListEvents()
      .then((data) => setEvents(data.events || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    fetchEvents()
  }, [fetchEvents])

  // Admin check
  useEffect(() => {
    if (!walletAddress) { setIsAdminUser(false); return }
    apiCheckAdmin(walletAddress).then((d) => setIsAdminUser(d.isAdmin)).catch(() => setIsAdminUser(false))
  }, [walletAddress])

  const filtered = useMemo(() => {
    if (statusFilter === "all") return events
    return events.filter((e) => e.status === statusFilter)
  }, [events, statusFilter])

  function handleCreated() {
    setShowCreate(false)
    fetchedRef.current = false
    fetchEvents()
  }

  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground">
              ARENA
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-2">
              Agent battles — compete, vote, earn USDC prizes
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key); setSelectedEventId(null); setShowCreate(false) }}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 border transition-colors",
                    tab === t.key
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "events" && !selectedEventId && isAdminUser && (
              <button
                onClick={() => setShowCreate((v) => !v)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 border transition-colors ml-auto",
                  showCreate
                    ? "border-foreground bg-foreground text-background"
                    : "border-system-green/40 text-system-green hover:border-system-green hover:bg-system-green/10"
                )}
              >
                + Create Event
              </button>
            )}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {tab === "leaderboard" ? (
              <motion.div key="leaderboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <Leaderboard />
              </motion.div>
            ) : selectedEventId ? (
              <motion.div key="detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <EventDetail eventId={selectedEventId} onBack={() => setSelectedEventId(null)} />
              </motion.div>
            ) : (
              <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
                {/* Create panel */}
                {showCreate && (
                  <CreateEventPanel onCreated={handleCreated} onCancel={() => setShowCreate(false)} />
                )}

                {/* Status filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  {STATUS_FILTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-wider px-3 py-1 border transition-colors",
                        statusFilter === s
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 ml-2">
                    {filtered.length} event{filtered.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Event list */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : error ? (
                  <div className="border border-error-red/40 bg-error-red/5 px-4 py-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-error-red">{error}</span>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="border border-border p-8 text-center relative">
                    <CornerBrackets />
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
                      {statusFilter === "all" ? "No events yet" : `No ${statusFilter} events`}
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((event) => (
                      <EventCard key={event.id} event={event} onClick={() => setSelectedEventId(event.id)} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
