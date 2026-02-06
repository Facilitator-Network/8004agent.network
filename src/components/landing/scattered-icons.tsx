"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const icons = [

  "grok.svg",
  "DeepSeek.svg",
  "Hugging Face.svg",
  "Meta.svg",
  "OpenAI.svg",
  "claude.svg",
  "copilot.svg",
  "gemini.svg",
  "mistral.svg",
  "perplexity.svg",
  "Xai.svg",
  "Anthropic.svg",
];

const positions = [
  { top: 14, left: 10},    // grok.svg
  { top: 20, left: 45},    // DeepSeek.svg
  { top: 15, left: 69},    // Hugging Face.svg
  { top: 10, left: 87},    // Meta.svg
  { top: 35, left: 23},    // OpenAI.svg   
  { top: 61, left: 10},    // claude.svg
  { top: 66, left: 40},    // copilot.svg
  { top: 50, left: 68},    // gemini.svg
  { top: 75, left: 64},    // mistral.svg
  { top: 80, left: 90},    // perplexity.svg
  { top: 80, left: 27},    // Xai.svg
  { top: 40, left: 80},    // Anthropic.svg
];

export function ScatteredIcons({ opacity = 1 }: { opacity?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" style={{ opacity }}>
      {icons.map((icon, i) => {
        const pos = positions[i % positions.length];
        
        // Random drift parameters
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        const delay = Math.random() * 2;
        const driftX = Math.random() * 20 - 10; // -10 to 10px
        const driftY = Math.random() * 20 - 10; // -10 to 10px
        
        return (
          <motion.div
            key={icon}
            // Glass Pixel Style: REMOVED container box. Just floating icons.
            className="absolute flex items-center justify-center w-12 h-12 md:w-16 md:h-16 pointer-events-auto cursor-pointer"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            animate={{ 
              opacity: 0.5, 
              scale: 1, 
              filter: "blur(12px) saturate(1.5)", 
              x: [0, driftX, 0],
              y: [0, driftY, 0],
            }}
            whileHover={{ 
              scale: 1.1, 
              opacity: 1, 
              filter: "blur(0px) saturate(1) brightness(1.2)",
              zIndex: 50
            }}
            transition={{ 
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
              filter: { duration: 0.15 },
              delay: i * 0.1,
              // Separate transition for the drift
              x: {
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
              },
              y: {
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
              }
            }}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
          >
            {/* 
               Pixelation Trick: Render small, scale up.
               We render the SVG at 25% size (approx 16px) and scale it back up 4x.
               Start with a slightly larger base to ensure they are recognizable (33% -> 3x).
            */}
            <div style={{ width: '33%', height: '33%', pointerEvents: 'none' }}>
               <img 
                src={`/logos/${icon}`} 
                alt={icon.replace(".svg", "")} 
                className={`w-full h-full object-contain pointer-events-none ${
                  (icon.includes("grok") || icon.includes("perplexity")) ? "invert dark:invert-0" : 
                  (icon.includes("Anthropic")) ? "dark:invert dark:contrast-200" : ""
                }`}
                style={{
                   width: '100%',
                   height: '100%',
                   transform: 'scale(3)', 
                   transformOrigin: 'top left',
                   imageRendering: 'pixelated', 
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
