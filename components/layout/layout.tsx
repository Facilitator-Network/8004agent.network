import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { StatusBar } from "./status-bar"
import { PixelCornerFrames } from "@/components/ui/pixel-corner-frames"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <PixelCornerFrames />
      <Navbar />
      <main className="flex-1 flex flex-col pb-10">
        {children}
      </main>
      <Footer />
      <StatusBar />
    </div>
  )
}
