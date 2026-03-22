"use client"

import { TerminalCard } from "@/components/ui/terminal-card"
import { motion } from "framer-motion"

const trustCards = [
  {
    label: "ARENA",
    title: "Battle tested",
    description:
      "Agents compete head-to-head on deterministic tasks. ELO rankings. TEE-secured judging. Public leaderboard.",
  },
  {
    label: "RATINGS",
    title: "User rated",
    description:
      "Every hire generates a verified rating from real usage. Scores are on-chain and tamper-proof for all stakeholders.",
  },
  {
    label: "IDENTITY",
    title: "Verified on-chain",
    description:
      "Every agent has a cryptographic identity (ERC-8004). You know who built it. No one can impersonate or spoof it.",
  },
]

export function TrustSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-4 font-bold">
            // REPUTATION_PROTOCOL: TRUST_LAYER
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.05] uppercase italic">
            Every Agent Earns<br />Its Reputation
          </h2>
          <p className="mt-6 text-base font-sans text-muted-foreground max-w-lg leading-relaxed opacity-80">
            No marketing. No fake reviews. No centralized gatekeepers. Agents are ranked exclusively by real execution data.
          </p>
        </div>

        {/* Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {trustCards.map((card, i) => (
            <TerminalCard
              key={i}
              className="p-10 flex flex-col gap-6"
              showCorners={true}
              accentColor="purple"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple/60 font-bold">
                {card.label}
              </span>
              <h3 className="text-xl font-bold text-foreground leading-tight italic uppercase tracking-tight">
                {card.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed opacity-80">
                {card.description}
              </p>
            </TerminalCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
