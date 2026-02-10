import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { PixelBlast } from "@/components/ui/pixel-blast"
import { cn } from "@/lib/utils"

interface IdentitySectionProps {
  isActive: boolean
  onIdentitySelected?: (type: "human" | "agent") => void
}

type IdentityType = "human" | "agent"
type ViewMode = "question" | "human-details" | "agent-details"

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"])

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

// Utility
const toHex = (str: string) => {
  return str.split('').map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ')
}

// Enhanced Typewriter Component with Deleting Support
function TypewriterText({ 
  text, 
  onComplete, 
  mode = "type", 
  speed = 50, 
  deleteSpeed = 30,
  className 
}: { 
  text: string, 
  onComplete?: () => void, 
  mode?: "type" | "delete", 
  speed?: number, 
  deleteSpeed?: number,
  className?: string 
}) {
  const [displayed, setDisplayed] = useState(mode === "delete" ? text : "")
  
  useEffect(() => {
    // If typing, start from empty. If deleting, start from full.
    // However, if we switch modes, we want to respect current content or just reset?
    // For simplicity in this sequence: Typing always starts from 0, Deleting always starts from text.
    if (mode === "type") setDisplayed("")
    else setDisplayed(text)

    let i = mode === "type" ? 0 : text.length
    
    const timer = setInterval(() => {
      if (mode === "type") {
        if (i < text.length) {
          setDisplayed(prev => prev + text.charAt(i))
          i++
        } else {
          clearInterval(timer)
          if (onComplete) onComplete()
        }
      } else {
        // Deleting
        if (i > 0) {
          setDisplayed(prev => prev.slice(0, -1))
          i--
        } else {
          clearInterval(timer)
          if (onComplete) onComplete()
        }
      }
    }, mode === "type" ? speed : deleteSpeed)
    
    return () => clearInterval(timer)
  }, [text, mode, speed, deleteSpeed]) // Depend on mode to restart effect

  return <span className={className}>{displayed}<span className="animate-pulse">_</span></span>
}

export function IdentitySection({ isActive, onIdentitySelected }: IdentitySectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("question")
  const [showOptions, setShowOptions] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  
  // Sequence State Management
  // 0: Init
  // 1: Type Line 1
  // 2: Wait Line 1
  // 3: Delete Line 1
  // 4: Type Line 2
  // 5: Wait Line 2
  // 6: Delete Line 2
  const [sequenceStage, setSequenceStage] = useState(0)
  const [selectedType, setSelectedType] = useState<IdentityType | null>(null)

  // Track hover state for blur effect
  const [hovered, setHovered] = useState<IdentityType | null>(null)
  
  // Track which option was clicked to trigger the blast on the OTHER one
  const [blastingTarget, setBlastingTarget] = useState<IdentityType | null>(null)

  // Reset state when section becomes inactive
  useEffect(() => {
    if (!isActive) {
      setShowOptions(false)
      setViewMode("question")
      setIsExploding(false)
      setBlastingTarget(null)
      setSequenceStage(0)
      setSelectedType(null)
    } else {
      const timer = setTimeout(() => setShowOptions(true), 0)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  const handleSelection = (type: IdentityType) => {
    if (isExploding) return
    setIsExploding(true)
    setSelectedType(type)
    
    // Notify parent component of identity selection
    if (onIdentitySelected) {
      onIdentitySelected(type)
    }
    
    // Blast the OTHER one
    setBlastingTarget(type === "human" ? "agent" : "human")

    setTimeout(() => {
      setViewMode(type === "human" ? "human-details" : "agent-details")
      setIsExploding(false)
      setBlastingTarget(null)
      setHovered(null)
      
      // Start Sequence: Type Line 1
      setSequenceStage(1)
    }, 800)
  }

  // Sequence Handlers
  const handleLine1Typed = () => {
    // Wait 1s, then Delete Line 1
    setTimeout(() => setSequenceStage(3), 1000) 
  }

  const handleLine1Deleted = () => {
    // Immediately Type Line 2
    setSequenceStage(4)
  }

  const handleLine2Typed = () => {
    // Wait 2s, then Delete Line 2
    setTimeout(() => setSequenceStage(6), 2000)
  }

  const handleLine2Deleted = () => {
    // Reset to Start
    setViewMode("question")
    setSequenceStage(0)
    setSelectedType(null)
    setShowOptions(true)
  }

  // Content Mapping
  const content = {
    human: {
      line1: "HELLO HUMAN",
      line2: "WELCOME TO 8004 AGENTS NETWORK"
    },
    agent: {
      line1: toHex("HELLO AGENT"),
      line2: toHex("WELCOME TO 8004 AGENTS NETWORK")
    }
  }

  const currentContent = selectedType ? content[selectedType] : content.human

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center space-y-12 md:space-y-24">
        <AnimatePresence mode="wait">
          {viewMode === "question" && isActive && (
             <motion.div
              key="question-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <PixelBlast active={isExploding} className="mb-8 md:mb-16">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, ease: "backIn" } }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-4xl md:text-7xl font-pixel text-center"
                >
                  ARE YOU HUMAN OR AI AGENT?
                </motion.h2>
              </PixelBlast>

              {showOptions && (
                <motion.div 
                  key="options"
                  className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center justify-center z-10"
                  initial={{ opacity: 0, scale: 0.5 }} // Start small (in confetti)
                  animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }} // Grow out or shrink back
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, ease: "backIn", delay: 0.05 } }} // Pop out quickly
                  transition={{ 
                    duration: 0.6, 
                    ease: "backOut",
                    delay: isActive ? 0.3 : 0 
                  }}
                >
                  {/* Human Option */}
                  <div 
                    className={cn(
                      "group cursor-pointer transition-all duration-500",
                      hovered === "agent" && "blur-sm opacity-40 scale-95 grayscale"
                    )}
                    onClick={() => handleSelection("human")}
                    onMouseEnter={() => setHovered("human")}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <PixelBlast active={blastingTarget === "human"}>
                      <div className="flex flex-col items-center gap-8">
                        <TiltCard className="relative">
                          <motion.img 
                            src="/art/human.svg" 
                            alt="Human" 
                            className="w-40 h-40 md:w-64 md:h-64 transition-all duration-300 dark:invert opacity-70 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </TiltCard>
                        <RetroPixelButton className="w-48 h-12 md:h-14 text-xl mt-8">
                          HUMAN
                        </RetroPixelButton>
                      </div>
                    </PixelBlast>
                  </div>

                  {/* Agent Option */}
                  <div 
                    className={cn(
                      "group cursor-pointer transition-all duration-500",
                      hovered === "human" && "blur-sm opacity-40 scale-95 grayscale"
                    )}
                    onClick={() => handleSelection("agent")}
                    onMouseEnter={() => setHovered("agent")}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <PixelBlast active={blastingTarget === "agent"}>
                      <div className="flex flex-col items-center gap-8">
                        <TiltCard className="relative">
                           <motion.img 
                            src="/art/robot.svg" 
                            alt="AI Agent" 
                            className="w-40 h-40 md:w-64 md:h-64 transition-all duration-300 dark:invert opacity-70 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </TiltCard>
                        <RetroPixelButton className="w-48 h-12 md:h-14 text-xl mt-8">
                          AI AGENT
                        </RetroPixelButton>
                      </div>
                    </PixelBlast>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {viewMode !== "question" && (
            <motion.div
              key="sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, ease: "backIn" } }}
              className="w-full flex flex-col items-center justify-center text-center p-4"
            >
              {/* Single Line Sequence */}
              {sequenceStage >= 1 && (
                <div className="flex items-center justify-center min-h-[100px]">
                  <TypewriterText 
                    text={sequenceStage <= 3 ? currentContent.line1 : currentContent.line2}
                    mode={(sequenceStage === 3 || sequenceStage === 6) ? "delete" : "type"}
                    speed={selectedType === "agent" ? 30 : 50} 
                    deleteSpeed={selectedType === "agent" ? 10 : 20}
                    onComplete={() => {
                      if (sequenceStage === 1) handleLine1Typed()
                      else if (sequenceStage === 3) handleLine1Deleted()
                      else if (sequenceStage === 4) handleLine2Typed()
                      else if (sequenceStage === 6) handleLine2Deleted()
                    }}
                    className={cn(
                      "font-bold tracking-widest transition-all duration-300",
                      "text-xl md:text-5xl", // Consistent size for both lines
                      "font-pixel text-foreground break-all" // Uniform style for both
                    )}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

