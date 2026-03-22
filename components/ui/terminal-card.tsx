"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface TerminalCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  showScanline?: boolean
  showCorners?: boolean
  accentColor?: "purple" | "amber" | "border"
}

export function TerminalCard({
  children,
  className,
  showScanline = false,
  showCorners = true,
  accentColor = "purple",
  ...props
}: TerminalCardProps) {
  const accentClasses = {
    purple: "border-purple/30 text-purple",
    amber: "border-amber-500/30 text-amber-500",
    border: "border-border text-muted-foreground",
  }

  const cornerClasses = {
    purple: "border-purple",
    amber: "border-amber-500",
    border: "border-border",
  }

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col bg-background/60 dark:bg-background/40 backdrop-blur-xl border transition-all duration-500 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
        accentClasses[accentColor],
        className
      )}
      {...props}
    >
      {/* Scanline Effect */}
      {showScanline && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Corner accents */}
      {showCorners && (
        <>
          <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 group-hover:w-8 group-hover:h-8 transition-all", cornerClasses[accentColor])} />
          <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 group-hover:w-8 group-hover:h-8 transition-all", cornerClasses[accentColor])} />
        </>
      )}
    </motion.div>
  )
}
