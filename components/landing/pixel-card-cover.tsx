"use client"

import { motion, useTransform, MotionValue } from "framer-motion"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface PixelCardCoverProps {
  className?: string
  progress: MotionValue<number> // 0 = fully covered/visible (pixels present), 1 = fully revealed/hidden (pixels almost gone)
}

function Pixel({ progress, threshold }: { progress: MotionValue<number>, threshold: number }) {
  // Input: [threshold, threshold + 0.1] -> Output: [1, 0] (opacity/scale)
  // Sharp transition (0.1) to ensure pixels vanish cleanly
  // If progress < threshold, opacity is 1.
  // If progress > threshold + 0.1, opacity is 0.
  const opacity = useTransform(
    progress,
    [threshold, threshold + 0.15], // Slower fade for smoother effect
    [1, 0]
  )
  
  const scale = useTransform(
    progress,
    [threshold, threshold + 0.1],
    [1, 0]
  )

  return (
    <motion.div
      className="w-[10.1%] h-[8.5%] bg-background -ml-[0.5px] -mt-[0.5px]" // Slight overlap to prevent gaps
      style={{ 
        opacity,
        scale
      }}
    />
  )
}

export function PixelCardCover({ className, progress }: PixelCardCoverProps) {
  // Create a grid of "pixels"
  const rows = 12
  const cols = 10
  
  const pixels = useMemo(() => {
    return Array.from({ length: rows * cols }).map((_, i) => {
      const col = i % cols
      const center = (cols - 1) / 2
      const dist = Math.abs(col - center) / center // 0 to 1 (normalized)
      
      // Pseudo-random jitter based on index
      const random = ((i * 137) % 100) / 100
      
      // Threshold: Closer to center = lower threshold (vanish sooner)
      // Dist component (0.6) + Random component (0.15) = max ~0.75
      const threshold = (dist * 0.6) + (random * 0.15)
      
      return {
        id: i,
        threshold
      }
    })
  }, [])

  return (
    <div className={cn("absolute inset-0 z-20 flex flex-wrap content-start pointer-events-none", className)}>
      {pixels.map((p) => (
        <Pixel key={p.id} progress={progress} threshold={p.threshold} />
      ))}
    </div>
  )
}
