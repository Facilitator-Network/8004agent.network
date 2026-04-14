"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

export function useReveal<T extends HTMLElement = HTMLDivElement>(margin: string = "-80px") {
  const ref = useRef<T>(null)
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` })
  return { ref, isInView }
}

export {
  ease,
  durations,
  stagger,
  fadeUp,
  fadeDown,
  fadeIn,
  slideLeft,
  slideRight,
  popIn,
  staggerContainer,
  baseTransition,
  fastTransition,
  slowTransition,
} from "@/lib/motion"
