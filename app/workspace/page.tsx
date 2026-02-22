"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import {
  apiGetAgent,
  apiGetHireStatus,
  apiCheckActiveHire,
  apiWorkspaceCall,
  apiWorkspaceHistory,
  apiWorkspaceClear,
  type HireRecord,
} from "@/lib/api"
import { CONTRACTS, REPUTATION_REGISTRY_ABI } from "@/lib/deploy-constants"
import { selectFacilitator, facinetExecuteContract } from "@/lib/facinet"
import { ethers } from "ethers"
import { useWallet } from "@/components/wallet-provider"

// ---- Types ----
interface Agent {
  agentId: string
  name: string
  description: string
  url: string
  imageUrl: string
  network: string
  status: string
  ownerAddress: string
  mcpEndpoint: string
  a2aEndpoint: string
}

interface ChatMessage {
  role: "user" | "agent"
  text: string
  timestamp: string
  hasFiles?: boolean
}

interface FileAttachment {
  name: string
  data: string
  mimeType: string
}

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

function WorkspaceInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { walletAddress, connect, isConnecting } = useWallet()

  const network = searchParams.get("network") || ""
  const agentId = searchParams.get("agentId") || ""
  const hireIdParam = searchParams.get("hireId")

  const [agent, setAgent] = useState<Agent | null>(null)
  const [hire, setHire] = useState<HireRecord | null>(null)
  const [hireId, setHireId] = useState<string | null>(hireIdParam)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<FileAttachment[]>([])
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [callsUsed, setCallsUsed] = useState(0)
  const [callsTotal, setCallsTotal] = useState(0)

  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Load agent + hire data
  useEffect(() => {
    if (!network || !agentId) { setLoading(false); return }
    async function load() {
      try {
        const agentData = await apiGetAgent(network, agentId)
        setAgent(agentData as unknown as Agent)

        let resolvedHireId = hireIdParam

        if (!resolvedHireId && walletAddress) {
          const check = await apiCheckActiveHire(walletAddress, network, agentId)
          if (check.active && check.hire) {
            resolvedHireId = check.hire.hireId
          }
        }

        if (resolvedHireId) {
          setHireId(resolvedHireId)
          const hireData = await apiGetHireStatus(resolvedHireId)
          setHire(hireData)
          setCallsUsed(Number(hireData.callsUsed) || 0)
          setCallsTotal(Number(hireData.callsTotal) || 0)

          const historyData = await apiWorkspaceHistory(resolvedHireId)
          if (historyData.history && historyData.history.length > 0) {
            const chatHistory: ChatMessage[] = []
            for (const msg of historyData.history) {
              chatHistory.push({
                role: "user",
                text: msg.userMessage,
                timestamp: msg.timestamp,
                hasFiles: msg.hasFiles,
              })
              chatHistory.push({
                role: "agent",
                text: msg.agentResponse,
                timestamp: msg.timestamp,
              })
            }
            setMessages(chatHistory)
          }
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load workspace")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [network, agentId, hireIdParam, walletAddress])

  async function handleSend() {
    if (!hireId || !input.trim() || sending) return

    const userText = input.trim()
    const attachedFiles = files.length > 0 ? [...files] : undefined

    const userMsg: ChatMessage = {
      role: "user",
      text: userText,
      timestamp: new Date().toISOString(),
      hasFiles: !!attachedFiles,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setFiles([])
    setSending(true)
    setError(null)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      const result = await apiWorkspaceCall(hireId, userText, attachedFiles)

      const agentMsg: ChatMessage = {
        role: "agent",
        text: result.response || "(No response)",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, agentMsg])
      setCallsUsed(result.callsUsed)
      setCallsTotal(result.callsTotal)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send message"
      setError(msg)
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: `Error: ${msg}`, timestamp: new Date().toISOString() },
      ])
    } finally {
      setSending(false)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    Array.from(selectedFiles).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1]
        setFiles((prev) => [
          ...prev,
          { name: file.name, data: base64, mimeType: file.type || "application/octet-stream" },
        ])
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ""
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleClear() {
    if (!hireId) return
    try {
      await apiWorkspaceClear(hireId)
      setMessages([])
    } catch {
      // Silently fail
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = "auto"
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px"
  }

  // ---- Missing params ----
  if (!network || !agentId) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="border border-error-red/40 bg-error-red/5 px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-wider text-error-red">Missing network or agentId parameter</span>
          </div>
        </div>
      </div>
    )
  }

  // ---- Loading ----
  if (loading) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
          <div className="w-full max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted-foreground/10 rounded" />
            <div className="h-24 bg-muted-foreground/10 rounded" />
            <div className="flex-1 h-64 bg-muted-foreground/10 rounded" />
          </div>
        </div>
      </div>
    )
  }

  // ---- Not connected ----
  if (!walletAddress) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="border border-border p-8 relative text-center max-w-md">
            <CornerBrackets />
            <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground mb-2">
              CONNECT WALLET
            </h2>
            <p className="font-mono text-xs text-muted-foreground mb-6">
              Connect your wallet to access the workspace
            </p>
            <button
              onClick={connect}
              disabled={isConnecting}
              className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 disabled:opacity-30"
            >
              {isConnecting ? "CONNECTING..." : "CONNECT"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---- No hire found ----
  if (!hireId || (!hire && !loading)) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="border border-border p-8 relative text-center max-w-md">
            <CornerBrackets />
            <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground mb-2">
              NO ACTIVE HIRE
            </h2>
            <p className="font-mono text-xs text-muted-foreground mb-6">
              You need to hire this agent before using the workspace
            </p>
            <button
              onClick={() => router.push(`/hire?network=${network}&agentId=${agentId}`)}
              className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90"
            >
              HIRE AGENT
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isExpired = hire && new Date(hire.expiresAt) < new Date()
  const isExhausted = callsUsed >= callsTotal
  const canSend = !sending && !isExpired && !isExhausted && hire?.status === "active"
  const callsRemaining = Math.max(0, callsTotal - callsUsed)
  const usagePercent = callsTotal > 0 ? Math.min(100, (callsUsed / callsTotal) * 100) : 0
  const networkName = CONTRACTS[network]?.name || network
  const protocol = agent?.a2aEndpoint ? "A2A" : agent?.mcpEndpoint ? "MCP" : "HTTP"

  return (
    <div className="h-[calc(100vh-64px)] w-full relative flex flex-col overflow-hidden">
      {/* Header bar */}
      <div className="border-b border-border px-4 md:px-8 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.back()}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              &larr;
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full flex-shrink-0", agent?.status === "active" ? "bg-system-green" : "bg-error-red")} />
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground truncate">
                  {agent?.name || "Agent"}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground/50 flex-shrink-0">#{agentId}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground/40">{networkName}</span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-info-blue/60">{protocol}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50">
                  {callsRemaining.toLocaleString()} calls left
                </span>
                <span className={cn(
                  "font-mono text-[9px] uppercase tracking-wider",
                  usagePercent > 90 ? "text-error-red" : usagePercent > 70 ? "text-warning-amber" : "text-system-green"
                )}>
                  {usagePercent.toFixed(0)}%
                </span>
              </div>
              <div className="w-32 h-1 bg-muted-foreground/10 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all",
                    usagePercent > 90 ? "bg-error-red" : usagePercent > 70 ? "bg-warning-amber" : "bg-system-green"
                  )}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleClear}
              className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-colors"
              title="Clear conversation"
            >
              NEW CHAT
            </button>
          </div>
        </div>
      </div>

      {/* Status banner + Feedback */}
      {(isExpired || isExhausted) && (
        <div className="border-b border-error-red/30 bg-error-red/5 px-4 py-2 flex-shrink-0">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-error-red">
                {isExpired ? "Hire expired" : "No calls remaining"}
              </span>
              <button
                onClick={() => router.push(`/hire?network=${network}&agentId=${agentId}`)}
                className="font-mono text-[9px] uppercase tracking-widest px-3 py-1 bg-error-red/10 border border-error-red/30 text-error-red hover:bg-error-red/20 transition-colors"
              >
                RENEW
              </button>
            </div>
            <FeedbackForm agent={agent} network={network} agentId={agentId} />
          </div>
        </div>
      )}

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 md:px-8">
        <div className="max-w-4xl mx-auto py-6 space-y-1">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-24 pb-16">
              <div className="border border-border/40 p-8 relative text-center max-w-md">
                <CornerBrackets opacity={10} />
                <div className="font-mono text-3xl text-foreground/10 mb-4">&gt;_</div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">
                  WORKSPACE READY
                </h3>
                <p className="font-mono text-[10px] text-muted-foreground/40 leading-relaxed">
                  Send a message to start interacting with{" "}
                  <span className="text-foreground/60">{agent?.name || "this agent"}</span>.
                  You can also attach files for the agent to process.
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "py-4",
                    idx > 0 && messages[idx - 1].role !== msg.role ? "border-t border-border/20" : ""
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "font-mono text-[9px] uppercase tracking-widest font-bold",
                      msg.role === "user" ? "text-info-blue" : "text-system-green"
                    )}>
                      {msg.role === "user" ? "YOU" : agent?.name?.toUpperCase() || "AGENT"}
                    </span>
                    <span className="font-mono text-[8px] text-muted-foreground/30">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {msg.hasFiles && (
                      <span className="font-mono text-[8px] text-warning-amber/60 border border-warning-amber/20 px-1">
                        FILES
                      </span>
                    )}
                  </div>

                  <div className={cn(
                    "font-mono text-[12px] leading-relaxed whitespace-pre-wrap break-words",
                    msg.role === "user" ? "text-foreground/80" : "text-foreground",
                    msg.text.startsWith("Error:") ? "text-error-red" : ""
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Typing indicator */}
          {sending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4 border-t border-border/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-system-green">
                  {agent?.name?.toUpperCase() || "AGENT"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-system-green/60 rounded-full animate-pulse" />
                <span className="h-1.5 w-1.5 bg-system-green/60 rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 bg-system-green/60 rounded-full animate-pulse [animation-delay:300ms]" />
                <span className="font-mono text-[10px] text-muted-foreground/40 ml-2">Processing...</span>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border px-4 md:px-8 py-4 flex-shrink-0 bg-background">
        <div className="max-w-4xl mx-auto">
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 border border-border px-2 py-1 bg-muted-foreground/5">
                  <span className="font-mono text-[9px] text-foreground/70 truncate max-w-[120px]">{file.name}</span>
                  <button
                    onClick={() => removeFile(idx)}
                    className="font-mono text-[9px] text-error-red hover:text-error-red/80"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="border border-error-red/30 bg-error-red/5 px-3 py-2 mb-3">
              <span className="font-mono text-[10px] text-error-red">{error}</span>
            </div>
          )}

          <div className="flex items-end gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={!canSend}
              className="font-mono text-xs px-3 py-2.5 border border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              title="Attach files"
            >
              +
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex-1 border border-border focus-within:border-foreground/30 transition-colors relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                disabled={!canSend}
                placeholder={canSend ? "Type a message... (Shift+Enter for new line)" : "Cannot send messages"}
                rows={1}
                className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/30 px-4 py-3 resize-none outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ maxHeight: "160px" }}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!canSend || !input.trim()}
              className={cn(
                "font-mono text-xs uppercase tracking-widest px-6 py-2.5 transition-colors flex-shrink-0",
                canSend && input.trim()
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted-foreground/10 text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              {sending ? "..." : "SEND"}
            </button>
          </div>

          <div className="sm:hidden mt-3 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground/40">
              {callsRemaining.toLocaleString()} / {callsTotal.toLocaleString()} calls remaining
            </span>
            <div className="w-20 h-1 bg-muted-foreground/10 overflow-hidden">
              <div
                className={cn(
                  "h-full",
                  usagePercent > 90 ? "bg-error-red" : usagePercent > 70 ? "bg-warning-amber" : "bg-system-green"
                )}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- Feedback Form (shown after hire usage complete) ----
function FeedbackForm({ agent, network, agentId }: { agent: Agent | null; network: string; agentId: string }) {
  const { walletAddress, signer } = useWallet()
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)
  const [alreadyGave, setAlreadyGave] = useState(false)

  const networkConfig = CONTRACTS[network]

  // Check if user already gave feedback
  useEffect(() => {
    if (!walletAddress || !agentId || !networkConfig) return
    async function check() {
      try {
        const provider = new ethers.JsonRpcProvider(networkConfig.rpc)
        const contract = new ethers.Contract(networkConfig.reputationRegistry, REPUTATION_REGISTRY_ABI, provider)
        const lastIndex = Number(await contract.getLastIndex(agentId, walletAddress))
        if (lastIndex > 0) setAlreadyGave(true)
      } catch { /* ignore */ }
    }
    check()
  }, [walletAddress, agentId, networkConfig])

  async function handleSubmit() {
    if (!walletAddress || !signer || !agentId || !networkConfig) return
    setSubmitting(true)
    setFeedbackError(null)

    try {
      const sigMessage = `I give feedback score ${score}/5 to agent #${agentId} (${agent?.name || "agent"}) on ${networkConfig.name} via 8004agent.network`
      const signature = await signer.signMessage(sigMessage)

      const facConfig = { network: networkConfig.facinetNetwork, chainId: networkConfig.chainId }
      const facilitator = await selectFacilitator(facConfig)
      const feedbackHash = ethers.keccak256(ethers.toUtf8Bytes(signature))

      await facinetExecuteContract(facConfig, {
        contractAddress: networkConfig.reputationRegistry as `0x${string}`,
        functionName: "giveFeedback",
        functionArgs: [
          agentId,
          score,
          0,
          "rating",
          comment || "",
          agent?.url || "",
          `sig:${walletAddress}`,
          feedbackHash,
        ],
        abi: REPUTATION_REGISTRY_ABI,
      }, facilitator)

      setSubmitted(true)
    } catch (e: unknown) {
      setFeedbackError(e instanceof Error ? e.message : String(e))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="border border-system-green/30 bg-system-green/5 p-4">
        <span className="font-mono text-xs uppercase tracking-wider text-system-green">
          Thank you for your feedback! It has been recorded on-chain.
        </span>
      </div>
    )
  }

  if (alreadyGave) {
    return (
      <div className="border border-border/60 p-4 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          You have already submitted feedback for this agent
        </span>
      </div>
    )
  }

  return (
    <div className="border border-border p-4 relative">
      <CornerBrackets opacity={10} />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-3">
        How was your experience with {agent?.name || "this agent"}?
      </span>

      <div className="flex items-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            onClick={() => setScore(v)}
            className={cn(
              "w-9 h-9 font-mono text-sm font-bold border transition-colors",
              v === score
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {v}
          </button>
        ))}
        <span className="font-mono text-[9px] text-muted-foreground/40 ml-2">/5</span>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Optional comment..."
        rows={2}
        className="w-full bg-transparent border border-border px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors resize-none no-scrollbar mb-3"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="font-mono text-[10px] uppercase tracking-widest bg-foreground text-background px-5 py-2 hover:opacity-90 disabled:opacity-30"
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
        <span className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-wider">Gas covered by Facinet</span>
      </div>

      {feedbackError && (
        <div className="mt-2 border border-error-red/30 bg-error-red/5 px-3 py-1.5">
          <span className="font-mono text-[10px] text-error-red">{feedbackError}</span>
        </div>
      )}
    </div>
  )
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={
      <div className="h-full w-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
          <div className="w-full max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted-foreground/10 rounded" />
            <div className="h-24 bg-muted-foreground/10 rounded" />
            <div className="flex-1 h-64 bg-muted-foreground/10 rounded" />
          </div>
        </div>
      </div>
    }>
      <WorkspaceInner />
    </Suspense>
  )
}
