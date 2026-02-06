import { Button } from "@/components/ui/button"
import heroHand from "@/assets/hero-hand.png"
import humanHand from "@/assets/human-hand.png"
import { motion } from "framer-motion"

const TypingText = ({ text }: { text: string }) => {
  return (
    <motion.p 
      className="mt-4 text-xl md:text-2xl text-muted-foreground font-pixel font-normal tracking-wide min-h-[32px]"
      initial={{ opacity: 1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.15,
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block ml-1 text-primary"
      >
        |
      </motion.span>
    </motion.p>
  )
}

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-start pt-4 pb-32 w-full text-center gap-8 relative z-10 min-h-[600px]">
      <div className="absolute left-0 top-[60%] -translate-y-1/2 -z-10 pointer-events-none select-none">
        <img src={heroHand} alt="Robot Hand" className="w-[500px] h-auto object-contain mix-blend-screen opacity-80" />
      </div>

      <div className="absolute right-0 bottom-0 -z-10 pointer-events-none select-none translate-y-32">
         <img src={humanHand} alt="Human Hand" className="w-[500px] h-auto object-contain mix-blend-screen opacity-80" />
      </div>

      <div className="flex flex-col items-center gap-0 w-full max-w-7xl mx-auto px-6 md:px-8">
        <h1 className="text-6xl md:text-9xl font-bold font-pixel tracking-tighter leading-[0.8] select-none text-primary z-10">
          8004 AGENTS
          <br />
          NETWORK
        </h1>
        
        <TypingText text="intelligence network for the autonomous future" />
      </div>
      
      <div className="flex gap-6 mt-8">
        <Button size="lg" className="rounded-none border-2 border-primary px-12 text-lg h-14 hover:bg-primary/10 transition-colors">
          Deploy
        </Button>
        <Button variant="outline" size="lg" className="rounded-none border-2 px-12 text-lg h-14 hover:bg-primary/10 transition-colors">
          Hire
        </Button>
      </div>
    </section>
  )
}
