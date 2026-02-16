import { HomeLayout } from "@/components/landing/home-layout"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { PipelineSection } from "@/components/landing/pipeline-section"
import { ArenaSection } from "@/components/landing/arena-section"
import { NamingSection } from "@/components/landing/naming-section"
import { DifferentiationSection } from "@/components/landing/differentiation-section"
import { NetworkSection } from "@/components/landing/network-section"
import { FinalCTASection } from "@/components/landing/final-cta-section"

export default function Page() {
  return (
    <HomeLayout>
      <HeroSection />
      <ProblemSection />
      <PipelineSection />
      <ArenaSection />
      <NamingSection />
      <DifferentiationSection />
      <NetworkSection />
      <FinalCTASection />
    </HomeLayout>
  )
}
