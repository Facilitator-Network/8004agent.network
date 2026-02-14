import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  className?: string
  color?: string
}

export function ScrollIndicator({ className, color = "system-green" }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col items-center gap-0", className)}
    >
      <span className={cn("font-pixel text-[10px] tracking-widest", `text-${color}/40`)}>
        SCROLL
      </span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn("w-6 h-6 flex flex-col items-center justify-center opacity-50 -mt-2", `text-${color}`)}
      >
        <div className="w-[10px] h-[2px] bg-current mb-[2px]" />
        <div className="w-[6px] h-[2px] bg-current mb-[2px]" />
        <div className="w-[2px] h-[2px] bg-current mb-[2px]" />
        <div className="w-[2px] h-[2px] bg-current" />
      </motion.div>
    </motion.div>
  )
}
