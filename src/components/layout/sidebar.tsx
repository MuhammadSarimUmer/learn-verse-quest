
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Code, 
  Trophy, 
  Lightbulb,
  Puzzle, 
  MessageSquare, 
  Target, 
  FileCode, 
  GitBranch,
  BookOpen
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/editor", label: "Code Editor", icon: Code },
    { href: "/challenges", label: "Challenges", icon: Puzzle },
    { href: "/projects", label: "Projects", icon: FileCode },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/skill-map", label: "Skill Map", icon: Target },
    { href: "/interview", label: "Interview Mode", icon: MessageSquare },
  ];

  return (
    <aside className={cn("pb-12 w-64 bg-sidebar border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-sidebar-foreground">
            Learn
          </h2>
          <div className="space-y-1">
            {links.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  location.pathname === link.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-sidebar-foreground">
            Progress
          </h2>
          <div className="space-y-1">
            {links.slice(4).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  location.pathname === link.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="h-5 w-5 text-learnverse-accent" />
              <h3 className="font-medium">AI Mentor</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Ask questions and get personalized coding help with our AI mentor.
            </p>
            <Link to="/dashboard?ai=open">
              <button className="w-full rounded-md bg-learnverse-accent px-3 py-1.5 text-xs text-white">
                Ask AI Mentor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
