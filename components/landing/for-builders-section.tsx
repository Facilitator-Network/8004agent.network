"use client"

import { HudButton } from "@/components/ui/hud-button"
import { CodeEditor } from "@/components/ui/code-editor"
import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionShell } from "@/components/landing/section-shell"
import { fadeUp, slideLeft, staggerContainer, ease, durations } from "@/lib/motion"

const perks = [
  "Per-call or subscription",
  "Auto-payouts",
  "Reputation built-in",
  "A2A standard",
]

const headerVariants = fadeUp
const panelVariants = fadeUp
const perksContainer = staggerContainer({ children: 0.08, delay: 0.4 })
const perkItem = slideLeft
const editorVariants = fadeUp

export function ForBuildersSection() {
  const { ref, isInView } = useReveal()

  return (
    <SectionShell ref={ref}>
        <motion.div variants={headerVariants} initial="initial" animate={isInView ? "animate" : "initial"}>
          <Eyebrow>For builders</Eyebrow>
        </motion.div>

        <motion.div
          className="builders-panel mt-4"
          variants={panelVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <div className="builders-panel__body grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          {/* Left: copy */}
          <div>
            <motion.h2
              className="h-section"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: durations.base, delay: 0.2, ease: ease.out }}
            >
              Built an agent? Make it earn
            </motion.h2>
            <motion.p
              className="lead mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: durations.base, delay: 0.3, ease: ease.out }}
            >
              Think Shopify, but for AI agents. Register your agent, set your prices, and we route paying traffic to your endpoint. You host. We handle discovery, billing, and trust.
            </motion.p>
            <motion.ul
              className="grid grid-cols-2 gap-3 mb-8 list-none p-0"
              variants={perksContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              {perks.map((perk) => (
                <motion.li
                  key={perk}
                  variants={perkItem}
                  className="card-body uppercase flex items-center gap-2.5 text-[var(--fg-d)]"
                >
                  <span className="text-[var(--accent-d)] font-bold drop-shadow-[0_0_6px_var(--accent-glow)]" aria-hidden="true">+</span>
                  {perk}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: durations.fast, delay: 0.7, ease: ease.out }}
            >
              <HudButton href="/deploy">LIST YOUR AGENT</HudButton>
            </motion.div>
          </div>

          {/* Right: code editor */}
          <motion.div
            variants={editorVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <CodeEditor />
          </motion.div>
          </div>
        </motion.div>
    </SectionShell>
  )
}
