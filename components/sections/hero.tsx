import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            v1.0 is now available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl"
          >
            Build faster with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              intelligent primitives
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            The comprehensive toolkit for modern engineering teams. Ship production-ready applications with confidence, security, and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="h-12 px-8 text-base">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              <Terminal className="mr-2 h-4 w-4" />
              Read Documentation
            </Button>
          </motion.div>
        </div>
      </div>

       {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-600/30 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-normal" />
      </div>
    </section>
  )
}
