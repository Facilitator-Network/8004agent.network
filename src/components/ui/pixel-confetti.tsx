"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

interface PixelConfettiProps {
  trigger: number
  className?: string
}

const COLORS = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFFFFF", // White
]

export function PixelConfetti({ trigger, className, direction = 'down' }: PixelConfettiProps & { direction?: 'up' | 'down' }) {
  const [isVisible, setIsVisible] = useState(false)

  const particles = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      endX: (Math.random() - 0.5) * 200,
      endY: (Math.random() - 0.5) * 200,
      size: Math.random() < 0.2 ? 12 : Math.random() < 0.5 ? 8 : 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      duration: 0.8 + Math.random() * 0.8,
      delay: Math.random() * 0.2,
    }))
  }, [])

  useEffect(() => {
    if (trigger > 0) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          key={trigger}
          className={cn("fixed inset-0 pointer-events-none z-[100] overflow-hidden", className)}
        >
          {particles.map((p) => {
            const isImplode = direction === 'up'
            return (
              <motion.div
                key={p.id}
                className="absolute sharp-pixels"
                style={{
                  left: `50%`,
                  top: `50%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                }}
                initial={isImplode ? { 
                  x: `${p.endX}vw`, 
                  y: `${p.endY}vh`, 
                  scale: 0, 
                  opacity: 0,
                  rotate: p.rotation
                } : { 
                  x: 0, 
                  y: 0, 
                  scale: 0, 
                  opacity: 1 
                }}
                animate={isImplode ? {
                   x: 0,
                   y: 0,
                   scale: [0, 1.5, 0], // Swell then shrink
                   opacity: [0, 1, 0],
                   rotate: p.rotation + 720
                } : {
                  x: `${p.endX}vw`,
                  y: `${p.endY}vh`,
                  rotate: p.rotation + 720,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: p.duration,
                  ease: isImplode ? "circIn" : "circOut", // Suck in vs Blow out
                  delay: p.delay,
                }}
              />
            )
          })}
        </div>
      )}
    </AnimatePresence>
  )
}
