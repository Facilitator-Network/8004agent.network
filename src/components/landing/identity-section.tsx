import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { PixelBlast } from "@/components/ui/pixel-blast"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { RegistrationModal } from "./registration-modal"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"
import { cn } from "@/lib/utils"

interface IdentitySectionProps {
  isActive: boolean
  onIdentitySelected?: (type: "human" | "agent") => void
  onAnimationComplete?: () => void
  identityComplete?: boolean
}

type IdentityType = "human" | "agent"
type ViewMode = "question" | "human-details" | "agent-details"

// ... (TiltCard and FloatingNames components remain unchanged)

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



// Floating Names Component
function FloatingNames({ names, isActive }: { names: string[], isActive: boolean }) {
  // Pre-defined positions constraints to avoid overlap (relative to center)
  // We'll pick random names for each slot
  const slots = useMemo(() => {
    const positions = [
      { top: "35%", left: "110%" },   // Higher Left fixed
      { top: "0%", left: "-35%" },   // Highest Left-Center fixed
      { top: "10%", left: "100%" },   // Highest Right-Center
      { top: "30%", left: "-35%" },   // High Right
      { top: "-15%", left: "10%" },      // Low Left fixed
      { top: "-10%", left: "60%" },    // Low Right fixed
    ]
    
    // Shuffle names and pick 6 to match positions
    const shuffledNames = [...names].sort(() => Math.random() - 0.5).slice(0, 6)
    
    return positions.map((pos, i) => ({
      ...pos,
      text: shuffledNames[i],
      id: i,
      // Random float animation params
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 0.5
    }))
  }, [names])

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 pointer-events-none z-0">
           {slots.map((slot) => (
             <motion.div
               key={slot.id}
               className="absolute font-pixel text-system-green/40 whitespace-nowrap text-lg md:text-xl transform -translate-x-1/2 -translate-y-1/2"
               style={{ 
                 top: slot.top, 
                 left: slot.left,
                 opacity: 0 
               }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ 
                 opacity: 1, 
                 scale: 1,
                 y: [0, -10, 0],
                 x: [0, 5, 0]
               }}
               exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
               transition={{
                 opacity: { duration: 0.4 },
                 scale: { duration: 0.4 },
                 y: { 
                   repeat: Infinity, 
                   duration: slot.duration, 
                   ease: "easeInOut", 
                   repeatType: "reverse" 
                 },
                 x: {
                    repeat: Infinity,
                    duration: slot.duration * 1.2,
                    ease: "easeInOut",
                    repeatType: "reverse"
                 }
               }}
             >
               {slot.text}
             </motion.div>
           ))}
        </div>
      )}
    </AnimatePresence>
  )
}


export function IdentitySection({ isActive, onIdentitySelected, onAnimationComplete, identityComplete }: IdentitySectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("question")
  const [showOptions, setShowOptions] = useState(identityComplete || false)
  const [isExploding, setIsExploding] = useState(false)
  
  // Sequence State Management
  const [sequenceStage, setSequenceStage] = useState(0)
  const [selectedType, setSelectedType] = useState<IdentityType | null>(null)

  // Registration Modal State
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [pendingIdentityType, setPendingIdentityType] = useState<IdentityType | null>(null)

  // Track hover state for blur effect
  const [hovered, setHovered] = useState<IdentityType | null>(null)
  
  // Track which option was clicked to trigger the blast on the OTHER one
  const [blastingTarget, setBlastingTarget] = useState<IdentityType | null>(null)

  // Name Lists for Hover Effect
  const humanNames = [
    "vitalik", "elon", "satoshi", "sam", "ada", "grace", "alan", "linus", 
    "tim", "steve", "sergey", "larry", "mark", "bill", "dennis", "ken", 
    "guido", "yukihiro", "brendan", "james", "nakamoto", "turing", "lovelace"
  ]
  const agentNames = [
    "gpt", "claude", "llama", "mistral", "gemini", "bard", "copilot",
    "midjourney", "dall-e", "stable", "diffusion", "grok", "palm", "bert",
    "vicuna", "alpaca", "falcon", "qwen", "yi", "phi", "solar"
  ]

  // Reset state when section becomes inactive
  useEffect(() => {
    if (!isActive) {
      setViewMode("question")
      setIsExploding(false)
      setBlastingTarget(null)
      setSequenceStage(0)
      setSelectedType(null)
    } else {
      setShowOptions(identityComplete || false)
    }
  }, [isActive, identityComplete])

  // Trigger animation complete when options are shown
  useEffect(() => {
    if (showOptions && onAnimationComplete) {
      // Wait for options spring animation to settle (~800ms)
      const timer = setTimeout(() => {
        onAnimationComplete()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [showOptions, onAnimationComplete])

  const handleSelection = (type: IdentityType) => {
    if (isExploding) return
    setIsExploding(true)
    setSelectedType(type)
    setPendingIdentityType(type)
    
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

  const handleRegistrationSubmit = (name: string) => {
    console.log(`Registered: ${name}.${pendingIdentityType}`)
    // Notify parent component of identity selection
    if (onIdentitySelected && pendingIdentityType) {
      onIdentitySelected(pendingIdentityType)
    }
  }

  const handleRegistrationClose = () => {
    setShowRegistrationModal(false)
    // Reset to identity selection screen
    setTimeout(() => {
      setViewMode("question")
      setIsExploding(false)
      setBlastingTarget(null)
      setSequenceStage(0)
      setSelectedType(null)
      setPendingIdentityType(null)
    }, 300)
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
    // After line 2 is deleted, show registration form
    setShowRegistrationModal(true)
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
    <section className="min-h-screen w-full flex flex-col items-center justify-start pt-32 p-6 text-foreground transition-colors duration-300 relative">
      <div className="w-full max-w-7xl flex flex-col items-center justify-start space-y-12 md:space-y-24 flex-grow relative">
        <AnimatePresence mode="wait">
          {viewMode === "question" && (
             <motion.div
              key="question-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <PixelBlast active={!isActive} className="w-full h-full">
                <div className="flex flex-col items-center justify-start w-full relative h-full">
                  {/* Shattering Background Layer */}
                  <div className="absolute -inset-[100vw] bg-background -z-10" />

                  <PixelBlast active={isExploding} className="mb-12 md:mb-24 z-20 w-full flex flex-col items-center">
                    <div className="h-20 flex items-center justify-center">
                      {isActive && !identityComplete && (
                        <TypewriterText
                          key={`typewriter-${isActive}`} // Force restart on activation
                          text="ARE YOU HUMAN OR AI AGENT?"
                          mode="type"
                          speed={30}
                          onComplete={() => setShowOptions(true)}
                          className="text-3xl md:text-5xl lg:text-7xl font-pixel text-center uppercase tracking-tight"
                        />
                      )}
                      {isActive && identityComplete && (
                           <h2 className="text-3xl md:text-5xl lg:text-7xl font-pixel text-center uppercase tracking-tight">
                             ARE YOU HUMAN OR AI AGENT?
                           </h2>
                      )}
                    </div>
                    {showOptions && (
                      <motion.p 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "backOut" }}
                        className="text-base md:text-lg font-pixel text-foreground/60 tracking-widest text-center mt-3"
                      >
                        // CHOOSE_YOUR_PATH
                      </motion.p>
                    )}
                  </PixelBlast>

                  {showOptions && (
                    <motion.div 
                      key="options"
                      className="w-full max-w-5xl flex items-center justify-center gap-24 md:gap-48 z-10"
                      initial={{ opacity: 0, scale: 0.5 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.5 }} 
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: 0.2 // Delay after title
                      }}
                    >
                      {/* Human Option */}
                      <div 
                        className={cn(
                          "group cursor-pointer transition-all duration-500 relative", 
                          hovered === "agent" && "blur-sm opacity-40 scale-95 grayscale"
                        )}
                        onClick={() => handleSelection("human")}
                        onMouseEnter={() => setHovered("human")}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <FloatingNames names={humanNames} isActive={hovered === "human"} />
                        
                        <PixelBlast active={blastingTarget === "human"}>
                          <div className="flex flex-col items-center gap-8 relative z-10">
                            <TiltCard className="relative">
                              <motion.img 
                                src="/art/human.svg" 
                                alt="Human" 
                                className="w-40 h-40 md:w-64 md:h-64 transition-all duration-300 dark:invert opacity-70 group-hover:opacity-100"
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: "backOut", delay: 0.2 }}
                              />
                            </TiltCard>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 }}
                              className="mt-8"
                            >
                              <RetroPixelButton className="w-48 h-12 md:h-14 text-xl">
                                HUMAN
                              </RetroPixelButton>
                            </motion.div>
                          </div>
                        </PixelBlast>
                      </div>

                      {/* Agent Option */}
                      <div 
                        className={cn(
                          "group cursor-pointer transition-all duration-500 relative", 
                          hovered === "human" && "blur-sm opacity-40 scale-95 grayscale"
                        )}
                        onClick={() => handleSelection("agent")}
                        onMouseEnter={() => setHovered("agent")}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <FloatingNames names={agentNames} isActive={hovered === "agent"} />

                        <PixelBlast active={blastingTarget === "agent"}>
                          <div className="flex flex-col items-center gap-8 relative z-10">
                            <TiltCard className="relative">
                               <motion.img 
                                src="/art/robot.svg" 
                                alt="AI Agent" 
                                className="w-40 h-40 md:w-64 md:h-64 transition-all duration-300 dark:invert opacity-70 group-hover:opacity-100"
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: "backOut", delay: 0.4 }} // Staggered slightly
                              />
                            </TiltCard>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 1.0 }} // Staggered Button
                              className="mt-8"
                            >
                              <RetroPixelButton className="w-48 h-12 md:h-14 text-xl">
                                AI AGENT
                              </RetroPixelButton>
                            </motion.div>
                          </div>
                        </PixelBlast>
                      </div>
                    </motion.div>
                  )}
                </div>
              </PixelBlast>
            </motion.div>
          )}

          {viewMode !== "question" && (
            <motion.div
              key="sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, ease: "backIn" } }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pb-80"
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

      {/* Registration Modal */}
      {pendingIdentityType && (
        <RegistrationModal
          isOpen={showRegistrationModal}
          identityType={pendingIdentityType}
          onClose={handleRegistrationClose}
          onSubmit={handleRegistrationSubmit}
        />
      )}
      {/* Scroll Indicator */}
      <AnimatePresence>
        {isActive && showOptions && viewMode === "question" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }} // Fade out on sequence start
            transition={{ delay: 1.5, duration: 0.5 }} // Delay appearance
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
          >
            <ScrollIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

