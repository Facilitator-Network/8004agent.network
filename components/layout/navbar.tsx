"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/deploy", label: "Deploy" },
  { href: "/agents", label: "Agents" },
  { href: "/arena", label: "Arena" },
  { href: "/explorer", label: "Explorer" },
  { href: "/docs", label: "Docs" },
]


export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  useEffect(() => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [mobileMenuOpen])

  return (
    <>
      <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-[100] h-16 px-8 grid grid-cols-[1fr_auto_1fr] items-center bg-[var(--bg-d)]/20 backdrop-blur-md border-b border-[var(--border-soft-d)]">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-serif italic text-2xl tracking-tight text-[var(--fg-d)] hover:opacity-80 transition-opacity"
          >
            8004agents
          </Link>
          <div className="w-px h-[18px] bg-[var(--border-d)]" />
          <span className="text-[11px] tracking-[0.08em] text-[var(--fg-muted-d)] font-mono">
            EST. 2025
          </span>
        </div>

        {/* Center: Navigation (desktop) / menu trigger (mobile) */}
        <div className="flex items-center justify-center">
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[12px] font-medium font-mono tracking-[0.12em] uppercase transition-colors duration-75 py-1",
                    isActive
                      ? "text-[var(--fg-d)]"
                      : "text-[var(--fg-muted-d)] hover:text-[var(--fg-d)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-px bg-[var(--accent-d)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium font-mono tracking-[0.12em] uppercase text-[var(--fg-d)] outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-[var(--accent-d)] focus-visible:outline-offset-[4px]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
          >
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block w-4 h-px bg-current" />
              <span className="block w-4 h-px bg-current" />
              <span className="block w-4 h-px bg-current" />
            </span>
            MENU
          </button>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/login" className="nav-login">
            <span className="nav-login__inner">
              <span aria-hidden="true" className="nav-login__dot animate-status-pulse" />
              <span className="nav-login__label">Log in</span>
              <span aria-hidden="true" className="nav-login__chev">›</span>
            </span>
          </Link>

          <ThemeToggle />
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="md:hidden fixed inset-0 z-[110] bg-[var(--bg-d)] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between h-16 px-8 border-b border-[var(--border-soft-d)]">
              <span className="font-serif italic text-2xl text-[var(--fg-d)]">8004agents</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium font-mono tracking-[0.12em] uppercase text-[var(--fg-d)] outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-[var(--accent-d)] focus-visible:outline-offset-[4px]"
              >
                CLOSE
              </button>
            </div>
            <ul className="flex-1 flex flex-col justify-center gap-6 px-8 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block text-[28px] font-medium font-mono tracking-[0.08em] uppercase transition-colors",
                        isActive
                          ? "text-[var(--accent-d)]"
                          : "text-[var(--fg-muted-d)] hover:text-[var(--fg-d)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 inline-flex items-center justify-center rounded-full text-[var(--fg-muted-d)] hover:text-[var(--fg-d)] hover:bg-[var(--surface-d)] transition-all duration-75"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
