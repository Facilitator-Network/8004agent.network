import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { PixelTransitionWrapper } from "@/components/layout/pixel-transition-wrapper"

export const metadata = {
  title: "8004 AGENTS",
  description: "Agent Network",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="no-scrollbar">
        <ThemeProvider defaultTheme="light" storageKey="agent-ui-theme">
          <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
             <CursorGlow />
             <Navbar />
             <PixelTransitionWrapper />
             <main className="flex-1 relative overflow-hidden">
               {children}
             </main>
             <StatusBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
