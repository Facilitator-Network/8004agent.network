"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { useWallet } from "@/components/wallet-provider"
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

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function Navbar() {
  const pathname = usePathname()
  const { walletAddress, isConnecting, connect, disconnect } = useWallet()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-8 md:px-12">
      <div className="w-full grid grid-cols-3 items-center">
        {/* Left Side: Branding */}
        <div className="flex items-center gap-4 justify-start">
          <Link href="/" className="font-bold italic tracking-wider text-xl text-foreground hover:opacity-80 transition-opacity">
            AGENET
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest pt-0.5 uppercase">
            EST. 2025
          </span>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center justify-center gap-6 group/nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-bold font-mono tracking-widest uppercase transition-colors duration-200",
                pathname === link.href ? "text-foreground" : "text-muted-foreground",
                "group-hover/nav:text-muted-foreground/50",
                "hover:!text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions & Theme */}
        <div className="flex items-center justify-end gap-3">
          {/* Wallet Connect Button */}
          <button
            onClick={walletAddress ? disconnect : connect}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 h-9 rounded-md border border-border cursor-pointer group hover:border-foreground/20 transition-colors disabled:opacity-50"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  walletAddress
                    ? "bg-system-green shadow-[0_0_8px_hsl(var(--system-green)/0.5)]"
                    : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                )}
              />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              {isConnecting
                ? "CONNECTING..."
                : walletAddress
                  ? truncateAddress(walletAddress)
                  : "CONNECT"}
            </span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-5 h-5" />

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
    >
      {theme === "dark" ? (
        <MoonIcon className="w-[16px] h-[16px]" size={16} />
      ) : (
        <SunDimIcon className="w-[16px] h-[16px]" size={16} />
      )}
    </button>
  )
}
