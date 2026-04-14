"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let rafId: number
    let mx = -2000
    let my = -2000
    let cx = -2000
    let cy = -2000

    function onMove(e: MouseEvent) {
      mx = e.clientX
      my = e.clientY
    }

    const node = el
    function tick() {
      cx += (mx - cx) * 0.08
      cy += (my - cy) * 0.08
      node.style.background = `radial-gradient(640px circle at ${cx}px ${cy}px, var(--accent-glow), transparent 68%)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow fixed inset-0 pointer-events-none"
      style={{
        filter: "blur(var(--cursor-glow-blur))",
        opacity: "var(--cursor-glow-opacity)" as unknown as number,
        zIndex: 1,
      }}
    />
  )
}
