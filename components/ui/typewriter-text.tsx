"use client"

import { useState, useEffect, useRef } from "react"

// Enhanced Typewriter Component with Deleting Support
export function TypewriterText({ 
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
  const onCompleteRef = useRef(onComplete)
  
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

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
          // Use slice for safer string construction
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
          if (onCompleteRef.current) onCompleteRef.current()
        }
      } else {
        // Deleting
        if (i > 0) {
          setDisplayed(text.slice(0, i - 1))
          i--
        } else {
          clearInterval(timer)
          if (onCompleteRef.current) onCompleteRef.current()
        }
      }
    }, mode === "type" ? speed : deleteSpeed)
    
    return () => clearInterval(timer)
  }, [text, mode, speed, deleteSpeed]) // Depend on mode to restart effect

  return <span className={className}>{displayed}<span className="animate-pulse">_</span></span>
}
