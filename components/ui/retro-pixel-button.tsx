"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RetroPixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RetroPixelButton({ className, children, ...props }: RetroPixelButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center font-pixel uppercase tracking-widest",
        "h-10 px-6 text-sm md:text-base outline-none selection:bg-transparent",
        "border-2 rounded-pixel-lg",
        // Use page background color for both light and dark modes
        "bg-background text-foreground border-foreground",
        "shadow-[4px_4px_0px_0px_hsl(var(--foreground))]",
        
        // Active State (Press Switch Effect - Instant transition)
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        "transition-[transform,shadow] duration-0",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-200 group-hover:scale-110">
        {children}
      </span>
    </button>
  );
}
