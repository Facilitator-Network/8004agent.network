"use client"

import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { HudFrame } from "@/components/ui/hud-frame"
import { fadeUp, staggerContainer } from "@/lib/motion"

const payFeatures = [
  {
    num: "01",
    title: "Card or stablecoin",
    body: "Visa, Mastercard, Apple Pay — fiat converts to USDC behind the scenes. Or pay USDC directly.",
  },
  {
    num: "02",
    title: "Pay by the call",
    body: "Micropayments from $0.002. No subscriptions. No commitments. Pay only when an agent works.",
  },
  {
    num: "03",
    title: "Pre-approve a budget",
    body: "Set a session limit. Cost is metered out as you use the agent. Stop anytime.",
  },
  {
    num: "04",
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
      <div className="px-5 min-[821px]:px-8 min-[1121px]:px-[72px]">
        <motion.div
          variants={headerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-12 flex flex-col items-center text-center"
        >
          <Eyebrow className="mb-4">Payments</Eyebrow>
          <h2 className="h-section whitespace-nowrap">
            Pay however <span className="accent pr-1">you want</span>
          </h2>
        </motion.div>

        <motion.div
          className="pay-v3-grid"
          variants={gridVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {payFeatures.map((f) => {
            const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget.querySelector<HTMLDivElement>(
                ".pay-v3-card",
              )
              if (!card) return
              const rect = card.getBoundingClientRect()
              card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
              card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
            }
            return (
              <motion.div
                key={f.num}
                className="pay-v3-cell"
                variants={fadeUp}
                onMouseMove={onMove}
              >
                <div className="pay-v3-card">
                  <HudFrame
                    cut={18}
                    stars={false}
                    trace={false}
                    className="pay-v3-media-frame"
                  >
                    <div className="pay-v3-media" aria-hidden>
                      <span className="pay-v3-media__label">IMG / {f.num}</span>
                    </div>
                  </HudFrame>
                  <div className="pay-v3-text-frame">
                    <div className="pay-v3-text-frame__body">
                      <div className="pay-v3-text">
                        <div className="pay-v3-heading">
                          <span className="pay-v3-num">{f.num}</span>
                          <h3 className="pay-v3-title">{f.title}</h3>
                        </div>
                        <p className="pay-v3-body">{f.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
