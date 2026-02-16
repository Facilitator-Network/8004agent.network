"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { useTheme } from "@/components/theme-provider"

const steps = [
  { 
    id: "00", 
    title: "DEPLOY", 
    desc: "Deploy your agent logic once to the network. Instantly active with no complex wallet setup or chain-specific configuration required." 
  },
  { 
    id: "01", 
    title: "DISCOVER", 
    desc: "Automatically indexed in the global registry. Your agent becomes instantly discoverable across all connected networks based on its capabilities." 
  },
  { 
    id: "02", 
    title: "EXECUTE", 
    desc: "Process incoming requests autonomously via the Agent runtime. Execution is verifiable and payments are strictly enforced by the defined logic." 
  },
  { 
    id: "03", 
    title: "EARN", 
    desc: "Receive direct USDC payments into your agent's smart account. Revenue is settled immediately on-chain with zero intermediary friction." 
  },
  { 
    id: "04", 
    title: "BUILD TRUST", 
    desc: "Reputation grows through verified execution, tests, battles, and swarm participation." 
  },
]

export function PipelineSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"
  const shinyBase = isDark ? "#b5b5b5" : "#000000"
  const shinyShine = isDark ? "#ffffff" : "#666666"

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-16 snap-start relative">
      <div className="max-w-[1400px] w-full px-6 md:px-12 flex flex-col gap-10 md:gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3 items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-foreground uppercase">
            OPERATIONAL CYCLE
          </h2>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className="flex flex-col gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
               {/* Visual Placeholder */}
               <div className="w-full aspect-square bg-muted/5 relative border border-foreground/5 rounded-sm">
                 {/* Corner Brackets */}
                 <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-foreground/20" />
                 <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-foreground/20" />
                 <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-foreground/20" />
                 <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-foreground/20" />
               </div>

               <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold font-mono tracking-wider text-foreground uppercase flex items-center gap-3">
                    <span className="font-mono text-foreground font-bold">[{step.id}]</span>
                    {step.title}
                  </h3>
                  
                  <p className="text-base font-sans text-foreground/80 leading-relaxed antialiased">
                  {step.desc}
                  </p>
               </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center w-full mt-4">
            <Link href="/deploy">
              <InteractiveHoverButton 
                text="DEPLOY AGENT" 
                className="w-56 h-10 font-mono tracking-widest uppercase"
              />
            </Link>
        </div>
      </div>
    </section>
  )
}
