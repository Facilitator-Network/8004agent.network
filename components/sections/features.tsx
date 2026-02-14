import { Zap, Shield, Globe, Cpu, Layers, Code } from "lucide-react"

const features = [
  {
    name: "High Performance",
    description:
      "Optimized for speed with zero-runtime overhead. Built for the modern web.",
    icon: Zap,
  },
  {
    name: "Enterprise Security",
    description:
      "Bank-grade security standards out of the box. SOC2 compliant infrastructure.",
    icon: Shield,
  },
  {
    name: "Global Scale",
    description:
      "Deploy to the edge in seconds. Low latency access from anywhere in the world.",
    icon: Globe,
  },
  {
    name: "Intelligent API",
    description:
      "Type-safe APIs that evolve with your codebase. Auto-generated documentation.",
    icon: Cpu,
  },
  {
    name: "Modular Architecture",
    description:
      "Composable primitives that fit together perfectly. Extend without limits.",
    icon: Layers,
  },
  {
    name: "Developer Experience",
    description:
      "Best-in-class tooling. CLI, VS Code extension, and comprehensive guides.",
    icon: Code,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to ship
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A complete suite of tools designed to help you build better software, faster.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.name}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
