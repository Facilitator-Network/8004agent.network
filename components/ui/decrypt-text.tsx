"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface DecryptTextProps {
  text: string
  className?: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: "start" | "end" | "center"
  useOriginalCharsOnly?: boolean
  characters?: string
}

export function DecryptText({
  text,
  className,
  speed = 50,
  maxIterations = 20,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousTextRef = useRef(text)

  useEffect(() => {
    // If text hasn't changed, do nothing
    if (text === previousTextRef.current && !isScrambling) return
    
    // Start scrambling
    setIsScrambling(true)
    let iteration = 0
    
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      // If we've reached the target, stop
      if (iteration >= maxIterations) {
        setDisplayText(text)
        setIsScrambling(false)
        if (intervalRef.current) clearInterval(intervalRef.current)
        previousTextRef.current = text
        return
      }

      setDisplayText(prev => {
        return text
          .split("")
          .map((char, index) => {
            // Keep spaces as spaces
            if (char === " ") return " "
            
            // Logic to reveal characters
            // If sequential, we reveal characters one by one
            if (sequential) {
              const totalChars = text.length
              const progress = iteration / maxIterations // 0 to 1
              const charsToReveal = Math.floor(progress * totalChars)
              
              if (revealDirection === "start") {
                if (index < charsToReveal) return text[index]
              } else if (revealDirection === "end") {
                if (index >= totalChars - charsToReveal) return text[index]
              } else if (revealDirection === "center") {
                const center = Math.floor(totalChars / 2)
                const range = charsToReveal / 2
                if (index >= center - range && index <= center + range) return text[index]
              }
            }

            // Otherwise return a random character
            if (useOriginalCharsOnly) {
              const combined = previousTextRef.current + text
              return combined[Math.floor(Math.random() * combined.length)]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      })

      iteration++
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters])

  return (
    <span className={cn("inline-block whitespace-pre-wrap", className)}>
      {displayText}
    </span>
  )
}

export function ScrambleMorph({
  startText,
  endText,
  progress, 
  className,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
}: {
  startText: string
  endText: string
  progress: number
  className?: string
  characters?: string
}) {
  const renderText = () => {
      // Clean cutoff for start/end
      if (progress <= 0.05) return startText
      if (progress >= 0.95) return endText
      
      const morphProgress = (progress - 0.05) / 0.9 // 0 to 1
      
      // Interpolate length for smooth layout transition
      const currentLength = Math.round(startText.length + (endText.length - startText.length) * morphProgress)
      
      return Array.from({ length: currentLength }).map((_, i) => {
           const startChar = startText[i] || ""
           const endChar = endText[i] || ""
           
           // More chaotic deterministic seed for "matrix" feel
           const charSeed = Math.floor(i * 37 + progress * 137) % characters.length
           const randomChar = characters[charSeed]
           
           // Phase 1: 0 to 0.5 - Scramble start
           if (morphProgress < 0.5) {
               const scrambleFactor = morphProgress * 2 
               const threshold = ((i * 13) % 100) / 100
               return threshold < scrambleFactor ? randomChar : (startChar || randomChar)
           } 
           // Phase 2: 0.5 to 1 - Reveal end
           else {
               const revealFactor = (morphProgress - 0.5) * 2 
               const threshold = ((i * 19) % 100) / 100
               return threshold < revealFactor ? (endChar || randomChar) : randomChar
           }
      }).join("")
  }

  return (
    <span className={cn("inline-block whitespace-pre-wrap", className)}>
      {renderText()}
    </span>
  )
}
