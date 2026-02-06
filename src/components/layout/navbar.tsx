import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SunDimIcon } from "@/components/ui/sun-dim-icon"
import { MoonIcon } from "@/components/ui/moon-icon"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur-md",
        isScrolled && "bg-background/90 shadow-sm"
      )}
    >
      <div className="w-full px-6 md:px-8">
        <div className="flex items-center justify-end h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Toggle theme"
          >
            <div className="relative h-5 w-5">
              <div className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                <SunDimIcon size={20} />
              </div>
              <div className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                <MoonIcon size={20} />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  )
}
