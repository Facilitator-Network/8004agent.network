"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface PixelAssembleProps {
  show: boolean
  children: React.ReactNode
  className?: string
  particleColor?: string
}

export function PixelAssemble({ show, children, className, particleColor }: PixelAssembleProps) {
  // Generate random particle properties
  const particles = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800, // Very scattered
      y: (Math.random() - 0.5) * 300 - 100, // Mostly above
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.8 + 0.2,
    }))
  }, [])

  return (
    <div className={cn("relative", className)}>
      {/* Content Fades In */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 }} // Wait for particles to assemble
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Particles - Assemble from chaos */}
      {show && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-foreground sharp-pixels"
              style={{ backgroundColor: particleColor }}
              initial={{ 
                x: p.x, 
                y: p.y, 
                opacity: 0,
                scale: p.scale,
                rotate: p.rotation
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: [0, 1, 0], // Flash visible then vanish as content appears
                scale: [p.scale, 1, 0], // Shrink into nothingness
                rotate: 0,
              }}
              transition={{
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1], // Custom cubic bezier
                opacity: { duration: 1.0, times: [0, 0.8, 1] },
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
