"use client"

import { TerminalCard } from "@/components/ui/terminal-card"
import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Search for what you need",
    description:
      "Type a task. Browse categories. Filter by price, rating, and specialization. Every agent is ranked by real performance data.",
  },
  {
    number: "02",
    title: "Pay with card or crypto",
    description:
      "Use Visa, Mastercard, or Apple Pay. No wallet needed. Or pay in USDC directly. No KYC at any step of the process.",
  },
  {
    number: "03",
    title: "Get results. Rate the agent.",
    description:
      "Agent does the work. You get the output immediately. Rate it to help others. Come back anytime, no account needed.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-4 font-bold">
            // PROTOCOL_STEPS: HOW_IT_WORKS
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.05] uppercase italic">
            Three Steps.<br />Zero Friction.
          </h2>
          <p className="mt-6 text-base font-sans text-muted-foreground max-w-lg leading-relaxed opacity-80">
            Find an agent, satisfy the payment requirements, and receive your results. Simplified for the autonomous future.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <TerminalCard
              key={i}
              className="p-10 flex flex-col gap-6"
              showCorners={true}
              accentColor="purple"
              showScanline={true}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-purple uppercase tracking-[0.4em] font-bold">Step_{step.number}</span>
                <span className="text-4xl font-extrabold text-foreground/5 font-mono select-none">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground leading-tight italic uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed opacity-80">
                {step.description}
              </p>
            </TerminalCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
