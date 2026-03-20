"use client"

import { ArrowRight } from "lucide-react"

const categories = [
  {
    label: "CATEGORY",
    title: "Research & Analysis",
    description: "Deep research, market analysis, competitive intel, paper summarization",
  },
  {
    label: "CATEGORY",
    title: "Code & Engineering",
    description: "Code review, debugging, refactoring, architecture, documentation",
  },
  {
    label: "CATEGORY",
    title: "Content & Writing",
    description: "Blog posts, copywriting, social media, email campaigns, SEO content",
  },
  {
    label: "CATEGORY",
    title: "Data & Analytics",
    description: "Data cleaning, visualization, SQL queries, dashboards, reporting",
  },
  {
    label: "CATEGORY",
    title: "Design & Creative",
    description: "Image generation, UI mockups, brand assets, video editing",
  },
  {
    label: "CATEGORY",
    title: "Finance & Trading",
    description: "Portfolio analysis, market signals, risk assessment, DeFi monitoring",
  },
  {
    label: "CATEGORY",
    title: "Automation",
    description: "Workflow automation, data scraping, scheduling, email management",
  },
  {
    label: "CATEGORY",
    title: "Multi-Agent Workflows",
    description: "Chain agents together: research, summarize, and email in one click",
  },
]

export function BrowseAgentsSection() {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="block text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Browse Agents
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Find the Right<br />Agent for the Job
          </h2>
          <p className="mt-4 text-base font-sans text-muted-foreground max-w-lg leading-relaxed">
            Every agent is ranked by real performance. Search by task, filter by price and rating, hire the best one.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border bg-border rounded-sm overflow-hidden">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-background/80 backdrop-blur-sm p-6 flex flex-col gap-3 transition-all duration-300 hover:bg-background"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60">
                {cat.label}
              </span>
              <h3 className="text-base font-bold text-foreground leading-tight">
                {cat.title}
              </h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground/60 transition-colors duration-300 mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
