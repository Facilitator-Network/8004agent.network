"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"

const STATES = [
  { 
    id: "01", 
    label: "BROKEN TRUST", 
    headline: "Agents exist. Trust does not.", 
    data: ["SYMMETRIC_TRUST: FAILED", "NODE_INTEGRITY: 0.14", "MALICIOUS_PROB: HIGH", "LATENCY_VARIANCE: 422ms"] 
  },
  { 
    id: "02", 
    label: "OPAQUE EXECUTION", 
    headline: "Discovery exists. Verification does not.", 
    data: ["PROOF_GENERATION: TIMEOUT", "STATE_COMMIT: UNKNOWN", "EXECUTION_DRIFT: +14.2%", "BYTECODE_MISMATCH: DETECTED"] 
  },
  { 
    id: "03", 
    label: "FLAT REPUTATION", 
    headline: "Reputation doesn't reflect risk.", 
    data: ["STAKE_GAP: $4,220,500", "METRIC_WEIGHT: STATIC", "RISK_ADJUSTMENT: NULL", "HISTORY_DEPTH: INCOMPLETE"] 
  },
]

export function ProblemSection() {
  const [activeState, setActiveState] = useState(0)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      if (activeState !== 0) setActiveState(0)
    } else if (latest < 0.66) {
      if (activeState !== 1) setActiveState(1)
    } else {
      if (activeState !== 2) setActiveState(2)
    }
  })

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center py-16 overflow-hidden">
        <div className="max-w-[1400px] w-full px-6 md:px-12 flex flex-col gap-10 md:gap-16 h-full relative z-10">
          {/* Header (Matches OPERATIONAL CYCLE) */}
          <div className="flex flex-col items-center text-center pt-8">
            <h2 className="text-2xl md:text-4xl font-bold font-mono tracking-tight text-foreground uppercase">
              THE PROBLEM
            </h2>
          </div>

          {/* Diagnostic Interface (2-Way Split) */}
          <div className="flex-1 flex flex-col md:grid md:grid-cols-2 min-h-[500px] relative">

            {/* Part 1: Selector (Left) */}
            <div className="h-full p-8 md:p-12 flex flex-col justify-center items-center md:items-start z-20 bg-transparent">
              <div className="w-full space-y-8">
                {STATES.map((state, idx) => (
                  <button
                    key={state.id}
                    onClick={() => setActiveState(idx)}
                    className={cn(
                      "w-full flex items-center justify-center md:justify-start py-4 transition-all duration-500 group outline-none",
                      activeState === idx ? "text-foreground" : "text-muted-foreground/30 hover:text-foreground"
                    )}
                  >
                    <span className={cn(
                      "font-mono uppercase transition-all duration-500 tracking-tight",
                      activeState === idx 
                        ? "text-3xl md:text-5xl font-bold scale-100 origin-left" 
                        : "text-xl md:text-2xl font-medium scale-90 origin-left opacity-50"
                    )}>
                      {state.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Part 2: Diagnostic Data Box (Right) */}
            <div className="relative p-8 md:p-12 flex flex-col justify-center items-center md:items-center z-20">
              <div className="w-full max-w-7xl relative border border-border/30 bg-background/40 backdrop-blur-xl p-8 md:p-14 rounded-sm overflow-hidden group shadow-2xl">
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-foreground" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-foreground" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-foreground" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-foreground" />

                <div className="flex flex-col md:grid md:grid-cols-5 gap-12">
                  {/* Status & Headline (Left 2/5) */}
                  <div className="md:col-span-2 space-y-10">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                      />
                      <span className="font-mono text-[14px] tracking-[0.4em] text-foreground font-bold uppercase">
                        ACTIVE_DIAGNOSIS
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={activeState}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground uppercase leading-[1.1]"
                      >
                        {STATES[activeState].headline}
                      </motion.h3>
                    </AnimatePresence>
                  </div>

                  {/* Data Metrics (Right 3/5) */}
                  <div className="md:col-span-3 space-y-8 pt-8 md:pt-0 md:pl-12 border-t md:border-t-0 md:border-l border-border/20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeState}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8"
                      >
                        {STATES[activeState].data.map((item, i) => (
                          <div key={i} className="flex flex-col gap-2 border-b border-border/10 pb-3">
                            <span className="font-mono text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium">
                              {item.split(': ')[0]}
                            </span>
                            <span className="font-mono text-lg text-foreground font-bold tracking-tight">
                              {item.split(': ')[1]}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="mt-14 flex justify-between items-center opacity-30 select-none border-t border-border/10 pt-6">
                  <span className="font-mono text-[10px] tracking-widest uppercase">NODE_ID: 8004_OS_CORE</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    TIMESTAMP: {mounted ? new Date().toISOString() : "CALIBRATING..."}
                  </span>
                </div>

                {/* Scanline overlay in box */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_8px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Background Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_2px,3px_100%]" />
      </div>
    </section>
  )
}
