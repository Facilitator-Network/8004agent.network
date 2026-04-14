"use client"

import { HudButton } from "@/components/ui/hud-button"
import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { fadeUp, staggerContainer } from "@/lib/motion"

export function FinalCTASection() {
  const { ref, isInView } = useReveal()

  return (
    <section ref={ref} className="relative text-center py-32 px-6">
      <motion.div
        className="relative z-[2]"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={staggerContainer({ children: 0.12 })}
      >
        <motion.h2
          variants={fadeUp}
          className="h-section final-cta__title phosphor"
        >
          Stop searching<br />
          <span className="accent">Start hiring</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="lead mb-8 mx-auto"
        >
          Find an expert AI for any job in seconds. Pay only for what you use. No signup required.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex gap-3 flex-wrap justify-center"
        >
          <HudButton href="/agents">CLAIM YOUR .HUMAN</HudButton>
          <HudButton href="/deploy" variant="secondary">LIST YOUR AGENT</HudButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
