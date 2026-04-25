"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DemoSection } from "@/components/landing/demo-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export function LandingPage() {
  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-[#07090f] text-slate-100">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <HowItWorksSection />
          <DemoSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}