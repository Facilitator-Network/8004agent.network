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
  const baseClasses = "relative font-mono uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 flex items-center justify-center gap-2"
  
  const variants = {
    primary: "bg-foreground text-background shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
    secondary: "bg-purple/10 text-purple border border-purple/30 backdrop-blur-md hover:bg-purple/20",
    outline: "bg-transparent text-foreground border border-border hover:border-purple/50 backdrop-blur-sm",
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
      {/* Hover Background Shift */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
      )}
      
      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
        {children}
      </span>

      {/* Scanline Effect on Hover */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] transition-opacity" />
      
      {/* Glass Shimmer on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.button>
  )
}
