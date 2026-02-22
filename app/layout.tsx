import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { Navbar } from "@/components/layout/navbar"
import { StatusBar } from "@/components/layout/status-bar"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const metadata = {
  title: "8004agent.network — ERC-8004 Agent Registry",
  description: "Deploy, hire, and interact with on-chain AI agents on the ERC-8004 standard. Multi-chain agent marketplace with gasless payments.",
  openGraph: {
    title: "8004agent.network",
    description: "On-chain AI Agent Registry — ERC-8004 Standard",
    url: "https://8004agent.network",
    siteName: "8004agent.network",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "8004agent.network",
    description: "On-chain AI Agent Registry — ERC-8004 Standard",
  },
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
          <WalletProvider>
            <div className="h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
               <Navbar />
               <main className="flex-1 relative overflow-hidden flex flex-col">
                 {children}
               </main>
               <StatusBar />
            </div>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
