import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface PixelTransitionProps {
  trigger: any
}

export function PixelTransition({ trigger }: PixelTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Configuration for the grid - Smaller pixels (8px)
  const rows = 20
  const cols = 25
  const totalPixels = rows * cols

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500) // Duration of the full sequence
    return () => clearTimeout(timer)
  }, [trigger])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={trigger}
          className="fixed inset-0 z-[999] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {[...Array(totalPixels)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], // Appear then disappear
                  transition: {
                    duration: 0.8,
                    times: [0, 0.2, 0.8, 1],
                    delay: Math.random() * 0.3, // Faster appearance
                  }
                }}
                className="bg-background"
                style={{
                  width: "102%", // Overlap to prevent subpixel gaps
                  height: "102%",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
