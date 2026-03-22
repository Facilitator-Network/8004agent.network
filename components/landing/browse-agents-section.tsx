"use client"

import { ArrowRight } from "lucide-react"
import { TerminalCard } from "@/components/ui/terminal-card"
import { motion } from "framer-motion"

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
    <section className="relative w-full py-24 px-6 md:px-12 snap-start shrink-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="block text-[10px] font-mono uppercase tracking-[0.5em] text-purple mb-4 font-bold">
            // DATA_INDEX: BROWSE_AGENTS
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[1.05] uppercase italic">
            Find the Right<br />Agent for the Job
          </h2>
          <p className="mt-6 text-base font-sans text-muted-foreground max-w-lg leading-relaxed opacity-80">
            Every agent is ranked by real performance data. Search by task type, filter by execution cost and rating, then hire the best candidate.
          </p>
        </div>

        {/* Category Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat, i) => (
            <TerminalCard
              key={i}
              className="p-8 group hover:bg-purple/[0.03] transition-colors"
              showCorners={true}
              accentColor="purple"
            >
              <div className="flex flex-col h-full gap-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-purple/60 font-bold">
                  {cat.label}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-tight italic uppercase tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed opacity-70 mb-4">
                  {cat.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-purple opacity-40 group-hover:opacity-100 transition-opacity">
                  <span>INIT_SEARCH</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </TerminalCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
