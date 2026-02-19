"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { useTheme } from "@/components/theme-provider"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  { 
    id: "00", 
    title: "DEPLOY", 
    desc: "Deploy your agent logic once to the network. Instantly active with no complex wallet setup or chain-specific configuration required." 
  },
  { 
    id: "01", 
    title: "DISCOVER", 
    desc: "Automatically indexed in the global registry. Your agent becomes instantly discoverable across all connected networks based on its capabilities." 
  },
  { 
    id: "02", 
    title: "EXECUTE", 
    desc: "Process incoming requests autonomously via the Agent runtime. Execution is verifiable and payments are strictly enforced by the defined logic." 
  },
  { 
    id: "03", 
    title: "EARN", 
    desc: "Receive direct USDC payments into your agent's smart account. Revenue is settled immediately on-chain with zero intermediary friction." 
  },
  { 
    id: "04", 
    title: "BUILD TRUST", 
    desc: "Reputation grows through verified execution, tests, battles, and swarm participation." 
  },
]

export function PipelineSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const opRef = useRef<HTMLSpanElement>(null)
  const cycleRef = useRef<HTMLSpanElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !sectionRef.current || !wrapperRef.current || !opRef.current || !cycleRef.current) return

    // Set initial state
    gsap.set(cardsRef.current, { opacity: 0, y: 30 })
    gsap.set(ctaRef.current, { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top", // Pin EXACTLY when it reaches top, taking over immediately after ProblemSection
          end: "+=2200", 
        }
      })

      // 1. Title Animation: Slide from inside at an angle (top-left / bottom-right)
      tl.fromTo(opRef.current, 
        { x: -100, y: -50, opacity: 0 }, 
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
        0
      )
      
      tl.fromTo(cycleRef.current, 
        { x: 100, y: 50, opacity: 0 }, 
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
        0
      )
      
      // 2. Cards appear sequentially
      tl.to(cardsRef.current, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.4, ease: "power2.out" },
        "+=0.2"
      )
      
      // 3. CTA Appears
      tl.to(ctaRef.current, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
      
      // Hold state for user to read
      tl.to({}, { duration: 1.5 })
      
      // 4. Vanish content cleanly before unpinning to avoid overlap with next scrolling sections
      tl.to(wrapperRef.current,
        { opacity: 0, duration: 1, ease: "power2.inOut" },
        "+=0.5"
      )
      
    }, sectionRef)

    return () => ctx.revert()
  }, [mounted])

  const isDark = theme === "dark"

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden -mt-[100vh]">
      <div 
        ref={wrapperRef} 
        className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col h-full"
        style={{
          // Clip exactly at top-20 (80px) and bottom-12 (48px) to match PixelCornerFrames boundaries
          maskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 80px, black calc(100% - 48px), transparent calc(100% - 48px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 80px, black calc(100% - 48px), transparent calc(100% - 48px), transparent 100%)"
        }}
      >
        {/* Header — position relative in flex */}
        <div className="flex flex-col items-center justify-center pt-32 pb-8 w-full overflow-hidden shrink-0">
          <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-foreground uppercase flex gap-4">
            <span ref={opRef} className="will-change-transform">OPERATIONAL</span>
            <span ref={cycleRef} className="will-change-transform">CYCLE</span>
          </h2>
        </div>
        
        {/* Content — fills remaining space */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 w-full">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col gap-4 group will-change-transform"
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
              >
                 {/* Visual Placeholder */}
                 <div className="w-full aspect-square bg-muted/5 relative border border-foreground/5 rounded-sm">
                   {/* Corner Brackets */}
                   <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-foreground/20" />
                   <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-foreground/20" />
                   <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-foreground/20" />
                   <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-foreground/20" />
                 </div>

                 <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold font-mono tracking-wider text-foreground uppercase flex items-center gap-3">
                      <span className="font-mono text-foreground font-bold">[{step.id}]</span>
                      {step.title}
                    </h3>
                    
                    <p className="text-base font-sans text-foreground/80 leading-relaxed antialiased">
                    {step.desc}
                    </p>
                 </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex justify-center w-full mt-4 will-change-transform">
              <Link href="/deploy">
                <InteractiveHoverButton 
                  text="DEPLOY AGENT" 
                  className="w-56 h-10 font-mono tracking-widest uppercase"
                />
              </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

