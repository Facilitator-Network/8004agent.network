export function PixelCornerFrames() {
  return (
    <>
      {/* Top Left Corner */}
      <div className="fixed top-4 left-4 z-50 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-foreground/30">
          <path
            d="M 0 8 L 0 0 L 8 0 M 0 0 L 32 0 M 0 0 L 0 32"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-foreground/30">
          <path
            d="M 32 0 L 40 0 L 40 8 M 40 0 L 8 0 M 40 0 L 40 32"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-foreground/30">
          <path
            d="M 0 32 L 0 40 L 8 40 M 0 40 L 32 40 M 0 40 L 0 8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-foreground/30">
          <path
            d="M 32 40 L 40 40 L 40 32 M 40 40 L 8 40 M 40 40 L 40 8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </>
  )
}
