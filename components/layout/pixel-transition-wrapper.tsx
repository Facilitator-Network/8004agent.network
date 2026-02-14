"use client"
import { usePathname } from "next/navigation"
import { PixelTransition } from "./pixel-transition"

export function PixelTransitionWrapper() {
  const pathname = usePathname()
  return <PixelTransition trigger={pathname} />
}
