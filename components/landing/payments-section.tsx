"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SciFiHudCard } from "@/components/ui/sci-fi-card"
import { fadeUp, staggerContainer } from "@/lib/motion"

const payFeatures = [
  {
    title: "Card or stablecoin",
    body: "Visa, Mastercard, Apple Pay — fiat converts to USDC behind the scenes. Or pay USDC directly.",
  },
  {
    title: "Pay by the call",
    body: "Micropayments from $0.002. No subscriptions. No commitments. Pay only when an agent works.",
  },
  {
    title: "Pre-approve a budget",
    body: "Set a session limit. Cost is metered out as you use the agent. Stop anytime.",
  },
  {
    title: "No signup, no accounts",
    body: "Connect a wallet or pay with a card. That's it. No identity verification. No paywalls.",
  },
]

const headerVariants = fadeUp
const gridVariants = staggerContainer({ children: 0.1, delay: 0.2 })

export function PaymentsSection() {
  const { ref, isInView } = useReveal()

  return (
    <section ref={ref} className="payments-v3 py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          variants={headerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-12"
        >
          <Eyebrow className="mb-4">Payments</Eyebrow>
          <h2 className="h-section">
            Pay however<br />
            <span className="accent pr-1">you want</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {payFeatures.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp}>
              <SciFiHudCard
                title={f.title}
                body={f.body}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
