
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { useProgress } from "@/hooks/useProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, Target, Book, Trophy, Brain, 
  LayoutDashboard, FlaskConical, ChevronRight 
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { updateStreak } = useProgress("javascript"); // Default language

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
    
    // Update streak on dashboard visit
    if (isAuthenticated) {
      updateStreak.mutate();
    }
  }, [loading, isAuthenticated, navigate, updateStreak]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If not authenticated, the useEffect will redirect
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome back, {user.name || user.username}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserProfileCard />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">JavaScript Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">65% complete</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                    Daily Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Complete daily challenges to earn XP and improve your skills.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/challenges")}>
                    View Challenges
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-500" />
                    AI Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get personalized help from your AI coding mentor.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/editor")}>
                    Ask AI Mentor
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "Code Editor", icon: <Code />, path: "/editor" },
                    { name: "Skill Map", icon: <Target />, path: "/skill-map" },
                    { name: "Projects", icon: <FlaskConical />, path: "/projects" },
                    { name: "Challenges", icon: <Trophy />, path: "/challenges" },
                    { name: "Leaderboard", icon: <LayoutDashboard />, path: "/leaderboard" },
                    { name: "Interview Prep", icon: <Brain />, path: "/interview" }
                  ].map((item, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="h-24 flex flex-col items-center justify-center gap-2"
                      onClick={() => navigate(item.path)}
                    >
                      {React.cloneElement(item.icon as React.ReactElement, { className: "h-6 w-6" })}
                      <span>{item.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
