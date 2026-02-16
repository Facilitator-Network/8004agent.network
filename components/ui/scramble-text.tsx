import { useTextScramble } from "@/hooks/use-text-scramble"

interface ScrambleTextProps {
  text: string
  className?: string
  isHovering: boolean
}

export function ScrambleText({ text, className, isHovering }: ScrambleTextProps) {
  const displayText = useTextScramble(text, isHovering)

  return (
    <span className={className}>
      {displayText}
    </span>
  )
}
