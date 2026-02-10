import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SlideWithBlurProps {
  children: ReactNode
  isActive: boolean
  direction: "forward" | "backward"
}

export function SlideWithBlur({ children, isActive, direction }: SlideWithBlurProps) {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ 
        x: direction === "forward" ? "100%" : "-100%",
        filter: "blur(8px)"
      }}
      animate={{ 
        x: isActive ? "0%" : direction === "forward" ? "-100%" : "100%",
        filter: isActive ? "blur(0px)" : "blur(8px)"
      }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
