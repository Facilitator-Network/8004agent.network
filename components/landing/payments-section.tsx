"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
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
const coverContainer = staggerContainer({ children: 0.08, delay: 0.25 })
const coverItem = fadeUp
const optionItem = fadeUp

export function PaymentsSection() {
  const { ref, isInView } = useReveal()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const hoverActive = hoveredIdx !== null

  return (
    <section ref={ref} className="payments-v2">
      <div className="payments-v2__inner">
        <motion.div
          variants={headerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <Eyebrow>Payments</Eyebrow>
        </motion.div>

        <motion.h2
          className="h-section payments-v2__title"
          variants={headerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.05 }}
        >
          Pay however<br />
          <span className="accent">you want</span>.
        </motion.h2>

        <motion.div
          className={`payments-v2__hint ${hoverActive ? "is-active" : ""}`}
          variants={headerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ delay: 0.15 }}
        >
          <span className="payments-v2__hint-bracket">[</span>
          <span className="payments-v2__hint-text">
            {hoverActive ? payFeatures[hoveredIdx!].title : "All methods supported"}
          </span>
          <span className="payments-v2__hint-bracket">]</span>
        </motion.div>

        <motion.div
          className="payments-v2__covers"
          variants={coverContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {payFeatures.map((f, i) => (
            <motion.button
              key={f.title}
              type="button"
              variants={coverItem}
              className={`pay-cover ${hoveredIdx === i ? "is-hovered" : ""}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onFocus={() => setHoveredIdx(i)}
              onBlur={() => setHoveredIdx(null)}
              aria-label={f.title}
            >
              <div className="pay-cover__art">
                <img src="/placeholder.svg" alt="" draggable={false} />
                <span className="pay-cover__crosshair" aria-hidden />
              </div>
              <span className="pay-cover__num">0{i + 1}</span>
              <span className="pay-cover__corner pay-cover__corner--tl" aria-hidden />
              <span className="pay-cover__corner pay-cover__corner--br" aria-hidden />
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="payments-v2__options"
          variants={coverContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {payFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              variants={optionItem}
              className={`pay-option ${hoveredIdx === i ? "is-active" : ""}`}
            >
              <span className="pay-option__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="pay-option__title">{f.title}</h3>
              <p className="pay-option__body">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
