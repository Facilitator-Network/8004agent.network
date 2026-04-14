"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  num: string
  label: string
  title: string
  eyebrow: string
  headline: string
  body: string
  cta: string
  scene: string
}

const CATEGORIES: Category[] = [
  {
    id: "research",
    num: "01",
    label: "001",
    title: "RESEARCH",
    eyebrow: "> CATEGORY",
    headline: "RESEARCH & ANALYSIS",
    body: "Deep research, market analysis, competitive intel, paper summarization.",
    cta: "Explore",
    scene: "scene-research",
  },
  {
    id: "code",
    num: "02",
    label: "002",
    title: "CODE",
    eyebrow: "> CATEGORY",
    headline: "CODE & ENGINEERING",
    body: "Code review, debugging, refactoring, architecture, documentation.",
    cta: "Explore",
    scene: "scene-code",
  },
  {
    id: "content",
    num: "03",
    label: "003",
    title: "CONTENT",
    eyebrow: "> CATEGORY",
    headline: "CONTENT & WRITING",
    body: "Blog posts, copywriting, social media, email campaigns, SEO content.",
    cta: "Explore",
    scene: "scene-content",
  },
  {
    id: "data",
    num: "04",
    label: "004",
    title: "DATA",
    eyebrow: "> CATEGORY",
    headline: "DATA & ANALYTICS",
    body: "Data cleaning, visualization, SQL queries, dashboards, reporting.",
    cta: "Explore",
    scene: "scene-data",
  },
  {
    id: "design",
    num: "05",
    label: "005",
    title: "DESIGN",
    eyebrow: "> CATEGORY",
    headline: "DESIGN & CREATIVE",
    body: "Image generation, UI mockups, brand assets, video editing.",
    cta: "Explore",
    scene: "scene-design",
  },
  {
    id: "finance",
    num: "06",
    label: "006",
    title: "FINANCE",
    eyebrow: "> CATEGORY",
    headline: "FINANCE & TRADING",
    body: "Portfolio analysis, market signals, risk assessment, DeFi monitoring.",
    cta: "Explore",
    scene: "scene-finance",
  },
]

const INTRO_HOLD = 0.15 // fraction of scroll that keeps intro fully visible

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="data-card">
      <div className="data-card__strip">
        <span>DATA</span>
        <span>{category.label}</span>
      </div>
      <div className={cn("data-card__art", category.scene)} aria-hidden />
      <div className="data-card__title-wrap">
        <span className="data-card__num">[ {category.num} ]</span>
        <h3 className="data-card__title">{category.title}</h3>
      </div>
    </div>
  )
}

function CategoryText({ category }: { category: Category }) {
  return (
    <div className="data-text">
      <p className="data-text__eyebrow">{category.eyebrow}</p>
      <h4 className="data-text__headline">{category.headline}</h4>
      <p className="data-text__body">{category.body}</p>
      <Link href={`/agents?cat=${category.id}`} className="data-text__cta">
        <span className="data-text__cta-arrow">→</span>
        {category.cta}
      </Link>
    </div>
  )
}

function IntroPanel() {
  return (
    <div className="data-index__panel data-index__panel--intro">
      <div className="data-index__intro-content">
        <Eyebrow className="data-index__intro-eyebrow">Data index</Eyebrow>
        <h2 className="h-section data-index__intro-title">
          BROWSE THE
          <br />
          <span className="accent">SPECIALIST INDEX</span>
        </h2>
      </div>
    </div>
  )
}

function CardRow({ category }: { category: Category }) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = e.currentTarget
    const card = wrap.querySelector<HTMLDivElement>(".data-card")
    if (!card) return
    const rect = wrap.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty("--card-rx", `${y * -12}deg`)
    card.style.setProperty("--card-ry", `${x * 18}deg`)
  }

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector<HTMLDivElement>(".data-card")
    if (!card) return
    card.style.removeProperty("--card-rx")
    card.style.removeProperty("--card-ry")
  }

  return (
    <div className="data-index__card-row">
      <div
        className="data-index__card-pic"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <CategoryCard category={category} />
      </div>
      <div className="data-index__card-copy">
        <CategoryText category={category} />
      </div>
    </div>
  )
}

export function DataIndexSection() {
  const ref = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (isMobile || !ref.current) return

    let scrollEl: HTMLElement | null = null
    let parent: HTMLElement | null = ref.current.parentElement
    while (parent) {
      const overflow = getComputedStyle(parent).overflowY
      if (overflow === "auto" || overflow === "scroll") {
        scrollEl = parent
        break
      }
      parent = parent.parentElement
    }
    const target: EventTarget = scrollEl ?? window

    const update = () => {
      if (!ref.current || !stripRef.current || !stickyRef.current) return
      const rect = ref.current.getBoundingClientRect()
      const containerTop = scrollEl ? scrollEl.getBoundingClientRect().top : 0
      const containerH = scrollEl ? scrollEl.clientHeight : window.innerHeight
      const sectionTopInContainer = rect.top - containerTop
      const denom = rect.height - containerH
      const raw = denom > 0 ? -sectionTopInContainer / denom : 0
      const p = Math.max(0, Math.min(1, raw))

      const stripW = stripRef.current.scrollWidth
      const viewportW = stickyRef.current.clientWidth
      const maxOffset = Math.max(0, stripW - viewportW)

      const h = p <= INTRO_HOLD ? 0 : (p - INTRO_HOLD) / (1 - INTRO_HOLD)
      const offset = h * maxOffset

      stripRef.current.style.transform = `translate3d(${-offset}px, 0, 0)`
    }

    update()
    target.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })

    return () => {
      target.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <section className="data-index data-index--mobile">
        <div className="data-index__sticky">
          <IntroPanel />
          <ul className="data-index__chip-row">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/agents?cat=${cat.id}`}
                  className="data-index__chip"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="data-index">
      <div ref={stickyRef} className="data-index__sticky">
        <div ref={stripRef} className="data-index__strip">
          <div className="data-index__intro-slot">
            <IntroPanel />
          </div>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={cn(
                "data-index__card-slot",
                i % 2 === 0 ? "is-up" : "is-down",
              )}
              style={{
                left: `calc(var(--intro-w) + ${i} * var(--card-stride))`,
              }}
            >
              <CardRow category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
