"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { ethers } from "ethers"
import { CONTRACTS, REPUTATION_REGISTRY_ABI } from "@/lib/deploy-constants"
import { useRouter } from "next/navigation"
import { apiListAgents, apiVerifyAgent, apiGetVerification, type VerificationResult } from "@/lib/api"
import { selectFacilitator, facinetExecuteContract } from "@/lib/facinet"
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

interface FeedbackEntry {
  clientAddress: string
  index: number
  value: number
  tag1: string
  tag2: string
  isRevoked: boolean
}

const NETWORK_FILTERS = [
  { key: "all", label: "ALL" },
  ...Object.entries(CONTRACTS).map(([key, c]) => ({ key, label: c.name })),
]

const PAGE_SIZE = 18

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState<Agent | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    apiListAgents()
      .then((data) => setAgents((data.agents || []) as unknown as Agent[]))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === "all" ? agents : agents.filter((a) => a.network === filter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleBack = useCallback(() => setSelected(null), [])

  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground">
              AGENTS
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-2">
              Deployed on 8004agent.network
            </p>
          </div>

          {/* Network Filter */}
          {!selected && (
            <div className="flex flex-wrap gap-2 mb-6">
              {NETWORK_FILTERS.map((nf) => (
                <button
                  key={nf.key}
                  onClick={() => { setFilter(nf.key); setSelected(null); setPage(1) }}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
                    filter === nf.key
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {nf.label}
                </button>
              ))}
            </div>
          )}

          {/* Count */}
          {!loading && !error && !selected && (
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                {filtered.length} agent{filtered.length !== 1 ? "s" : ""}{filter !== "all" ? ` on ${CONTRACTS[filter]?.name || filter}` : ""}
              </span>
              {totalPages > 1 && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                  Page {page}/{totalPages}
                </span>
              )}
            </div>
          )}

          {/* Content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border border-error-red/40 bg-error-red/5 px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-wider text-error-red">{error}</span>
              </motion.div>
            ) : selected ? (
              <motion.div key="detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <AgentDetail agent={selected} onBack={handleBack} />
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border border-border p-8 text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
                  No agents found{filter !== "all" ? ` on ${CONTRACTS[filter]?.name || filter}` : ""}
                </span>
              </motion.div>
            ) : (
              <motion.div key={`grid-${page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paged.map((agent, i) => (
                    <AgentCard key={`${agent.network}-${agent.agentId}-${i}`} agent={agent} onClick={() => setSelected(agent)} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-30 disabled:pointer-events-none">&larr; Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => setPage(p)} className={cn("font-mono text-[10px] uppercase tracking-widest w-8 h-8 border transition-colors", p === page ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground")}>{p}</button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-30 disabled:pointer-events-none">Next &rarr;</button>
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

// ---- Skeleton Card ----
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

// ---- Corner Brackets (reusable) ----
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

// ---- Verification Badge ----
const TIER_STYLES: Record<string, string> = {
  MINIMAL: "border-green-500/60 text-green-500 bg-green-500/5",
  LOW: "border-cyan-500/60 text-cyan-500 bg-cyan-500/5",
  MEDIUM: "border-yellow-500/60 text-yellow-500 bg-yellow-500/5",
  HIGH: "border-red-400/60 text-red-400 bg-red-400/5",
  CRITICAL: "border-red-600/60 text-red-600 bg-red-600/10",
}

function VerificationBadge({ network, agentId }: { network: string; agentId: string }) {
  const [verification, setVerification] = useState<VerificationResult | null>(null)

  useEffect(() => {
    if (!agentId || agentId === "pending") return
    apiGetVerification(network, agentId)
      .then((v) => { if (v && v.riskTier) setVerification(v) })
      .catch(() => {})
  }, [network, agentId])

  if (!verification) return null

  const style = TIER_STYLES[verification.riskTier] || "border-border text-muted-foreground"

  return (
    <span className={cn("font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 border shrink-0", style)}>
      {verification.riskTier} {verification.overallScore}
    </span>
  )
}

// ---- Agent Card ----
function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const router = useRouter()
  const networkName = CONTRACTS[agent.network]?.name || agent.network
  const isActive = agent.status === "active"
  const skills = Array.isArray(agent.skills) ? agent.skills : []
  const hp = parseFloat(agent.hirePrice || "0")
  const date = agent.registeredAt ? new Date(agent.registeredAt).toLocaleDateString() : ""

  return (
    <div className="border border-border p-5 relative hover:border-foreground/30 transition-colors group w-full">
      <CornerBrackets />
      {/* Clickable area for details */}
      <button type="button" onClick={onClick} className="w-full text-left cursor-pointer">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={cn("h-2 w-2 rounded-full shrink-0", isActive ? "bg-system-green" : "bg-error-red")} />
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground truncate">{agent.name}</span>
          {agent.agentId && agent.agentId !== "pending" && <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">#{agent.agentId}</span>}
          <VerificationBadge network={agent.network} agentId={agent.agentId} />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 border border-border px-1.5 py-0.5">{networkName}</span>
          <span className={cn("font-mono text-[9px] uppercase tracking-wider", hp > 0 ? "text-system-green" : "text-muted-foreground/40")}>{hp > 0 ? `$${hp.toFixed(2)} USDC` : "FREE"}</span>
        </div>
        {agent.description && <p className="font-mono text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{agent.description}</p>}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skills.slice(0, 3).map((s) => <span key={s} className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border border-border/60 px-1.5 py-0.5">{s}</span>)}
            {skills.length > 3 && <span className="font-mono text-[9px] text-muted-foreground/40">+{skills.length - 3}</span>}
          </div>
        )}
        <div className="flex items-center justify-between">
          {agent.ownerAddress && <span className="font-mono text-[9px] text-muted-foreground/40 truncate">{agent.ownerAddress.slice(0, 6)}...{agent.ownerAddress.slice(-4)}</span>}
          {date && <span className="font-mono text-[9px] text-muted-foreground/40 shrink-0">{date}</span>}
        </div>
      </button>
      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); router.push(`/hire?network=${agent.network}&agentId=${agent.agentId}`) }}
          className="flex-1 font-mono text-[10px] uppercase tracking-widest py-1.5 border border-system-green/40 text-system-green hover:bg-system-green/5 transition-colors text-center"
        >
          HIRE
        </button>
        <button
          type="button"
          onClick={onClick}
          className="flex-1 font-mono text-[10px] uppercase tracking-widest py-1.5 border border-info-blue/40 text-info-blue hover:bg-info-blue/5 transition-colors text-center"
        >
          FEEDBACK
        </button>
      </div>
    </div>
  )
}

// ---- Detail Row ----
function DetailRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 w-24 shrink-0 pt-0.5">{label}</span>
      {children || <span className="text-xs text-foreground break-all">{value}</span>}
    </div>
  )
}

// ---- Agent Detail ----
function AgentDetail({ agent, onBack }: { agent: Agent; onBack: () => void }) {
  const router = useRouter()
  const networkConfig = CONTRACTS[agent.network]
  const networkName = networkConfig?.name || agent.network
  const blockExplorer = networkConfig?.blockExplorer || ""
  const isActive = agent.status === "active"
  const date = agent.registeredAt ? new Date(agent.registeredAt).toLocaleString() : ""
  const hp = parseFloat(agent.hirePrice || "0")

  return (
    <div className="flex flex-col gap-5">
      <button onClick={onBack} className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors self-start">&larr; Back to agents</button>

      {/* Header */}
      <div className="flex items-center gap-3">
        <span className={cn("h-3 w-3 rounded-full", isActive ? "bg-system-green" : "bg-error-red")} />
        <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-tight uppercase text-foreground">{agent.name}</h2>
        {agent.agentId && agent.agentId !== "pending" && <span className="font-mono text-sm text-muted-foreground/60">#{agent.agentId}</span>}
      </div>

      {/* Hire + Feedback action bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/hire?network=${agent.network}&agentId=${agent.agentId}`)}
          className="font-mono text-xs uppercase tracking-widest px-6 py-2.5 bg-system-green/10 border border-system-green/40 text-system-green hover:bg-system-green/20 transition-colors"
        >
          {hp > 0 ? `HIRE — $${hp.toFixed(2)} / call` : "HIRE — FREE"}
        </button>
        <a
          href="#feedback"
          className="font-mono text-xs uppercase tracking-widest px-6 py-2.5 border border-info-blue/40 text-info-blue hover:bg-info-blue/5 transition-colors"
        >
          GIVE FEEDBACK
        </a>
      </div>

      {/* Basic Info */}
      <div className="border border-border p-5 relative">
        <CornerBrackets />
        <div className="space-y-2 text-sm font-mono">
          <DetailRow label="NAME" value={agent.name} />
          <DetailRow label="URL">
            <a href={agent.url} target="_blank" rel="noopener noreferrer" className="text-info-blue hover:underline break-all text-xs">{agent.url}</a>
          </DetailRow>
          <DetailRow label="DESCRIPTION" value={agent.description} />
          <DetailRow label="AGENT ID" value={agent.agentId || "Pending"} />
          <DetailRow label="NETWORK" value={networkName} />
          <DetailRow label="STATUS">
            <span className={cn("text-xs", isActive ? "text-system-green" : "text-error-red")}>{agent.status?.toUpperCase() || "UNKNOWN"}</span>
          </DetailRow>
          <DetailRow label="OWNER">
            <span className="text-xs text-foreground break-all">{agent.ownerAddress || "—"}</span>
          </DetailRow>
          <DetailRow label="VERSION" value={agent.version || "—"} />
          {agent.author && <DetailRow label="AUTHOR" value={agent.author} />}
          <DetailRow label="LICENSE" value={agent.license || "—"} />
          {agent.registrationTx && (
            <DetailRow label="REG TX">
              <a href={`${blockExplorer}/tx/${agent.registrationTx}`} target="_blank" rel="noopener noreferrer" className="text-info-blue hover:underline break-all text-xs">{agent.registrationTx}</a>
            </DetailRow>
          )}
          {date && <DetailRow label="REGISTERED" value={date} />}
        </div>
      </div>

      {/* Protocol Endpoints */}
      {(agent.mcpEndpoint || agent.a2aEndpoint) && (
        <div className="border border-border p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-3">Protocol Endpoints</span>
          <div className="space-y-2 font-mono">
            {agent.mcpEndpoint && <DetailRow label="MCP"><a href={agent.mcpEndpoint} target="_blank" rel="noopener noreferrer" className="text-info-blue hover:underline break-all text-xs">{agent.mcpEndpoint}</a></DetailRow>}
            {agent.a2aEndpoint && <DetailRow label="A2A"><a href={agent.a2aEndpoint} target="_blank" rel="noopener noreferrer" className="text-info-blue hover:underline break-all text-xs">{agent.a2aEndpoint}</a></DetailRow>}
          </div>
        </div>
      )}

      {/* ERC-8126 Verification */}
      <VerificationSection agent={agent} />

      {/* Feedback / Reputation */}
      <div id="feedback">
        <FeedbackSection agent={agent} />
      </div>
    </div>
  )
}

// ---- Feedback Section ----
function FeedbackSection({ agent }: { agent: Agent }) {
  const { walletAddress, signer } = useWallet()
  const networkConfig = CONTRACTS[agent.network]
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([])
  const [summary, setSummary] = useState<{ count: number; avg: number } | null>(null)
  const [loadingFeedback, setLoadingFeedback] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState<string | null>(null)
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState("")
  const fetchedRef = useRef(false)

  // Fetch feedback from chain on mount
  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    if (!agent.agentId || agent.agentId === "pending" || !networkConfig) {
      setLoadingFeedback(false)
      return
    }
    fetchFeedback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchFeedback() {
    try {
      const provider = new ethers.JsonRpcProvider(networkConfig.rpc)
      const contract = new ethers.Contract(networkConfig.reputationRegistry, REPUTATION_REGISTRY_ABI, provider)

      // Get all clients who gave feedback
      const clients: string[] = await contract.getClients(agent.agentId)

      if (clients.length === 0) {
        setSummary({ count: 0, avg: 0 })
        setLoadingFeedback(false)
        return
      }

      // Get summary
      try {
        const [count, summaryValue, summaryDecimals] = await contract.getSummary(agent.agentId, clients, "", "")
        const countNum = Number(count)
        const avg = countNum > 0 ? Number(summaryValue) / Math.pow(10, Number(summaryDecimals)) : 0
        setSummary({ count: countNum, avg })
      } catch {
        setSummary({ count: 0, avg: 0 })
      }

      // Read individual feedbacks
      const entries: FeedbackEntry[] = []
      for (const client of clients) {
        const lastIndex = Number(await contract.getLastIndex(agent.agentId, client))
        for (let i = 1; i <= lastIndex; i++) {
          try {
            const [value, , tag1, tag2, isRevoked] = await contract.readFeedback(agent.agentId, client, i)
            if (!isRevoked) {
              entries.push({
                clientAddress: client,
                index: i,
                value: Number(value),
                tag1,
                tag2,
                isRevoked,
              })
            }
          } catch { /* skip */ }
        }
      }
      setFeedbacks(entries)
    } catch (e) {
      console.error("Failed to fetch feedback:", e)
    } finally {
      setLoadingFeedback(false)
    }
  }

  async function handleSubmit() {
    if (!walletAddress || !signer || !agent.agentId || agent.agentId === "pending") return
    setSubmitting(true)
    setSubmitMsg(null)

    try {
      // Sign feedback message to prove wallet ownership
      const sigMessage = `I give feedback score ${score}/5 to agent #${agent.agentId} (${agent.name}) on ${networkConfig.name} via 8004agent.network`
      const signature = await signer.signMessage(sigMessage)

      const facConfig = { network: networkConfig.facinetNetwork, chainId: networkConfig.chainId }
      const facilitator = await selectFacilitator(facConfig)

      // Build feedbackHash from signature (proves user signed this specific feedback)
      const feedbackHash = ethers.keccak256(ethers.toUtf8Bytes(signature))

      await facinetExecuteContract(facConfig, {
        contractAddress: networkConfig.reputationRegistry as `0x${string}`,
        functionName: "giveFeedback",
        functionArgs: [
          agent.agentId,         // agentId
          score,                 // value (1-5 scale, 0 decimals)
          0,                     // valueDecimals
          "rating",              // tag1
          comment || "",         // tag2 (store short comment here)
          agent.url || "",       // endpoint
          `sig:${walletAddress}`,// feedbackURI — marks who signed
          feedbackHash,          // feedbackHash — hash of user's signature
        ],
        abi: REPUTATION_REGISTRY_ABI,
      }, facilitator)

      setSubmitMsg("Feedback submitted on-chain!")
      setComment("")
      setScore(5)

      // Refresh feedback
      fetchedRef.current = false
      setLoadingFeedback(true)
      fetchFeedback()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setSubmitMsg(`Failed: ${msg}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Summary Stats */}
      <div className="border border-border p-5 relative">
        <CornerBrackets />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">Reputation</span>

        {loadingFeedback ? (
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="flex-1 h-20 bg-muted-foreground/5 border border-border animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-border p-4 text-center">
              <span className="font-mono text-2xl font-bold text-foreground block">
                {summary ? `${summary.avg.toFixed(1)}/5` : "—"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">Avg Score</span>
            </div>
            <div className="border border-border p-4 text-center">
              <span className="font-mono text-2xl font-bold text-foreground block">
                {summary?.count ?? 0}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">Total Feedback</span>
            </div>
            <div className="border border-border p-4 text-center">
              <span className="font-mono text-2xl font-bold text-foreground block">
                {summary ? Math.round(summary.avg * 20) : 0}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">Score /100</span>
            </div>
          </div>
        )}
      </div>

      {/* Submit Feedback */}
      <div className="border border-border p-5 relative">
        <CornerBrackets />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">Give Feedback</span>

        {!walletAddress ? (
          <div className="border border-warning-amber/40 bg-warning-amber/5 px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-wider text-warning-amber">Connect wallet from navbar to give feedback</span>
          </div>
        ) : agent.ownerAddress && walletAddress.toLowerCase() === agent.ownerAddress.toLowerCase() ? (
          <div className="border border-border px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60">You cannot review your own agent</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Score selector */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">Score</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setScore(v)}
                    className={cn(
                      "w-10 h-10 font-mono text-sm font-bold border transition-colors",
                      v === score
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">Comment (optional)</span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your feedback..."
                rows={3}
                className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none no-scrollbar"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={submitting || !agent.agentId || agent.agentId === "pending"}
                className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-30"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
              <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-wider">Gas covered by Facinet</span>
            </div>

            {submitMsg && (
              <span className={cn("font-mono text-xs uppercase tracking-wider", submitMsg.startsWith("Failed") ? "text-error-red" : "text-system-green")}>
                {submitMsg}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Feedback List */}
      {!loadingFeedback && feedbacks.length > 0 && (
        <div className="border border-border p-5 relative">
          <CornerBrackets />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">
            Feedback ({feedbacks.length})
          </span>

          <div className="space-y-3">
            {feedbacks.map((fb, i) => (
              <div key={`${fb.clientAddress}-${fb.index}-${i}`} className="border border-border/60 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-muted-foreground/40">
                      {fb.clientAddress.slice(0, 6)}...{fb.clientAddress.slice(-4)}
                    </span>
                    {fb.tag1 && <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 border border-border/40 px-1.5 py-0.5">{fb.tag1}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} className={cn("text-sm", si < fb.value ? "text-warning-amber" : "text-border")}>
                        &#9733;
                      </span>
                    ))}
                    <span className="font-mono text-xs text-foreground ml-1">{fb.value}/5</span>
                  </div>
                </div>
                {fb.tag2 && (
                  <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{fb.tag2}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loadingFeedback && feedbacks.length === 0 && (
        <div className="border border-border p-5 relative text-center">
          <CornerBrackets />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">No feedback yet — be the first to review this agent</span>
        </div>
      )}
    </div>
  )
}

// ---- Verification Section (ERC-8126) ----
const PROOF_TYPE_LABELS: Record<string, string> = {
  WAV: "Web Availability",
  WV: "Wallet Verification",
  ETV: "On-Chain Transaction",
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-500" : "bg-red-500"
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 w-32 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted-foreground/10 relative overflow-hidden">
        <div className={cn("h-full transition-all duration-500", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-xs text-foreground w-10 text-right">{score}</span>
    </div>
  )
}

function VerificationSection({ agent }: { agent: Agent }) {
  const { signedFetch } = useWallet()
  const [verification, setVerification] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  useEffect(() => {
    if (!agent.agentId || agent.agentId === "pending") {
      setLoading(false)
      return
    }
    apiGetVerification(agent.network, agent.agentId)
      .then((v) => { if (v && v.riskTier) setVerification(v) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [agent.network, agent.agentId])

  async function handleVerify() {
    setVerifying(true)
    setVerifyError(null)
    try {
      const result = await apiVerifyAgent(agent.network, agent.agentId, signedFetch)
      setVerification(result)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setVerifyError(msg)
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="border border-border p-5 relative">
      <CornerBrackets />
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">ERC-8126 Verification</span>
        <button
          onClick={handleVerify}
          disabled={verifying || !agent.agentId || agent.agentId === "pending"}
          className="font-mono text-[10px] uppercase tracking-widest border border-border px-3 py-1.5 hover:border-foreground/30 hover:text-foreground transition-colors text-muted-foreground disabled:opacity-30"
        >
          {verifying ? "Verifying..." : verification ? "Re-verify" : "Verify Now"}
        </button>
      </div>

      {loading ? (
        <div className="h-20 bg-muted-foreground/5 animate-pulse" />
      ) : verification ? (
        <div className="space-y-4">
          {/* Overall Score + Tier */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-border p-4 text-center">
              <span className="font-mono text-2xl font-bold text-foreground block">{verification.overallScore}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">Score /100</span>
            </div>
            <div className="border border-border p-4 text-center">
              <span className={cn(
                "font-mono text-sm font-bold block px-2 py-1 border",
                TIER_STYLES[verification.riskTier] || "border-border text-muted-foreground"
              )}>
                {verification.riskTier}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 mt-1 block">Risk Tier</span>
            </div>
            <div className="border border-border p-4 text-center">
              <span className="font-mono text-sm text-foreground block">
                {verification.verifiedAt ? new Date(verification.verifiedAt).toLocaleDateString() : "—"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 mt-1 block">Last Verified</span>
            </div>
          </div>

          {/* Individual Proof Scores */}
          {verification.proofs && verification.proofs.length > 0 && (
            <div className="space-y-3">
              {verification.proofs.map((proof, i) => (
                <ScoreBar
                  key={i}
                  score={proof.score}
                  label={PROOF_TYPE_LABELS[proof.proofType] || proof.proofType}
                />
              ))}
            </div>
          )}

          {verification.txHash && (
            <div className="font-mono text-[10px] text-muted-foreground/40">
              On-chain tx: <span className="text-info-blue">{verification.txHash}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
            Not yet verified — click &quot;Verify Now&quot; to run ERC-8126 checks
          </span>
        </div>
      )}

      {verifyError && (
        <div className="mt-3 border border-error-red/40 bg-error-red/5 px-4 py-2">
          <span className="font-mono text-xs text-error-red">{verifyError}</span>
        </div>
      )}
    </div>
  )
}
