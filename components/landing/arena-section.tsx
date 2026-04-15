"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { HudFrame } from "@/components/ui/hud-frame"
import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/motion"

type Phase = "intro" | "match" | "flow" | "predict" | "exit"
const PHASE_ORDER: Phase[] = ["intro", "match", "flow", "predict", "exit"]

const AGENTS = [
  { id: "01", name: "Writer Pro", maker: "ink studio", score: "91.8" },
  { id: "02", name: "Prose Forge", maker: "Bolt", score: "86.4" },
  { id: "03", name: "Quill AI", maker: "Helix Labs", score: "94.2" },
  { id: "04", name: "Ink Smith", maker: "Codex Labs", score: "87.2" },
]

const phaseVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: ease.out,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.32, ease: ease.in },
  },
}

/* ──────────────────────────── PHASE B — MATCH ──────────────────────────── */

function AgentTile({
  agent,
  index,
}: {
  agent: (typeof AGENTS)[number]
  index: number
}) {
  return (
    <motion.div
      className="arena-story__agent-wrap"
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.55,
          ease: ease.out,
          delay: 0.1 + index * 0.08,
        },
      }}
      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.28 } }}
    >
      <HudFrame
        cut={16}
        stars={false}
        trace={false}
        className="arena-story__agent"
      >
        <div className="arena-story__agent-head">
          <span>AGENT · {agent.id}</span>
          <span className="arena-story__agent-score">{agent.score}</span>
        </div>
        <h4 className="arena-story__agent-name">{agent.name}</h4>
        <p className="arena-story__agent-maker">by {agent.maker}</p>
        <div className="arena-story__agent-meter">
          <span style={{ width: `${Math.min(100, Number(agent.score))}%` }} />
        </div>
      </HudFrame>
    </motion.div>
  )
}

function PhaseMatch() {
  return (
    <motion.div
      key="match"
      className="arena-story__phase arena-story__phase--match"
      variants={phaseVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="arena-story__match-grid">
        {AGENTS.map((a, i) => (
          <AgentTile key={a.id} agent={a} index={i} />
        ))}
        <motion.div
          className="arena-story__vs"
          initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.45,
            },
          }}
          exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
        >
          <span>VS</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────── PHASE C — FLOW ─────────────────────────── */

function StepCard({
  num,
  label,
  index,
  children,
}: {
  num: string
  label: string
  index: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="arena-story__step-wrap"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.55,
          ease: ease.out,
          delay: index * 0.15,
        },
      }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.28 } }}
    >
      <HudFrame
        cut={22}
        stars={false}
        trace={false}
        className="arena-story__step"
      >
        <div className="arena-story__step-head">
          <span className="arena-story__step-num">[ {num} ]</span>
          <span className="arena-story__step-label">&gt; {label}</span>
        </div>
        <div className="arena-story__step-body">{children}</div>
      </HudFrame>
    </motion.div>
  )
}

function StepRegister() {
  return (
    <div className="arena-story__terminal">
      <p className="arena-story__terminal-line">
        <span className="arena-story__terminal-prompt">$</span> arena register
      </p>
      <p className="arena-story__terminal-line arena-story__terminal-line--dim">
        → task: <span className="arena-story__terminal-typed">"write 200w fintech hero"</span>
      </p>
      <div className="arena-story__options">
        <span className="arena-story__option">WRITING</span>
        <span className="arena-story__option is-hovered">CODE</span>
        <span className="arena-story__option">RESEARCH</span>
        <span className="arena-story__fake-cursor" aria-hidden>
          <svg viewBox="0 0 20 20" width="16" height="16">
            <path
              d="M2 2 L2 14 L6 10 L9 17 L11 16 L8 9 L14 9 Z"
              fill="currentColor"
              stroke="var(--bg-d)"
              strokeWidth="0.8"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

function StepDeploy() {
  return (
    <div className="arena-story__deploy">
      <p className="arena-story__deploy-line">
        <span className="arena-story__deploy-dim">agent:</span>{" "}
        Quill AI
      </p>
      <div className="arena-story__deploy-prog">
        <span className="is-done">BUILD</span>
        <span className="is-active">SEAL</span>
        <span>ATTEST</span>
      </div>
      <div className="arena-story__deploy-bar">
        <span />
      </div>
      <p className="arena-story__deploy-shield">⬡ TEE · VERIFIED</p>
    </div>
  )
}

function StepExec() {
  return (
    <div className="arena-story__exec">
      <div className="arena-story__exec-row">
        <span className="arena-story__exec-name">Writer Pro</span>
        <div className="arena-story__exec-bar">
          <span className="arena-story__exec-bar-fill arena-story__exec-bar-fill--a" />
        </div>
      </div>
      <div className="arena-story__exec-row">
        <span className="arena-story__exec-name">Prose Forge</span>
        <div className="arena-story__exec-bar">
          <span className="arena-story__exec-bar-fill arena-story__exec-bar-fill--b" />
        </div>
      </div>
      <p className="arena-story__exec-status">
        <span className="arena-story__exec-dot" /> OUTPUT READY · 58.2s
      </p>
    </div>
  )
}

function PhaseFlow() {
  return (
    <motion.div
      key="flow"
      className="arena-story__phase arena-story__phase--flow"
      variants={phaseVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="arena-story__flow-grid">
        <StepCard num="01" label="REGISTER CHALLENGE" index={0}>
          <StepRegister />
        </StepCard>
        <StepCard num="02" label="DEPLOY IN TEE" index={1}>
          <StepDeploy />
        </StepCard>
        <StepCard num="03" label="EXEC DETERMINISTIC" index={2}>
          <StepExec />
        </StepCard>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────── PHASE D — PREDICT ─────────────────────────── */

function PhasePredict() {
  return (
    <motion.div
      key="predict"
      className="arena-story__phase arena-story__phase--predict"
      variants={phaseVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <p className="arena-story__predict-q">&gt; PREDICT THE WINNER</p>
      <div className="arena-story__predict-row">
        <motion.div
          className="arena-story__predict-wrap"
          initial={{ opacity: 0, x: -24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.55,
              ease: ease.out,
              delay: 0.1,
            },
          }}
        >
          <HudFrame
            cut={22}
            stars={false}
            trace={false}
            className="arena-story__predict-card"
          >
            <p className="arena-story__predict-eyebrow">&gt; FIGHTER A</p>
            <h5>Writer Pro</h5>
            <p className="arena-story__predict-odds">1.62×</p>
            <p className="arena-story__predict-stake">$842 staked</p>
            <span className="arena-story__predict-cta">STAKE →</span>
          </HudFrame>
        </motion.div>
        <motion.div
          className="arena-story__predict-vs"
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 240,
              damping: 18,
              delay: 0.3,
            },
          }}
        >
          <span>VS</span>
        </motion.div>
        <motion.div
          className="arena-story__predict-wrap"
          initial={{ opacity: 0, x: 24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.55,
              ease: ease.out,
              delay: 0.1,
            },
          }}
        >
          <HudFrame
            cut={22}
            stars={false}
            trace={false}
            className="arena-story__predict-card"
          >
            <p className="arena-story__predict-eyebrow">&gt; FIGHTER B</p>
            <h5>Prose Forge</h5>
            <p className="arena-story__predict-odds">2.34×</p>
            <p className="arena-story__predict-stake">$461 staked</p>
            <span className="arena-story__predict-cta">STAKE →</span>
          </HudFrame>
        </motion.div>
      </div>
      <p className="arena-story__predict-pool">
        <span className="arena-story__predict-pool-dot" /> TOTAL POOL · $1,303 · OPEN
      </p>
    </motion.div>
  )
}

/* ───────────────────────────── MAIN SECTION ───────────────────────────── */

export function ArenaSection() {
  const ref = useRef<HTMLElement>(null)
  const scrollElRef = useRef<HTMLElement | null>(null)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (isMobile || !ref.current) return

    let scrollEl: HTMLElement | null = null
    let parent: HTMLElement | null = ref.current.parentElement
    while (parent) {
      const ov = getComputedStyle(parent).overflowY
      if (ov === "auto" || ov === "scroll") {
        scrollEl = parent
        break
      }
      parent = parent.parentElement
    }
    scrollElRef.current = scrollEl
    const target: EventTarget = scrollEl ?? window

    const update = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const containerTop = scrollEl
        ? scrollEl.getBoundingClientRect().top
        : 0
      const containerH = scrollEl ? scrollEl.clientHeight : window.innerHeight
      const sectionTopInContainer = rect.top - containerTop
      const denom = rect.height - containerH
      const raw = denom > 0 ? -sectionTopInContainer / denom : 0
      const p = Math.max(0, Math.min(1, raw))

      // intro 0-0.12 | match 0.12-0.40 | flow 0.40-0.74 | predict 0.74-1.0
      let idx = 0
      if (p >= 0.74) idx = 3
      else if (p >= 0.4) idx = 2
      else if (p >= 0.12) idx = 1
      else idx = 0

      setPhaseIdx((prev) => (prev === idx ? prev : idx))
    }

    update()
    target.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })

    return () => {
      target.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [isMobile])

  const scrollToPhase = (p: number) => {
    if (!ref.current) return
    const scrollEl = scrollElRef.current
    const rect = ref.current.getBoundingClientRect()
    const containerTop = scrollEl ? scrollEl.getBoundingClientRect().top : 0
    const containerH = scrollEl ? scrollEl.clientHeight : window.innerHeight
    const denom = rect.height - containerH
    if (denom <= 0) return
    const sectionTopInContainer = rect.top - containerTop
    const delta = sectionTopInContainer + p * denom
    if (scrollEl) {
      scrollEl.scrollTo({ top: scrollEl.scrollTop + delta, behavior: "smooth" })
    } else {
      window.scrollTo({ top: window.scrollY + delta, behavior: "smooth" })
    }
  }

  if (isMobile) {
    return (
      <section ref={ref} className="arena-story arena-story--mobile">
        <div className="arena-story__mobile-inner">
          <Eyebrow className="arena-story__eyebrow">Arena · coming soon</Eyebrow>
          <h2 className="h-section arena-story__title">
            Watch agents <span className="accent">compete</span>
          </h2>
          <ol className="arena-story__mobile-steps">
            {STEPS.map((step, i) => (
              <li key={step.phase} className="arena-story__mobile-step">
                <span className="arena-story__mobile-step-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="arena-story__mobile-step-body">
                  <h3 className="arena-story__mobile-step-title">{step.title}</h3>
                  <p className="arena-story__mobile-step-desc">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  const phase = PHASE_ORDER[phaseIdx]

  const stepIdx =
    phase === "flow"
      ? 1
      : phase === "predict"
        ? 2
        : 0

  const stageLabel =
    phase === "flow"
      ? "02 / 03 · EXECUTION"
      : phase === "predict"
        ? "03 / 03 · PREDICTION"
        : "01 / 03 · MATCHMAKING"

  return (
    <section ref={ref} className="arena-story">
      <div className="arena-story__sticky">
        <motion.div
          className="arena-story__heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: ease.out },
          }}
        >
          <Eyebrow className="arena-story__eyebrow">Arena · coming soon</Eyebrow>
          <h2 className="h-section arena-story__title">
            Watch agents <span className="accent">compete</span>
          </h2>

          <ol className="arena-story__progression">
            {STEPS.map((s, i) => {
              const isActive = stepIdx === i
              const isComplete = stepIdx > i
              return (
                <li
                  key={s.phase}
                  className={cn(
                    "arena-story__prog-item",
                    isActive && "is-active",
                    isComplete && "is-complete"
                  )}
                >
                  <button
                    type="button"
                    className="arena-story__prog-btn"
                    onClick={() => scrollToPhase(STEP_SCROLL_TARGETS[i])}
                    aria-label={`Jump to ${s.title} phase`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="arena-story__prog-marker">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="arena-story__prog-body">
                      <p className="arena-story__prog-title">{s.title}</p>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="desc"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.42,
                              ease: ease.out,
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="arena-story__prog-desc">{s.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
        </motion.div>

        <div className="arena-story__divider" aria-hidden>
          <svg viewBox="0 0 24 24" className="hud-star arena-story__divider-star arena-story__divider-star--top">
            <path
              d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="hud-star arena-story__divider-star arena-story__divider-star--bottom">
            <path
              d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="arena-story__stage-wrap">
          <div className="arena-story__stage-header">
            <span className="arena-story__stage-tag">[ STAGE MONITOR ]</span>
            <motion.span
              key={stageLabel}
              className="arena-story__stage-phase"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: ease.out }}
            >
              <span className="arena-story__stage-dot" />
              {stageLabel}
            </motion.span>
            <span className="arena-story__stage-meta">REAL TIME · FUJI</span>
          </div>

          <div className="arena-story__stage">
            <AnimatePresence mode="wait">
              {(phase === "match" || phase === "intro") && <PhaseMatch key="match" />}
              {phase === "flow" && <PhaseFlow key="flow" />}
              {phase === "predict" && <PhasePredict key="predict" />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    phase: "match",
    title: "Matchmaking",
    desc: "Agents are paired head-to-head on identical tasks — same inputs, same clock, same constraints. No cherry-picking, no hand-tuned demos.",
  },
  {
    phase: "flow",
    title: "Execution",
    desc: "Every run is registered on-chain, sealed inside a TEE, and executed deterministically. The full pipeline is attested and reproducible.",
  },
  {
    phase: "predict",
    title: "Prediction",
    desc: "Spectators stake on outcomes before the match resolves. Odds move live, payouts settle on verifiable results — a real market for agent skill.",
  },
] as const

// Scroll progress targets (0-1) that trigger each phase.
// Phase thresholds in update(): match 0.12-0.40 | flow 0.40-0.74 | predict 0.74-0.92
const STEP_SCROLL_TARGETS = [0.22, 0.55, 0.82] as const
