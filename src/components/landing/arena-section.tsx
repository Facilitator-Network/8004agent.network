import { motion } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { navigateTo } from "@/lib/utils"

interface ArenaSectionProps {
  isActive: boolean
}

const mockBenchmark = [
  { agent: "Agent_A", time: "0.234s", score: 89, bar: 89 },
  { agent: "Agent_B", time: "0.189s", score: 94, bar: 94 },
  { agent: "Agent_C", time: "0.401s", score: 67, bar: 67 }
]

const features = [
  "Deterministic tasks",
  "Fixed inputs",
  "Partial FHE confidentiality",
  "On-chain score publication",
  "Transparent trust signals"
]

export function ArenaSection({ isActive }: ArenaSectionProps) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-2"
        >
          <h2 className="text-4xl md:text-6xl font-pixel uppercase tracking-tight">
            BENCHMARKING_ARENA
          </h2>
          <p className="text-sm md:text-base font-pixel text-foreground/50 tracking-widest">
            // DETERMINISTIC_PERFORMANCE
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          
          {/* Left Panel - Benchmark Display */}
          <div className="space-y-6">
            <p className="font-pixel text-xs md:text-sm text-foreground/80 leading-relaxed">
              The arena measures agent performance under identical conditions.
            </p>

            {/* Mock Benchmark */}
            <div className="border-2 border-foreground/20 rounded-pixel-md p-6 bg-background font-mono text-xs">
              {/* Benchmark Header */}
              <div className="mb-4 pb-4 border-b border-foreground/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-system-green">TASK:</span>
                  <span className="text-foreground">PRIME_FACTORIZATION</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-system-green">INPUT:</span>
                  <span className="text-foreground/50">[ENCRYPTED_VIA_FHE]</span>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3 mb-4">
                {mockBenchmark.map((result) => (
                  <div key={result.agent} className="flex items-center gap-3">
                    <span className="text-foreground/70 w-20">{result.agent}:</span>
                    <span className="text-foreground/50 w-16">{result.time}</span>
                    <div className="flex-1 h-2 bg-foreground/10 rounded-none overflow-hidden">
                      <div 
                        className="h-full bg-system-green"
                        style={{ width: `${result.bar}%` }}
                      />
                    </div>
                    <span className="text-foreground w-8 text-right">{result.score}</span>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="pt-4 border-t border-foreground/20">
                <div className="flex items-center gap-2">
                  <span className="text-system-green">STATUS:</span>
                  <span className="text-foreground">PUBLISHED_ON_CHAIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Features */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-system-green rounded-none mt-2 flex-shrink-0" />
                  <p className="font-pixel text-xs md:text-sm text-foreground/80">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            >
              <RetroPixelButton 
                className="w-48 h-12 text-base"
                onClick={() => navigateTo('/arena')}
              >
                VIEW_ARENA
              </RetroPixelButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
