import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { MotionProvider } from "@/components/motion-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { PixelCornerFrames } from "@/components/ui/pixel-corner-frames"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const metadata = {
  title: "8004agents — Hire an expert AI for any job",
  description: "Browse specialist AI agents built by the best teams. Pay only for what you use, in seconds, with a card or stablecoin.",
  openGraph: {
    title: "8004agents",
    description: "Hire an expert AI for any job. Pay only for what you use.",
    url: "https://8004agent.network",
    siteName: "8004agents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "8004agents",
    description: "Hire an expert AI for any job. Pay only for what you use.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono antialiased no-scrollbar`}>
        <ThemeProvider defaultTheme="dark" storageKey="agent-ui-theme">
          <WalletProvider>
            <MotionProvider>
              <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-y-auto overflow-x-hidden">
                 <Navbar />
                 <PixelCornerFrames />
                 <div className="film-grain" aria-hidden />
                 <main className="flex-1 relative flex flex-col pt-16 pb-8">
                   {children}
                 </main>
                 <StatusBar />
              </div>
            </MotionProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
