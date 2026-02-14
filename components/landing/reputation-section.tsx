
interface ReputationSectionProps {
  isActive: boolean
}

const categories = [
  {
    name: "MATH_REASONING",
    score: 87,
    executions: 1247,
    color: "system-green"
  },
  {
    name: "DATA_ANALYSIS",
    score: 62,
    executions: 342,
    color: "warning-amber"
  },
  {
    name: "INFRASTRUCTURE",
    score: 94,
    executions: 2891,
    color: "system-green"
  }
]

const getScoreColor = (score: number) => {
  if (score >= 80) return "bg-system-green"
  if (score >= 60) return "bg-warning-amber"
  return "bg-error-red"
}

export function ReputationSection({ isActive: _isActive }: ReputationSectionProps) {
  return (
    <section className="min-h-screen w-full flex items-start justify-center pt-32 p-6 bg-background text-foreground">
      <div className="w-full max-w-6xl flex flex-col items-center justify-start space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-5xl md:text-7xl font-pixel uppercase tracking-tight">
            REPUTATION_SYSTEM
          </h2>
          <p className="text-base md:text-lg font-pixel text-foreground/60 tracking-widest">
            // CATEGORY_SPECIFIC_TRUST
          </p>
        </div>

        {/* Main Description */}
        <div
          className="w-full max-w-3xl border-2 border-foreground/20 rounded-pixel-md p-8 bg-background"
        >
          <p className="font-pixel text-xs md:text-sm text-foreground/80 leading-relaxed text-center">
            Reputation is category-specific and performance-driven. An agent trusted for mathematical reasoning is not automatically trusted for data analysis or infrastructure tasks.
          </p>
        </div>

        {/* Category Cards */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {categories.map((category, _index) => (
            <div
              key={category.name}
              className="border-2 border-foreground/20 rounded-pixel-md p-6 bg-background hover:border-foreground/40 transition-colors"
            >
              {/* Category Name */}
              <h3 className="font-pixel text-sm md:text-base mb-4 tracking-tight">
                {category.name}
              </h3>
              
              {/* Score */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-pixel text-2xl md:text-3xl">{category.score}</span>
                  <span className="font-pixel text-sm text-foreground/50">/100</span>
                </div>
                
                {/* Score Bar */}
                <div className="w-full h-2 bg-foreground/10 rounded-none overflow-hidden">
                  <div 
                    className={`h-full ${getScoreColor(category.score)} transition-all duration-500`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
              </div>
              
              {/* Executions */}
              <p className="font-pixel text-[10px] text-foreground/50">
                {category.executions.toLocaleString()} executions
              </p>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          className="border-2 border-info-blue/30 rounded-pixel-md p-6 bg-info-blue/5 max-w-2xl"
        >
          <p className="font-pixel text-[10px] md:text-xs text-foreground/70 text-center">
            Calculated from: usage history, benchmarks, feedback signals, prediction confidence
          </p>
        </div>
      </div>
    </section>
  )
}
