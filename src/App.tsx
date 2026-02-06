import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { SubBar } from "@/components/layout/sub-bar"
import { HeroSection } from "@/components/landing/hero-section"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen w-full bg-background text-foreground flex flex-col relative">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-4 pb-16 overflow-hidden relative">
          <HeroSection />
        </main>
        <SubBar />
      </div>
    </ThemeProvider>
  )
}

export default App
