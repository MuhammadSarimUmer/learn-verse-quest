
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Brain, Trophy, Lightbulb } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-learnverse-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-learnverse-accent"></span>
            </span>
            <span className="text-muted-foreground">
              Your coding journey starts here
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-foreground">Learn Programming with</span>
            <span className="bg-gradient-to-r from-learnverse-primary to-learnverse-accent bg-clip-text text-transparent">
              LearnVerse Quest
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            The most interactive way to learn coding. Features AI mentoring, 
            interactive challenges, and gamified learning to make your journey 
            engaging and effective.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                <span>Start Learning</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/editor">
              <Button variant="outline" size="lg" className="gap-2">
                Try Code Editor
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute -left-8 -top-8 z-0 h-48 w-48 rounded-full bg-learnverse-primary/20 blur-3xl"></div>
      <div className="absolute -right-8 -bottom-8 z-0 h-60 w-60 rounded-full bg-learnverse-accent/20 blur-3xl"></div>
      <div className="absolute right-1/4 top-1/3 z-0 h-32 w-32 rounded-full bg-learnverse-accent/10 blur-2xl"></div>
    </div>
  );
}
