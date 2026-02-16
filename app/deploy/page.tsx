"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useWallet } from "@/components/wallet-provider"
import { ethers } from "ethers"
import { selectFacilitator, facinetExecuteContract } from "@/lib/facinet"
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
  apiCreateCircleWallet,
  apiStoreAgent,
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
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<DeployFormData>({ ...DEFAULT_FORM_DATA })
  const [result, setResult] = useState<DeployResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nameTaken, setNameTaken] = useState(false)
  const [urlTaken, setUrlTaken] = useState(false)
  const [checking, setChecking] = useState(false)
  const { walletAddress, signer } = useWallet()

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
              {step === 5 && <StepProcessing form={form} walletAddress={walletAddress!} signer={signer} setResult={setResult} setError={setError} onComplete={() => setStep(6)} />}
              {step === 6 && <StepSuccess result={result} error={error} form={form} />}
            </motion.div>
          </AnimatePresence>

          {step < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
              >
                [BACK]
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
function StepEndpoints({ form, updateForm }: { form: DeployFormData; updateForm: (u: Partial<DeployFormData>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader step="Step 02" title="Endpoints" />
      <p className="text-sm text-muted-foreground -mt-3">Optional protocol endpoints for your agent.</p>

      <div>
        <FieldLabel>MCP Endpoint URL</FieldLabel>
        <TextInput value={form.mcpEndpoint} onChange={v => updateForm({ mcpEndpoint: v })} placeholder="https://my-agent.com/mcp" />
      </div>

      <div>
        <FieldLabel>A2A Endpoint URL</FieldLabel>
        <TextInput value={form.a2aEndpoint} onChange={v => updateForm({ a2aEndpoint: v })} placeholder="https://my-agent.com/a2a" />
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
interface ProcessingProps {
  form: DeployFormData
  walletAddress: string
  signer: import("ethers").JsonRpcSigner | null
  setResult: (r: DeployResult) => void
  setError: (e: string | null) => void
  onComplete: () => void
}

interface LogEntry {
  message: string
  status: 'pending' | 'running' | 'done' | 'error'
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

function StepProcessing({ form, walletAddress, signer, setResult, setError, onComplete }: ProcessingProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const startedRef = useRef(false)

  const addLog = useCallback((message: string, status: LogEntry['status'] = 'running') => {
    setLogs(prev => [...prev, { message, status }])
  }, [])

  const updateLastLog = useCallback((status: LogEntry['status'], message?: string) => {
    setLogs(prev => {
      const next = [...prev]
      if (next.length > 0) {
        next[next.length - 1] = {
          ...next[next.length - 1],
          status,
          ...(message ? { message } : {}),
        }
      }
      return next
    })
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
      addLog('Requesting ownership signature...')
      const timestamp = Math.floor(Date.now() / 1000)
      const ownershipMessage = `I am registering agent "${form.name}" at ${form.url} as owner ${walletAddress} on 8004agent.network\n\nTimestamp: ${timestamp}`
      await signer.signMessage(ownershipMessage)
      updateLastLog('done', 'Ownership verified!')

      // ---- 2. Create Circle Wallet ----
      addLog('Creating Circle Agent Wallet...')
      try {
        const circleResult = await apiCreateCircleWallet('pending')
        deployResult.agentWalletAddress = circleResult.address || null
        deployResult.circleWalletId = circleResult.walletId || null
        updateLastLog('done', `Wallet: ${circleResult.address?.slice(0, 10)}...`)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        updateLastLog('error', `Wallet skipped: ${msg}`)
      }

      // ---- 3. Build skills/domains ----
      const allSkills = [...form.skills, ...form.customSkills.split(',').map(s => s.trim()).filter(Boolean)]
      const allDomains = [...form.domains, ...form.customDomains.split(',').map(d => d.trim()).filter(Boolean)]

      // ---- 4. Register on all networks via Facinet ----
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

        try {
          const facConfig = { network: netConfig.facinetNetwork, chainId: netConfig.chainId }

          // -- Select ONE facilitator for this network (used for all calls) --
          addLog(`Selecting facilitator on ${netConfig.name}...`)
          const facilitator = await selectFacilitator(facConfig)
          updateLastLog('done', `${netConfig.name}: Using ${facilitator.name}`)

          // -- Register via Facinet executeContract --
          addLog(`Registering on ${netConfig.name} via Facinet...`)

          const regResult = await facinetExecuteContract(facConfig, {
            contractAddress: netConfig.identityRegistry as `0x${string}`,
            functionName: 'register',
            functionArgs: [form.url],
            abi: IDENTITY_REGISTRY_ABI,
          }, facilitator)

          netResult.registrationTx = regResult.txHash
          updateLastLog('done', `${netConfig.name}: Tx ${regResult.txHash.slice(0, 14)}...`)

          // -- Parse agentId from transaction receipt --
          addLog(`Parsing agent ID on ${netConfig.name}...`)
          try {
            const agentId = await parseAgentIdFromTx(regResult.txHash, netConfig.rpc)
            netResult.agentId = agentId
            if (agentId) {
              updateLastLog('done', `${netConfig.name}: Agent #${agentId}`)
            } else {
              updateLastLog('done', `${netConfig.name}: Registered (ID pending)`)
            }
          } catch {
            updateLastLog('done', `${netConfig.name}: Registered (ID will resolve)`)
          }

          // -- Transfer NFT to owner via Facinet --
          if (netResult.agentId) {
            addLog(`Transferring NFT #${netResult.agentId} to owner on ${netConfig.name}...`)
            try {
              const transferResult = await facinetExecuteContract(facConfig, {
                contractAddress: netConfig.identityRegistry as `0x${string}`,
                functionName: 'transferFrom',
                functionArgs: [facilitator.wallet, walletAddress, netResult.agentId],
                abi: IDENTITY_REGISTRY_ABI,
              }, facilitator)
              netResult.transferTx = transferResult.txHash
              updateLastLog('done', `NFT transferred on ${netConfig.name}`)
            } catch (e: unknown) {
              const msg = e instanceof Error ? e.message : String(e)
              updateLastLog('error', `NFT transfer pending: ${msg}`)
            }
          }

          // -- Store in Upstash --
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
            })
          } catch { /* non-fatal */ }

        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e)
          updateLastLog('error', `${netConfig.name} failed: ${msg}`)
        }

        deployResult.networkResults.push(netResult)
      }

      // ---- 5. Done ----
      addLog('Registration complete!')
      updateLastLog('done')
      setResult(deployResult)
      setTimeout(() => onComplete(), 1500)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      updateLastLog('error', msg)
      setError(msg)
      setResult(deployResult)
      setTimeout(() => onComplete(), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader step="Step 06" title="Deploying..." />

      <div className="border border-border p-5 relative min-h-[300px]">
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/20" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/20" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/20" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/20" />

        <div className="space-y-2 font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={cn(
                "shrink-0 mt-0.5",
                log.status === 'running' && "text-info-blue animate-pulse",
                log.status === 'done' && "text-system-green",
                log.status === 'error' && "text-error-red",
                log.status === 'pending' && "text-muted-foreground/40",
              )}>
                {log.status === 'running' ? '>' : log.status === 'done' ? '+' : log.status === 'error' ? 'x' : '-'}
              </span>
              <span className={cn(
                "break-all",
                log.status === 'error' && "text-error-red",
                log.status === 'done' && "text-foreground/80",
                log.status === 'running' && "text-foreground",
                log.status === 'pending' && "text-muted-foreground/40",
              )}>
                {log.message}
              </span>
            </div>
          ))}
          {logs.length > 0 && logs[logs.length - 1].status === 'running' && (
            <span className="text-muted-foreground/40 animate-pulse">_</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ---- Step 6: Success ----
function StepSuccess({ result, error, form }: { result: DeployResult | null; error: string | null; form: DeployFormData }) {
  if (!result) return null

  const hasSuccess = result.networkResults.some(r => r.registrationTx !== null)

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

      <div className="flex justify-center pt-4">
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
