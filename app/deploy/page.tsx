"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useWallet } from "@/components/wallet-provider"
import { useTheme } from "@/components/theme-provider"
import PixelBlast from "@/components/ui/pixel-blast"
import { ethers } from "ethers"
import { selectFacilitator, facinetExecuteContract } from "@/lib/facinet"
import { TerminalCard } from "@/components/ui/terminal-card"
import { GlassButton } from "@/components/ui/glass-button"
import {
  OASF_SKILLS,
  APPLICATION_DOMAINS,
  TRUST_MODELS,
  CONTRACTS,
  IDENTITY_REGISTRY_ABI,
  DEFAULT_FORM_DATA,
  type DeployFormData,
  type NetworkResult,
  type DeployResult,
} from "@/lib/deploy-constants"
import {
  apiCheckAgent,
  apiCheckEndpoint,
  apiCreateCircleWallet,
  apiStoreAgent,
  apiVerifyAgent,
  type VerificationResult,
} from "@/lib/api"

const STEPS = [
  { id: 0, label: "BASIC INFO" },
  { id: 1, label: "ENDPOINTS" },
  { id: 2, label: "SKILLS" },
  { id: 3, label: "CONFIG" },
  { id: 4, label: "REVIEW" },
  { id: 5, label: "DEPLOY" },
  { id: 6, label: "DONE" },
]

const NETWORK_COUNT = Object.keys(CONTRACTS).length

export default function DeployPage() {
  const [showLanding, setShowLanding] = useState(true)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<DeployFormData>({ ...DEFAULT_FORM_DATA })
  const [result, setResult] = useState<DeployResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nameTaken, setNameTaken] = useState(false)
  const [urlTaken, setUrlTaken] = useState(false)
  const [checking, setChecking] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { walletAddress, signer, signedFetch } = useWallet()
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const pixelColor = theme === "light" ? "#5b21b6" : "#B19EEF"

  const updateForm = useCallback((updates: Partial<DeployFormData>) => {
    setForm(prev => ({ ...prev, ...updates }))
    if (updates.name !== undefined) setNameTaken(false)
    if (updates.url !== undefined) setUrlTaken(false)
  }, [])

  const canNext = useCallback(() => {
    switch (step) {
      case 0: return form.name.trim() !== '' && form.url.trim().startsWith('http') && form.description.trim() !== '' && !nameTaken && !urlTaken && !checking
      case 1: return true
      case 2: return true
      case 3: return true
      case 4: return !!walletAddress
      default: return false
    }
  }, [step, form, walletAddress, nameTaken, urlTaken, checking])

  // ---- Deploy Landing Page ----
  if (showLanding) {
    return (
      <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar scroll-smooth snap-y snap-proximity">
        {/* Fixed Background for Landing Only */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          {mounted && (
            <PixelBlast
              variant="square"
              pixelSize={2}
              color={pixelColor}
              patternScale={8}
              patternDensity={1.2}
              enableRipples
              speed={0.8}
              edgeFade={0.4}
              transparent
            />
          )}
        </div>

        <div className="relative z-10">
          {/* ===== HERO ===== */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="h-[calc(100vh-80px)] flex flex-col px-6 md:px-12 text-center shrink-0 snap-start"
          >
            {/* Centered content */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2.5 border border-purple/30 bg-purple/5 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-purple mb-8 relative overflow-hidden group">
                <span className="h-2 w-2 rounded-full bg-purple shrink-0 animate-pulse" />
                <span className="relative z-10">System Status: Ready to Deploy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-[7rem] font-extrabold tracking-tighter text-foreground leading-[0.85] mb-8 uppercase italic"
              >
                Deploy Your<br /><span className="text-purple">Agent.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="text-base md:text-xl font-mono text-muted-foreground max-w-2xl leading-relaxed mb-12 opacity-80"
              >
                [SET_PRICING] [ROUTE_TRAFFIC] [EARN_USDC]<br />
                The standard for on-chain AI agent deployment.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <GlassButton
                    variant="primary"
                    size="md"
                    onClick={() => setShowLanding(false)}
                    className="group"
                  >
                    <span className="h-2 w-2 rounded-full bg-purple group-hover:bg-white shrink-0" />
                    Initialize UI Flow
                  </GlassButton>
                  <a href="/docs">
                    <GlassButton variant="secondary" size="md" className="group">
                      Fetch SDK Docs
                      <span className="text-purple group-hover:text-white transition-all">&rarr;</span>
                    </GlassButton>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Bottom tagline — terminal style */}
            <div className="w-full border-t border-border/50 py-8 bg-background/50 backdrop-blur-xl shrink-0 mt-auto">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 opacity-60">
                <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-purple" /> Wallet Layer</span>
                  <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-purple" /> USDC Settlement</span>
                  <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-purple" /> Gasless Ops</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest italic">
                  ERC-8004 STANDARD COMPLIANT // v1.14.0
                </div>
              </div>
            </div>
          </motion.section>

          {/* ===== BENTO SECTION: CHOOSE YOUR PATH ===== */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-32 px-6 md:px-12 shrink-0 snap-start"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                  <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-4">// SELECTION_PORTAL</span>
                  <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[0.9] uppercase">
                    Choose Your <span className="italic">Weapon.</span>
                  </h2>
                </div>
                <p className="text-base font-mono text-muted-foreground max-w-sm mb-2 opacity-60 uppercase leading-relaxed">
                  Terminal-grade SDK or No-Code Dashboard. Choose the path that fits your stack.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Path A: UI (Bento Large) */}
                <TerminalCard
                  className="md:col-span-7 p-8 md:p-12 min-h-[500px]"
                  showCorners={true}
                  accentColor="purple"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[60px] select-none leading-none">01</div>
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="px-3 py-1 bg-purple/10 text-purple text-[9px] font-mono uppercase tracking-widest border border-purple/20 font-bold">// NO_CODE_READY</span>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight italic">Visual Dashboard</h3>
                    <p className="text-base font-sans text-muted-foreground leading-relaxed mb-12 max-w-md opacity-80">
                      Already have an agent? Link it via URL. We handle the identity, payments, and routing. Zero code modification required.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 mb-12">
                      {[
                        { label: "SETUP_TIME", val: "< 2 MIN" },
                        { label: "REQUIREMENTS", val: "API_URL" },
                        { label: "PAYMENT_MODEL", val: "USDC_NATIVE" },
                        { label: "CHAIN_SUPPORT", val: "MULTI_CHAIN" },
                      ].map(item => (
                        <div key={item.label} className="flex flex-col border-l border-purple/20 pl-4">
                          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1 font-bold">{item.label}</span>
                          <span className="text-sm font-bold text-foreground font-mono">{item.val}</span>
                        </div>
                      ))}
                    </div>

                    <GlassButton
                      variant="primary"
                      size="sm"
                      onClick={() => setShowLanding(false)}
                      className="mt-auto self-start"
                    >
                      INITIALIZE_DASHBOARD_FLOW &rarr;
                    </GlassButton>
                  </div>
                </TerminalCard>

                {/* Path B: SDK (Bento Small) */}
                <TerminalCard
                  className="md:col-span-5 p-8 md:p-12 flex flex-col h-full"
                  showCorners={true}
                  accentColor="amber"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[60px] select-none leading-none">02</div>
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-mono uppercase tracking-widest border border-amber-500/20 font-bold">// FULL_ENGINE_ACCESS</span>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-tight italic">Terminal SDK</h3>
                    <p className="text-base font-sans text-muted-foreground leading-relaxed mb-8 opacity-80">
                      For engineers building autonomous systems. Programmatic registration and A2A settlement.
                    </p>

                    <div className="bg-black/80 dark:bg-black/60 p-6 font-mono text-[11px] leading-relaxed mb-8 border border-amber-500/20 shadow-inner rounded-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="h-2 w-2 rounded-full bg-red-500/50" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/50" />
                        <span className="h-2 w-2 rounded-full bg-green-500/50" />
                      </div>
                      <span className="text-purple font-bold">npm install</span> a8004/sdk<br/>
                      <span className="text-purple font-bold">8004 deploy</span> --init
                    </div>

                    <a href="/docs" className="mt-auto self-start">
                      <GlassButton variant="secondary" size="sm" className="group border-amber-500/30 text-amber-500 hover:border-amber-500">
                        READ_API_DOCUMENTATION &rarr;
                      </GlassButton>
                    </a>
                  </div>
                </TerminalCard>
              </div>
            </div>
          </motion.section>

          {/* ===== BENTO SECTION: FEATURES ===== */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-32 px-6 md:px-12 shrink-0 bg-foreground/[0.02] snap-start"
          >
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mb-20">
                <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-4">// CORE_CAPABILITIES</span>
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[0.9] uppercase">
                  Engineered for <span className="italic self-end">Growth.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
                {/* Feature 1: Identity (Large Square) */}
                <TerminalCard
                  className="md:col-span-2 md:row-span-2 p-10 flex flex-col justify-end min-h-[400px]"
                  showCorners={true}
                  accentColor="purple"
                >
                  <div className="absolute top-8 left-8 text-purple opacity-20"><span className="font-mono text-[80px] leading-none">01</span></div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple mb-4 block font-bold">IDENTITY_LAYER</span>
                    <h3 className="text-4xl font-bold text-foreground mb-4 uppercase italic leading-tight">ERC-8004<br/>On-Chain Registry</h3>
                    <p className="text-base font-sans text-muted-foreground leading-relaxed opacity-80 max-w-sm">
                      Standardized identity for AI agents. Your registration works across every EVM chain, proving ownership and verified origins cryptographically.
                    </p>
                  </div>
                </TerminalCard>

                {/* Feature 2: Payments (Wide) */}
                <TerminalCard
                  className="md:col-span-2 p-10 flex flex-col justify-center"
                  showCorners={true}
                  accentColor="purple"
                >
                  <div className="flex items-center gap-8">
                    <div className="h-16 w-16 border border-purple/30 bg-purple/5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                      <span className="text-purple font-mono text-4xl italic">$</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple mb-2 block font-bold">USDC_SETTLEMENT</span>
                      <h3 className="text-2xl font-bold text-foreground uppercase italic mb-2 tracking-tight">Native Monetization</h3>
                      <p className="text-sm font-sans text-muted-foreground opacity-80 leading-relaxed">
                        Collect payments in stablecoins. Gasless for users. Instant settlement for you.
                      </p>
                    </div>
                  </div>
                </TerminalCard>

                {/* Feature 3: Discovery */}
                <TerminalCard
                  className="p-8 flex flex-col"
                  showCorners={true}
                  accentColor="purple"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple mb-4 block font-bold">MARKETPLACE</span>
                  <h3 className="text-xl font-bold text-foreground uppercase italic mb-3 tracking-tight">Discovery</h3>
                  <p className="text-sm font-sans text-muted-foreground opacity-80 leading-relaxed">
                    Auto-listing in the global agent index. Search, filter, and hire.
                  </p>
                </TerminalCard>

                {/* Feature 4: Reputation */}
                <TerminalCard
                  className="p-8 flex flex-col"
                  showCorners={true}
                  accentColor="purple"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple mb-4 block font-bold">ON_CHAIN_ELO</span>
                  <h3 className="text-xl font-bold text-foreground uppercase italic mb-3 tracking-tight">Trust Graph</h3>
                  <p className="text-sm font-sans text-muted-foreground opacity-80 leading-relaxed">
                    Reputation built through actual execution. Battle-tested scores.
                  </p>
                </TerminalCard>
              </div>
            </div>
          </motion.section>

          {/* ===== COMPARISON SECTION ===== */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-32 px-6 md:px-12 shrink-0 snap-start"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
              <div className="md:w-1/3 sticky top-32">
                <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-6">// OPTIMIZATION_LOG</span>
                <h2 className="text-5xl font-extrabold tracking-tighter text-foreground leading-[0.9] uppercase mb-8">
                  Focus on<br /><span className="text-purple">Logic.</span><br />Not<br />Rails.
                </h2>
                <p className="text-base font-mono text-muted-foreground opacity-60 uppercase leading-relaxed max-w-xs">
                  A side-by-side analysis of manual infrastructure setup vs. deploying on the 8004 network.
                </p>
              </div>

              <TerminalCard
                className="md:w-2/3 w-full overflow-hidden"
                showCorners={true}
                accentColor="purple"
              >
                {[
                  { feature: "Wallet Setup", diy: "MANUAL_KEYS_GEN", us: "EMAIL_AUTH_AUTO", val: "10x_FASTER" },
                  { feature: "Gas Management", diy: "BRIDGE_REFILL_LOOPS", us: "SPONSORED_SUBSIDY", val: "0_FRICTION" },
                  { feature: "Payment Logic", diy: "COMPLEX_SMART_CONTRACTS", us: "BUILT_IN_SETTLEMENT", val: "SECURE" },
                  { feature: "Multi-Chain", diy: "SEPARATE_REGISTRATIONS", us: "CROSS_CHAIN_NFT_BASE", val: "UNIFIED" },
                  { feature: "Discovery", diy: "BUILD_OWN_MARKETING", us: "NETWORK_LISTING", val: "VISIBILITY" },
                  { feature: "Live Timeline", diy: "~48 HOURS", us: "< 10 MINUTES", val: "INSTANT" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-12 border-b border-purple/10 last:border-0 hover:bg-purple/[0.02] transition-colors group">
                    <div className="col-span-4 p-6 border-r border-purple/10 flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1 opacity-50 font-bold">{row.feature}</span>
                      <span className="text-xs font-bold text-foreground uppercase italic group-hover:text-purple transition-colors">{row.val}</span>
                    </div>
                    <div className="col-span-4 p-6 border-r border-purple/10">
                      <span className="text-[9px] font-mono text-muted-foreground/40 block mb-2 font-bold">// BUILD_IT_YOURSELF</span>
                      <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed uppercase">{row.diy}</p>
                    </div>
                    <div className="col-span-4 p-6 bg-purple/5">
                      <span className="text-[9px] font-mono text-purple/40 block mb-2 font-bold">// FACILITATOR_NETWORK</span>
                      <p className="text-[11px] font-mono text-purple font-bold leading-relaxed uppercase">{row.us}</p>
                    </div>
                  </div>
                ))}
              </TerminalCard>
            </div>
          </motion.section>

          {/* ===== PRICING SECTION ===== */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-32 px-6 md:px-12 shrink-0 bg-background relative overflow-hidden snap-start"
          >
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
              <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-8">// MONETIZATION_SCHEMA</span>
              <h2 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter text-foreground leading-[0.8] uppercase italic mb-12">
                Pay as you <span className="text-purple">Earn.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-purple/20 max-w-4xl w-full border border-purple/20 backdrop-blur-2xl">
                <TerminalCard
                  className="p-12 text-left flex flex-col border-none shadow-none"
                  showCorners={false}
                  accentColor="purple"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple mb-4 font-bold">// DEPLOYER_PLAN</span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-foreground italic">5%</span>
                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest font-bold">FEES</span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground mb-12 opacity-80">Free to deploy. We only take a cut when your agent gets paid.</p>
                  <div className="flex flex-col gap-4 mt-auto">
                    {["All Core Features", "Unlimited Agents", "Marketplace Access", "Gasless Ops"].map(f => (
                      <div key={f} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-foreground">
                        <span className="h-1 w-1 rounded-full bg-purple" /> {f}
                      </div>
                    ))}
                  </div>
                </TerminalCard>
                <TerminalCard
                  className="p-12 text-left flex flex-col border-none shadow-none"
                  showCorners={false}
                  accentColor="purple"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 blur-3xl rounded-full" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple mb-4 font-bold">// ENTERPRISE_FLEET</span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-foreground italic uppercase">Varies</span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground mb-12 opacity-80">For high-volume fleets. Custom settlements and lower capped fees.</p>
                  <div className="flex flex-col gap-4 mt-auto">
                    {["Dedicated Support", "Reduced Fees", "Fiat Payouts", "Audit Logs"].map(f => (
                      <div key={f} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-foreground">
                        <span className="h-1 w-1 rounded-full bg-purple" /> {f}
                      </div>
                    ))}
                  </div>
                </TerminalCard>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-purple/10 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-purple/10 -translate-x-1/2" />
          </motion.section>

          {/* ===== FINAL_CALL_TO_ACTION ===== */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-64 px-6 md:px-12 shrink-0 border-t border-purple/20 bg-foreground/[0.02] relative overflow-hidden snap-start"
          >
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-6xl md:text-[8rem] font-extrabold tracking-tighter text-foreground leading-[0.85] uppercase mb-12 italic">
                Ready to go <span className="text-purple underline underline-offset-8 decoration-4">On-Chain?</span>
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <GlassButton
                  variant="primary"
                  size="lg"
                  onClick={() => setShowLanding(false)}
                  className="w-full md:w-auto min-w-[320px]"
                >
                  [ INITIALIZE_DEPLOY_v1.0 ]
                </GlassButton>
              </div>
            </div>
            {/* Visual scanline effect for the section background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </motion.section>
        </div>
      </div>
    )
  }

  // ---- Existing Form Flow ----
  return (
    <div className="h-full w-full relative flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex-1 flex flex-col items-center pt-24 pb-16 px-4 md:px-8">
        {step < 6 && <StepIndicator currentStep={step} />}

        <div className="w-full max-w-2xl mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <StepBasicInfo form={form} updateForm={updateForm} nameTaken={nameTaken} setNameTaken={setNameTaken} urlTaken={urlTaken} setUrlTaken={setUrlTaken} checking={checking} setChecking={setChecking} />}
              {step === 1 && <StepEndpoints form={form} updateForm={updateForm} />}
              {step === 2 && <StepSkillsDomains form={form} updateForm={updateForm} />}
              {step === 3 && <StepAdvancedConfig form={form} updateForm={updateForm} />}
              {step === 4 && <StepReview form={form} walletAddress={walletAddress} />}
              {step === 5 && <StepProcessing form={form} walletAddress={walletAddress!} signer={signer} signedFetch={signedFetch} setResult={setResult} setError={setError} onComplete={() => setStep(6)} />}
              {step === 6 && <StepSuccess result={result} error={error} form={form} />}
            </motion.div>
          </AnimatePresence>

          {step < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => step === 0 ? setShowLanding(true) : setStep(s => Math.max(0, s - 1))}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {step === 0 ? '[BACK TO OVERVIEW]' : '[BACK]'}
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  NEXT &rarr;
                </button>
              ) : (
                <button
                  onClick={() => setStep(5)}
                  disabled={!walletAddress}
                  className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  SIGN &amp; DEPLOY
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---- Step Indicator ----
function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-1 md:gap-2 w-full max-w-2xl">
      {STEPS.slice(0, 6).map((s) => (
        <div key={s.id} className="flex-1 flex flex-col items-center gap-2">
          <div
            className={cn(
              "w-full h-1 rounded-full transition-colors duration-300",
              s.id <= currentStep ? "bg-foreground" : "bg-border"
            )}
          />
          <span
            className={cn(
              "font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 hidden md:block",
              s.id === currentStep ? "text-foreground" : "text-muted-foreground/50"
            )}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ---- Shared Field Components ----
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
      {children}
    </label>
  )
}

function TextInput({
  value, onChange, placeholder, required, error
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; error?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={cn(
        "w-full bg-transparent border px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-colors",
        error
          ? "border-error-red focus:border-error-red"
          : "border-border focus:border-foreground/40"
      )}
    />
  )
}

function TextArea({
  value, onChange, placeholder, rows = 3
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-transparent border border-border px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none no-scrollbar"
    />
  )
}

function SectionHeader({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-6">
      <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">{step}</span>
      <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-tight uppercase text-foreground mt-1">{title}</h2>
    </div>
  )
}

// ---- Step 0: Basic Info ----
function StepBasicInfo({ form, updateForm, nameTaken, setNameTaken, urlTaken, setUrlTaken, checking, setChecking }: {
  form: DeployFormData
  updateForm: (u: Partial<DeployFormData>) => void
  nameTaken: boolean
  setNameTaken: (v: boolean) => void
  urlTaken: boolean
  setUrlTaken: (v: boolean) => void
  checking: boolean
  setChecking: (v: boolean) => void
}) {
  const nameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const urlTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const checkName = useCallback((name: string) => {
    if (nameTimerRef.current) clearTimeout(nameTimerRef.current)
    if (!name.trim()) { setNameTaken(false); return }
    setChecking(true)
    nameTimerRef.current = setTimeout(async () => {
      try {
        const res = await apiCheckAgent(name.trim(), undefined)
        setNameTaken(res.nameTaken)
      } catch { /* ignore */ }
      setChecking(false)
    }, 500)
  }, [setNameTaken, setChecking])

  const checkUrl = useCallback((url: string) => {
    if (urlTimerRef.current) clearTimeout(urlTimerRef.current)
    if (!url.trim()) { setUrlTaken(false); return }
    setChecking(true)
    urlTimerRef.current = setTimeout(async () => {
      try {
        const res = await apiCheckAgent(undefined, url.trim())
        setUrlTaken(res.urlTaken)
      } catch { /* ignore */ }
      setChecking(false)
    }, 500)
  }, [setUrlTaken, setChecking])

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader step="Step 01" title="Basic Information" />

      <div>
        <FieldLabel>Agent Name *</FieldLabel>
        <TextInput
          value={form.name}
          onChange={v => { updateForm({ name: v }); checkName(v) }}
          placeholder="My AI Agent"
          required
          error={nameTaken}
        />
        {nameTaken && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-error-red mt-1 block">
            This name is already taken — an agent with this name is already live
          </span>
        )}
      </div>

      <div>
        <FieldLabel>Agent URL *</FieldLabel>
        <TextInput
          value={form.url}
          onChange={v => { updateForm({ url: v }); checkUrl(v) }}
          placeholder="https://my-agent.vercel.app"
          required
          error={urlTaken}
        />
        {urlTaken && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-error-red mt-1 block">
            This URL is already registered — an agent at this URL is already live
          </span>
        )}
      </div>

      <div>
        <FieldLabel>Image URL (optional)</FieldLabel>
        <TextInput value={form.imageUrl} onChange={v => updateForm({ imageUrl: v })} placeholder="https://..." />
      </div>

      <div>
        <FieldLabel>Description *</FieldLabel>
        <TextArea value={form.description} onChange={v => updateForm({ description: v })} placeholder="What does your agent do?" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <FieldLabel>Version</FieldLabel>
          <TextInput value={form.version} onChange={v => updateForm({ version: v })} placeholder="1.0.0" />
        </div>
        <div>
          <FieldLabel>Author</FieldLabel>
          <TextInput value={form.author} onChange={v => updateForm({ author: v })} placeholder="Name" />
        </div>
        <div>
          <FieldLabel>License</FieldLabel>
          <TextInput value={form.license} onChange={v => updateForm({ license: v })} placeholder="MIT" />
        </div>
      </div>
    </div>
  )
}

// ---- Step 1: Endpoints ----
function EndpointStatus({ url, protocol }: { url: string; protocol: "MCP" | "A2A" }) {
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "partial" | "error">("idle")
  const [detail, setDetail] = useState("")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!url || !url.startsWith("http")) {
      setStatus("idle")
      setDetail("")
      return
    }

    setStatus("checking")
    timerRef.current = setTimeout(async () => {
      try {
        const result = await apiCheckEndpoint(url, protocol)
        setStatus(result.status as "ok" | "partial" | "error")
        setDetail(result.detail)
      } catch {
        setStatus("error")
        setDetail("Failed to check endpoint")
      }
    }, 1500)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [url, protocol])

  if (status === "idle") return null

  const color = status === "ok" ? "text-system-green" : status === "partial" ? "text-warning-amber" : status === "checking" ? "text-muted-foreground/50" : "text-error-red"
  const dot = status === "ok" ? "bg-system-green" : status === "partial" ? "bg-warning-amber" : status === "checking" ? "bg-muted-foreground/30 animate-pulse" : "bg-error-red"

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <span className={cn("h-2 w-2 rounded-full shrink-0", dot)} />
      <span className={cn("font-mono text-[9px] uppercase tracking-wider", color)}>
        {status === "checking" ? "Checking..." : detail}
      </span>
    </div>
  )
}

function StepEndpoints({ form, updateForm }: { form: DeployFormData; updateForm: (u: Partial<DeployFormData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader step="Step 02" title="Endpoints" />
      <p className="text-sm text-muted-foreground -mt-3">Optional protocol endpoints for your agent.</p>

      <div>
        <FieldLabel>MCP Endpoint URL</FieldLabel>
        <TextInput value={form.mcpEndpoint} onChange={v => updateForm({ mcpEndpoint: v })} placeholder="https://my-agent.com/mcp" />
        <EndpointStatus url={form.mcpEndpoint} protocol="MCP" />
      </div>

      <div>
        <FieldLabel>A2A Endpoint URL</FieldLabel>
        <TextInput value={form.a2aEndpoint} onChange={v => updateForm({ a2aEndpoint: v })} placeholder="https://my-agent.com/a2a" />
        <EndpointStatus url={form.a2aEndpoint} protocol="A2A" />
      </div>

      <div className="border border-border/40 px-3 py-2">
        <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-wider">
          Validation is advisory only and does not block deployment
        </span>
      </div>
    </div>
  )
}

// ---- Step 2: Skills & Domains ----
function CheckboxGroup({
  label, items, selected, onChange
}: {
  label: string; items: Record<string, string[]>; selected: string[]; onChange: (v: string[]) => void
}) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter(s => s !== value)
        : [...selected, value]
    )
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="border border-border p-4 max-h-56 overflow-y-auto no-scrollbar flex flex-col gap-3">
        {Object.entries(items).map(([category, values]) => (
          <div key={category}>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-1 block">
              {category}
            </span>
            <div className="flex flex-wrap gap-2">
              {values.map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggle(v)}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
                    selected.includes(v)
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepSkillsDomains({ form, updateForm }: { form: DeployFormData; updateForm: (u: Partial<DeployFormData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader step="Step 03" title="Skills & Domains" />

      <CheckboxGroup label="OASF Skills" items={OASF_SKILLS} selected={form.skills} onChange={v => updateForm({ skills: v })} />

      <div>
        <FieldLabel>Custom Skills (comma-separated)</FieldLabel>
        <TextInput value={form.customSkills} onChange={v => updateForm({ customSkills: v })} placeholder="Custom Skill 1, Custom Skill 2" />
      </div>

      <CheckboxGroup label="Application Domains" items={APPLICATION_DOMAINS} selected={form.domains} onChange={v => updateForm({ domains: v })} />

      <div>
        <FieldLabel>Custom Domains (comma-separated)</FieldLabel>
        <TextInput value={form.customDomains} onChange={v => updateForm({ customDomains: v })} placeholder="Custom Domain 1, Custom Domain 2" />
      </div>
    </div>
  )
}

// ---- Step 3: Advanced Config ----
function StepAdvancedConfig({ form, updateForm }: { form: DeployFormData; updateForm: (u: Partial<DeployFormData>) => void }) {
  const toggleTrustModel = (value: string) => {
    updateForm({
      trustModels: form.trustModels.includes(value)
        ? form.trustModels.filter(t => t !== value)
        : [...form.trustModels, value]
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader step="Step 04" title="Advanced Configuration" />

      <div>
        <FieldLabel>Metadata Storage</FieldLabel>
        <div className="flex gap-3">
          {(["on-chain", "ipfs"] as const).map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => updateForm({ metadataStorage: opt })}
              className={cn(
                "flex-1 font-mono text-xs uppercase tracking-wider px-4 py-3 border transition-colors text-center",
                form.metadataStorage === opt
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              {opt === 'on-chain' ? 'ON-CHAIN (PERMANENT)' : 'IPFS (UPDATEABLE)'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Trust Models (optional)</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {TRUST_MODELS.map(tm => (
            <button
              key={tm.value}
              type="button"
              onClick={() => toggleTrustModel(tm.value)}
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors",
                form.trustModels.includes(tm.value)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              {tm.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>X402 Payment Support</FieldLabel>
        <button
          type="button"
          onClick={() => updateForm({ x402Payment: !form.x402Payment })}
          className={cn(
            "font-mono text-xs uppercase tracking-wider px-4 py-2.5 border transition-colors",
            form.x402Payment
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground"
          )}
        >
          {form.x402Payment ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      <div>
        <FieldLabel>Activation Status</FieldLabel>
        <div className="flex gap-3">
          {(["active", "inactive"] as const).map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => updateForm({ activationStatus: opt })}
              className={cn(
                "flex-1 font-mono text-xs uppercase tracking-wider px-4 py-2.5 border transition-colors text-center",
                form.activationStatus === opt
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Hire Price (USDC, 0 = free)</FieldLabel>
        <TextInput
          value={form.hirePrice}
          onChange={v => {
            if (v === '' || /^\d*\.?\d*$/.test(v)) updateForm({ hirePrice: v })
          }}
          placeholder="0"
        />
      </div>
    </div>
  )
}

// ---- Step 4: Review ----
function StepReview({ form, walletAddress }: { form: DeployFormData; walletAddress: string | null }) {
  const allSkills = [...form.skills, ...form.customSkills.split(',').map(s => s.trim()).filter(Boolean)]
  const allDomains = [...form.domains, ...form.customDomains.split(',').map(d => d.trim()).filter(Boolean)]
  const hp = parseFloat(form.hirePrice || '0')
  const networkNames = Object.values(CONTRACTS).map(c => c.name).join(', ')

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader step="Step 05" title="Review & Deploy" />

      {!walletAddress ? (
        <div className="border border-warning-amber/40 bg-warning-amber/5 px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-wider text-warning-amber">
            Connect wallet from navbar to proceed
          </span>
        </div>
      ) : (
        <div className="border border-system-green/40 bg-system-green/5 px-4 py-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-system-green" />
          <span className="font-mono text-xs uppercase tracking-wider text-system-green">
            Owner: {walletAddress}
          </span>
        </div>
      )}

      <div className="border border-border p-5 relative">
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/20" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/20" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/20" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/20" />

        <div className="space-y-2 text-sm font-mono">
          <Row label="NAME" value={form.name} />
          <Row label="URL" value={form.url} />
          {form.imageUrl && <Row label="IMAGE" value={form.imageUrl} />}
          <Row label="DESCRIPTION" value={form.description} />
          <Row label="VERSION" value={form.version} />
          {form.author && <Row label="AUTHOR" value={form.author} />}
          <Row label="LICENSE" value={form.license} />
          {form.mcpEndpoint && <Row label="MCP" value={form.mcpEndpoint} />}
          {form.a2aEndpoint && <Row label="A2A" value={form.a2aEndpoint} />}
          {allSkills.length > 0 && <Row label="SKILLS" value={allSkills.join(', ')} />}
          {allDomains.length > 0 && <Row label="DOMAINS" value={allDomains.join(', ')} />}
          <Row label="METADATA" value={form.metadataStorage.toUpperCase()} />
          {form.trustModels.length > 0 && <Row label="TRUST" value={form.trustModels.join(', ')} />}
          <Row label="X402" value={form.x402Payment ? 'ENABLED' : 'DISABLED'} />
          <Row label="STATUS" value={form.activationStatus.toUpperCase()} />
          <Row label="HIRE PRICE" value={hp > 0 ? `$${hp.toFixed(2)} USDC` : 'FREE'} />
        </div>
      </div>

      <div className="border border-border bg-muted/5 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Cost</span>
          <span className="font-mono text-lg font-bold text-system-green">FREE</span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground/60 mt-2 uppercase tracking-wider">
          You will sign a message to prove ownership. All gas fees are covered by Facinet facilitators.
          Agent will be registered on {NETWORK_COUNT} networks: {networkNames}.
        </p>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-xs text-foreground break-all">{value}</span>
    </div>
  )
}

// ---- Step 5: Processing ----
type SignedFetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>

interface ProcessingProps {
  form: DeployFormData
  walletAddress: string
  signer: import("ethers").JsonRpcSigner | null
  signedFetch: SignedFetchFn | null
  setResult: (r: DeployResult) => void
  setError: (e: string | null) => void
  onComplete: () => void
}

/** Parse agentId from a register() transaction receipt */
async function parseAgentIdFromTx(txHash: string, rpcUrl: string): Promise<string | null> {
  const provider = new ethers.JsonRpcProvider(rpcUrl)
  // Wait for the tx to be mined (may already be mined by the time we check)
  const receipt = await provider.waitForTransaction(txHash, 1, 60000)
  if (!receipt) return null

  const iface = new ethers.Interface(IDENTITY_REGISTRY_ABI)
  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog({ topics: log.topics as string[], data: log.data })
      if (parsed?.name === 'Registered') {
        return parsed.args.agentId.toString()
      }
    } catch { /* not our event */ }
  }
  return null
}

function StepProcessing({ form, walletAddress, signer, signedFetch, setResult, setError, onComplete }: ProcessingProps) {
  const [phase, setPhase] = useState<'signing' | 'wallet' | 'deploying' | 'done' | 'error'>('signing')
  const [networkStatus, setNetworkStatus] = useState<Record<string, 'pending' | 'deploying' | 'done' | 'error'>>(() => {
    const init: Record<string, 'pending' | 'deploying' | 'done' | 'error'> = {}
    for (const key of Object.keys(CONTRACTS)) init[key] = 'pending'
    return init
  })
  const [errorMsg, setErrorMsg] = useState('')
  const startedRef = useRef(false)

  const updateNet = useCallback((key: string, status: 'pending' | 'deploying' | 'done' | 'error') => {
    setNetworkStatus(prev => ({ ...prev, [key]: status }))
  }, [])

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    runDeploy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function runDeploy() {
    const deployResult: DeployResult = {
      agentWalletAddress: null,
      circleWalletId: null,
      networkResults: [],
    }

    try {
      if (!signer) throw new Error('Wallet not connected')

      // ---- 1. Sign ownership message ----
      setPhase('signing')
      const timestamp = Math.floor(Date.now() / 1000)
      const ownershipMessage = `I am registering agent "${form.name}" at ${form.url} as owner ${walletAddress} on 8004agent.network\n\nTimestamp: ${timestamp}`
      await signer.signMessage(ownershipMessage)

      // ---- 2. Create Circle Wallet ----
      setPhase('wallet')
      try {
        const circleResult = await apiCreateCircleWallet('pending')
        deployResult.agentWalletAddress = circleResult.address || null
        deployResult.circleWalletId = circleResult.walletId || null
      } catch { /* non-fatal */ }

      // ---- 3. Build skills/domains ----
      const allSkills = [...form.skills, ...form.customSkills.split(',').map(s => s.trim()).filter(Boolean)]
      const allDomains = [...form.domains, ...form.customDomains.split(',').map(d => d.trim()).filter(Boolean)]

      // ---- 4. Register on all networks via Facinet (Fuji first) ----
      setPhase('deploying')
      const networks = Object.keys(CONTRACTS)
      for (const netKey of networks) {
        const netConfig = CONTRACTS[netKey]

        const netResult: NetworkResult = {
          network: netConfig.name,
          networkKey: netKey,
          agentId: null,
          registrationTx: null,
          transferTx: null,
          blockExplorer: netConfig.blockExplorer,
        }

        updateNet(netKey, 'deploying')

        try {
          const facConfig = { network: netConfig.facinetNetwork, chainId: netConfig.chainId }
          const facilitator = await selectFacilitator(facConfig)

          const regResult = await facinetExecuteContract(facConfig, {
            contractAddress: netConfig.identityRegistry as `0x${string}`,
            functionName: 'register',
            functionArgs: [form.url],
            abi: IDENTITY_REGISTRY_ABI,
          }, facilitator)

          netResult.registrationTx = regResult.txHash

          try {
            const agentId = await parseAgentIdFromTx(regResult.txHash, netConfig.rpc)
            netResult.agentId = agentId
          } catch { /* ID will resolve later */ }

          if (netResult.agentId) {
            try {
              const transferResult = await facinetExecuteContract(facConfig, {
                contractAddress: netConfig.identityRegistry as `0x${string}`,
                functionName: 'transferFrom',
                functionArgs: [facilitator.wallet, walletAddress, netResult.agentId],
                abi: IDENTITY_REGISTRY_ABI,
              }, facilitator)
              netResult.transferTx = transferResult.txHash
            } catch { /* non-fatal */ }
          }

          try {
            await apiStoreAgent({
              agentId: netResult.agentId || 'pending',
              name: form.name,
              url: form.url,
              imageUrl: form.imageUrl || '',
              description: form.description,
              version: form.version,
              author: form.author,
              license: form.license,
              mcpEndpoint: form.mcpEndpoint || '',
              a2aEndpoint: form.a2aEndpoint || '',
              skills: allSkills,
              domains: allDomains,
              metadataStorage: form.metadataStorage,
              trustModels: form.trustModels,
              x402Payment: form.x402Payment,
              status: form.activationStatus,
              hirePrice: form.hirePrice,
              network: netKey,
              ownerAddress: walletAddress,
              registrationTx: netResult.registrationTx || '',
              registeredAt: new Date().toISOString(),
              agentWalletAddress: deployResult.agentWalletAddress || '',
              circleWalletId: deployResult.circleWalletId || '',
            }, signedFetch)
          } catch { /* non-fatal */ }

          updateNet(netKey, 'done')
        } catch {
          updateNet(netKey, 'error')
        }

        deployResult.networkResults.push(netResult)
      }

      setPhase('done')
      setResult(deployResult)
      setTimeout(() => onComplete(), 1500)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setErrorMsg(msg)
      setPhase('error')
      setError(msg)
      setResult(deployResult)
      setTimeout(() => onComplete(), 2000)
    }
  }

  const statusIcon = (s: 'pending' | 'deploying' | 'done' | 'error') => {
    if (s === 'done') return <span className="h-2 w-2 rounded-full bg-system-green shrink-0" />
    if (s === 'deploying') return <span className="h-2 w-2 rounded-full bg-info-blue animate-pulse shrink-0" />
    if (s === 'error') return <span className="h-2 w-2 rounded-full bg-error-red shrink-0" />
    return <span className="h-2 w-2 rounded-full bg-muted-foreground/20 shrink-0" />
  }

  const statusLabel = (s: 'pending' | 'deploying' | 'done' | 'error') => {
    if (s === 'done') return 'REGISTERED'
    if (s === 'deploying') return 'DEPLOYING...'
    if (s === 'error') return 'FAILED'
    return 'PENDING'
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <SectionHeader step="Step 06" title="Deploying Your Agent" />

      {/* Phase indicator */}
      <div className="w-full text-center">
        <span className={cn(
          "font-mono text-xs uppercase tracking-widest",
          phase === 'error' ? "text-error-red" : "text-muted-foreground"
        )}>
          {phase === 'signing' && 'Requesting ownership signature...'}
          {phase === 'wallet' && 'Setting up agent wallet...'}
          {phase === 'deploying' && 'Registering on networks...'}
          {phase === 'done' && 'All networks registered!'}
          {phase === 'error' && errorMsg}
        </span>
      </div>

      {/* Network list */}
      <div className="w-full border border-border p-6 relative">
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/20" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/20" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/20" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/20" />

        <div className="space-y-4">
          {Object.entries(CONTRACTS).map(([key, config]) => (
            <div key={key} className="flex items-center gap-4">
              {statusIcon(networkStatus[key])}
              <span className="font-mono text-sm uppercase tracking-wider text-foreground flex-1">
                {config.name}
              </span>
              <span className={cn(
                "font-mono text-[10px] uppercase tracking-widest",
                networkStatus[key] === 'done' && "text-system-green",
                networkStatus[key] === 'deploying' && "text-info-blue",
                networkStatus[key] === 'error' && "text-error-red",
                networkStatus[key] === 'pending' && "text-muted-foreground/40",
              )}>
                {statusLabel(networkStatus[key])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- Step 6: Success ----
function StepSuccess({ result, error, form }: { result: DeployResult | null; error: string | null; form: DeployFormData }) {
  const { signedFetch } = useWallet()
  const [verifying, setVerifying] = useState(false)
  const [verifyResult, setVerifyResult] = useState<VerificationResult | null>(null)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  if (!result) return null

  const hasSuccess = result.networkResults.some(r => r.registrationTx !== null)
  // Use Fuji as primary verification network
  const fujiResult = result.networkResults.find(r => r.networkKey === 'fuji' && r.registrationTx !== null)
  const firstSuccess = fujiResult || result.networkResults.find(r => r.registrationTx !== null)

  async function handleVerify() {
    if (!firstSuccess?.agentId) return
    setVerifying(true)
    setVerifyError(null)
    try {
      // Always verify on Fuji
      const vr = await apiVerifyAgent('fuji', firstSuccess.agentId, signedFetch)
      setVerifyResult(vr)
    } catch (e: unknown) {
      setVerifyError(e instanceof Error ? e.message : String(e))
    } finally {
      setVerifying(false)
    }
  }

  const TIER_COLORS: Record<string, string> = {
    MINIMAL: "text-green-500 border-green-500/60",
    LOW: "text-cyan-500 border-cyan-500/60",
    MEDIUM: "text-yellow-500 border-yellow-500/60",
    HIGH: "text-red-400 border-red-400/60",
    CRITICAL: "text-red-600 border-red-600/60",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground">
          {hasSuccess ? 'DEPLOYMENT COMPLETE' : 'DEPLOYMENT FAILED'}
        </h2>
        {error && !hasSuccess && (
          <p className="font-mono text-xs text-error-red mt-2 uppercase tracking-wider">{error}</p>
        )}
      </div>

      {hasSuccess && (
        <div className="border border-border p-5 relative">
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/20" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/20" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/20" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/20" />

          <div className="space-y-2 font-mono text-sm">
            <Row label="NAME" value={form.name} />
            <Row label="URL" value={form.url} />
            {result.agentWalletAddress && <Row label="WALLET" value={result.agentWalletAddress} />}
            {result.circleWalletId && <Row label="CIRCLE ID" value={result.circleWalletId} />}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {result.networkResults.map((nr, i) => (
          <div key={i} className="border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "h-2 w-2 rounded-full",
                nr.registrationTx ? "bg-system-green" : "bg-error-red"
              )} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                {nr.network}
              </span>
            </div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex gap-2">
                <span className="text-muted-foreground/60 w-20 shrink-0">AGENT ID</span>
                <span className="text-foreground">{nr.agentId || 'Pending'}</span>
              </div>
              {nr.registrationTx && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground/60 w-20 shrink-0">REG TX</span>
                  <a
                    href={`${nr.blockExplorer}/tx/${nr.registrationTx}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info-blue hover:underline break-all"
                  >
                    {nr.registrationTx}
                  </a>
                </div>
              )}
              {nr.transferTx && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground/60 w-20 shrink-0">XFER TX</span>
                  <a
                    href={`${nr.blockExplorer}/tx/${nr.transferTx}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info-blue hover:underline break-all"
                  >
                    {nr.transferTx}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {result.agentWalletAddress && (
        <div className="border border-border bg-muted/5 p-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">
            Agent Wallet (Circle Managed)
          </span>
          <p className="font-mono text-xs text-muted-foreground">
            This wallet works on all EVM networks. Private key is securely managed by Circle.
            Hire payments will be sent to this address.
          </p>
        </div>
      )}

      {/* Verification result inline */}
      {verifyResult && (
        <div className="border border-border p-4">
          <div className="flex items-center gap-3">
            <span className={cn(
              "font-mono text-sm font-bold px-3 py-1 border",
              TIER_COLORS[verifyResult.riskTier] || "text-muted-foreground border-border"
            )}>
              {verifyResult.overallScore >= 80 ? "\u2713 VERIFIED" : verifyResult.overallScore >= 60 ? "VERIFIED" : verifyResult.overallScore >= 40 ? "PARTIAL" : verifyResult.overallScore >= 20 ? "LOW" : "RISK"} {verifyResult.overallScore}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
              ERC-8126 Verification — {verifyResult.riskTier} Risk
            </span>
          </div>
        </div>
      )}

      {verifyError && (
        <div className="border border-error-red/40 bg-error-red/5 px-4 py-2">
          <span className="font-mono text-xs text-error-red">{verifyError}</span>
        </div>
      )}

      <div className="flex justify-center gap-4 pt-4">
        {hasSuccess && firstSuccess?.agentId && !verifyResult && (
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="font-mono text-xs uppercase tracking-widest border border-system-green/40 text-system-green px-8 py-3 hover:bg-system-green/5 transition-colors disabled:opacity-40"
          >
            {verifying ? "VERIFYING..." : "VERIFY THIS AGENT"}
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-8 py-3 hover:opacity-90 transition-opacity"
        >
          DEPLOY ANOTHER AGENT
        </button>
      </div>
    </div>
  )
}
