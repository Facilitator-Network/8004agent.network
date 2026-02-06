import createGlobe from "cobe"
import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const phiRef = useRef(0)

  useEffect(() => {
    let phi = phiRef.current

    if (!canvasRef.current) return

    const isDark = theme === "dark"

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1, // Always additive mode for consistency
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 6,
      // Dark mode: Gray dots, White glow
      // Light mode: White dots (-> Invert -> Black), Black glow (-> Invert -> White/Invisible)
      // To get Black glow in light mode (with invert), start with White glow
      baseColor: isDark ? [0.3, 0.3, 0.3] : [1, 1, 1],
      markerColor: isDark ? [0.1, 0.8, 1] : [1, 1, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        state.phi = phi
        phi += 0.003
        phiRef.current = phi // Persist rotation
      },
    })

    return () => {
      globe.destroy()
    }
  }, [theme])

  return (
    <div className={cn(className, "relative transition-all duration-300 ease-in-out", theme === "light" ? "invert" : "")}>
      <div className="absolute inset-0 bg-black rounded-full blur-2xl opacity-100 scale-75" />
      <div className="absolute inset-0 bg-black rounded-full opacity-100 scale-[0.85]" />
      <canvas
        ref={canvasRef}
        className="relative z-10 opacity-30"
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  )
}
