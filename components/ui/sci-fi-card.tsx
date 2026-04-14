"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SciFiHudCardProps {
  title: string
  body: string
  className?: string
  accentColor?: string // e.g. "var(--accent-d)"
  glowColor?: string   // e.g. "var(--accent-glow)"
  index?: number       // used for varied mock data
}

export function SciFiHudCard({
  title,
  body,
  className,
  accentColor = "var(--accent-d)",
  glowColor = "var(--accent-glow)",
  index = 0,
}: SciFiHudCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = size
  const r = 12 // radius
  const notchIn = 8 // inward depth of notch
  const notchOffset = 40 // distance from top where notch starts
  const notchHeight = 60 // length of the vertical notch segment

  const path = w && h ? `
    M 0,${r} 
    Q 0,0 ${r},0 
    L ${w - r},0 
    Q ${w},0 ${w},${r} 
    L ${w},${notchOffset} 
    L ${w - notchIn},${notchOffset + 6} 
    L ${w - notchIn},${notchOffset + notchHeight - 6} 
    L ${w},${notchOffset + notchHeight} 
    L ${w},${h - r} 
    Q ${w},${h} ${w - r},${h} 
    L ${r},${h} 
    Q 0,${h} 0,${h - r} 
    Z
  `.trim() : ""

  // Mock technical data
  const coords = [`[ 42.${10 + index}, 88.01 ]`, `[ 12.${30 + index}, 19.92 ]`, `[ 09.02, 44.${index} ]`, `[ 81.33, 02.${index} ]`][index % 4]
  const uid = `NODE-${1000 + index * 123}`

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex flex-col overflow-visible",
        className
      )}
      style={{ aspectRatio: "4/5" }}
    >
      {/* Outer Glow Outline */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
        viewBox={`0 0 ${w} ${h}`}
        aria-hidden="true"
      >
        <defs>
          <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          filter="url(#hud-glow)"
          style={{ 
            filter: `drop-shadow(0 0 8px ${glowColor})`,
            transition: "all 0.4s ease" 
          }}
          className="group-hover:stroke-opacity-100"
        />
        <path
          d={path}
          fill="none"
          stroke={accentColor}
          strokeWidth="0.5"
          strokeOpacity="0.6"
          transform="scale(0.985)"
          transform-origin="center"
        />
        
        {w > 0 && (
          <g className="opacity-40 group-hover:opacity-100 transition-opacity">
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={w - 3} cy={notchOffset + notchHeight + 15 + i * 8} r="1" fill={accentColor} />
            ))}
          </g>
        )}
      </svg>

      {/* Main Content Area */}
      <div 
        className="relative flex-1 bg-[#060410]/60 overflow-hidden"
        style={{ clipPath: `path('${path}')` }}
      >
        {/* 1. HUD GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `
              linear-gradient(${accentColor} 1px, transparent 1px), 
              linear-gradient(90deg, ${accentColor} 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px"
          }} 
        />
        
        {/* 2. TECHNICAL HUD ELEMENTS */}
        <div className="absolute inset-0 p-5 font-mono text-[9px] uppercase tracking-widest text-[var(--accent-d)] pointer-events-none select-none">
          {/* Top Edge Labels */}
          <div className="flex justify-between animate-hud-flicker">
            <span>{uid}</span>
            <span className="opacity-60">STATUS: ACTIVE</span>
          </div>

          {/* Corner Coordinates */}
          <div className="absolute top-12 left-5 opacity-40">{coords}</div>
          <div className="absolute top-12 right-12 opacity-40 text-right">SCAN_LN: 0{index + 1}</div>

          {/* Side Indicator Bar */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-30">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={cn("w-1 h-2", i > 4 ? "bg-white/20" : "bg-[var(--accent-d)]")} />
            ))}
          </div>

          {/* 3. CENTRAL VIEWPORT BRACKETS (Empty Space) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24 border border-white/5 bg-white/[0.02]">
              {/* Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[var(--accent-d)] shadow-[0_0_8px_var(--accent-glow)]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[var(--accent-d)] shadow-[0_0_8px_var(--accent-glow)]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[var(--accent-d)] shadow-[0_0_8px_var(--accent-glow)]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[var(--accent-d)] shadow-[0_0_8px_var(--accent-glow)]" />
              
              {/* Viewport Label */}
              <div className="absolute inset-0 flex items-center justify-center text-[7px] opacity-20 group-hover:opacity-40 transition-opacity">
                NO_IMG_ASSET
              </div>
            </div>
          </div>
        </div>

        {/* 4. TITLE & DESCRIPTION WINDOW */}
        <div className="absolute inset-x-0 bottom-0 p-6 pt-12 bg-gradient-to-t from-[#060410] to-transparent">
          <div className="relative overflow-hidden">
            <h3 className="font-display text-base tracking-tight uppercase text-[var(--fg-d)] mb-1.5 group-hover:text-[var(--accent-d)] transition-colors duration-300">
              {title}
            </h3>
            <p className="font-mono text-[10px] leading-relaxed text-[var(--fg-muted-d)] uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity max-w-[28ch]">
              {body}
            </p>
            
            {/* Subtle scanning bar element */}
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--accent-d)] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_var(--accent-glow)] transition-all duration-700 -translate-x-full group-hover:translate-x-0" />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes hud-flicker {
          0%, 100% { opacity: 0.8; }
          33% { opacity: 0.5; }
          34% { opacity: 0.9; }
          66% { opacity: 0.4; }
          67% { opacity: 1; }
        }
        .animate-hud-flicker {
          animation: hud-flicker 3s infinite linear;
        }
      `}</style>
    </div>
  )
}
