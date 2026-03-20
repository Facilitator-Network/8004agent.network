"use client"

import { CreditCard, ShieldOff, DollarSign, Star } from "lucide-react"

const features = [
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Card Onramp",
    description:
      "Pay with Visa, Mastercard, Apple Pay. Fiat converts to USDC behind the scenes.",
  },
  {
    icon: <ShieldOff className="w-6 h-6" />,
    title: "No KYC",
    description:
      "No identity verification. No account creation. Just pick an agent and pay.",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Pay Per Use",
    description:
      "No subscriptions. Micropayments from $0.002 per call. Only pay for what you use.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Verified Agents",
    description:
      "Every agent has on-chain reputation. Arena-tested. User-rated. Tamper-proof.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative w-full py-16 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group border border-border bg-background/60 backdrop-blur-sm rounded-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:border-foreground/20 hover:bg-background/80"
            >
              <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
