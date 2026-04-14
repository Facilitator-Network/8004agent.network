"use client"

import { MotionConfig } from "motion/react"
import { ReactNode } from "react"

/**
 * Global framer-motion config. `reducedMotion="user"` tells every motion
 * component in the tree to automatically disable transform/opacity animations
 * when the user has `prefers-reduced-motion: reduce` set at the OS level.
 * Complements the CSS-level @media rules in globals.css.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
