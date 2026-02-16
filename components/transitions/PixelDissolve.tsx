import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PixelDissolveProps {
  children: ReactNode
  isActive: boolean
  direction: "forward" | "backward"
}

export function PixelDissolve({ children, isActive }: PixelDissolveProps) {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ 
        opacity: 0,
        scale: 0.95
      }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
        filter: isActive 
          ? "blur(0px) contrast(1)" 
          : "blur(4px) contrast(1.2)"
      }}
      transition={{ 
        duration: 0.9, 
        ease: "easeOut"
      }}
      style={{
        imageRendering: isActive ? "auto" : "pixelated"
      }}
    >
      {children}
    </motion.div>
  )
}
