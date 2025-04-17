
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Book, Code, Trophy, LayoutDashboard, Brain, FlaskConical, Target } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-learnverse-primary to-learnverse-accent grid place-items-center">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">LearnVerse</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/dashboard" className="font-medium text-muted-foreground hover:text-foreground transition">
              Dashboard
            </Link>
            <Link to="/editor" className="font-medium text-muted-foreground hover:text-foreground transition">
              Code Editor
            </Link>
            <Link to="/challenges" className="font-medium text-muted-foreground hover:text-foreground transition">
              Challenges
            </Link>
            <Link to="/projects" className="font-medium text-muted-foreground hover:text-foreground transition">
              Projects
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link to="/dashboard">
            <Button>Start Learning</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
