"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ease, fadeUp, fadeDown, staggerContainer } from "@/lib/motion"

function getCardStyle(index: number, hoveredIdx: number | null) {
  const baseRx = [-10, -5, 0, 5, 10][index]
  const baseTx = [12, 6, 0, -6, -12][index]
  const baseTy = [74, 50, 32, 50, 74][index]
  const zIndex = [1, 2, 3, 2, 1][index]

  if (hoveredIdx === null) {
    return { rotate: baseRx, x: baseTx, y: baseTy, zIndex, brightness: 1, saturate: 1, lift: 0, isHovered: false }
  }

  if (index === hoveredIdx) {
    return { rotate: baseRx, x: baseTx, y: baseTy, zIndex: 10, brightness: 1, saturate: 1, lift: -44, isHovered: true }
  }

  let newRx = baseRx
  let newTx = baseTx
  let newTy = baseTy

  if (hoveredIdx === 0) {
    if (index === 1) { newTx = 22; newRx = -2; newTy = 40; }
    if (index === 2) { newTx = 16; newRx = 6; newTy = 22; }
    if (index === 3) { newTx = 8; newRx = 14; newTy = 44; }
    if (index === 4) { newTx = 0; newRx = 22; newTy = 84; }
  } else if (hoveredIdx === 1) {
    if (index === 0) { newTx = 30; newRx = -22; newTy = 84; }
    if (index === 2) { newTx = -10; newRx = 6; newTy = 18; }
    if (index === 3) { newTx = -4; newRx = 14; newTy = 40; }
    if (index === 4) { newTx = -10; newRx = 22; newTy = 84; }
  } else if (hoveredIdx === 2) {
    if (index === 0) { newTx = 22; newRx = -22; newTy = 84; }
    if (index === 1) { newTx = 14; newRx = -14; newTy = 40; }
    if (index === 3) { newTx = -14; newRx = 14; newTy = 40; }
    if (index === 4) { newTx = -22; newRx = 22; newTy = 84; }
  } else if (hoveredIdx === 3) {
    if (index === 0) { newTx = 10; newRx = -22; newTy = 84; }
    if (index === 1) { newTx = 4; newRx = -14; newTy = 40; }
    if (index === 2) { newTx = 10; newRx = -6; newTy = 18; }
    if (index === 4) { newTx = -30; newRx = 22; newTy = 84; }
  } else if (hoveredIdx === 4) {
    if (index === 0) { newTx = 0; newRx = -22; newTy = 84; }
    if (index === 1) { newTx = -8; newRx = -14; newTy = 44; }
    if (index === 2) { newTx = -16; newRx = -6; newTy = 22; }
    if (index === 3) { newTx = -22; newRx = 2; newTy = 40; }
  }

  return { rotate: newRx, x: newTx, y: newTy, zIndex, brightness: 0.68, saturate: 0.85, lift: 0, isHovered: false }
}

interface TrustCard {
  tag: string
  title: string
}

const CARDS: TrustCard[] = [
  {
    tag: "01 · TEE",
    title: "Sealed Execution",
  },
  {
    tag: "02 · PROOF",
    title: "On-Chain Proof",
  },
  {
    tag: "03 · MONITOR",
    title: "Live Monitoring",
  },
  {
    tag: "04 · AUDIT",
    title: "Public Audit",
  },
  {
    tag: "05 · REPUTATION",
    title: "Reputation Index",
  },
]

const TICKER_ITEMS = [
  "TEE · VERIFIED",
  "ON CHAIN · ATTESTED",
  "DETERMINISTIC · REPLAY",
  "SEALED · HARDWARE",
  "PUBLIC · AUDIT",
  "CONTINUOUS · MONITORING",
  "ZERO · TRUST INPUTS",
  "REPUTATION · INDEX",
]

const headerVariants = fadeUp
const gridVariants = staggerContainer({ children: 0.08, delay: 0.25 })
const cardVariants = fadeDown

export function TrustSection() {
  const { ref, isInView } = useReveal()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section ref={ref} className="trust-v2">
      <div className="trust-v2__inner">
        <motion.div
          className="trust-v2__header"
          variants={headerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <Eyebrow className="trust-v2__tag">Trust layer</Eyebrow>
          <h2 className="h-section trust-v2__title">
            How we keep agents <span className="accent">honest</span>
          </h2>
          <p className="trust-v2__copy">
            An agent has to earn its place. Every listing is verified on
            sign-up, sealed inside hardware enclaves, and continuously
            monitored and publicly logged — so users trust the output, not
            the hype.
          </p>
        </motion.div>

        <motion.div
          className="trust-v2__cards"
          variants={gridVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {CARDS.map((card, i) => {
            const style = getCardStyle(i, hoveredIdx)
            const num = card.tag.split(/\s+/)[0]
            return (
              <motion.div
                key={card.tag}
                variants={cardVariants}
                className="relative"
                style={{ zIndex: style.zIndex }}
              >
                <motion.div
                  className="trust-v2__card"
                  role="button"
                  tabIndex={0}
                  aria-label={`${card.title} — ${card.tag}`}
                  aria-expanded={hoveredIdx === i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  onClick={() => setHoveredIdx((prev) => (prev === i ? null : i))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setHoveredIdx((prev) => (prev === i ? null : i))
                    }
                  }}
                  animate={{
                    x: style.x,
                    y: style.y + style.lift,
                    rotate: style.rotate,
                    filter: style.isHovered
                      ? `brightness(${style.brightness}) saturate(${style.saturate}) drop-shadow(0 30px 48px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 26px rgba(139, 108, 255, 0.55))`
                      : `brightness(${style.brightness}) saturate(${style.saturate}) drop-shadow(0 20px 32px rgba(0, 0, 0, 0.55))`,
                  }}
                  transition={{
                    default: { duration: 0.55, ease: ease.out },
                    filter: { duration: 0 },
                  }}
                >
                  <div className="data-card data-card--trust" data-hovered={style.isHovered ? "true" : "false"}>
                    <div className="data-card__art" aria-hidden />
                    <div className="data-card__title-wrap">
                      <span className="data-card__num">{num}</span>
                      <span className="data-card__label">{card.title}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="trust-v2__ticker" aria-hidden>
        <div className="trust-v2__ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="trust-v2__ticker-item">
              <span className="trust-v2__ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
