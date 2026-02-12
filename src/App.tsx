import { useState, useEffect, useRef } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { HeroSection } from "@/components/landing/hero-section"
import { IdentitySection } from "@/components/landing/identity-section"
import { LifecycleSection } from "@/components/landing/lifecycle-section"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { PixelTransition } from "@/components/layout/pixel-transition"

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [heroComplete, setHeroComplete] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const [transitionTrigger, setTransitionTrigger] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [identityComplete, setIdentityComplete] = useState(false)
  const [identityType, setIdentityType] = useState<'human' | 'agent' | null>(null)
  const [isLifecycleLocked, setIsLifecycleLocked] = useState(false)
  const totalSections = 3 // Hero, Identity, Lifecycle
  const lifecycleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // When entering Lifecycle section (index 2), lock scroll initially
    // Unlock will be triggered by LifecycleSection after typewriter animation
    if (currentSection === 2) {
      setIsLifecycleLocked(true)
    }
  }, [currentSection])

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
          setIdentityComplete(false) // Reset on navigation
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
    const getThreshold = () => currentSection === 1 ? 400 : 400

    const handleWheel = (e: WheelEvent) => {
      // 1. Hero handling (Section 0)
      if (currentSection === 0) {
        if (!heroComplete) return 
        e.preventDefault()
        scrollAccumulator += e.deltaY * 0.6
      }
      
      // 2. Identity handling (Section 1)
      else if (currentSection === 1) {
        // Lock scroll until animation completes
        if (!identityComplete) {
          e.preventDefault()
          return
        }
        e.preventDefault()
        scrollAccumulator += e.deltaY * 0.6
      }

      // 3. Lifecycle handling (Section 2) - Native Scroll
      else if (currentSection === 2) {
        // Lock scroll initially to force view of title
        if (isLifecycleLocked) {
          e.preventDefault()
          return
        }

        const container = document.getElementById("lifecycle-container")
        const isAtTop = container ? container.scrollTop <= 0 : true
        
        // Only hijack if we are at the top and scrolling UP
        if (isAtTop && e.deltaY < 0) {
           e.preventDefault()
           scrollAccumulator += e.deltaY * 0.6 
        } else {
           // Allow native scroll
           scrollAccumulator = 0
           return 
        }
      }

      // Processing Switch Logic
      const threshold = getThreshold()
      const progress = Math.min(Math.abs(scrollAccumulator) / threshold, 1) * 100
      setScrollProgress(progress)

      if (Math.abs(scrollAccumulator) >= threshold) {
        if (scrollAccumulator > 0 && currentSection < totalSections - 1) {
          setCurrentSection(prev => prev + 1)
        } else if (scrollAccumulator < 0 && currentSection > 0) {
          setCurrentSection(prev => {
            const next = prev - 1
            if (next === 0) {
               setHeroComplete(false)
               setIdentityComplete(false) // Reset Identity lock when going back to start
            }
            return next
          })
        }
        scrollAccumulator = 0
        setScrollProgress(0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection, heroComplete, identityComplete, path, isLifecycleLocked])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
        <CursorGlow />
        <Navbar />
        <PixelTransition trigger={transitionTrigger} />
        
        <main className="flex-1 relative overflow-hidden">


          {path === "/" ? (
            /* Home Page Sections */
            <>
              {/* Hero Section (Index 0) - No transition on first load */}
              <div 
                className="absolute inset-0"
                style={{ 
                  opacity: currentSection === 0 ? 1 : 0,
                  pointerEvents: currentSection === 0 ? 'auto' : 'none',
                }}
              >
                <div className="h-full flex items-center justify-center">
                  <HeroSection 
                    onAnimationComplete={() => {
                      setHeroComplete(true)
                      setCurrentSection(1)
                    }} 
                    isActive={currentSection === 0}
                  />
                </div>
              </div>

              {/* Identity Section (Index 1) */}
              <div
                className="absolute inset-0 transition-opacity duration-1000 ease-out"
                style={{
                  zIndex: 20, // Always on top of Lifecycle (which is naturally below in DOM)
                  opacity: currentSection === 1 ? 1 : 0,
                  pointerEvents: currentSection === 1 ? 'auto' : 'none',
                  transitionDelay: currentSection === 1 ? '0ms' : '800ms',
                }}
              >
                <IdentitySection 
                  isActive={currentSection === 1}
                  onIdentitySelected={(type) => setIdentityType(type)}
                  onAnimationComplete={() => setIdentityComplete(true)}
                  identityComplete={identityComplete}
                />
              </div>

              {/* Lifecycle Section (Index 2) */}
              <div
                ref={lifecycleRef}
                id="lifecycle-container"
                className="absolute inset-0 overflow-y-auto overflow-x-hidden" // Enable native scroll
                style={{
                  zIndex: 10, // Below Identity
                  opacity: currentSection === 2 ? 1 : 0,
                  pointerEvents: currentSection === 2 ? 'auto' : 'none',
                }}
              >
                <LifecycleSection 
                  isActive={currentSection === 2}
                  identityType={identityType}
                  scrollContainerRef={lifecycleRef}
                  unlockScroll={() => setIsLifecycleLocked(false)}
                />
              </div>

              
              {/* Scroll Progress Bar */}
              <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-50">
                <div 
                  className="h-full bg-system-green transition-all duration-75 ease-out shadow-[0_0_10px_rgba(142,76,36,0.5)]"
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
