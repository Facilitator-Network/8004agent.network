import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { HeroSection } from "@/components/landing/hero-section"



import { CursorGlow } from "@/components/ui/cursor-glow"

import { PixelTransition } from "@/components/layout/pixel-transition"

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [heroComplete, setHeroComplete] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const [transitionTrigger, setTransitionTrigger] = useState(0)
  const totalSections = 1 // Hero only

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
        }, 300)
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
    const scrollThreshold = 100 

    const handleWheel = (e: WheelEvent) => {
      if (currentSection === 0 && !heroComplete) return

      e.preventDefault()
      scrollAccumulator += e.deltaY

      if (Math.abs(scrollAccumulator) >= scrollThreshold) {
        if (scrollAccumulator > 0 && currentSection < totalSections - 1) {
          setCurrentSection(prev => prev + 1)
        } else if (scrollAccumulator < 0 && currentSection > 0) {
          setCurrentSection(0)
          setHeroComplete(false)
        }
        scrollAccumulator = 0
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
        
        <main className="flex-1 relative overflow-hidden">


          {path === "/" ? (
            /* Hero Section on Home */
            <>
              <div 
                className="absolute inset-0 transition-opacity duration-700"
                style={{ 
                  opacity: 1, // Always visible
                  pointerEvents: 'auto',
                }}
              >
                <div className="h-full flex items-center justify-center">
                  <HeroSection onAnimationComplete={() => setHeroComplete(true)} />
                </div>
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
