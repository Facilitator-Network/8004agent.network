"use client"

import { useEffect, useRef, useCallback, useState, type ReactNode } from "react"
import { useScrollContainer } from "@/components/landing/scroll-context"
import gsap from "gsap"

interface SectionDeckProps {
  children: ReactNode[]
  /** Number of scroll-steps each section consumes. Defaults to 1 per section. */
  steps?: number[]
  /** Called when user scrolls up past the first section (to reverse into the hero) */
  onRequestHeroReverse?: () => void
}

/**
 * Scroll-jacked section carousel with sub-step support.
 * All children are stacked in the same viewport.
 * Wheel events crossfade between sections, and advance sub-steps within a section.
 */
export function SectionDeck({ children, steps, onRequestHeroReverse }: SectionDeckProps) {
  const { scrollContainerRef } = useScrollContainer()
  const [active, setActive] = useState(false)
  const indexRef = useRef(0)
  const subStepRef = useRef(0)
  const animatingRef = useRef(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const deckRef = useRef<HTMLDivElement>(null)

  const sections = Array.isArray(children) ? children : [children]
  const totalSections = sections.length
  const sectionSteps = steps || sections.map(() => 1)

  // Activate/deactivate via custom events
  useEffect(() => {
    const handleActivate = () => {
      // Reset all section visibility to initial state
      sectionRefs.current.forEach((ref, i) => {
        if (ref) {
          gsap.set(ref, {
            opacity: i === 0 ? 1 : 0,
            pointerEvents: i === 0 ? "auto" : "none",
          })
        }
      })
      indexRef.current = 0
      subStepRef.current = 0
      setActive(true)
      // Dispatch initial substep for the first section
      window.dispatchEvent(
        new CustomEvent("deck:substep", { detail: { section: 0, step: 0 } })
      )
    }
    const handleDeactivate = () => {
      setActive(false)
      // Reset to first section/step so re-entry starts fresh
      indexRef.current = 0
      subStepRef.current = 0
    }
    const handleSyncStep = (e: Event) => {
      const { section, step } = (e as CustomEvent).detail
      if (section === indexRef.current) {
        subStepRef.current = step
      }
    }
    window.addEventListener("sectiondeck:activate", handleActivate)
    window.addEventListener("sectiondeck:deactivate", handleDeactivate)
    window.addEventListener("deck:syncstep", handleSyncStep)
    return () => {
      window.removeEventListener("sectiondeck:activate", handleActivate)
      window.removeEventListener("sectiondeck:deactivate", handleDeactivate)
      window.removeEventListener("deck:syncstep", handleSyncStep)
    }
  }, [])

  // Set initial visibility
  useEffect(() => {
    sectionRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.set(ref, {
          opacity: i === 0 ? 1 : 0,
          pointerEvents: i === 0 ? "auto" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        })
      }
    })
  }, [totalSections])

  const crossfadeTo = useCallback(
    (nextIndex: number, nextSubStep: number) => {
      const currentIndex = indexRef.current
      if (nextIndex === currentIndex) return
      if (nextIndex < 0 || nextIndex >= totalSections) return

      animatingRef.current = true
      const currentEl = sectionRefs.current[currentIndex]
      const nextEl = sectionRefs.current[nextIndex]

      if (!currentEl || !nextEl) {
        animatingRef.current = false
        return
      }

      gsap.set(nextEl, { pointerEvents: "auto" })
      gsap.set(currentEl, { pointerEvents: "none" })

      const tl = gsap.timeline({
        onComplete: () => {
          indexRef.current = nextIndex
          subStepRef.current = nextSubStep
          animatingRef.current = false
          // Dispatch substep event for the new section
          window.dispatchEvent(
            new CustomEvent("deck:substep", {
              detail: { section: nextIndex, step: nextSubStep },
            })
          )
        },
      })
      tl.to(currentEl, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 0)
      tl.to(nextEl, { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 0.15)
    },
    [totalSections]
  )

  // Wheel handler with cooldown
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!active) return
      e.preventDefault()
      if (animatingRef.current) return

      const currentSection = indexRef.current
      const currentSubStep = subStepRef.current
      const maxSubSteps = sectionSteps[currentSection] || 1

      // Cooldown helper — locks for 800ms after sub-step change
      const lockAndDispatch = (section: number, step: number) => {
        animatingRef.current = true
        subStepRef.current = step
        window.dispatchEvent(
          new CustomEvent("deck:substep", {
            detail: { section, step },
          })
        )
        setTimeout(() => {
          animatingRef.current = false
        }, 1200)
      }

      if (e.deltaY > 0) {
        // --- SCROLL DOWN ---
        if (currentSubStep < maxSubSteps - 1) {
          lockAndDispatch(currentSection, currentSubStep + 1)
        } else if (currentSection < totalSections - 1) {
          crossfadeTo(currentSection + 1, 0)
        }
      } else if (e.deltaY < 0) {
        // --- SCROLL UP ---
        if (currentSubStep > 0) {
          lockAndDispatch(currentSection, currentSubStep - 1)
        } else if (currentSection > 0) {
          const prevMaxSteps = sectionSteps[currentSection - 1] || 1
          crossfadeTo(currentSection - 1, prevMaxSteps - 1)
        } else {
          if (onRequestHeroReverse) {
            onRequestHeroReverse()
          }
        }
      }
    },
    [active, totalSections, sectionSteps, crossfadeTo, onRequestHeroReverse]
  )

  // Attach wheel listener
  useEffect(() => {
    const scroller = scrollContainerRef.current
    if (!scroller) return

    scroller.addEventListener("wheel", handleWheel, { passive: false })
    return () => scroller.removeEventListener("wheel", handleWheel)
  }, [scrollContainerRef, handleWheel])

  return (
    <div
      ref={deckRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ display: active ? "block" : "none" }}
    >
      {sections.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el
          }}
          className="absolute inset-0 w-full h-screen overflow-hidden"
        >
          {child}
        </div>
      ))}
    </div>
  )
}
