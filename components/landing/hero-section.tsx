"use client"
import { useEffect, useRef } from "react"
import { ScatteredIcons } from "@/components/landing/scattered-icons"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { navigateTo } from "@/lib/utils"

interface HeroSectionProps {
  onAnimationComplete?: () => void
  isActive: boolean
}

export function HeroSection({ onAnimationComplete, isActive }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const accumulatedScrollRef = useRef(0)
  const maxScroll = 1200

  // Initialize GSAP Timeline
  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ paused: true })

    // Stage 1: Fade out elements (0 - 40% of scroll)
    tl.to([iconsRef.current, badgeRef.current, buttonsRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: "none"
    }, 0)

    // Stage 2: Zoom and Fade Text (40% - 100% of scroll)
    tl.to(titleRef.current, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: "power1.in"
    }, 0.4)

    timelineRef.current = tl
  }, { scope: containerRef })

  // Handle Scroll
  useEffect(() => {
    if (!isActive) return

    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent
      
      // Calculate potential new scroll position
      const delta = wheelEvent.deltaY
      const newScroll = accumulatedScrollRef.current + delta

      // Check boundaries
      const isWithinBounds = newScroll >= 0 && newScroll <= maxScroll

      // Determine if we should handle this event
      // We handle it if we are within bounds, OR if we are trying to scroll back into bounds
      // BUT if we are completely done (at max) and scrolling down, we let it pass (for App.tsx to switch sections)
      // If we are at start (0) and scrolling up, we let it pass (overscroll)
      
      if (isWithinBounds) {
        wheelEvent.preventDefault()
        wheelEvent.stopPropagation()
        accumulatedScrollRef.current = newScroll
      } else if (accumulatedScrollRef.current > 0 && delta < 0) {
        // Allow scrolling back up if we are partially or fully passed max
        wheelEvent.preventDefault()
        wheelEvent.stopPropagation()
        accumulatedScrollRef.current = Math.max(0, newScroll)
      } else if (accumulatedScrollRef.current < maxScroll && delta > 0) {
         // Allow scrolling forward if we are NOT yet at max
         wheelEvent.preventDefault()
         wheelEvent.stopPropagation()
         accumulatedScrollRef.current = Math.min(newScroll, maxScroll)
      }
      
      // Update Timeline
      const progress = accumulatedScrollRef.current / maxScroll
      timelineRef.current?.progress(progress)

      // Notify completion
      // Trigger slightly before 1.0 (0.99) to ensure we don't get stuck due to float precision
      // And ensure we are strictly moving forward (delta > 0)
      if (progress >= 0.99 && onAnimationComplete && wheelEvent.deltaY > 0) {
        onAnimationComplete()
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    return () => document.removeEventListener('wheel', handleWheel)
  }, [isActive, onAnimationComplete])

  return (
    <section ref={containerRef} className="relative flex flex-col items-center justify-center pt-32 pb-32 w-full text-center gap-1 min-h-screen overflow-hidden">
      <div ref={iconsRef} className="absolute inset-0 z-0">
        <ScatteredIcons />
      </div>
      
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
        ref={badgeRef}
        className="flex items-center gap-3 px-4 py-2 border-2 rounded-pixel-md bg-white text-black border-black dark:bg-black dark:text-white dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 relative z-10 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-system-green opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-none bg-system-green"></span>
        </span>
        <span className="text-xs md:text-sm font-bold font-pixel tracking-[0.2em] uppercase opacity-90">
          Intelligence & Discovery Layer
        </span>
      </div>
      
      <h1 
        ref={titleRef}
        className="flex flex-col items-center justify-center text-6xl md:text-9xl font-bold font-pixel tracking-tighter leading-[0.8] select-none z-10 cursor-pointer text-pulse transition-transform duration-100 ease-out"
        style={{
          WebkitTextStroke: '2px currentColor',
          WebkitTextFillColor: 'transparent',
          paintOrder: 'stroke fill',
        }}
      >
        <span>8004 AGENTS</span>
        <span className="-mt-4 md:-mt-6">NETWORK</span>
      </h1>



      <div 
        ref={buttonsRef}
        className="flex gap-4 mt-1 relative z-10"
      >
        <RetroPixelButton 
          className="w-32 h-10 border-primary/80 text-sm"
          onClick={() => navigateTo('/deploy')}
        >
          <span>Deploy</span>
        </RetroPixelButton>
        <RetroPixelButton 
          className="w-32 h-10 border-primary/80 text-sm"
          onClick={() => navigateTo('/agents')}
        >
          <span>Hire</span>
        </RetroPixelButton>
      </div>
    </section>
  )
}
