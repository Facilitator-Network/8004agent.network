import type { Variants, Transition } from "framer-motion"

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  in: [0.5, 0, 0.75, 0] as const,
}

export const durations = {
  fast: 0.35,
  base: 0.6,
  slow: 0.8,
} as const

export const stagger = {
  tight: 0.06,
  base: 0.1,
} as const

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: ease.out },
  },
}

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: ease.out },
  },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: durations.base, ease: ease.out },
  },
}

export const slideLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.base, ease: ease.out },
  },
}

export const slideRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.base, ease: ease.out },
  },
}

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
}

export const staggerContainer = (
  options: { children?: number; delay?: number } = {}
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: options.children ?? stagger.base,
      delayChildren: options.delay ?? 0,
    },
  },
})

export const baseTransition: Transition = {
  duration: durations.base,
  ease: ease.out,
}

export const fastTransition: Transition = {
  duration: durations.fast,
  ease: ease.out,
}

export const slowTransition: Transition = {
  duration: durations.slow,
  ease: ease.out,
}
