"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export function GlassButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: GlassButtonProps) {
  const baseClasses = "relative font-mono uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-[var(--accent-d)] focus-visible:outline-offset-[6px]"

  const variants = {
    primary: "bg-[var(--fg-d)] text-[var(--bg-d)] shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_var(--accent-glow)]",
    secondary: "bg-[color-mix(in_srgb,var(--accent-d)_10%,transparent)] text-[var(--accent-d)] border border-[color-mix(in_srgb,var(--accent-d)_30%,transparent)] backdrop-blur-md hover:bg-[color-mix(in_srgb,var(--accent-d)_20%,transparent)]",
    outline: "bg-transparent text-[var(--fg-d)] border border-[var(--border-d)] hover:border-[color-mix(in_srgb,var(--accent-d)_50%,transparent)] backdrop-blur-sm",
  }

  const sizes = {
    sm: "px-6 py-2 text-[10px]",
    md: "px-10 py-4 text-xs",
    lg: "px-12 py-5 text-sm",
  }

  return (
    <motion.button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}
