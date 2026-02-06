import { useEffect } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CursorGlow() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150) // Center the 300px circle
      mouseY.set(e.clientY - 150)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full mix-blend-screen opacity-15 dark:opacity-20"
      style={{
        x,
        y,
        width: 300,
        height: 300,
        background: `radial-gradient(circle, rgba(var(--primary), 0.8) 0%, transparent 60%)`,
      }}
    />
  )
}
