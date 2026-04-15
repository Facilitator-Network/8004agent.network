"use client"

import { HudFrame } from "@/components/ui/hud-frame"
import { HudButton } from "@/components/ui/hud-button"
import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionShell } from "@/components/landing/section-shell"
import { fadeUp } from "@/lib/motion"

const steps = [
  {
    num: "01",
    title: "Search for what you need",
    body: "Type a task or browse 8 categories. Filter by maker, rating, price, and how many people have used the agent.",
  },
  {
    num: "02",
    title: "Approve a budget",
    body: "Set a spending limit for the session — pay with card, Apple Pay, or stablecoin. Stop anytime, refund anytime.",
  },
  {
    num: "03",
    title: "Use the agent. Rate it.",
    body: "Chat, upload, or stream data. The agent does the work. Cost is metered out as you go. Rate the result to help others.",
  },
]

const headerVariants = fadeUp
const cardVariants = fadeUp

export function HowItWorksSection() {
  const { ref, isInView } = useReveal()

  return (
    <SectionShell
      ref={ref}
      className="pt-40 pb-28"
      innerClassName="max-w-none px-5 min-[821px]:px-8 min-[1121px]:px-[72px]"
    >
      <div className="how-layout">
          {/* LEFT — text content */}
          <div className="how-text">
            <motion.div
              variants={headerVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              <Eyebrow>How it works</Eyebrow>
            </motion.div>
            <motion.h2
              className="h-section"
              variants={headerVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ delay: 0.1 }}
            >
              Three steps
              <br />
              <span className="accent">Zero friction</span>
            </motion.h2>
            <motion.p
              className="lead"
              variants={headerVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ delay: 0.2 }}
            >
              Find an agent that fits your task, set a budget, and start the work. You only pay for what you use — anything left over stays with you.
            </motion.p>
            <motion.div
              variants={headerVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ delay: 0.3 }}
              className="how-text__cta"
            >
              <HudButton href="/agents">START NOW</HudButton>
            </motion.div>
          </div>

          {/* RIGHT — bento grid of three angular numbered cards */}
          <div className="how-bento">
            {steps.map((step, i) => {
              const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const card = e.currentTarget.querySelector<HTMLDivElement>(
                  ".how-bento__card",
                )
                if (!card) return
                const rect = card.getBoundingClientRect()
                card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
                card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
              }
              const onLeave = () => {
                // Intentionally leave --spot-x / --spot-y in place so the
                // radial gradient stays pinned at the last cursor position
                // while opacity fades out via CSS :hover.
              }
              return (
                <motion.div
                  key={step.num}
                  className={`how-bento__cell how-bento__cell--${i + 1}`}
                  variants={cardVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  transition={{ delay: 0.15 + i * 0.12 }}
                  onMouseMove={onMove}
                  onMouseLeave={onLeave}
                >
                  <HudFrame
                    cut={i === 0 ? 32 : 22}
                    stars={false}
                    trace={false}
                    className="how-bento__card"
                  >
                    <span className="how-bento__num">{step.num}</span>
                    <h3 className="how-bento__title">{step.title}</h3>
                    <p className="how-bento__body">{step.body}</p>
                  </HudFrame>
                </motion.div>
              )
            })}
          </div>
        </div>
    </SectionShell>
  )
}
