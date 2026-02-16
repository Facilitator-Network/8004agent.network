export function PixelCornerFrames() {
  return (
    <>
      {/* Top Left Corner */}
      <div className="fixed top-20 left-8 z-40 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-foreground/15">
          <path
            d="M 0 40 L 0 0 L 40 0"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="fixed top-20 right-8 z-40 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-foreground/15">
           <path
            d="M 100 40 L 100 0 L 60 0"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="fixed bottom-12 left-8 z-40 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-foreground/15">
           <path
            d="M 0 60 L 0 100 L 40 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="fixed bottom-12 right-8 z-40 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-foreground/15">
           <path
            d="M 100 60 L 100 100 L 60 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </>
  )
}
