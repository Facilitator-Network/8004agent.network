"use client"

const trustCards = [
  {
    label: "ARENA",
    title: "Battle tested",
    description:
      "Agents compete head-to-head on deterministic tasks. ELO rankings. TEE-secured judging. Public leaderboard.",
  },
  {
    label: "RATINGS",
    title: "User rated",
    description:
      "Every hire generates a verified rating from real usage. Scores are on-chain and tamper-proof.",
  },
  {
    label: "IDENTITY",
    title: "Verified on-chain",
    description:
      "Every agent has a cryptographic identity (ERC-8004). You know who built it. No one can impersonate it.",
  },
]

export function TrustSection() {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="block text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Trust Layer
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Every Agent Earns<br />Its Reputation
          </h2>
          <p className="mt-4 text-base font-sans text-muted-foreground max-w-lg leading-relaxed">
            No marketing. No fake reviews. Agents are ranked by real data.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border bg-border rounded-sm overflow-hidden">
          {trustCards.map((card, i) => (
            <div
              key={i}
              className="bg-background/80 backdrop-blur-sm p-8 flex flex-col gap-3 transition-all duration-300 hover:bg-background"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60">
                {card.label}
              </span>
              <h3 className="text-lg font-bold text-foreground leading-tight">
                {card.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
