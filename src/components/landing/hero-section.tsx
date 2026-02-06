import { useState, useEffect, useRef } from "react"
import { ScatteredIcons } from "@/components/landing/scattered-icons"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button";

interface HeroSectionProps {
  onAnimationComplete?: () => void
}

export function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const accumulatedScrollRef = useRef(0)

  useEffect(() => {
    const maxScroll = 1200 // Increased for two-stage animation

    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent
      
      // Only prevent default if we're still in the animation range
      if (accumulatedScrollRef.current < maxScroll && wheelEvent.deltaY > 0) {
        wheelEvent.preventDefault()
        wheelEvent.stopPropagation()
        
        // Accumulate scroll delta
        accumulatedScrollRef.current += wheelEvent.deltaY
        
        // Clamp between 0 and maxScroll
        accumulatedScrollRef.current = Math.max(0, Math.min(accumulatedScrollRef.current, maxScroll))
        
        // Calculate progress (0 to 1)
        const progress = accumulatedScrollRef.current / maxScroll
        setScrollProgress(progress)
        
        // Notify parent when animation is complete
        if (progress >= 1 && onAnimationComplete) {
          onAnimationComplete()
        }
      } else if (wheelEvent.deltaY < 0 && accumulatedScrollRef.current > 0) {
        // Allow scrolling back up within animation
        wheelEvent.preventDefault()
        wheelEvent.stopPropagation()
        
        accumulatedScrollRef.current += wheelEvent.deltaY
        accumulatedScrollRef.current = Math.max(0, Math.min(accumulatedScrollRef.current, maxScroll))
        
        const progress = accumulatedScrollRef.current / maxScroll
        setScrollProgress(progress)
      }
      // If animation is complete (progress = 1) and scrolling down, allow default scroll behavior
    }

    // Add wheel listener to document with passive: false
    document.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [onAnimationComplete])

  // Two-stage animation calculations
  // Stage 1 (0-0.4): Fade out icons, buttons, badge
  // Stage 2 (0.4-1.0): Zoom and fade text
  
  const stage1Progress = Math.min(scrollProgress / 0.4, 1) // 0 to 1 over first 40%
  const stage2Progress = Math.max((scrollProgress - 0.4) / 0.6, 0) // 0 to 1 over last 60%
  
  // Icons and buttons fade out in stage 1
  const elementsOpacity = 1 - stage1Progress
  
  // Text zooms in stage 2 (scale 1 to 4)
  const textScale = 1 + (stage2Progress * 3)
  
  // Text fades out in stage 2
  const textOpacity = 1 - stage2Progress

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-32 w-full text-center gap-1 min-h-screen overflow-hidden">
      <ScatteredIcons opacity={elementsOpacity} />
      
      {/* Light Noise Overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS Animation for text fill pulse */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes textFillPulse {
          0% {
            -webkit-text-fill-color: currentColor;
            text-fill-color: currentColor;
          }
          75% {
            -webkit-text-fill-color: currentColor;
            text-fill-color: currentColor;
          }
          76%, 100% {
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
          }
        }
        .text-pulse {
          animation: textFillPulse 4s ease-in-out infinite;
        }
        .text-pulse:hover {
          animation: none;
          -webkit-text-fill-color: currentColor !important;
          text-fill-color: currentColor !important;
        }
      `}} />
      
      <div 
        className="flex items-center gap-2 px-4 py-2 border-2 rounded-xl bg-white text-black border-black dark:bg-black dark:text-white dark:border-white shadow-none transition-all duration-300 relative z-10"
        style={{ opacity: elementsOpacity }}
      >
        <div className="w-2 h-2 bg-green-500 rounded-sm animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-xs md:text-sm font-bold font-pixel tracking-[0.2em] uppercase opacity-90">
          Intelligence & Discovery Layer
        </span>
      </div>
      
      <h1 
        className="flex flex-col items-center justify-center text-6xl md:text-9xl font-bold font-pixel tracking-tighter leading-[0.8] select-none z-10 cursor-pointer text-pulse transition-transform duration-100 ease-out"
        style={{
          WebkitTextStroke: '2px currentColor',
          WebkitTextFillColor: 'transparent',
          paintOrder: 'stroke fill',
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        } as React.CSSProperties}
      >
        <span>8004 AGENTS</span>
        <span className="-mt-4 md:-mt-6">NETWORK</span>
      </h1>

      <div 
        className="flex gap-4 mt-1 relative z-10 transition-opacity duration-300"
        style={{ opacity: elementsOpacity }}
      >
        <RetroPixelButton className="w-32 h-10 border-primary/80 text-sm">
          <span>Deploy</span>
        </RetroPixelButton>
        <RetroPixelButton className="w-32 h-10 border-primary/80 text-sm">
          <span>Hire</span>
        </RetroPixelButton>
      </div>
    </section>
  )
}
