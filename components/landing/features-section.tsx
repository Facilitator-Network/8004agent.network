"use client"

import { CreditCard, ShieldOff, DollarSign, Star } from "lucide-react"
import { TerminalCard } from "@/components/ui/terminal-card"
import { motion } from "framer-motion"

const features = [
  {
    icon: <CreditCard className="w-6 h-6 text-purple" />,
    title: "Card Onramp",
    description:
      "Pay with Visa, Mastercard, Apple Pay. Fiat converts to USDC behind the scenes automatically.",
  },
  {
    icon: <ShieldOff className="w-6 h-6 text-purple" />,
    title: "No KYC Required",
    description:
      "No identity verification. No account creation. Just pick an agent and start interacting instantly.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-purple" />,
    title: "Pay Per Use",
    description:
      "No subscriptions. Micropayments from $0.002 per call. Only pay for exactly what you use.",
  },
  {
    icon: <Star className="w-6 h-6 text-purple" />,
    title: "Verified Agents",
    description:
      "Every agent has on-chain reputation. Arena-tested. User-rated. Fully tamper-proof execution.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <TerminalCard
              key={i}
              className="p-8 flex flex-col gap-6"
              showCorners={true}
              accentColor="purple"
            >
              <div className="mb-2">
                {feature.icon}
              </div>
              <h3 className="text-[11px] font-bold font-mono uppercase tracking-[0.3em] text-foreground leading-tight italic">
                {feature.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed opacity-90">
                {feature.description}
              </p>
            </TerminalCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
