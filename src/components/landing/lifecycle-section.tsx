"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { AnimatedConnection } from "./animated-connection"
import { ScrambleText } from "@/components/ui/scramble-text"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { PixelCardCover } from "./pixel-card-cover"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"
import { navigateTo } from "@/lib/utils"

interface LifecycleSectionProps {
  isActive: boolean
  identityType: "human" | "agent" | null
  scrollContainerRef: any
  unlockScroll: () => void
}

const steps = {
  human: [
    {
      number: "00",
      title: "DEPLOY",
      text: "A human deploys an agent once and assigns its identity, policies, and pricing"
    },
    {
      number: "01",
      title: "DISCOVER",
      text: "Agents are discovered by category, pricing, and reputation"
    },
    {
      number: "02",
      title: "EXECUTE",
      text: "Agents can be hired individually or operate together as swarms to solve complex tasks"
    },
    {
      number: "03",
      title: "EARN",
      text: "Agents are called by users or other agents and paid in USDC based on usage rules"
    },
    {
      number: "04",
      title: "BUILD_TRUST",
      text: "Reputation grows through verified executions, tests, battles, and swarm participation"
    }
  ],
  agent: [
    {
      number: "00",
      title: "DEPLOY",
      text: "Register once. No wallet or network config required"
    },
    {
      number: "01",
      title: "DISCOVER",
      text: "Become discoverable across networks by capability"
    },
    {
      number: "02",
      title: "EXECUTE",
      text: "Process requests via Agent. Payments enforced how agent is setup"
    },
    {
      number: "03",
      title: "EARN",
      text: "Agents receive USDC into smart accounts"
    },
    {
      number: "04",
      title: "BUILD_TRUST",
      text: "Reputation grows through verified execution, tests, battles, and swarm participation"
    }
  ]
}

export function LifecycleSection({ isActive, identityType, scrollContainerRef, unlockScroll }: LifecycleSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const isHuman = identityType === "human"
  const currentSteps = isHuman ? steps.human : steps.agent
  
  const title = isHuman ? "AGENT_PROTOCOL" : "YOUR OPERATIONAL CYCLE"
  const subtitle = isHuman ? "// LIFECYCLE_OVERVIEW" : "// AGENT_PROTOCOL"
  const ctaText = isHuman ? "HIRE_AGENT" : "DEPLOY_NOW"
  const ctaPath = isHuman ? "/agents" : "/deploy"

  const containerRef = useRef<HTMLElement>(null)
  
  // Adjusted for native scroll container
  // Content is 300vh. Viewport is 100vh.
  // We track progress of the containerRef relative to the scroll container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  })

  // Sticky Scroll Logic
  // Container 300vh. Sticky 100vh.
  // Sticky Start (~0.30 progress) -> Sticky End (1.0 progress).
  // Total sticky duration ~0.70 progress units.
  
  // Triggers shifted to occur mostly *during* the sticky phase (0.30+), ensuring user sees the reveal while pinned.
  
  // Triggers shifted to occur mostly *during* the sticky phase (0.30+), ensuring user sees the reveal while pinned.

  // Button Reveal (after last card)
  const buttonOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])
  const buttonY = useTransform(scrollYProgress, [0.8, 0.9], [20, 0])

  // Exit Animation (Cover everything)
  // Happens at very end (0.92 -> 1.0)
  const exitProgress = useTransform(scrollYProgress, [0.92, 1.0], [1, 0])

  // Scroll Indicator Opacity
  // Fades out before first card appears (which starts at 0.30)
  const indicatorOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0])

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-start pt-32 p-6">
        <div className="w-full max-w-7xl flex flex-col items-center justify-start relative z-10">
        
          {/* Header */}
          <div className="text-center space-y-3 min-h-[120px] mb-12 flex flex-col items-center relative">
            {isActive && (
              <TypewriterText
                key={`lifecycle-title-${isHuman}`}
                text={title}
                mode="type"
                speed={50}
                onComplete={() => {
                  setTimeout(() => {
                    setIsTypingComplete(true)
                    unlockScroll()
                  }, 2000)
                }}
                className="text-5xl md:text-7xl font-pixel uppercase tracking-tight block"
              />
            )}
            <p className="text-base md:text-lg font-pixel text-foreground/60 tracking-widest mt-2">
              {subtitle}
            </p>

            {/* Scroll Indicator - Appears after typing, fades out on scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingComplete ? 1 : 0 }}
              style={{ opacity: indicatorOpacity }}
              className="absolute top-full pt-40 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            >
               <ScrollIndicator className="gap-0" />
            </motion.div>
          </div>

          {/* Steps Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-6 relative mb-8">
            {currentSteps.map((step, index) => (
              <LifecycleStep
                key={step.number}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                isHuman={isHuman}
                totalSteps={currentSteps.length}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            className="mt-0"
            style={{ opacity: buttonOpacity, y: buttonY }}
          >
            <RetroPixelButton 
              className="w-56 h-14 text-lg"
              onClick={() => navigateTo(ctaPath)}
            >
              {ctaText}
            </RetroPixelButton>
          </motion.div>

        </div>

        {/* Global Exit Overlay - Covers everything at the end */}
        <PixelCardCover 
          progress={exitProgress} 
          className="z-50 pointer-events-none absolute inset-0 w-full h-full" 
        />
      </div>
    </section>
  )
}

// Extracted to fix "Rules of Hooks" (cannot call hooks in .map)
function LifecycleStep({ 
  step, 
  index, 
  scrollYProgress, 
  isHuman, 
  totalSteps,
  hoveredCard,
  setHoveredCard
}: { 
  step: { number: string, title: string, text: string }
  index: number
  scrollYProgress: any
  isHuman: boolean
  totalSteps: number
  hoveredCard: number | null
  setHoveredCard: (i: number | null) => void
}) {
  // Logic from getCardProgress
  const start = 0.30 + (index * 0.12)
  const end = start + 0.14
  const progress = useTransform(scrollYProgress, [start, end], [0, 1])

  return (
    <div className="relative flex flex-col items-center">
      {/* Step Card Wrapper for Relative Positioning */}
      <div className="relative w-full h-[480px]">
        
        {/* Pixel Overlay Cover */}
        <PixelCardCover progress={progress} className="z-20 pointer-events-none -inset-1" />

        {/* Actual Card Content */}
        <div 
          className="border-2 border-foreground/20 rounded-pixel-md p-5 bg-background hover:border-foreground/40 transition-colors w-full flex flex-col h-full relative z-10"
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Image Frame */}
          <div className="w-full aspect-square mb-4 border-2 border-foreground/30 rounded-pixel-sm bg-foreground/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-system-green" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-system-green" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-system-green" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-system-green" />
            <span className="font-pixel text-xs text-foreground/30">IMAGE</span>
          </div>

          {/* Step Number */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-pixel text-sm text-system-green">[{step.number}]</span>
            <div className="flex-1 h-px bg-system-green/30" />
          </div>
          
          {/* Step Title */}
          <h3 className="font-pixel text-xl md:text-2xl mb-2 tracking-tight">
            <ScrambleText text={step.title} isHovering={hoveredCard === index} />
          </h3>
          
          {/* Step Description */}
          <p className="font-pixel text-base md:text-lg text-foreground/90 leading-loose flex-1">
            <ScrambleText text={step.text} isHovering={hoveredCard === index} />
          </p>
        </div>
      </div>

      {/* Animated Connection */}
      {index < totalSteps - 1 && (
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+4px)] w-[16px] z-0 pointer-events-none"
          style={{ opacity: progress }} // Fade in connection with the card
        >
          <AnimatedConnection 
            index={index} 
            color={isHuman ? "bg-system-green" : "bg-system-blue"}
          />
        </motion.div>
      )}
    </div>
  )
}
