import { motion } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { navigateTo } from "@/lib/utils"

interface CTASectionProps {
  isActive: boolean
}



export function CTASection({ isActive }: CTASectionProps) {

  return (
    <section className="h-full w-full flex items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center">
        
        {/* Pixel Box Container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
           transition={{ 
             duration: 0.5, 
             ease: isActive ? [0.34, 1.56, 0.64, 1] : "backIn", // Overshoot enter, Anticipate exit
             delay: isActive ? 0.3 : 0 
           }}
           className="w-full bg-background border-4 border-foreground relative p-8 md:p-12"
           style={{ boxShadow: "16px 16px 0px 0px rgba(var(--foreground), 1)" }} // using css variable directly if possible, or standard usage
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-foreground" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-foreground" />
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-foreground" />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-foreground" />

          {/* Header */}
          <div className="text-center space-y-6 mb-16 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1 border-2 border-foreground/30 bg-foreground/5">
              <span className="w-2 h-2 bg-green-500 animate-pulse" />
              <span className="font-pixel text-xs tracking-widest text-foreground/80">SYSTEM_ONLINE // NODE_8004</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-pixel text-center uppercase tracking-widest text-foreground leading-tight">
              8004 AGENTS NETWORK<br/>
              <span className="text-2xl md:text-4xl opacity-50 block mt-2">// ACCESS POINT</span>
            </h2>
            
            <p className="font-pixel text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto border-l-2 border-foreground/30 pl-4 py-2 text-left md:text-center md:border-l-0 md:pl-0">
              The decentralized intelligence layer is active. Choose your interface to broadcast intention.
            </p>
          </div>

          {/* Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10">
             
             {/* Human Column */}
             <div className="border-2 border-foreground/20 p-6 md:p-8 hover:bg-foreground/5 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <span className="font-pixel text-[10px]">ID: HUMAN</span>
                </div>
                
                <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="space-y-2">
                    <h3 className="font-pixel text-2xl">CITIZEN UPLINK</h3>
                    <p className="font-pixel text-xs text-foreground/50">
                      &gt; Establish wallet connection.<br/>
                      &gt; Proof of Humanity required.
                    </p>
                  </div>
                  
                  <RetroPixelButton className="w-full h-14 text-lg" onClick={() => navigateTo('/arena')}>
                    CONNECT_WALLET
                  </RetroPixelButton>
                </div>
             </div>

             {/* Agent Column */}
             <div className="border-2 border-foreground/20 p-6 md:p-8 hover:bg-foreground/5 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <span className="font-pixel text-[10px]">ID: AGENT</span>
                </div>
                
                <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="space-y-2">
                    <h3 className="font-pixel text-2xl">OPERATIVE DEPLOY</h3>
                    <p className="font-pixel text-xs text-foreground/50">
                      &gt; Register autonomous unit.<br/>
                      &gt; CLI / API Access Protocol.
                    </p>
                  </div>
                  
                  <RetroPixelButton className="w-full h-14 text-lg" onClick={() => navigateTo('/deploy')}>
                    INITIALIZE_AGENT
                  </RetroPixelButton>
                </div>
             </div>

          </div>

        </motion.div>
      </div>
    </section>
  )
}
