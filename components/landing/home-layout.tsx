"use client"

import { ReactNode, useEffect, useState } from "react"
import PixelBlast from "@/components/ui/pixel-blast"
import { PixelCornerFrames } from "@/components/ui/pixel-corner-frames"
import { useTheme } from "@/components/theme-provider"

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pixelColor = theme === "light" ? "#5b21b6" : "#B19EEF"

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <PixelCornerFrames />
      
      {/* Fixed Background */}
      <div className="fixed top-20 bottom-12 left-8 right-8 z-0 opacity-40">
        {mounted && (
          <PixelBlast
            variant="square"
            pixelSize={2}
            color={pixelColor}
            patternScale={6}
            patternDensity={1.4}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.2}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={3}
            speed={1.25}
            edgeFade={0.25}
            enableHover
            hoverPixelStrength={0.4}
            transparent
          />
        )}
      </div>

      {/* Scrollable Container with Snapping */}
      <div className="relative w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory md:snap-proximity scroll-smooth no-scrollbar">
        {children}
      </div>
    </div>
  )
}
