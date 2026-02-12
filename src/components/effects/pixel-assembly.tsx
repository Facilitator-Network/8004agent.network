import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface PixelAssemblyProps {
  children: React.ReactNode
  isActive: boolean
}

export function PixelAssembly({ children, isActive }: PixelAssemblyProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isActive) {
      // Animate from 0 to 1 when section becomes active
      setProgress(0)
      const timer = setTimeout(() => setProgress(1), 50)
      return () => clearTimeout(timer)
    } else {
      // Animate from 1 to 0 when section becomes inactive
      setProgress(0)
    }
  }, [isActive])

  // Calculate pixel effect intensity (inverse of progress)
  const pixelIntensity = 1 - progress
  
  // Determine if we should use pixelated rendering
  const usePixelated = pixelIntensity > 0.3
  
  // Calculate blur amount (0-8px based on intensity)
  const blurAmount = pixelIntensity * 8
  
  // Calculate opacity (minimum 20% to keep content visible)
  const opacity = Math.max(0.2, progress)

  return (
    <motion.div
      style={{
        imageRendering: usePixelated ? 'pixelated' : 'auto',
        filter: `blur(${blurAmount}px)`,
        opacity,
        willChange: 'filter, opacity',
      }}
      animate={{
        opacity,
        filter: `blur(${blurAmount}px)`,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
