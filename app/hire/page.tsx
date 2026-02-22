"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { CONTRACTS, CHAIN_USDC, PAYMENT_CHAINS, USDC_DECIMALS, USDC_ABI } from "@/lib/deploy-constants"
import { apiGetAgent, apiGetPlans, apiRecordHire, apiCheckActiveHire, apiBridgeInitiate, type HirePlan } from "@/lib/api"
import { selectFacilitator, facinetExecuteContract } from "@/lib/facinet"
import { useWallet } from "@/components/wallet-provider"
import { ethers } from "ethers"

// ---- Types ----
interface Agent {
  agentId: string
  name: string
  description: string
  url: string
  imageUrl: string
  network: string
  hirePrice: string
  status: string
  ownerAddress: string
  agentWalletAddress: string
  skills: string[]
  mcpEndpoint: string
  a2aEndpoint: string
}

const PLAN_KEYS = ["single", "daily", "monthly", "biannual"] as const
const PLAN_ICONS: Record<string, string> = {
  single: "1",
  daily: "24h",
  monthly: "30d",
  biannual: "6mo",
}
const PLAN_DISCOUNTS: Record<string, string> = {
  single: "",
  daily: "20% OFF",
  monthly: "40% OFF",
  biannual: "55% OFF",
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

function HireInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { walletAddress, isConnecting, connect } = useWallet()

  const network = searchParams.get("network") || ""
  const agentId = searchParams.get("agentId") || ""

  const [agent, setAgent] = useState<Agent | null>(null)
  const [plans, setPlans] = useState<Record<string, HirePlan> | null>(null)
  const [perCallPrice, setPerCallPrice] = useState(0)
  const [relayerAddress, setRelayerAddress] = useState("")
  const [isFree, setIsFree] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedChain, setSelectedChain] = useState("fuji")
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [payStatus, setPayStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [existingHire, setExistingHire] = useState<string | null>(null)

  // Fetch agent + plans
  useEffect(() => {
    if (!network || !agentId) { setLoading(false); return }
    async function load() {
      try {
        const [agentData, planData] = await Promise.all([
          apiGetAgent(network, agentId),
          apiGetPlans(network, agentId),
        ])
        setAgent(agentData as unknown as Agent)
        if (planData.free) {
          setIsFree(true)
        } else {
          setPlans(planData.plans)
          setPerCallPrice(planData.perCallPrice || 0)
          setSelectedPlan("single")
          if (planData.relayerAddress) {
            setRelayerAddress(planData.relayerAddress)
          }
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load agent")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [network, agentId])

  // Check existing active hire
  useEffect(() => {
    if (!walletAddress || !network || !agentId) return
    apiCheckActiveHire(walletAddress, network, agentId)
      .then((data) => {
        if (data.active && data.hire) {
          setExistingHire(data.hire.hireId)
        }
      })
      .catch(() => {})
  }, [walletAddress, network, agentId])

  // Gasless x402 payment handler
  async function handlePay() {
    if (!walletAddress || !agent || !selectedPlan || !plans) return

    const plan = plans[selectedPlan]
    if (!plan) return

    setPaying(true)
    setPayStatus("Preparing gasless payment...")
    setError(null)

    try {
      const chainConfig = CONTRACTS[selectedChain]
      if (!chainConfig) throw new Error(`Unknown chain: ${selectedChain}`)

      const usdcAddress = CHAIN_USDC[selectedChain]
      if (!usdcAddress) throw new Error(`No USDC address for chain: ${selectedChain}`)

      const recipientAddress = selectedChain === "fuji"
        ? agent.agentWalletAddress
        : relayerAddress

      if (!recipientAddress) {
        throw new Error(selectedChain === "fuji"
          ? "Agent has no wallet address configured"
          : "Relayer address not available for bridging")
      }

      const amount = ethers.parseUnits(plan.price.toString(), USDC_DECIMALS)

      setPayStatus(`Selecting facilitator on ${chainConfig.name}...`)
      const facConfig = { network: chainConfig.facinetNetwork, chainId: chainConfig.chainId }
      const facilitator = await selectFacilitator(facConfig)

      setPayStatus(`Sending $${plan.price.toFixed(2)} USDC via x402 (gas-free)...`)
      const result = await facinetExecuteContract(facConfig, {
        contractAddress: usdcAddress as `0x${string}`,
        functionName: "transfer",
        functionArgs: [recipientAddress, amount.toString()],
        abi: USDC_ABI,
      }, facilitator)

      const txHash = result.txHash

      // If non-Fuji chain, initiate CCTP bridge to settle on Avalanche Fuji
      let bridgeId = ""
      if (selectedChain !== "fuji" && txHash) {
        setPayStatus("Initiating CCTP bridge to Avalanche Fuji...")
        try {
          const bridgeResult = await apiBridgeInitiate({
            sourceChain: selectedChain,
            paymentTxHash: txHash,
            amount: plan.price.toString(),
            finalRecipient: agent.agentWalletAddress,
            purpose: "hire",
          })
          bridgeId = bridgeResult.bridgeId
        } catch (bridgeErr) {
          console.error("Bridge initiation failed:", bridgeErr)
          // Don't block hire — bridge runs async, payment already confirmed
        }
      }

      setPayStatus("Recording hire...")
      const hireResult = await apiRecordHire({
        network,
        agentId,
        buyerAddress: walletAddress,
        plan: selectedPlan,
        paymentTxHash: txHash,
        callsTotal: plan.calls,
        daysValid: plan.days,
        pricePaid: plan.price.toString(),
        paymentChain: selectedChain,
        bridgeId,
      })

      setPayStatus("Success! Redirecting to workspace...")

      setTimeout(() => {
        router.push(`/workspace?network=${network}&agentId=${agentId}&hireId=${hireResult.hireId}`)
      }, 1500)

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg)
      setPayStatus(null)
    } finally {
      setPaying(false)
    }
  }

  // Free hire handler
  async function handleFreeHire() {
    if (!walletAddress) return
    setPaying(true)
    setError(null)

    try {
      const hireResult = await apiRecordHire({
        network,
        agentId,
        buyerAddress: walletAddress,
        plan: "free",
        paymentTxHash: "free",
        callsTotal: 999999,
        daysValid: 365,
        pricePaid: "0",
        paymentChain: "fuji",
      })

      router.push(`/workspace?network=${network}&agentId=${agentId}&hireId=${hireResult.hireId}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to record hire")
    } finally {
      setPaying(false)
    }
  }

  // ---- Missing params ----
  if (!network || !agentId) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
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
      <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
          <div className="w-full max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted-foreground/10 rounded" />
            <div className="h-32 bg-muted-foreground/10 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-40 bg-muted-foreground/10 rounded" />)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="border border-error-red/40 bg-error-red/5 px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-wider text-error-red">{error || "Agent not found"}</span>
          </div>
        </div>
      </div>
    )
  }

  const isActive = agent.status === "active"
  const networkName = CONTRACTS[network]?.name || network

  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
        <div className="w-full max-w-3xl">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            &larr; Back
          </button>

          {/* Page title */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground mb-2">
              HIRE AGENT
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-8">
              Select a plan and pay with USDC (gas-free via x402)
            </p>
          </motion.div>

          {/* Agent Info Card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <div className="border border-border p-5 relative mb-8">
              <CornerBrackets />
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", isActive ? "bg-system-green" : "bg-error-red")} />
                <span className="font-mono text-lg font-bold uppercase tracking-wider text-foreground">{agent.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground/60">#{agentId}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 border border-border px-1.5 py-0.5">{networkName}</span>
                {(agent.mcpEndpoint || agent.a2aEndpoint) && (
                  <span className="font-mono text-[9px] uppercase tracking-wider text-info-blue border border-info-blue/30 px-1.5 py-0.5">
                    {agent.a2aEndpoint ? "A2A" : "MCP"}
                  </span>
                )}
              </div>
              {agent.description && (
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{agent.description}</p>
              )}
            </div>
          </motion.div>

          {/* Existing hire check */}
          {existingHire && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-system-green/40 bg-system-green/5 px-4 py-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-system-green">You already have an active hire for this agent</span>
                <button
                  onClick={() => router.push(`/workspace?network=${network}&agentId=${agentId}&hireId=${existingHire}`)}
                  className="font-mono text-[10px] uppercase tracking-widest px-4 py-1.5 bg-system-green/10 border border-system-green/40 text-system-green hover:bg-system-green/20 transition-colors"
                >
                  OPEN WORKSPACE
                </button>
              </div>
            </motion.div>
          )}

          {/* Free agent */}
          {isFree ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="border border-system-green/30 p-6 relative text-center">
                <CornerBrackets />
                <span className="font-mono text-2xl font-bold text-system-green block mb-2">FREE</span>
                <p className="font-mono text-xs text-muted-foreground mb-4">This agent is free to use. No payment required.</p>
                {!walletAddress ? (
                  <button onClick={connect} disabled={isConnecting} className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 disabled:opacity-30">
                    {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
                  </button>
                ) : (
                  <button onClick={handleFreeHire} disabled={paying} className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 disabled:opacity-30">
                    {paying ? "SETTING UP..." : "START USING"}
                  </button>
                )}
              </div>
            </motion.div>
          ) : plans ? (
            <>
              {/* Pricing Plans */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">Select Plan</span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">${perCallPrice.toFixed(4)} per call</span>
                  <div className="flex-1 h-[1px] bg-border" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {PLAN_KEYS.map((key) => {
                    const plan = plans[key]
                    if (!plan) return null
                    const isSelected = selectedPlan === key
                    const discount = PLAN_DISCOUNTS[key]

                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPlan(key)}
                        className={cn(
                          "border p-4 relative text-left transition-colors",
                          isSelected
                            ? "border-foreground bg-foreground/5"
                            : "border-border hover:border-foreground/30"
                        )}
                      >
                        <CornerBrackets opacity={isSelected ? 30 : 10} />
                        {discount && (
                          <span className="absolute top-0 right-0 font-mono text-[8px] uppercase tracking-wider text-system-green bg-system-green/10 border-l border-b border-system-green/30 px-1.5 py-0.5">
                            {discount}
                          </span>
                        )}
                        <span className="font-mono text-lg font-bold text-foreground/40 block mb-3">{PLAN_ICONS[key]}</span>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block mb-1">{plan.label}</span>
                        <span className="font-mono text-lg font-bold text-foreground block">${plan.price.toFixed(2)}</span>
                        <span className="font-mono text-[9px] text-muted-foreground/50 block mt-1">
                          {plan.calls.toLocaleString()} call{plan.calls !== 1 ? "s" : ""} / {plan.days}d
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Chain Selector */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">Pay On</span>
                  <div className="flex-1 h-[1px] bg-border" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {PAYMENT_CHAINS.map((chain) => {
                    const isSelected = selectedChain === chain.key
                    return (
                      <button
                        key={chain.key}
                        onClick={() => setSelectedChain(chain.key)}
                        className={cn(
                          "border p-3 relative text-left transition-colors",
                          isSelected
                            ? "border-foreground bg-foreground/5"
                            : "border-border hover:border-foreground/30"
                        )}
                      >
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block">
                          {chain.label}
                        </span>
                        {chain.cctp && (
                          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground/50 mt-1 block">
                            CCTP Bridge to Fuji
                          </span>
                        )}
                        {!chain.cctp && (
                          <span className="font-mono text-[8px] uppercase tracking-wider text-system-green/60 mt-1 block">
                            Direct Payment
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="border border-border p-5 relative">
                  <CornerBrackets />
                  {!walletAddress ? (
                    <div className="text-center py-2">
                      <p className="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-widest">Connect wallet to pay</p>
                      <button onClick={connect} disabled={isConnecting} className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 disabled:opacity-30">
                        {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
                      </button>
                    </div>
                  ) : selectedPlan && plans[selectedPlan] ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-1">Total</span>
                        <span className="font-mono text-2xl font-bold text-foreground">${plans[selectedPlan].price.toFixed(2)}</span>
                        <span className="font-mono text-xs text-muted-foreground ml-2">USDC</span>
                      </div>
                      <button
                        onClick={handlePay}
                        disabled={paying}
                        className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 disabled:opacity-30"
                      >
                        {paying ? "PROCESSING..." : "PAY & START"}
                      </button>
                    </div>
                  ) : null}

                  {payStatus && (
                    <div className="mt-4 border-t border-border pt-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-info-blue">{payStatus}</span>
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 border border-error-red/40 bg-error-red/5 px-4 py-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-error-red">{error}</span>
                    </div>
                  )}
                </div>

                <p className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest mt-3 text-center">
                  Gas-free x402 payment via Facinet{selectedChain !== "fuji" ? " \u2014 CCTP bridge settles on Avalanche Fuji" : ""}
                </p>
              </motion.div>
            </>
          ) : null}

        </div>
      </div>
    </div>
  )
}

export default function HirePage() {
  return (
    <Suspense fallback={
      <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
          <div className="w-full max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted-foreground/10 rounded" />
            <div className="h-32 bg-muted-foreground/10 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-40 bg-muted-foreground/10 rounded" />)}
            </div>
          </div>
        </div>
      </div>
    }>
      <HireInner />
    </Suspense>
  )
}
