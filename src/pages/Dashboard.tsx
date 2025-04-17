
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Target, 
  Zap, 
  Clock, 
  ArrowRight, 
  BookMarked, 
  Play,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data for user's progress
  const userProgress = {
    name: "User",
    level: 7,
    xp: 3240,
    nextLevel: 4000,
    streak: 12,
    completedChallenges: 42,
    activeCourse: "Python Fundamentals",
    progress: 68,
    recentLanguages: ["Python", "JavaScript", "Java"],
    dailyGoal: 80,
  };

  // Mock data for recommended paths
  const recommendedPaths = [
    {
      title: "Python Fundamentals",
      description: "Master Python basics and core programming concepts",
      progress: 68,
      icon: BookOpen,
      color: "bg-code-python text-white",
      path: "/editor?course=python-fundamentals"
    },
    {
      title: "JavaScript for Web Dev",
      description: "Learn interactive web development with JavaScript",
      progress: 24,
      icon: Code,
      color: "bg-code-javascript text-black",
      path: "/editor?course=javascript-web-dev"
    },
    {
      title: "Data Structures",
      description: "Essential data structures in multiple languages",
      progress: 12,
      icon: Target,
      color: "bg-learnverse-accent text-white",
      path: "/editor?course=data-structures"
    },
  ];

  // Mock data for daily challenges
  const dailyChallenges = [
    {
      title: "Fix the Loop",
      difficulty: "Easy",
      points: 20,
      language: "Python",
      completed: true,
      path: "/challenges?id=fix-loop"
    },
    {
      title: "Array Manipulation",
      difficulty: "Medium",
      points: 50,
      language: "JavaScript",
      completed: false,
      path: "/challenges?id=array-manipulation"
    },
    {
      title: "Implement a Stack",
      difficulty: "Medium",
      points: 50,
      language: "Java",
      completed: false,
      path: "/challenges?id=implement-stack"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userProgress.name}!</h1>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
              <Link to="/editor">
                <Button className="gap-2">
                  <Play className="h-4 w-4" />
                  Resume Learning
                </Button>
              </Link>
            </div>

            {/* Progress overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Level</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{userProgress.level}</div>
                    <div className="text-xs text-muted-foreground">
                      {userProgress.xp}/{userProgress.nextLevel} XP
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-learnverse-primary rounded-full" 
                      style={{ width: `${(userProgress.xp / userProgress.nextLevel) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Daily Streak</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{userProgress.streak} days</div>
                    <Zap className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Keep it going!</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Challenges</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{userProgress.completedChallenges}</div>
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Ranked in top 25%
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Daily Goal</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-2xl font-bold">{userProgress.dailyGoal}%</div>
                  <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-learnverse-accent rounded-full" 
                      style={{ width: `${userProgress.dailyGoal}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active course */}
            <Card className="border-l-4 border-l-learnverse-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Continue Learning: {userProgress.activeCourse}</span>
                  <span className="text-sm font-normal text-muted-foreground">{userProgress.progress}% complete</span>
                </CardTitle>
                <CardDescription>
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-learnverse-primary rounded-full" 
                    style={{ width: `${userProgress.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Next lesson: Functions and Parameters (15 min)</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to="/skill-map">
                  <Button variant="outline" size="sm">View Skills</Button>
                </Link>
                <Link to="/editor?continue=true">
                  <Button size="sm" className="gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Learning paths */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recommended Learning Paths</h2>
                <Link to="/skill-map">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedPaths.map((path, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className={`${path.color}`}>
                      <div className="flex items-center gap-2">
                        <path.icon className="h-5 w-5" />
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardDescription className="mb-3">{path.description}</CardDescription>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-learnverse-accent rounded-full" 
                          style={{ width: `${path.progress}%` }}
                        ></div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={path.path} className="w-full">
                        <Button className="w-full gap-2">
                          <BookMarked className="h-4 w-4" />
                          Start Learning
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Daily challenges */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Daily Challenges</h2>
                <Link to="/challenges">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dailyChallenges.map((challenge, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          {challenge.title}
                          {challenge.completed && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                        </CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full
                          ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                          ${challenge.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' : ''}
                          ${challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                        `}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <CardDescription>
                        {challenge.language} • {challenge.points} points
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link to={challenge.path} className="w-full">
                        <Button variant={challenge.completed ? "outline" : "default"} size="sm" className="w-full">
                          {challenge.completed ? 'View Solution' : 'Start Challenge'}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
