import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

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
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased no-scrollbar`}>
        <ThemeProvider defaultTheme="dark" storageKey="agent-ui-theme">
          <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
             <Navbar />
             <main className="flex-1 relative overflow-hidden flex flex-col">
               {children}
             </main>
             <StatusBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
