"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "@/components/theme-provider"
import ShinyText from "@/components/ui/shiny-text"
import { BrainIcon, type BrainIconHandle } from "@/components/ui/brain-icon"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export function HeroSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const brainRef = useRef<BrainIconHandle>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <section className="relative w-full h-screen bg-background" />

  /* ... inside component ... */
  const isDark = theme === "dark"
  const shinyBase = isDark ? "#e5e5e5" : "#000000" // lighter grey for dark mode base
  const shinyShine = isDark ? "#ffffff" : "#666666" // dark grey for light mode shine

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center p-6 text-center snap-start shrink-0">
      <div className="z-10 flex flex-col items-center gap-6 max-w-[90vw] w-full px-4 animate-in fade-in zoom-in-95 duration-1000 ease-out">
        <div className="flex flex-col items-center gap-6">
          <div 
            className="flex items-center gap-3 border border-border bg-transparent backdrop-blur-md px-5 py-2 rounded-full text-sm font-mono uppercase tracking-wide text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 hover:bg-foreground/5 transition-all duration-300 hover:scale-105 cursor-default"
            onMouseEnter={() => brainRef.current?.startAnimation()}
            onMouseLeave={() => brainRef.current?.stopAnimation()}
          >
             <BrainIcon ref={brainRef} size={18} className="text-muted-foreground/50" />
             <ShinyText 
                text="Let them earn, compete, and build reputation" 
                disabled={false}
                speed={2} 
                className="" 
                color={shinyBase}
                shineColor={shinyShine}
             />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-foreground font-mono uppercase transition-all duration-300">
            A LIVE EXECUTION <br /> NETWORK FOR AGENTS
          </h1>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <InteractiveHoverButton 
            text="DEPLOY" 
            className="w-40 h-10 font-mono tracking-widest uppercase"
          />
          <InteractiveHoverButton 
            text="HIRE" 
            className="w-40 h-10 font-mono tracking-widest uppercase"
          />
        </div>

      </div>
    </section>
  )
}
