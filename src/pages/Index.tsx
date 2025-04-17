
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { LanguagesSection } from "@/components/home/languages-section";
import { CTASection } from "@/components/home/cta-section";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <LanguagesSection />
        <CTASection />
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
          <p className="text-sm text-muted-foreground">
            © 2025 LearnVerse Quest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
