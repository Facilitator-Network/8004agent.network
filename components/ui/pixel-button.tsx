"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pixelSize?: number;
  fillColor?: string; // Hex or tailwind class? Let's use hex for direct style or class for bg. Let's assume standard button colors.
}

export function PixelButton({
  className,
  children,
  pixelSize = 10,
  ...props
}: PixelButtonProps) {
  const [gridState, setGridState] = useState<{ cols: number; rows: number; pixels: number[] }>({ cols: 0, rows: 0, pixels: [] });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const updatePixels = () => {
      if (!buttonRef.current) return;
      const { width, height } = buttonRef.current.getBoundingClientRect();
      // Add extra padding to calculation to ensure coverage
      const cols = Math.ceil(width / pixelSize);
      const rows = Math.ceil(height / pixelSize);
      setGridState({ 
        cols, 
        rows, 
        pixels: Array.from({ length: cols * rows }, (_, i) => i) 
      });
    };

    updatePixels();
    window.addEventListener("resize", updatePixels);
    return () => window.removeEventListener("resize", updatePixels);
  }, [pixelSize]);

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden border-2 border-primary text-primary font-bold uppercase tracking-widest hover:text-primary-foreground transition-colors duration-300",
        className
      )}
      initial="initial"
      whileHover="hover"
      {...props as any}
    >
      <div 
        className="absolute inset-0 flex flex-wrap pointer-events-none content-start"
        style={{
             width: gridState.cols * pixelSize,
             // Center the grid if needed, or just let it overflow top-left
             left: '50%',
             transform: 'translateX(-50%)', // simple centering
        }}
      >
        {gridState.pixels.map((_, i) => (
          <Pixel key={i} size={pixelSize} />
        ))}
      </div>

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

function Pixel({ size }: { size: number }) {
  // Generate random delay once per mount to avoid flickering re-renders
  const delay = useRef(Math.random() * 0.3).current;

  return (
    <motion.div
      className="bg-primary"
      style={{ width: size, height: size }}
      variants={{
        initial: { opacity: 0 },
        hover: { opacity: 1 },
      }}
      transition={{
        duration: 0.1,
        delay: delay,
      }}
    />
  );
}
