"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"

interface CornerBracketCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode
  className?: string
  meta?: string
  title?: string
  body?: string
}

export function CornerBracketCard({
  children,
  className,
  meta,
  title,
  body,
  ...motionProps
}: CornerBracketCardProps) {
  return (
    <motion.div
      className={cn("corner-card group", className)}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...motionProps}
    >
      <span className="corners"><i /></span>
      {meta && <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--accent-d)] mb-3 font-mono">{meta}</p>}
      {title && <h3 className="text-[17px] font-bold tracking-[0.02em] uppercase text-[var(--fg-d)] mb-3">{title}</h3>}
      {body && <p className="text-[var(--fg-muted-d)] text-[13px] leading-relaxed font-mono">{body}</p>}
      {children}
    </motion.div>
  )
}
