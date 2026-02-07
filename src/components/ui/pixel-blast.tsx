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
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 600, // Wider horizontal explosion
      y: (Math.random() * -300) - 50, // Explode UP first (negative Y)
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.8 + 0.2, // Varied sizes
      gravity: Math.random() * 800 + 400, // Random gravity strength
      delay: Math.random() * 0.1,
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
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-foreground sharp-pixels"
              style={{ backgroundColor: particleColor }}
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
