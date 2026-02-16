"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  className?: string;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function HyperText({
  text,
  className,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const triggerScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let frames = 0;
    const maxFrames = 10; // Run for ~300ms (30ms * 10)
    
    intervalRef.current = setInterval(() => {
      // Global scramble: Every character changes
      setDisplayText(
        text.split("").map((char) => {
          if (char === " ") return " ";
          return alphabets[Math.floor(Math.random() * alphabets.length)];
        }).join("")
      );
      
      frames++;
      if (frames >= maxFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text); // Resolve instantly at end
      }
    }, 30);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerScramble();
  };

  return (
    <div
      className="overflow-hidden py-2 flex items-center justify-center cursor-default scale-100 relative whitespace-nowrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Invisible original text to reserve stable space */}
      <span className={cn("opacity-0 pointer-events-none", className)}>
        {text}
      </span>
      
      {/* Animated text overlaid absolutely */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-mono transition-all duration-300",
          isHovered ? "text-white" : "",
          className
        )}
      >
        {displayText}
      </span>
    </div>
  );
}
