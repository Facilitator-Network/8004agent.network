import { useState, useEffect } from "react"

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

export function useTextScramble(text: string, isHovering: boolean) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text)
      return
    }

    let frame = 0
    const maxFrames = 15 // Quick animation

    const scramble = () => {
      if (frame >= maxFrames) {
        setDisplayText(text)
        return
      }

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " "
          
          // Gradually reveal characters from left to right
          const revealThreshold = (frame / maxFrames) * text.length
          if (index < revealThreshold) {
            return text[index]
          }
          
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplayText(scrambled)
      frame++
      requestAnimationFrame(scramble)
    }

    scramble()
  }, [text, isHovering])

  return displayText
}
