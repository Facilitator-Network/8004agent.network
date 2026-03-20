"use client"

import { Check, CreditCard, DollarSign } from "lucide-react"

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
    <section className="relative w-full py-20 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Payments
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-4">
              Pay However<br />You Want
            </h2>
            <p className="text-base font-sans text-muted-foreground max-w-md leading-relaxed mb-8">
              Card onramp for everyone. Stablecoins for crypto users. Zero friction.
            </p>

            <div className="flex flex-col gap-5">
              {paymentFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-purple mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm font-bold text-foreground">
                      {feature.title}
                    </span>
                    <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock Card */}
          <div className="flex items-center justify-center">
            <div className="border border-border bg-background/80 backdrop-blur-sm rounded-lg p-8 w-full max-w-[360px] flex flex-col gap-5 shadow-lg">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Hire Agent
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 border border-purple/30 text-purple rounded-full">
                  No KYC
                </span>
              </div>

              {/* Price */}
              <div>
                <span className="text-4xl font-extrabold text-foreground tracking-tight">
                  $0.05
                </span>
                <p className="text-sm font-sans text-muted-foreground mt-1">
                  DeepResearcher · 1 call
                </p>
              </div>

              {/* Payment method buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center gap-1.5 bg-foreground text-background rounded-lg py-3 transition-all duration-200">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">Card</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 border border-border bg-transparent rounded-lg py-3 text-foreground hover:bg-foreground/5 transition-all duration-200">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">USDC</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 border border-border bg-transparent rounded-lg py-3 text-foreground hover:bg-foreground/5 transition-all duration-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <span className="text-[10px] font-mono uppercase tracking-wider">Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
