"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SunDimIcon } from "@/components/ui/sun-dim-icon"
import { MoonIcon } from "@/components/ui/moon-icon"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/deploy", label: "Deploy" },
  { href: "/agents", label: "Agents" },
  { href: "/arena", label: "Arena" },
  { href: "/explorer", label: "Explorer" },
  { href: "/docs", label: "Docs" },
]

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getLinkOpacity = (href: string) => {
    // If hovering any link
    if (hoveredPath !== null) {
      // Hovered link is white (opacity-100)
      if (href === hoveredPath) return "opacity-100"
      // All other links (including active) are grey (opacity-50)
      return "opacity-50"
    }
    // No hover: active link is white, others are grey
    return href === pathname ? "opacity-100" : "opacity-50"
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur-md",
        isScrolled && "bg-background/90 shadow-sm"
      )}
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      <div className="w-full px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-14">
          {/* Left: Branding */}
          <div className="flex items-center">
            <Link href="/" className="text-xs md:text-sm font-bold tracking-tight flex items-center gap-[0.25em]">
              <span>8004</span>
              <span>AGENTS</span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-[10px]">
             {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-opacity duration-200",
                  getLinkOpacity(link.href)
                )}
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Login + Theme Toggle */}
          <div className="flex items-center gap-3">
            <button className="text-[10px] px-3 py-2 border border-current rounded-pixel-md hover:bg-foreground hover:text-background transition-colors">
              LOGIN
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 w-8"
              aria-label="Toggle theme"
            >
              <div className="relative h-4 w-4">
                <div className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                  <SunDimIcon size={16} />
                </div>
                <div className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                  <MoonIcon size={16} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
