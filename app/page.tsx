import { HomeLayout } from "@/components/landing/home-layout"
import { HeroSection } from "@/components/landing/hero-section"
import { LiveActivitySection } from "@/components/landing/live-activity-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { DataIndexSection } from "@/components/landing/data-index-section"
import { ArenaTeaserSection } from "@/components/landing/arena-teaser-section"
import { ArenaSection } from "@/components/landing/arena-section"
import { TrustSection } from "@/components/landing/trust-section"
import { PaymentsSection } from "@/components/landing/payments-section"
import { ForBuildersSection } from "@/components/landing/for-builders-section"
import { FinalCTASection } from "@/components/landing/final-cta-section"

export default function Page() {
  return (
    <HomeLayout>
      <HeroSection />
      <LiveActivitySection />
      <HowItWorksSection />
      <PaymentsSection />
      <DataIndexSection />
      <ArenaTeaserSection />
      <ArenaSection />
      <TrustSection />
      <ForBuildersSection />
      <FinalCTASection />
    </HomeLayout>
  )
}
