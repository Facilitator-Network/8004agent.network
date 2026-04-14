import { forwardRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionShellProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  id?: string
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell({ children, className, innerClassName, id }, ref) {
    return (
      <section ref={ref} id={id} className={cn("relative py-24", className)}>
        <div className={cn("max-w-content mx-auto px-6 md:px-12", innerClassName)}>
          {children}
        </div>
      </section>
    )
  }
)
