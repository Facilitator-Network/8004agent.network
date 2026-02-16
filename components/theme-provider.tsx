"use client"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  forceTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "agent-ui-theme",
  forceTheme,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(forceTheme || defaultTheme)

  useEffect(() => {
    if (forceTheme) return
    const storedTheme = localStorage.getItem(storageKey) as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [forceTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    const effectiveTheme = forceTheme || theme

    if (effectiveTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(effectiveTheme)
  }, [theme, forceTheme])

  const value = {
    theme: forceTheme || theme,
    setTheme: (newTheme: Theme) => {
      if (forceTheme) return
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
