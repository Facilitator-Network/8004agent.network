export function StatusBar() {
  return (
    <footer role="contentinfo" aria-label="System status" className="fixed bottom-0 left-0 right-0 z-[100] h-8 px-8 flex items-center gap-8 bg-[color-mix(in_srgb,var(--bg-d)_90%,transparent)] backdrop-blur-xl border-t border-[var(--border-soft-d)] font-mono text-[11px] tracking-[0.1em] uppercase select-none">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-ok)] animate-status-pulse" />
        <span className="text-[var(--fg-muted-d)]">SYS:</span>
        <span className="text-[var(--fg-d)] font-medium">V1.14</span>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-warn)] animate-status-pulse" />
        <span className="text-[var(--fg-muted-d)]">LIVE:</span>
        <span className="text-[var(--fg-d)] font-medium">0</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-live)]" />
        <span className="text-[var(--fg-muted-d)]">ARENA:</span>
        <span className="text-[var(--fg-d)] font-medium">OFFLINE</span>
      </div>

      <div className="ml-auto hidden md:flex items-center gap-6">
        <span className="text-[var(--fg-muted-d)]">FUJI TESTNET</span>
        <span className="text-[var(--fg-muted-d)]">BLK: 48,291,004</span>
      </div>
    </footer>
  )
}
