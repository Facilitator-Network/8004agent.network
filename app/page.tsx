import { HomeLayout } from "@/components/landing/home-layout"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { BrowseAgentsSection } from "@/components/landing/browse-agents-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { PaymentsSection } from "@/components/landing/payments-section"
import { TrustSection } from "@/components/landing/trust-section"

export default function Page() {
  return (
    <HomeLayout>
      <HeroSection />
      <FeaturesSection />
      <BrowseAgentsSection />
      <HowItWorksSection />
      <PaymentsSection />
      <TrustSection />
    </HomeLayout>
  )
}
