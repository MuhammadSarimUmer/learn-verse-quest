
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  Share2,
  ChevronUp,
  Clock,
  Star,
  Calendar,
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import { Icon } from "@iconify/react";

interface LeaderboardItemProps {
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  metric: string;
  isUser?: boolean;
  trend?: "up" | "down" | "neutral";
  badges?: string[];
}

function LeaderboardItem({
  rank,
  name,
  avatar,
  score,
  metric,
  isUser = false,
  trend = "neutral",
  badges = [],
}: LeaderboardItemProps) {
  return (
    <div className={`
      flex items-center justify-between p-3 border-b last:border-0
      ${isUser ? "bg-muted/50" : ""}
    `}>
      <div className="flex items-center gap-3">
        <div className={`
          flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
          ${rank === 1 ? "bg-amber-500 text-white" : ""}
          ${rank === 2 ? "bg-slate-400 text-white" : ""}
          ${rank === 3 ? "bg-amber-800 text-white" : ""}
          ${rank > 3 ? "bg-muted" : ""}
        `}>
          {rank}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {isUser && <Badge variant="outline" className="text-xs">You</Badge>}
            {badges.map((badge, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{badge}</Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            {trend === "up" && <ChevronUp className="h-3 w-3 text-green-500" />}
            {trend === "down" && <ChevronUp className="h-3 w-3 rotate-180 text-red-500" />}
            <span>Rank {trend === "up" ? "increased" : trend === "down" ? "decreased" : "unchanged"} this week</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-semibold">{score.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">{metric}</div>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [regionFilter, setRegionFilter] = useState("global");
  const [timeFilter, setTimeFilter] = useState("allTime");

  const globalLeaders = [
    { rank: 1, name: "CodeMaster", score: 9870, trend: "up" as const, badges: ["Python"] },
    { rank: 2, name: "AlgorithmAce", score: 9340, trend: "up" as const, badges: ["Java"] },
    { rank: 3, name: "ByteWizard", score: 8950, trend: "neutral" as const, badges: ["Full-Stack"] },
    { rank: 4, name: "DevNinja", score: 8120, trend: "up" as const },
    { rank: 5, name: "SyntaxSage", score: 7880, trend: "down" as const },
    { rank: 6, name: "CodeArtisan", score: 7720, trend: "neutral" as const },
    { rank: 7, name: "VariableViking", score: 7340, trend: "up" as const },
    { rank: 8, name: "You", score: 7210, trend: "up" as const, isUser: true },
    { rank: 9, name: "LogicLegend", score: 6980, trend: "down" as const },
    { rank: 10, name: "DigitalDruid", score: 6740, trend: "up" as const },
  ];

  const challengeLeaders = [
    { rank: 1, name: "PuzzlePro", score: 342, trend: "up" as const, badges: ["Problem Solver"] },
    { rank: 2, name: "ChallengeChamp", score: 327, trend: "up" as const },
    { rank: 3, name: "AlgoArtist", score: 301, trend: "up" as const },
    { rank: 4, name: "BugBuster", score: 285, trend: "neutral" as const },
    { rank: 5, name: "You", score: 271, trend: "up" as const, isUser: true },
    { rank: 6, name: "CodeCrusader", score: 267, trend: "down" as const },
    { rank: 7, name: "SyntaxSolver", score: 254, trend: "neutral" as const },
    { rank: 8, name: "ErrorEraser", score: 241, trend: "up" as const },
    { rank: 9, name: "LogicLuminary", score: 230, trend: "down" as const },
    { rank: 10, name: "IterationImp", score: 219, trend: "up" as const },
  ];

  const streakLeaders = [
    { rank: 1, name: "ConsistentCoder", score: 365, trend: "neutral" as const, badges: ["1 Year!"] },
    { rank: 2, name: "DailyDev", score: 287, trend: "up" as const },
    { rank: 3, name: "RegularRyan", score: 215, trend: "up" as const },
    { rank: 4, name: "StreakStar", score: 186, trend: "neutral" as const },
    { rank: 5, name: "ContinuousCoder", score: 159, trend: "up" as const },
    { rank: 6, name: "PersistentPro", score: 132, trend: "up" as const },
    { rank: 7, name: "You", score: 124, trend: "up" as const, isUser: true },
    { rank: 8, name: "HabitHero", score: 108, trend: "down" as const },
    { rank: 9, name: "DisciplinedDev", score: 97, trend: "neutral" as const },
    { rank: 10, name: "ConsistencyKing", score: 91, trend: "up" as const },
  ];

  const leaderboardMetrics = [
    { id: 1, title: "Your Global Rank", value: "8th", icon: Globe, description: "Out of 250,000+ users" },
    { id: 2, title: "Weekly Challenges", value: "15", icon: Star, description: "Completed this week" },
    { id: 3, title: "Current Streak", value: "124", icon: Clock, description: "Days of consistent learning" },
    { id: 4, title: "Region Rank", value: "3rd", icon: MapPin, description: "In your country" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Leaderboard</h1>
              <p className="text-muted-foreground">
                Compete with other learners and climb the ranks
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {leaderboardMetrics.map((metric) => (
                <Card key={metric.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </CardTitle>
                      <metric.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leaderboard Tabs */}
            <Tabs defaultValue="xp">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="xp" className="flex items-center gap-1.5">
                    <Trophy className="h-4 w-4" />
                    XP Points
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="flex items-center gap-1.5">
                    <Star className="h-4 w-4" />
                    Challenges
                  </TabsTrigger>
                  <TabsTrigger value="streaks" className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Streaks
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Global
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    All Time
                  </Button>
                </div>
              </div>

              <TabsContent value="xp">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-1.5">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          Top XP Earners
                        </CardTitle>
                        <CardDescription>
                          Users with the highest overall experience points
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border divide-y">
                      {globalLeaders.map((leader) => (
                        <LeaderboardItem
                          key={leader.rank}
                          rank={leader.rank}
                          name={leader.name}
                          score={leader.score}
                          metric="XP points"
                          trend={leader.trend}
                          isUser={leader.isUser}
                          badges={leader.badges}
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" className="gap-1.5">
                        <Users className="h-4 w-4" />
                        View All Rankings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="challenges">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-1.5">
                          <Star className="h-5 w-5 text-amber-500" />
                          Challenge Champions
                        </CardTitle>
                        <CardDescription>
                          Users who have completed the most challenges
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border divide-y">
                      {challengeLeaders.map((leader) => (
                        <LeaderboardItem
                          key={leader.rank}
                          rank={leader.rank}
                          name={leader.name}
                          score={leader.score}
                          metric="Challenges completed"
                          trend={leader.trend}
                          isUser={leader.isUser}
                          badges={leader.badges}
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" className="gap-1.5">
                        <Users className="h-4 w-4" />
                        View All Rankings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="streaks">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center gap-1.5">
                          <Clock className="h-5 w-5 text-amber-500" />
                          Streak Masters
                        </CardTitle>
                        <CardDescription>
                          Users with the longest consecutive learning streaks
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border divide-y">
                      {streakLeaders.map((leader) => (
                        <LeaderboardItem
                          key={leader.rank}
                          rank={leader.rank}
                          name={leader.name}
                          score={leader.score}
                          metric="Days streak"
                          trend={leader.trend}
                          isUser={leader.isUser}
                          badges={leader.badges}
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" className="gap-1.5">
                        <Users className="h-4 w-4" />
                        View All Rankings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
