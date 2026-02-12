"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface PixelBlastProps {
  active: boolean // Triggers the blast
  children: React.ReactNode
  className?: string
  particleColor?: string
}

export function PixelBlast({ active, children, className, particleColor }: PixelBlastProps) {
  // Generate random particle properties once
  const particles = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * window.innerWidth * 1.5, // Cover full width
      y: (Math.random() * -window.innerHeight * 0.8) - 100, // Explode UP forcefully
      rotation: Math.random() * 1080 - 540,
      scale: Math.random() * 1.2 + 0.4, // Bigger variance
      gravity: Math.random() * 1200 + 800, // Stronger gravity for punchy feel
      delay: Math.random() * 0.15,
      color: i % 5 === 0 ? "var(--system-green)" : (i % 3 === 0 ? "var(--foreground)" : "var(--muted-foreground)"), // Mix colors
    }))
  }, [])

  return (
    <div className={cn("relative", className)}>
      {/* Original Content - Fades out instantly when active */}
      <motion.div
        animate={{ opacity: active ? 0 : 1, scale: active ? 1.05 : 1 }}
        transition={{ duration: 0.15 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Particles - Render only when active */}
      {active && (
        <div className="absolute inset-0 pointer-events-none z-[99] flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 md:w-3 md:h-3 sharp-pixels"
              style={{ backgroundColor: p.color || particleColor || "var(--foreground)" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.x,
                y: [p.y, p.y + p.gravity], // Arc: Go up, then fall down
                opacity: [1, 1, 0],
                rotate: p.rotation,
                scale: [1, p.scale, 0],
              }}
              transition={{
                duration: 1.2,
                ease: [0.2, 0.8, 0.2, 1], // Custom cubic bezier for "pop"
                times: [0, 1],
                opacity: { duration: 0.8, delay: 0.4 }, // Fade out later
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
