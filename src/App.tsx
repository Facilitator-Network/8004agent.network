import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { HeroSection } from "@/components/landing/hero-section"
import { IdentitySection } from "@/components/landing/identity-section"
import { LifecycleSection } from "@/components/landing/lifecycle-section"
import { ReputationSection } from "@/components/landing/reputation-section"
import { ArenaSection } from "@/components/landing/arena-section"
import { PaymentsSection } from "@/components/landing/payments-section"
import { CTASection } from "@/components/landing/cta-section"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { PixelConfetti } from "@/components/ui/pixel-confetti"
import { PixelTransition } from "@/components/layout/pixel-transition"
import { ScanlineWipe } from "@/components/transitions/ScanlineWipe"
import { GridFadeIn } from "@/components/transitions/GridFadeIn"
import { SlideWithBlur } from "@/components/transitions/SlideWithBlur"
import { PixelDissolve } from "@/components/transitions/PixelDissolve"
import { VerticalWipe } from "@/components/transitions/VerticalWipe"
import { FadeWithScale } from "@/components/transitions/FadeWithScale"

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [heroComplete, setHeroComplete] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const [transitionTrigger, setTransitionTrigger] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [identityType, setIdentityType] = useState<'human' | 'agent' | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward')
  const totalSections = 7 // Hero, Identity, Lifecycle, Reputation, Arena, Payments, CTA

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
          // Moving forward
          setCurrentSection(prev => prev + 1)
          setTransitionDirection('forward')
          
          // CONFETTI ONLY when entering CTA section (index 6)
          if (currentSection === 5) {
            setConfettiTrigger(prev => prev + 1)
          }
        } else if (scrollAccumulator < 0 && currentSection > 0) {
          // Moving backward
          setCurrentSection(prev => prev - 1)
          setTransitionDirection('backward')
          
          if (currentSection === 1) {
            setHeroComplete(false)
          }
          // No confetti when going backward
        }
        scrollAccumulator = 0
        setScrollProgress(0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection, heroComplete, path])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
        <CursorGlow />
        <Navbar />
        <PixelTransition trigger={transitionTrigger} />
        <PixelConfetti trigger={confettiTrigger} direction="down" />
        
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

              {/* Identity Section (Index 1) - Scanline Wipe */}
              <div
                className="absolute inset-0"
                style={{
                  pointerEvents: currentSection === 1 ? 'auto' : 'none',
                }}
              >
                <ScanlineWipe 
                  isActive={currentSection === 1}
                  direction={transitionDirection}
                >
                  <IdentitySection 
                    isActive={currentSection === 1}
                    onIdentitySelected={(type) => setIdentityType(type)}
                  />
                </ScanlineWipe>
              </div>

              {/* Lifecycle Section (Index 2) - Grid Fade-In */}
              <div
                className="absolute inset-0"
                style={{
                  pointerEvents: currentSection === 2 ? 'auto' : 'none',
                }}
              >
                <GridFadeIn
                  isActive={currentSection === 2}
                  direction={transitionDirection}
                >
                  <LifecycleSection 
                    isActive={currentSection === 2}
                    identityType={identityType}
                  />
                </GridFadeIn>
              </div>

              {/* Reputation Section (Index 3) - Slide with Blur */}
              <div
                className="absolute inset-0"
                style={{
                  pointerEvents: currentSection === 3 ? 'auto' : 'none',
                }}
              >
                <SlideWithBlur
                  isActive={currentSection === 3}
                  direction={transitionDirection}
                >
                  <ReputationSection isActive={currentSection === 3} />
                </SlideWithBlur>
              </div>

              {/* Arena Section (Index 4) - Pixel Dissolve */}
              <div
                className="absolute inset-0"
                style={{
                  pointerEvents: currentSection === 4 ? 'auto' : 'none',
                }}
              >
                <PixelDissolve
                  isActive={currentSection === 4}
                  direction={transitionDirection}
                >
                  <ArenaSection isActive={currentSection === 4} />
                </PixelDissolve>
              </div>

              {/* Payments Section (Index 5) - Vertical Wipe */}
              <div
                className="absolute inset-0"
                style={{
                  pointerEvents: currentSection === 5 ? 'auto' : 'none',
                }}
              >
                <VerticalWipe
                  isActive={currentSection === 5}
                  direction={transitionDirection}
                >
                  <PaymentsSection 
                    isActive={currentSection === 5}
                    identityType={identityType}
                  />
                </VerticalWipe>
              </div>

              {/* CTA Section (Index 6) - Fade with Scale + CONFETTI */}
              <div
                className="absolute inset-0"
                style={{
                  pointerEvents: currentSection === 6 ? 'auto' : 'none',
                }}
              >
                <FadeWithScale
                  isActive={currentSection === 6}
                  direction={transitionDirection}
                >
                  <CTASection isActive={currentSection === 6} />
                </FadeWithScale>
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
