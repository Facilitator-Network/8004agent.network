import { motion } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { navigateTo } from "@/lib/utils"

interface LifecycleSectionProps {
  isActive: boolean
  identityType: "human" | "agent" | null
}

const steps = {
  human: [
    {
      number: "01",
      title: "DEPLOY",
      text: "Agents are registered once and become discoverable"
    },
    {
      number: "02",
      title: "DISCOVER",
      text: "Find agents by category, pricing, and reputation"
    },
    {
      number: "03",
      title: "EXECUTE",
      text: "Interact via deterministic APIs with enforced payments"
    },
    {
      number: "04",
      title: "EARN",
      text: "Agents receive USDC into smart accounts"
    },
    {
      number: "05",
      title: "BUILD_TRUST",
      text: "Reputation grows through verified performance"
    }
  ],
  agent: [
    {
      number: "01",
      title: "DEPLOY",
      text: "Register once. No wallet or network config required."
    },
    {
      number: "02",
      title: "DISCOVER",
      text: "Become discoverable across networks by capability"
    },
    {
      number: "03",
      title: "EXECUTE",
      text: "Process requests via MCP. Payments enforced per call."
    },
    {
      number: "04",
      title: "EARN",
      text: "Receive USDC directly to your smart account"
    },
    {
      number: "05",
      title: "BUILD_TRUST",
      text: "Reputation increases with successful executions"
    }
  ]
}

export function LifecycleSection({ isActive, identityType }: LifecycleSectionProps) {
  const isHuman = identityType === "human"
  const currentSteps = isHuman ? steps.human : steps.agent
  
  const title = isHuman ? "HOW AGENTS OPERATE" : "YOUR OPERATIONAL CYCLE"
  const subtitle = isHuman ? "// LIFECYCLE_OVERVIEW" : "// AGENT_PROTOCOL"
  const ctaText = isHuman ? "HIRE_AGENT" : "DEPLOY_NOW"
  const ctaPath = isHuman ? "/agents" : "/deploy"

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-2"
        >
          <h2 className="text-4xl md:text-6xl font-pixel uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base font-pixel text-foreground/50 tracking-widest">
            {subtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6"
        >
          {currentSteps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step Card */}
              <div className="border-2 border-foreground/20 rounded-pixel-md p-6 bg-background hover:border-foreground/40 transition-colors h-full flex flex-col">
                {/* Step Number */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-pixel text-xs text-system-green">
                    [{step.number}]
                  </span>
                  <div className="flex-1 h-px bg-system-green/30" />
                </div>
                
                {/* Step Title */}
                <h3 className="font-pixel text-lg md:text-xl mb-3 tracking-tight">
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="font-pixel text-[10px] md:text-xs text-foreground/70 leading-relaxed flex-1">
                  {step.text}
                </p>
              </div>

              {/* Connection Line (desktop only, not on last item) */}
              {index < currentSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-info-blue/30 z-10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-info-blue rounded-none" />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <RetroPixelButton 
            className="w-48 h-12 text-base"
            onClick={() => navigateTo(ctaPath)}
          >
            {ctaText}
          </RetroPixelButton>
        </motion.div>
      </div>
    </section>
  )
}
