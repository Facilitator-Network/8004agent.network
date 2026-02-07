import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { HeroSection } from "@/components/landing/hero-section"


import { IdentitySection } from "@/components/landing/identity-section"
import { CTASection } from "@/components/landing/cta-section"


import { CursorGlow } from "@/components/ui/cursor-glow"

import { PixelConfetti } from "@/components/ui/pixel-confetti"

import { PixelTransition } from "@/components/layout/pixel-transition"

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [heroComplete, setHeroComplete] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const [transitionTrigger, setTransitionTrigger] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [confettiDirection, setConfettiDirection] = useState<'up' | 'down'>('down')
  const totalSections = 3 // Hero, Identity, Next

  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = window.location.pathname
      if (newPath !== path) {
        setTransitionTrigger(prev => prev + 1)
        // Delay the path change slightly so the pixels start appearing
        setTimeout(() => {
          setPath(newPath)
          setCurrentSection(0)
          setHeroComplete(false)
          setScrollProgress(0)
        }, 500)
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('pushState', handleLocationChange) // Custom event

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('pushState', handleLocationChange)
    }
  }, [path])

  useEffect(() => {
    // Only handle scroll-jacking on the home page
    if (path !== "/") return

    let scrollAccumulator = 0 
    // Dynamic threshold: Harder to leave Identity Section (Index 1)
    const getThreshold = () => currentSection === 1 ? 800 : 400 // Reduced for faster scroll per user request

    const handleWheel = (e: WheelEvent) => {
      if (currentSection === 0 && !heroComplete) return

      e.preventDefault()

      // Reset accumulator if direction changes for snappy response
      if (Math.sign(scrollAccumulator) !== 0 && Math.sign(scrollAccumulator) !== Math.sign(e.deltaY)) {
        scrollAccumulator = 0
      }

      // Dampen the scroll input for "weighty" feel
      scrollAccumulator += e.deltaY * 0.6
      
      const threshold = getThreshold()
      const progress = Math.min(Math.abs(scrollAccumulator) / threshold, 1) * 100
      setScrollProgress(progress)

      if (Math.abs(scrollAccumulator) >= threshold) {
        if (scrollAccumulator > 0 && currentSection < totalSections - 1) {
          setCurrentSection(prev => prev + 1)
          setConfettiDirection('down')
          setConfettiTrigger(prev => prev + 1)
        } else if (scrollAccumulator < 0 && currentSection > 0) {
          setCurrentSection(prev => prev - 1)
          if (currentSection === 1) { // If we are going back to 0
            setHeroComplete(false)
          }
          // Only trigger confetti if NOT going back to Hero (index 0)
          if (currentSection !== 1) {
            setConfettiDirection('up')
            setConfettiTrigger(prev => prev + 1)
          }
        }
        scrollAccumulator = 0
        setScrollProgress(0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection, heroComplete, path])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
        <CursorGlow />
        <Navbar />
        <PixelTransition trigger={transitionTrigger} />
        <PixelConfetti trigger={confettiTrigger} direction={confettiDirection} />
        
        <main className="flex-1 relative overflow-hidden">


          {path === "/" ? (
            /* Home Page Sections */
            <>
              {/* Hero Section (Index 0) */}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{ 
                  opacity: currentSection === 0 ? 1 : 0,
                  pointerEvents: currentSection === 0 ? 'auto' : 'none',
                }}
              >
                <div className="h-full flex items-center justify-center">
                  <HeroSection 
                    onAnimationComplete={() => {
                      setHeroComplete(true)
                      setCurrentSection(1) // Auto-transition immediately
                    }} 
                    isActive={currentSection === 0}
                  />
                </div>
              </div>

              {/* Identity Section (Index 1) */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: currentSection === 1 ? 1 : 0,
                  pointerEvents: currentSection === 1 ? 'auto' : 'none',
                }}
              >
                <IdentitySection isActive={currentSection === 1} />
              </div>

              {/* CTA Section (Index 2) */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: currentSection === 2 ? 1 : 0,
                  pointerEvents: currentSection === 2 ? 'auto' : 'none',
                }}
              >
                <CTASection isActive={currentSection === 2} />
              </div>
              
              {/* Scroll Progress Bar */}
              <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-50">
                <div 
                  className="h-full bg-white transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </>
          ) : (
            /* Non-Home Pages: Render only the page name */
            <div className="h-full w-full relative flex flex-col items-center justify-center transition-opacity duration-500">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-7xl font-pixel tracking-tighter uppercase">
                  {path.slice(1).replace("-", " ")}
                </h1>
              </div>
            </div>
          )}
        </main>
        <StatusBar />
      </div>
    </ThemeProvider>
  )
}

export default App
