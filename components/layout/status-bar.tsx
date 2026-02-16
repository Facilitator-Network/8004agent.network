export function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] h-8 border-t border-border bg-background/90 backdrop-blur-md flex items-center px-6 md:px-8 font-mono text-[9px] tracking-widest uppercase text-muted-foreground select-none">
      <div className="w-full flex items-center justify-between">
        {/* Left: System Stats, Agents & Arena */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-system-green rounded-full animate-pulse-slow" />
            <span className="text-foreground font-bold">AGENET V1.14</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse-slow" />
            <span className="opacity-50">LIVE:</span>
            <span className="text-foreground font-bold">0</span>
          </div>

          <div className="flex items-center gap-2">
             <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse-slow" />
             <span className="opacity-50">ARENA:</span>
             <span className="text-foreground font-bold">OFFLINE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
