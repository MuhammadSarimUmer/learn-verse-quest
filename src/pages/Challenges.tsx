
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Star,
  Clock,
  Zap,
  Check,
  Filter,
  Search,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Challenges() {
  const [challengeFilter, setChallengeFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Mock challenge data
  const challenges = [
    {
      id: 1,
      title: "Fix the Loop",
      description: "Debug and fix a loop that's not terminating correctly",
      difficulty: "Easy",
      timeEstimate: "10 min",
      points: 30,
      language: "Python",
      icon: "logos:python",
      status: "complete",
      path: "/editor?challenge=fix-loop",
    },
    {
      id: 2,
      title: "Array Manipulation",
      description: "Implement three array operations: filter, map, and reduce",
      difficulty: "Medium",
      timeEstimate: "20 min",
      points: 60,
      language: "JavaScript",
      icon: "logos:javascript",
      status: "incomplete",
      path: "/editor?challenge=array-manipulation",
    },
    {
      id: 3,
      title: "Implement a Stack",
      description: "Create a stack data structure with push, pop, and peek operations",
      difficulty: "Medium",
      timeEstimate: "25 min",
      points: 70,
      language: "Java",
      icon: "logos:java",
      status: "incomplete",
      path: "/editor?challenge=implement-stack",
    },
    {
      id: 4,
      title: "String Reversal",
      description: "Write a function to reverse a string in-place",
      difficulty: "Easy",
      timeEstimate: "10 min",
      points: 30,
      language: "C++",
      icon: "logos:c-plusplus",
      status: "incomplete",
      path: "/editor?challenge=string-reversal",
    },
    {
      id: 5,
      title: "Recursion Challenge",
      description: "Solve a problem using recursion: calculate factorial and Fibonacci",
      difficulty: "Hard",
      timeEstimate: "35 min",
      points: 100,
      language: "Python",
      icon: "logos:python",
      status: "incomplete",
      path: "/editor?challenge=recursion-challenge",
    },
    {
      id: 6,
      title: "Asynchronous Operations",
      description: "Master Promises and async/await with a series of challenges",
      difficulty: "Hard",
      timeEstimate: "40 min",
      points: 120,
      language: "JavaScript",
      icon: "logos:javascript",
      status: "incomplete",
      path: "/editor?challenge=async-operations",
    },
  ];

  // Filter challenges based on selected filters
  const filteredChallenges = challenges.filter((challenge) => {
    const statusMatch = challengeFilter === "all" || 
      (challengeFilter === "complete" && challenge.status === "complete") ||
      (challengeFilter === "incomplete" && challenge.status === "incomplete");
    
    const languageMatch = languageFilter === "all" || challenge.language.toLowerCase() === languageFilter;
    
    const difficultyMatch = difficultyFilter === "all" || challenge.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    return statusMatch && languageMatch && difficultyMatch;
  });

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: "CodeMaster", points: 2340, challenges: 42 },
    { rank: 2, name: "PythonPro", points: 2105, challenges: 38 },
    { rank: 3, name: "JavaScripter", points: 1920, challenges: 35 },
    { rank: 4, name: "AlgoAce", points: 1740, challenges: 31 },
    { rank: 5, name: "CodeNinja", points: 1560, challenges: 29 },
    { rank: 6, name: "ByteWizard", points: 1450, challenges: 27 },
    { rank: 7, name: "SyntaxSage", points: 1320, challenges: 25 },
    { rank: 8, name: "You", points: 1210, challenges: 23 },
    { rank: 9, name: "DevDragon", points: 1180, challenges: 22 },
    { rank: 10, name: "BugHunter", points: 1050, challenges: 20 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Tabs defaultValue="challenges">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Coding Challenges</h1>
                <p className="text-muted-foreground">Test your skills with daily challenges and compete on the leaderboard</p>
              </div>
              <TabsList className="mt-4 md:mt-0">
                <TabsTrigger value="challenges" className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4" />
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="challenges" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                  <Badge variant="outline" className="flex items-center gap-1.5 rounded-full">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Daily Challenges
                  </Badge>
                  <div className="text-sm font-medium">
                    <span className="text-learnverse-accent">3</span> new challenges today!
                  </div>
                </div>
                
                <div className="flex-1" />
                
                <div className="flex flex-wrap gap-2">
                  <Select value={challengeFilter} onValueChange={setChallengeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="incomplete">Incomplete</SelectItem>
                      <SelectItem value="complete">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={languageFilter} onValueChange={setLanguageFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="c++">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChallenges.length > 0 ? (
                  filteredChallenges.map((challenge) => (
                    <Card key={challenge.id} className={challenge.status === "complete" ? "border-green-500/30" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon icon={challenge.icon} className="h-5 w-5" />
                            <CardTitle className="text-base">{challenge.title}</CardTitle>
                          </div>
                          <Badge variant={
                            challenge.difficulty === "Easy" ? "outline" :
                            challenge.difficulty === "Medium" ? "secondary" : "destructive"
                          }>{challenge.difficulty}</Badge>
                        </div>
                        <CardDescription>{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{challenge.timeEstimate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>{challenge.points} points</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={challenge.path} className="w-full">
                          <Button 
                            variant={challenge.status === "complete" ? "outline" : "default"} 
                            className="w-full"
                          >
                            {challenge.status === "complete" ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                View Solution
                              </>
                            ) : (
                              "Start Challenge"
                            )}
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No matching challenges</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters to find challenges</p>
                    <Button onClick={() => {
                      setChallengeFilter("all");
                      setLanguageFilter("all");
                      setDifficultyFilter("all");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Leaderboard</CardTitle>
                  <CardDescription>Top performers based on challenge points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div className="col-span-1">Rank</div>
                      <div className="col-span-6">Name</div>
                      <div className="col-span-3 text-right">Points</div>
                      <div className="col-span-2 text-right">Challenges</div>
                    </div>
                    <div className="divide-y">
                      {leaderboardData.map((user) => (
                        <div 
                          key={user.rank} 
                          className={`grid grid-cols-12 p-3 text-sm ${user.name === "You" ? "bg-muted" : ""}`}
                        >
                          <div className="col-span-1 font-medium">
                            {user.rank <= 3 ? (
                              <div className={`
                                inline-flex items-center justify-center w-6 h-6 rounded-full
                                ${user.rank === 1 ? "bg-amber-500" : ""}
                                ${user.rank === 2 ? "bg-slate-400" : ""}
                                ${user.rank === 3 ? "bg-amber-800" : ""}
                                text-white
                              `}>
                                {user.rank}
                              </div>
                            ) : user.rank}
                          </div>
                          <div className="col-span-6 font-medium">
                            {user.name}
                            {user.name === "You" && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </div>
                          <div className="col-span-3 text-right">{user.points.toLocaleString()}</div>
                          <div className="col-span-2 text-right">{user.challenges}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
