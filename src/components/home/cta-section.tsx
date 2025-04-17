
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function CTASection() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-r from-learnverse-primary/20 to-learnverse-accent/20 p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))] dark:bg-grid-white/5" />
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to transform your coding journey?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of learners who have accelerated their programming skills through 
              our interactive platform. Start for free and unlock your coding potential today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <span>Get Started</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-0 opacity-50 dark:opacity-30">
            <div className="w-64 h-64 rounded-full bg-learnverse-accent blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
