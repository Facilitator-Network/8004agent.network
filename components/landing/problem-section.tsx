"use client"

import { useState, useRef, useEffect, forwardRef, memo } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleMorph } from "@/components/ui/decrypt-text"
import { Layers, CreditCard, Shield, Globe } from "lucide-react"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const PROBLEMS = [
  { 
    id: "01", 
    label: "BROKEN TRUST", 
    headline: "AGENTS EXIST.\nTRUST DOES NOT.", 
    description: "No verifiable execution history. No way to distinguish honest agents from adversarial ones. Trust is assumed, never proven.",
    data: [
      { key: "SYMMETRIC_TRUST", value: "FAILED" },
      { key: "NODE_INTEGRITY", value: "0.14" },
      { key: "MALICIOUS_PROB", value: "HIGH" },
      { key: "LATENCY_VARIANCE", value: "422ms" },
    ]
  },
  { 
    id: "02", 
    label: "OPAQUE EXECUTION", 
    headline: "DISCOVERY EXISTS.\nVERIFICATION\nDOES NOT.", 
    description: "Agents can be found but their execution cannot be verified. State commitments are unknown. Bytecode drifts silently.",
    data: [
      { key: "PROOF_GENERATION", value: "TIMEOUT" },
      { key: "STATE_COMMIT", value: "UNKNOWN" },
      { key: "EXECUTION_DRIFT", value: "+14.2%" },
      { key: "BYTECODE_MATCH", value: "FAILED" },
    ]
  },
  { 
    id: "03", 
    label: "FLAT REPUTATION", 
    headline: "REPUTATION\nDOESN'T REFLECT\nRISK.", 
    description: "Static scoring ignores context. Stake gaps remain invisible. Risk adjustment is null. History is incomplete.",
    data: [
      { key: "STAKE_GAP", value: "$4,220,500" },
      { key: "METRIC_WEIGHT", value: "STATIC" },
      { key: "RISK_ADJUSTMENT", value: "NULL" },
      { key: "HISTORY_DEPTH", value: "INCOMPLETE" },
    ]
  },
]

export function ProblemSection() {
  const [mounted, setMounted] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<{ setProgress: (p: number) => void; container: HTMLDivElement | null } | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !sectionRef.current || !trackRef.current || !titleRef.current) return

    const track = trackRef.current
    const title = titleRef.current
    
    // Function to calculate and apply padding
    const updateLayout = () => {
      const viewportWidth = window.innerWidth
      const titleWidth = title.getBoundingClientRect().width
      
      // Calculate start padding to center the title
      const startPadding = Math.max(0, (viewportWidth - titleWidth) / 2)
      
      // Apply padding to track
      gsap.set(track, { paddingLeft: startPadding })
    }

    // Initial calculation
    updateLayout()
    
    // Recalculate on resize
    window.addEventListener("resize", updateLayout)

    const ctx = gsap.context(() => {
      const viewportWidth = window.innerWidth
      const trackWidth = track.scrollWidth
      const maxScroll = -(trackWidth - viewportWidth)
      
      const cards = track.querySelectorAll(".carousel-card")
      const items: HTMLElement[] = Array.from(cards) as HTMLElement[]
      
      // Calculate centering positions
      const stops = items.map(card => {
        // card.offsetLeft includes track padding if padding is on track
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        return viewportWidth / 2 - cardCenter
      }).filter(x => x < 0 && x > maxScroll) // Only stops between start and end
      .sort((a, b) => b - a) // Descending (0 -> -100 -> ...)

      
      // Speed factors (pixels per generic time unit). 
      // Higher number = Faster scroll (less duration per pixel)
      const fastSpeed = 1000 
      const slowSpeed = 250  // 4x slower
      const slowDist = 300   // Wide slow zone
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=12000", // Reduced slightly for better overall pacing
          invalidateOnRefresh: true, 
        }
      })
      
      let currentX = 0
      
      stops.forEach(targetX => {
         // Define the slow zone range
         // Since x decreases: start of zone is (targetX + slowDist), end is (targetX - slowDist)
         const entry = Math.min(currentX, targetX + slowDist)
         const exit = Math.max(maxScroll, targetX - slowDist)
         
         // Fast segment to entry
         if (currentX > entry) {
             const dist = currentX - entry
             const dur = dist / fastSpeed
             tl.to(track, { x: entry, ease: "none", duration: dur, force3D: true })
         }
         
         // Slow segment through target
         if (entry > exit) {
             const dist = entry - exit
             const dur = dist / slowSpeed 
             tl.to(track, { x: exit, ease: "none", duration: dur, force3D: true })
         }
         
         currentX = exit
      })
      
      // Final segment to end
      if (currentX > maxScroll) {
          const dist = currentX - maxScroll
          const dur = dist / fastSpeed
          tl.to(track, { x: maxScroll, ease: "none", duration: dur, force3D: true })
      }
      
      // Solution Morph Sequence (appended to timeline)
      const progressProxy = { value: 0 }
      
      // Phase 0: Wait/Hold on Question
      tl.to({}, { duration: 0.5 }) // Hold for a slight beat before morphing

      // Phase 1: Reveal Answer
      tl.to(progressProxy, { 
        value: 1,
        duration: 1.0, 
        ease: "none",
        onUpdate: () => solutionRef.current?.setProgress(progressProxy.value)
      })
      
      // Phase 2: Solution Cards
      const featureCards = solutionRef.current?.container?.querySelectorAll(".solution-card")
      if (featureCards && featureCards.length > 0) {
          // Set initial state
          gsap.set(featureCards, { y: "80vh", opacity: 0, force3D: true })
          
          // Grouping opacity and y inside keyframes prevents reverse-scrub stuttering on staggered elements
          tl.to(featureCards, {
            keyframes: [
              { y: "25vh", opacity: 1, duration: 0.15, ease: "power2.out" },   // Fast enter
              { y: "-25vh", opacity: 1, duration: 0.7, ease: "none" },  // Slow pass
              { y: "-80vh", opacity: 0, duration: 0.15, ease: "power2.in" }  // Fast exit
            ],
            duration: 8, 
            stagger: 3.5,   // Increased gap between cards appearing
            ease: "none",
            force3D: true
          }, ">-0.2")
          
          // Phase 3: Fade out text as last card disappears
          // use solutionRef.current.container to fade the whole slide
          if (solutionRef.current?.container) {
             tl.to(solutionRef.current.container, {
                opacity: 0, 
                duration: 4,
                ease: "power1.inOut"
             }, "-=4")
          }
      } else {
         tl.to({}, { duration: 4.0 })
      } 
    })

    return () => {
      ctx.revert()
      window.removeEventListener("resize", updateLayout)
    }
  }, [mounted])


  return (
    <div className="relative">
      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center">
        {/* Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_2px,3px_100%]" />

        <div className="flex h-full items-center relative w-full">
          
          {/* Scrolling Track (Title + Cards) */}
          <div 
            ref={trackRef}
            className="flex items-center gap-[10vw] md:gap-[25vw] will-change-transform z-10 pl-0" 
            style={{ width: "max-content" }} 
          >
            {/* Item 1: Title Slide (Now part of flow) */}
            <TitleSlide ref={titleRef} />

            {/* Items 2-4: Cards */}
            {PROBLEMS.map((p, i) => (
              <CarouselCard 
                key={p.id} 
                problem={p} 
                mounted={mounted}
              />
            ))}
            
            {/* Item 5: Solution Slide */}
            <SolutionSlide ref={solutionRef} />
          </div>
        </div>
      </section>
    </div>
  )
}

const TitleSlide = memo(forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div 
      ref={ref}
      className="shrink-0 flex items-center justify-center w-max px-12 md:px-24 h-[450px]"
    >
      <h2 className="text-6xl md:text-9xl font-bold font-mono tracking-tight text-foreground uppercase text-center leading-none whitespace-nowrap">
        CURRENT PROBLEMS
      </h2>
    </div>
  )
}))
TitleSlide.displayName = "TitleSlide"

import { useImperativeHandle } from "react"

const SOLUTION_FEATURES = [
  { 
      title: "DEPLOY ONCE", 
      desc: "Write logic once. Agents execute it across any compatible network without rewriting.",
      icon: <Layers className="w-6 h-6" />
  },
  { 
      title: "NATIVE USDC", 
      desc: "Instant settlement in USDC on any chain. No bridging complexity for payments.",
      icon: <CreditCard className="w-6 h-6" />
  },
  { 
      title: "NO WALLETS", 
      desc: "Zero key management. Agents are autonomous authorities with their own managed identity.",
      icon: <Shield className="w-6 h-6" />
  },
  { 
      title: "UNIVERSAL REGISTRY", 
      desc: "One global namespace. Discover and compose agents instantly.",
      icon: <Globe className="w-6 h-6" />
  },
]

const SolutionText = forwardRef<{ setProgress: (p: number) => void }, {}>((props, ref) => {
    const [progress, setProgressState] = useState(0)
    
    useImperativeHandle(ref, () => ({
        setProgress: (p: number) => setProgressState(p)
    }))

    return (
        <div className="relative z-0 flex flex-col items-center justify-center">
            <h3 className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-foreground text-center max-w-4xl leading-none uppercase">
                <ScrambleMorph 
                  startText="WHAT IS THE" 
                  endText="8004 AGENT"
                  progress={progress}
                />
            </h3>
            <h3 className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-foreground text-center max-w-4xl leading-none uppercase">
                <ScrambleMorph 
                  startText="SOLUTION?" 
                  endText="NETWORK"
                  progress={progress}
                />
            </h3>
        </div>
    )
})
SolutionText.displayName = "SolutionText"

const FeatureCards = memo(() => {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {SOLUTION_FEATURES.map((feature, i) => (
                <div 
                    key={i} 
                    className={`solution-card absolute top-1/2 -translate-y-1/2 p-8 border border-foreground/10 bg-background/60 backdrop-blur-md rounded-xl w-[85vw] md:w-[500px] flex flex-col gap-6 shadow-2xl transition-transform duration-500 will-change-transform opacity-0
                    ${i % 2 === 0 ? 'md:left-[15%]' : 'md:right-[15%]'} 
                    left-1/2 -translate-x-1/2 md:translate-x-0`}
                >   
                     {/* Corner Accents */}
                    <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-foreground/30 rounded-tl-sm" />
                    <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-foreground/30 rounded-tr-sm" />
                    <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-foreground/30 rounded-bl-sm" />
                    <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-foreground/30 rounded-br-sm" />

                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground shrink-0">
                            {feature.icon}
                        </div>
                        <h4 className="text-2xl font-bold font-mono uppercase text-foreground tracking-tight">{feature.title}</h4>
                    </div>
                    
                    <p className="font-mono text-sm text-foreground/70 leading-relaxed">{feature.desc}</p>
                    
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono opacity-30 tracking-widest uppercase">FEAT_0{i+1}</div>
                </div>
            ))}
        </div>
    )
})
FeatureCards.displayName = "FeatureCards"

const SolutionSlide = forwardRef<{ setProgress: (p: number) => void; container: HTMLDivElement | null }, {}>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<{ setProgress: (p: number) => void }>(null)
    
    useImperativeHandle(ref, () => ({
        setProgress: (p: number) => textRef.current?.setProgress(p),
        container: containerRef.current
    }))

    return (
        <div 
            ref={containerRef}
            className="shrink-0 flex flex-col items-center justify-center w-screen h-screen relative overflow-hidden"
        >
            <SolutionText ref={textRef} />
            <FeatureCards />
        </div>
    )
})
SolutionSlide.displayName = "SolutionSlide"

const CarouselCard = memo(function CarouselCard({ problem, mounted }: any) {
  return (
    <div 
      className="carousel-card relative shrink-0 w-[85vw] md:w-[900px] h-[450px]"
    >
        <div className="relative border border-foreground/10 bg-background/50 dark:bg-black/40 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl h-full flex flex-col transition-colors duration-500 hover:border-foreground/20">
            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-foreground/50" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-foreground/50" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-foreground/50" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-foreground/50" />

            <div className="p-8 md:p-12 flex flex-col h-full relative z-10 text-left">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" />
                        <span className="font-mono text-[11px] tracking-[0.3em] text-foreground/70 font-bold uppercase">
                            DIAGNOSTIC_{problem.id}
                        </span>
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/30 uppercase">
                        {problem.label}
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 flex-1">
                    <div className="space-y-4 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-foreground uppercase leading-[1.15] whitespace-pre-line text-left">
                            {problem.headline}
                        </h3>
                        <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-[90%] font-medium text-left">
                            {problem.description}
                        </p>
                    </div>

                     {/* Image Box */}
                     <div className="h-full min-h-[200px] w-full relative group overflow-hidden border border-foreground/10 bg-foreground/5 rounded-sm">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-xs text-foreground/20 tracking-widest uppercase">
                            [IMAGE_DATA_STREAM]
                            </span>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-foreground/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] animate-scan-fast opacity-50" />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-between items-center opacity-30 select-none border-t border-foreground/10 pt-4 shrink-0">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-foreground">NODE_ID: 8004_OS_CORE</span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-foreground">{mounted ? new Date().toISOString() : "CALIBRATING..."}</span>
                </div>
            </div>
            
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px]" />
        </div>
    </div>
  )
})


