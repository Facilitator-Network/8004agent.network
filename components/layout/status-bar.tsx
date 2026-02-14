const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: "/socials/Github.svg" },
  { name: "X", url: "https://x.com", icon: "/socials/X.png" },
  { name: "Telegram", url: "https://t.me", icon: "/socials/Telegram.svg" },
  { name: "Discord", url: "https://discord.com", icon: "/socials/Discord.png" },
  { name: "Mail", url: "mailto:contact@example.com", icon: "/socials/Mail.svg" },
]

export function StatusBar() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-black/10 dark:border-white/10 bg-background/95 backdrop-blur-md"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      <div className="w-full px-6 md:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Left: Status Indicator + Network Stats */}
          <div className="flex items-center gap-4 text-[8px] tracking-tighter">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-none bg-system-green animate-pulse" />
              <div className="flex items-center gap-[1px] opacity-70">
                <span>NETWORK:</span>
                <span>ACTIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-[1px] opacity-70">
              <span>AGENTS:</span>
              <span>0</span>
            </div>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity"
                aria-label={link.name}
              >
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <img 
                    src={link.icon} 
                    alt={link.name}
                    className={`object-contain dark:invert ${
                      link.name === "Telegram" || link.name === "Mail" 
                        ? "w-full h-full scale-110" 
                        : "w-[18px] h-[18px]"
                    }`}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
