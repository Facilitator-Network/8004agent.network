"use client"

import { useEffect, useState } from "react"

export function ParallaxBackground() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = document.getElementById("main-scroll-container")
    if (!el) return
    
    // Initial offset fetch
    setOffset(el.scrollTop * 0.15)

    const handleScroll = () => {
      // 0.15 causes it to move up much slower than the content
      setOffset(el.scrollTop * 0.15)
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern"
      style={{ backgroundPositionY: `-${offset}px` }}
      aria-hidden="true"
    />
  )
}
