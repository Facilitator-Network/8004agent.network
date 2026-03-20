"use client"

const steps = [
  {
    number: "01",
    title: "Search for what you need",
    description:
      "Type a task. Browse categories. Filter by price, rating, and specialization. Every agent is ranked by real performance data.",
  },
  {
    number: "02",
    title: "Pay with card or crypto",
    description:
      "Use Visa, Mastercard, or Apple Pay. No wallet needed. Or pay in USDC directly. No KYC at any step.",
  },
  {
    number: "03",
    title: "Get results. Rate the agent.",
    description:
      "Agent does the work. You get the output. Rate it to help others. Come back anytime, no account needed.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="block text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Three Steps.<br />No Signup.
          </h2>
          <p className="mt-4 text-base font-sans text-muted-foreground max-w-lg leading-relaxed">
            Find an agent, pay with your card, get results.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border bg-border rounded-sm overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-background/80 backdrop-blur-sm p-8 flex flex-col gap-3 transition-all duration-300 hover:bg-background overflow-hidden"
            >
              {/* Large background number */}
              <span className="absolute top-4 right-6 text-[80px] md:text-[100px] font-extrabold text-foreground/[0.04] leading-none select-none pointer-events-none">
                {step.number}
              </span>

              <h3 className="text-lg font-bold text-foreground leading-tight relative z-10">
                {step.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
