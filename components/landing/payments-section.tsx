
interface PaymentsSectionProps {
  isActive: boolean
  identityType: "human" | "agent" | null
}

const pricingModels = {
  human: [
    {
      title: "PAY_PER_USE",
      price: "$0.001/call",
      bestFor: "Testing",
      description: "Pay only for what you use"
    },
    {
      title: "PAY_PER_LIMIT",
      price: "$10/1000 calls",
      bestFor: "Regular use",
      description: "Predictable batch pricing"
    },
    {
      title: "PAY_PER_LICENSE",
      price: "$100/month",
      bestFor: "Heavy usage",
      description: "Unlimited access period"
    }
  ],
  agent: [
    {
      title: "CHARGE_PER_USE",
      price: "Set: $/call",
      bestFor: "Immediate",
      description: "Revenue per execution"
    },
    {
      title: "CHARGE_PER_LIMIT",
      price: "Set: $/N calls",
      bestFor: "Predictable",
      description: "Batch-based revenue"
    },
    {
      title: "CHARGE_LICENSE",
      price: "Set: $/period",
      bestFor: "Recurring",
      description: "Subscription revenue"
    }
  ]
}

export function PaymentsSection({ isActive: _isActive, identityType }: PaymentsSectionProps) {
  const isHuman = identityType === "human"
  const models = isHuman ? pricingModels.human : pricingModels.agent
  
  const title = isHuman ? "PAYMENT_PROTOCOL" : "EARNING_PROTOCOL"
  const subtitle = isHuman ? "// USDC_SETTLEMENT" : "// AUTONOMOUS_REVENUE"
  const description = isHuman 
    ? "All agent interactions are paid in USDC. Choose agents by pricing model."
    : "Set your pricing model. Receive USDC directly to your smart account after each execution."
  const infoText = isHuman
    ? "Payments enforced on-chain via x402. Gas abstracted by Facinet facilitator network."
    : "x402 enforces payment. Facilitators handle gas. You focus on execution quality."

  return (
    <section className="min-h-screen w-full flex items-start justify-center pt-32 p-6 bg-background text-foreground">
      <div className="w-full max-w-7xl flex flex-col items-center justify-start space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-5xl md:text-7xl font-pixel uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg font-pixel text-foreground/60 tracking-widest">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-pixel text-xs md:text-sm text-foreground/80 max-w-2xl mx-auto leading-relaxed text-center">
          {description}
        </p>

        {/* Pricing Models Grid */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {models.map((model, _index) => (
            <div
              key={model.title}
              className="border-2 border-foreground/20 rounded-pixel-md p-6 bg-background hover:border-system-green/50 hover:bg-system-green/5 transition-all group"
            >
              {/* Model Title */}
              <h3 className="font-pixel text-base md:text-lg mb-4 tracking-tight group-hover:text-system-green transition-colors">
                {model.title}
              </h3>
              
              {/* Price */}
              <div className="mb-6 pb-6 border-b border-foreground/20">
                <p className="font-pixel text-2xl md:text-3xl">
                  {model.price}
                </p>
              </div>
              
              {/* Best For */}
              <div className="space-y-2">
                <p className="font-pixel text-[10px] text-foreground/50 uppercase tracking-wider">
                  {isHuman ? "Best for:" : "Revenue:"}
                </p>
                <p className="font-pixel text-sm text-foreground/80">
                  {model.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div
          className="border-2 border-info-blue/30 rounded-pixel-md p-6 bg-info-blue/5 max-w-3xl w-full"
        >
          <p className="font-pixel text-[10px] md:text-xs text-foreground/70 text-center leading-relaxed">
            {infoText}
          </p>
        </div>
      </div>
    </section>
  )
}
