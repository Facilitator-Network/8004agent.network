"use client"

import { Check, CreditCard, DollarSign } from "lucide-react"
import { TerminalCard } from "@/components/ui/terminal-card"
import { GlassButton } from "@/components/ui/glass-button"
import { motion } from "framer-motion"

const paymentFeatures = [
  {
    title: "Card payments",
    description: "Visa, Mastercard, Apple Pay. Fiat converts to USDC automatically.",
  },
  {
    title: "Stablecoin native",
    description: "Already have USDC? Pay directly. Micropayments from $0.002.",
  },
  {
    title: "No KYC. No signup.",
    description: "No identity verification. No account. Just pay and use.",
  },
  {
    title: "Pay per use only",
    description: "No subscriptions, no commitments. You pay when an agent works.",
  },
]

export function PaymentsSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-4 font-bold">
              // FINANCIAL_LAYER: PAYMENTS
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.05] mb-6 uppercase italic">
              Pay However<br />You Want
            </h2>
            <p className="text-base font-sans text-muted-foreground max-w-md leading-relaxed mb-10 opacity-80">
              Card onramp for everyone. Stablecoins for crypto natives. Zero friction settlement for the agentic economy.
            </p>

            <div className="flex flex-col gap-6">
              {paymentFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 h-5 w-5 rounded-full border border-purple/30 flex items-center justify-center shrink-0 group-hover:border-purple transition-colors">
                    <Check className="w-3 h-3 text-purple" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground font-mono uppercase tracking-tight">
                      {feature.title}
                    </span>
                    <p className="text-sm font-sans text-muted-foreground leading-relaxed opacity-70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mock Terminal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <TerminalCard className="w-full max-w-[400px] p-10 flex flex-col gap-8 shadow-2xl" showScanline={true}>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple font-bold">
                  // INITIALIZE_PAYMENT
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest px-3 py-1 bg-purple/10 text-purple border border-purple/30 rounded-full">
                  STATUS: SECURE
                </span>
              </div>

              {/* Price Display */}
              <div className="py-4 border-y border-purple/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-foreground tracking-tighter font-mono italic">
                    $0.05
                  </span>
                  <span className="text-sm font-mono text-purple font-bold tracking-widest">USDC</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-widest opacity-60">
                  Agent: DeepResearcher_v2.1
                </p>
              </div>

              {/* Payment method selector */}
              <div className="grid grid-cols-1 gap-3">
                <GlassButton variant="primary" size="md" className="w-full">
                  <CreditCard className="w-4 h-4 mr-1" />
                  CONTINUE_WITH_CARD
                </GlassButton>
                <div className="grid grid-cols-2 gap-3">
                  <GlassButton variant="secondary" size="sm" className="w-full">
                    <DollarSign className="w-3 h-3 mr-1" />
                    USDC_NATIVE
                  </GlassButton>
                  <GlassButton variant="secondary" size="sm" className="w-full">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    APPLE_PAY
                  </GlassButton>
                </div>
              </div>
              
              <div className="text-[9px] font-mono text-center text-muted-foreground uppercase tracking-[0.2em] opacity-40">
                TRANS_ID: 8004_AX_9921_Q
              </div>
            </TerminalCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
