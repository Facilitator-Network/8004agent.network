import { motion } from "framer-motion"

interface AnimatedConnectionProps {
  index: number
  color?: string
}

export function AnimatedConnection({ index, color = "bg-system-green" }: AnimatedConnectionProps) {
  return (
    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-[calc(100%+4px)] w-[16px] items-center justify-start z-0 pointer-events-none">
      {/* 3 flowing dots */}
      {[0, 1, 2].map((dotIndex) => (
        <motion.div
          key={dotIndex}
          className={`absolute w-0.5 h-0.5 ${color} rounded-none`}
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 4, 8, 12],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: dotIndex * 0.3 + index * 0.2,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Arrow head made of dots with jump */}
      <motion.div
        className="absolute left-[6px] flex items-center justify-center"
        animate={{
          x: [0, 1, 0],
          y: [0, -1, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Arrow head pattern - cleaner design */}
        <div className="relative w-2 h-2">
          {/* Top dot */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 ${color} rounded-none`} />
          {/* Middle dot */}
          <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-0.5 h-0.5 ${color} rounded-none`} />
          {/* Bottom dot */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 ${color} rounded-none`} />
        </div>
      </motion.div>
    </div>
  )
}
