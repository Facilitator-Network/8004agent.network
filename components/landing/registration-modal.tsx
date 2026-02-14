"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { RetroPixelButton } from "@/components/ui/retro-pixel-button"
import { QRCodeSVG } from "qrcode.react"
import { TypewriterText } from "@/components/ui/typewriter-text"

interface RegistrationModalProps {
  isOpen: boolean
  identityType: "human" | "agent"
  onClose: () => void
  onSubmit: (name: string) => void
}

export function RegistrationModal({ isOpen, identityType, onClose, onSubmit }: RegistrationModalProps) {
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const suffix = identityType === "human" ? ".human" : ".agent"
  const titleText = identityType === "human" ? "GET_YOUR_HUMAN_ID" : "GET_YOUR_AGENT_ID"
  
  // Hardcoded wallet address for now
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"


  // Animation State
  const [animationStage, setAnimationStage] = useState<"init" | "background" | "title" | "content">("init")
  
  // Start animation sequence when modal opens
  useEffect(() => {
    if (isOpen) {
      setAnimationStage("init")
      
      // Sequence:
      // 1. Start Background (immediate)
      setTimeout(() => setAnimationStage("background"), 100)
      
      // 2. Start Title (after background settles a bit - 1.5s)
      setTimeout(() => setAnimationStage("title"), 1500)
      
    }
  }, [isOpen])

  // Generate scattered background text with grid-based non-overlapping logic
  const backgroundItems = useMemo(() => {
    const humanNames = [
      "vitalik", "elon", "satoshi", "sam", "ada", "grace", "alan", "linus", 
      "tim", "steve", "sergey", "larry", "mark", "bill", "dennis", "ken", 
      "guido", "yukihiro", "brendan", "james", "nakamoto", "turing", "lovelace",
      "brian", "jack", "jeff", "sundar", "satya", "jensen", "lisa", "demis"
    ]

    const agentNames = [
      "gpt", "claude", "llama", "mistral", "gemini", "bard", "copilot",
      "midjourney", "dall-e", "stable", "diffusion", "grok", "palm", "bert",
      "vicuna", "alpaca", "falcon", "qwen", "yi", "phi", "solar", 
      "groq", "perplexity", "cohere", "jasper", "sora", "o1", "deepseek", 
      "codellama", "minst", "alexnet", "resnet"
    ]
    
    // Select the source array
    const sourceNames = identityType === "human" ? humanNames : agentNames
    
    // Shuffle the source array to get random unique names
    // We need at least 30 names for a 6x5 grid to be unique
    const shuffledNames = [...sourceNames].sort(() => Math.random() - 0.5)

    const items = []
    const rows = 6
    const cols = 5
    const xStep = 100 / cols
    const yStep = 100 / rows

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Calculate linear index
        const index = r * cols + c
        
        // Use modulus to handle if we have fewer names than cells (though we aim for enough)
        const text = shuffledNames[index % shuffledNames.length]
        // Add some jitter but keep within cell bounds to avoid overlap
        // Cell center is at (c * xStep + xStep/2, r * yStep + yStep/2)
        // We allow jitter of +/- 10% of total width/height to make it look scattered but safe
        const jitterX = (Math.random() - 0.5) * (xStep * 0.6) 
        const jitterY = (Math.random() - 0.5) * (yStep * 0.6)
        
        // Custom delay logic for "slow then fast" appearance
        // We want few items to appear early (small delay) and many to appear late (large delay).
        // Math.pow(Math.random(), 3) produces mostly small numbers (Fast start).
        // 1 - Math.pow(Math.random(), 3) produces mostly large numbers (Slow start, fast finish).
        const delayBase = (1 - Math.pow(Math.random(), 3)) * 1.5
        
        items.push({
          id: `${r}-${c}`,
          text: text,
          top: (r * yStep) + (yStep / 2) + jitterY,
          left: (c * xStep) + (xStep / 2) + jitterX,
          rotate: Math.random() * 60 - 30, // -30 to 30 degrees (less extreme rotation)
          opacity: 0.04 + Math.random() * 0.03, // Consistent subtle opacity
          fontSize: 2.5, // Fixed consistent size
          delay: delayBase // Stagger delay
        })
      }
    }
    
    // Shuffle items so we don't have a visible grid pattern in rendering order
    return items.sort(() => Math.random() - 0.5)
  }, [identityType]) // Re-generate when identityType changes


  const handleSubmit = () => {
    if (name.trim()) {
      setIsSubmitted(true)
      onSubmit(name)
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setName("")
        onClose()
      }, 2000)
    }
  }

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false)
      setName("")
      setAnimationStage("init")
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scattered Text Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute font-pixel whitespace-nowrap text-foreground select-none"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
              fontSize: `${item.fontSize}rem`,
            }}
            initial={{ opacity: 0 }}
            animate={animationStage !== "init" ? { opacity: item.opacity } : { opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: item.delay 
            }}
          >
            {item.text}{suffix}
          </motion.div>
        ))}
      </div>

      {/* Content Container with higher z-index to sit above background */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
      {!isSubmitted ? (
        <>
          {/* Title at Top Center */}
          <div className="absolute top-20 md:top-28">
           {animationStage !== "init" && animationStage !== "background" && (
             <h2 className="font-pixel text-4xl md:text-6xl text-center uppercase tracking-tight">
               <TypewriterText 
                  text={titleText}
                  speed={50}
                  onComplete={() => setAnimationStage("content")}
               />
             </h2>
           )}
          </div>

          {/* Main Content - Centered */}
          <motion.div 
            className="w-full max-w-3xl space-y-8 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={animationStage === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            {/* Generative Pixel PFP */}
            <div className="flex justify-center">
              <div 
                className="relative w-32 h-32 md:w-40 md:h-40 border-2 border-foreground/20 p-2 bg-background"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <QRCodeSVG
                    value={`https://8004agent.network/${identityType}${name ? `/${name}` : ""}`}
                    size={120}
                    level="M"
                    bgColor="transparent"
                    fgColor="currentColor"
                    className="w-full h-full text-system-green"
                  />
                </div>
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-system-green" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-system-green" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-system-green" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-system-green" />
              </div>
            </div>
            {/* Name Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-nowrap w-full">
                <label className="font-pixel text-xl md:text-2xl text-foreground/60 whitespace-nowrap flex-shrink-0">
                  name:
                </label>
                <div className="flex-1 relative flex items-end min-w-0">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value
                      // Limit to 16 characters
                      if (value.length <= 16) {
                        setName(value)
                      }
                    }}
                    placeholder="enter your name"
                    maxLength={16}
                    className="w-full font-pixel text-3xl md:text-4xl bg-transparent border-none px-2 py-4 focus:outline-none text-foreground placeholder:text-foreground/25 placeholder:lowercase whitespace-nowrap"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit()
                    }}
                  />
                  {/* Green solid underline - extends to the dot */}
                  <div className="absolute bottom-3 left-2 right-0 h-[2px] bg-system-green transition-all duration-300" />
                </div>
                <span className="font-pixel text-3xl md:text-4xl text-foreground flex-shrink-0 whitespace-nowrap">
                  {suffix}
                </span>
              </div>
            </div>

            {/* Wallet Address with Arrow and Name */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="font-mono text-xs md:text-sm text-system-green break-all">
                {walletAddress}
              </span>
              <span className="font-pixel text-sm text-foreground/40">→</span>
              <span className="font-pixel text-sm md:text-base text-system-green">
                {name || "___"}{suffix}
              </span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="mt-12 flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={animationStage === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <RetroPixelButton
              onClick={onClose}
              className="w-44 h-16 text-lg"
            >
              CANCEL
            </RetroPixelButton>
            <RetroPixelButton
              onClick={handleSubmit}
              className="w-44 h-16 text-lg"
              disabled={!name.trim() || name.trim().length < 3}
            >
              SUBMIT
            </RetroPixelButton>
          </motion.div>
        </>
      ) : (
        /* Success State */
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="font-pixel text-7xl text-system-green mb-8">
            ✓
          </div>
          <h3 className="font-pixel text-4xl text-system-green mb-4">
            APPLIED
          </h3>
          <p className="font-pixel text-xl text-foreground/70">
            {name}{suffix}
          </p>
        </motion.div>
      )}
      </div>
    </motion.div>
  )
}
