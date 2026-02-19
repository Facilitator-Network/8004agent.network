"use client"

import { createContext, useContext, useRef, type RefObject, type ReactNode } from "react"

interface ScrollContextType {
  scrollContainerRef: RefObject<HTMLDivElement | null>
}

const ScrollContext = createContext<ScrollContextType>({
  scrollContainerRef: { current: null },
})

export function useScrollContainer() {
  return useContext(ScrollContext)
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      {children}
    </ScrollContext.Provider>
  )
}
