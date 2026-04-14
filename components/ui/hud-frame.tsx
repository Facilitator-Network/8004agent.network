"use client"

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface HudFrameProps {
  children: ReactNode
  className?: string
  /** corner cut size in px (default 22) */
  cut?: number
  /** show 4-point star markers at cut apex points (default true) */
  stars?: boolean
  /** distance to leave between the line and each star marker, in px (default 16) */
  starGap?: number
  /** animated comet glow that travels around the perimeter (default true) */
  trace?: boolean
}

export function HudFrame({
  children,
  className,
  cut = 22,
  stars = true,
  starGap = 16,
  trace = true,
}: HudFrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const traceRefs = useRef<Array<SVGLineElement | null>>([])
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = size
  // when stars are disabled there's nothing to make room for, so close the gaps
  const effectiveGap = stars ? starGap : 0
  const diagOffset = effectiveGap / Math.sqrt(2)

  // 6 line segments. With stars, each cut apex has a small gap.
  const segments: Array<[number, number, number, number]> =
    w && h
      ? [
          [0, 0, w - cut - effectiveGap, 0],                       // top
          [w - cut + diagOffset, diagOffset, w, cut],              // TR diagonal
          [w, cut, w, h],                                          // right
          [w, h, cut + effectiveGap, h],                           // bottom
          [cut - diagOffset, h - diagOffset, 0, h - cut],          // BL diagonal
          [0, h - cut, 0, 0],                                      // left
        ]
      : []

  // Per-line trace animation. Each line gets its own "window" in the master
  // cycle of size (lineLen + dashLen) so the comet has time to fully enter
  // AND fully exit a line before the next line's window starts. Outside its
  // window a line shows nothing (stroke-opacity 0) — gap regions stay dark.
  useEffect(() => {
    if (!trace || !w || !h) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const innerEffectiveGap = stars ? starGap : 0
    const innerDiagOffset = innerEffectiveGap / Math.sqrt(2)
    const innerSegments: Array<[number, number, number, number]> = [
      [0, 0, w - cut - innerEffectiveGap, 0],
      [w - cut + innerDiagOffset, innerDiagOffset, w, cut],
      [w, cut, w, h],
      [w, h, cut + innerEffectiveGap, h],
      [cut - innerDiagOffset, h - innerDiagOffset, 0, h - cut],
      [0, h - cut, 0, 0],
    ]
    const lengths = innerSegments.map(([x1, y1, x2, y2]) =>
      Math.hypot(x2 - x1, y2 - y1)
    )
    const totalLength = lengths.reduce((a, b) => a + b, 0)
    if (!totalLength) return

    // Fixed dash length for visual consistency across lines
    const dashLen = Math.max(38, totalLength * 0.05)
    const windows = lengths.map((len) => len + dashLen)
    const totalCycleLength = windows.reduce((a, b) => a + b, 0)
    const totalDuration = Math.max(8500, totalCycleLength * 3.2)

    let startTs = 0
    let raf = 0

    const tick = (now: number) => {
      if (!startTs) startTs = now
      const t = ((now - startTs) % totalDuration) / totalDuration
      const cyclePos = t * totalCycleLength

      let cumulative = 0
      for (let i = 0; i < innerSegments.length; i++) {
        const lineLen = lengths[i]
        const winLen = windows[i]
        const el = traceRefs.current[i]
        if (el) {
          if (cyclePos >= cumulative && cyclePos < cumulative + winLen) {
            const localProgress = (cyclePos - cumulative) / winLen // 0..1
            // dashoffset = dashLen - (lineLen + dashLen) * progress
            // sweeps full dash from before-start to past-end inside the window
            const offset = dashLen - (lineLen + dashLen) * localProgress
            el.setAttribute("stroke-dasharray", `${dashLen} 99999`)
            el.setAttribute("stroke-dashoffset", String(offset))
            el.setAttribute("stroke-opacity", "1")
          } else {
            el.setAttribute("stroke-opacity", "0")
          }
        }
        cumulative += winLen
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [trace, w, h, cut, stars, starGap])

  return (
    <div
      ref={ref}
      className={cn("hud-frame", className)}
      style={{ "--hud-cut": `${cut}px` } as CSSProperties}
    >
      <svg
        className="hud-frame__outline"
        viewBox={`0 0 ${w || 1} ${h || 1}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* static dim outline */}
        {segments.map(([x1, y1, x2, y2], i) => (
          <line
            key={`base-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="hud-frame__line"
            strokeLinecap="round"
          />
        ))}
        {/* per-line animated trace overlay */}
        {trace &&
          segments.map(([x1, y1, x2, y2], i) => (
            <line
              key={`trace-${i}`}
              ref={(el) => {
                traceRefs.current[i] = el
              }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="hud-frame__trace-line"
              strokeDasharray="0 99999"
              strokeLinecap="round"
              strokeOpacity={0}
            />
          ))}
      </svg>
      <div className="hud-frame__content">{children}</div>
      {stars && (
        <>
          <HudStar className="hud-frame__star hud-frame__star--tr" />
          <HudStar className="hud-frame__star hud-frame__star--bl" />
        </>
      )}
    </div>
  )
}

function HudStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("hud-star", className)} aria-hidden>
      <path
        d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z"
        fill="currentColor"
      />
    </svg>
  )
}
