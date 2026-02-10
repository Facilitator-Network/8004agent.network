import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScanlineWipeProps {
  children: ReactNode
  isActive: boolean
  direction: "forward" | "backward"
}

export function ScanlineWipe({ children, isActive, direction }: ScanlineWipeProps) {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ 
        clipPath: direction === "forward" 
          ? "inset(0 100% 0 0)" 
          : "inset(0 0 0 100%)" 
      }}
      animate={{ 
        clipPath: isActive 
          ? "inset(0 0 0 0)" 
          : direction === "forward"
            ? "inset(0 0 0 100%)"
            : "inset(0 100% 0 0)"
      }}
      transition={{ 
        duration: 0.8, 
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  )
}
