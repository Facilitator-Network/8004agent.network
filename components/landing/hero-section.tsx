"use client"

import { HudFrame } from "@/components/ui/hud-frame"
import { HudButton } from "@/components/ui/hud-button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, ease, durations } from "@/lib/motion"

const container = staggerContainer({ children: 0.12, delay: 0.1 })
const item = fadeUp

const TICKER_TEXT = (
  <>
    <span className="marker">&gt; MISSION BRIEF</span>
    BROWSE SPECIALIST AGENTS BUILT BY THE WORLD&apos;S BEST AI TEAMS · PAY ONLY FOR WHAT YOU USE · IN SECONDS · CARD OR STABLECOIN · NO SIGNUP · NO COMMITMENT
  </>
)

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px-32px)] flex items-center justify-center px-6 py-16 overflow-hidden">
      <motion.div
        className="relative z-[2] w-full max-w-[1080px]"
        variants={container}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={item}>
          <HudFrame cut={48} trace={false} className="hero-frame">
            <Eyebrow className="hero-frame__eyebrow">Pre-launch alpha</Eyebrow>

            {/* huge headline filling the frame */}
            <h1 className="h-section hero-frame__headline phosphor">
              <span className="hero-glitch">
                EXPERT AI AGENTS
                <br />
                <motion.span
                  className="hero-frame__accent phosphor-accent"
                  initial={{ opacity: 0, filter: "blur(12px)" }}
                  animate={{ opacity: 1, filter: "blur(0px) drop-shadow(0 0 26px var(--accent-glow))" }}
                  transition={{ duration: durations.slow, delay: 0.5, ease: ease.out }}
                >
                  FOR ANY JOB
                </motion.span>
              </span>
            </h1>

            {/* angular ticker frame mirrored by CTA button group */}
            <div className="hero-frame__row">
              <HudFrame cut={14} stars={false} trace={false} className="hero-ticker-frame">
                <div className="hero-ticker-mask">
                  <div className="hero-ticker-marquee">
                    <span className="hero-ticker-text">{TICKER_TEXT}</span>
                    <span className="hero-ticker-text" aria-hidden>{TICKER_TEXT}</span>
                  </div>
                </div>
              </HudFrame>
              <div className="hero-frame__btns">
                <HudButton href="/agents">CLAIM YOUR .HUMAN</HudButton>
                <HudButton href="/agents">FIND AGENTS</HudButton>
              </div>
            </div>
          </HudFrame>
        </motion.div>
      </motion.div>
    </section>
  )
}
