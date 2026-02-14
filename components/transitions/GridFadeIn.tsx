import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GridFadeInProps {
  children: ReactNode
  isActive: boolean
  direction: "forward" | "backward"
}

export function GridFadeIn({ children, isActive, direction }: GridFadeInProps) {
  // Create a grid overlay effect
  const gridSize = 20 // 20x20 grid
  const cells = Array.from({ length: gridSize * gridSize })

  return (
    <div className="w-full h-full relative">
      {/* Content */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: direction === "forward" ? 0.3 : 0
        }}
      >
        {children}
      </motion.div>

      {/* Grid overlay (only during transition) */}
      {!isActive && (
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none">
          {cells.map((_, index) => {
            const row = Math.floor(index / gridSize)
            const col = index % gridSize
            const delay = direction === "forward"
              ? (row + col) * 0.01
              : (gridSize * 2 - row - col) * 0.01

            return (
              <motion.div
                key={index}
                className="border border-foreground/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 0.4,
                  delay,
                  ease: "easeOut"
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
