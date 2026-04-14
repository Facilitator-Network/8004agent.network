"use client"

import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HudButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode
  href?: string
  variant?: "primary" | "secondary"
}

export function HudButton({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: HudButtonProps) {
  const cls = cn("hud-button", `hud-button--${variant}`, className)
  const content = (
    <span className="hud-button__inner">
      <span className="hud-button__label">
        {children}
        <span className="hud-button__arrow" aria-hidden>
          ›››
        </span>
      </span>
    </span>
  )
  if (href) {
    return (
      <Link href={href} className={cls} {...(props as Record<string, unknown>)}>
        {content}
      </Link>
    )
  }
  return (
    <button className={cls} {...props}>
      {content}
    </button>
  )
}
