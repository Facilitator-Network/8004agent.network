import { cn } from "@/lib/utils"

export function LayoutGrid({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 z-50 pointer-events-none grid grid-cols-3 grid-rows-3", className)}>
      {/* Horizontal Lines */}
      <div className="absolute inset-x-0 top-1/3 border-t border-white/5" />
      <div className="absolute inset-x-0 top-2/3 border-t border-white/5" />
      
      {/* Vertical Lines */}
      <div className="absolute inset-y-0 left-1/3 border-l border-white/5" />
      <div className="absolute inset-y-0 left-2/3 border-l border-white/5" />
      
      {/* Border around the screen (optional, usually provided by body/viewport but added for completeness if needed) */}
      <div className="absolute inset-0 border border-white/5" />
    </div>
  )
}
