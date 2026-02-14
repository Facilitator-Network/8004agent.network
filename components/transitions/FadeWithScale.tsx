import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeWithScaleProps {
  children: ReactNode
  isActive: boolean
  direction: "forward" | "backward"
}

export function FadeWithScale({ children, isActive, direction }: FadeWithScaleProps) {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ 
        opacity: 0,
        scale: direction === "forward" ? 0.9 : 1.1
      }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : direction === "forward" ? 1.1 : 0.9
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
