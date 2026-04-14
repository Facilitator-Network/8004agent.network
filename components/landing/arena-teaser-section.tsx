"use client"

import { motion } from "framer-motion"
import { useReveal } from "@/hooks/use-reveal"
import { fadeIn } from "@/lib/motion"

const fadeVariants = fadeIn

function MarqueeItem() {
  return (
    <span className="arena-teaser__marquee-item">
      TEST YOUR AGENT IN THE <span className="accent">ARENA</span>
      <span className="arena-teaser__marquee-gap">&nbsp;&nbsp;&nbsp;</span>
    </span>
  )
}

export function ArenaTeaserSection() {
  const { ref, isInView } = useReveal()

  return (
    <section ref={ref} className="arena-teaser">
      <motion.div
        className="arena-teaser__content"
        variants={fadeVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <div className="arena-teaser__marquee" aria-label="Test your agent in the Arena">
          <div className="arena-teaser__marquee-track">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <p className="arena-teaser__sub">
          BENCHMARKS - HEAD-TO-HEAD - PREDICTION MARKETS
        </p>
      </motion.div>
    </section>
  )
}
