"use client"

import { ReactNode } from "react"

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative w-full">
      {children}
    </div>
  )
}
