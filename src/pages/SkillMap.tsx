
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  Book,
  BarChart2,
  BarChart,
  LineChart,
  HelpCircle,
  Lock,
} from "lucide-react";

export default function SkillMap() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  
  // Mock data for skill map
  const languages = [
    { id: "python", name: "Python", progress: 68 },
    { id: "javascript", name: "JavaScript", progress: 42 },
    { id: "java", name: "Java", progress: 25 },
    { id: "cpp", name: "C++", progress: 15 },
    { id: "ruby", name: "Ruby", progress: 8 },
  ];
  
  // Mock skill categories
  const skillCategories = [
    {
      id: "fundamentals",
      name: "Language Fundamentals",
      skills: [
        { id: "syntax", name: "Syntax", progress: 100, status: "completed" },
        { id: "variables", name: "Variables & Data Types", progress: 100, status: "completed" },
        { id: "controlflow", name: "Control Flow", progress: 100, status: "completed" },
        { id: "functions", name: "Functions", progress: 80, status: "in-progress" },
        { id: "errorhandling", name: "Error Handling", progress: 40, status: "in-progress" },
        { id: "modules", name: "Modules & Packages", progress: 20, status: "in-progress" },
      ]
    },
    {
      id: "data-structures",
      name: "Data Structures",
      skills: [
        { id: "lists", name: "Lists & Arrays", progress: 90, status: "in-progress" },
        { id: "dictionaries", name: "Dictionaries & Maps", progress: 75, status: "in-progress" },
        { id: "sets", name: "Sets", progress: 60, status: "in-progress" },
        { id: "tuples", name: "Tuples", progress: 50, status: "in-progress" },
        { id: "stacks", name: "Stacks & Queues", progress: 30, status: "in-progress" },
        { id: "trees", name: "Trees & Graphs", progress: 0, status: "locked" },
      ]
    },
    {
      id: "oop",
      name: "Object-Oriented Programming",
      skills: [
        { id: "classes", name: "Classes & Objects", progress: 70, status: "in-progress" },
        { id: "inheritance", name: "Inheritance", progress: 60, status: "in-progress" },
        { id: "polymorphism", name: "Polymorphism", progress: 40, status: "in-progress" },
        { id: "encapsulation", name: "Encapsulation", progress: 30, status: "in-progress" },
        { id: "abstraction", name: "Abstraction", progress: 20, status: "in-progress" },
        { id: "designpatterns", name: "Design Patterns", progress: 0, status: "locked" },
      ]
    },
    {
      id: "algorithms",
      name: "Algorithms",
      skills: [
        { id: "searching", name: "Searching Algorithms", progress: 50, status: "in-progress" },
        { id: "sorting", name: "Sorting Algorithms", progress: 40, status: "in-progress" },
        { id: "recursion", name: "Recursion", progress: 30, status: "in-progress" },
        { id: "dynamic", name: "Dynamic Programming", progress: 0, status: "locked" },
        { id: "greedy", name: "Greedy Algorithms", progress: 0, status: "locked" },
        { id: "backtracking", name: "Backtracking", progress: 0, status: "locked" },
      ]
    }
  ];
  
  // Mock skill stats
  const skillStats = {
    totalSkills: 24,
    completedSkills: 8,
    inProgressSkills: 10,
    lockedSkills: 6,
    overallProgress: 42,
    recentMilestones: [
      "Completed Python Syntax",
      "Mastered Variables & Data Types",
      "Finished Control Flow module",
    ],
    weakAreas: [
      "Error Handling",
      "Dynamic Programming",
      "Design Patterns",
    ],
    strongAreas: [
      "Syntax Fundamentals",
      "Lists & Arrays",
      "Classes & Objects",
    ],
  };

  // Function to render skill nodes
  const renderSkillNodes = (skills) => {
    return skills.map((skill) => (
      <div 
        key={skill.id}
        className={`
          relative p-4 border rounded-lg transition-all
          ${skill.status === 'completed' ? 'bg-learnverse-primary/20 border-learnverse-primary' : ''}
          ${skill.status === 'in-progress' ? 'bg-muted border-muted-foreground/30' : ''}
          ${skill.status === 'locked' ? 'bg-muted/50 border-dashed opacity-60' : ''}
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {skill.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-learnverse-accent" />}
            {skill.status === 'in-progress' && <Circle className="h-4 w-4 text-muted-foreground" />}
            {skill.status === 'locked' && <Lock className="h-4 w-4 text-muted-foreground" />}
            <span className="font-medium">{skill.name}</span>
          </div>
          {skill.status !== 'locked' && (
            <Badge variant={skill.status === 'completed' ? 'outline' : 'secondary'}>
              {skill.progress}%
            </Badge>
          )}
        </div>
        {skill.status !== 'locked' && (
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full 
                ${skill.status === 'completed' ? 'bg-learnverse-accent' : 'bg-learnverse-primary/60'}`
              }
              style={{ width: `${skill.progress}%` }}
            ></div>
          </div>
        )}
        {skill.status !== 'locked' ? (
          <Button 
            variant={skill.status === 'completed' ? 'outline' : 'default'} 
            size="sm" 
            className="mt-3 w-full"
          >
            {skill.status === 'completed' ? 'Review' : 'Continue'}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="mt-3 w-full" disabled>
            Locked
            <Lock className="ml-2 h-3 w-3" />
          </Button>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Skill Map</h1>
                <p className="text-muted-foreground">
                  Track your programming skills and visualize your learning progress
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="rounded-md border p-1.5 bg-background text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language overview card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-learnverse-accent" />
                  {languages.find(l => l.id === selectedLanguage)?.name} Learning Progress
                </CardTitle>
                <CardDescription>
                  Your skill development in {languages.find(l => l.id === selectedLanguage)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-40 h-40">
                    <div className="skill-radar">
                      <div className="radar-ring radar-ring-1"></div>
                      <div className="radar-ring radar-ring-2"></div>
                      <div className="radar-ring radar-ring-3"></div>
                      
                      {/* Example skill points, in a real app these would be calculated based on actual data */}
                      <div className="radar-skill" style={{ top: '30%', left: '70%' }}></div>
                      <div className="radar-skill" style={{ top: '50%', left: '85%' }}></div>
                      <div className="radar-skill" style={{ top: '75%', left: '60%' }}></div>
                      <div className="radar-skill" style={{ top: '80%', left: '35%' }}></div>
                      <div className="radar-skill" style={{ top: '60%', left: '15%' }}></div>
                      <div className="radar-skill" style={{ top: '30%', left: '25%' }}></div>
                      <div className="radar-skill" style={{ top: '15%', left: '50%' }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{languages.find(l => l.id === selectedLanguage)?.progress}%</div>
                        <div className="text-xs text-muted-foreground">Overall</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Language Fundamentals</div>
                        <div className="progress-path">
                          <div className="progress-fill" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Data Structures</div>
                        <div className="progress-path">
                          <div className="progress-fill" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Object-Oriented Programming</div>
                        <div className="progress-path">
                          <div className="progress-fill" style={{ width: '55%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Algorithms</div>
                        <div className="progress-path">
                          <div className="progress-fill" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Play className="mr-2 h-4 w-4 text-learnverse-accent" />
                        Continue Learning
                      </Button>
                      <Button size="sm" variant="outline">
                        <Book className="mr-2 h-4 w-4" />
                        Skill Assessment
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Detailed Stats
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill categories */}
            <Tabs defaultValue="fundamentals">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  {skillCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {skillCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderSkillNodes(category.skills)}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Statistics and insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-learnverse-primary" />
                    Skill Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">{skillStats.completedSkills}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">{skillStats.inProgressSkills}</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">{skillStats.lockedSkills}</div>
                        <div className="text-sm text-muted-foreground">Locked</div>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">{skillStats.totalSkills}</div>
                        <div className="text-sm text-muted-foreground">Total Skills</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Skill Distribution</div>
                      <div className="h-4 w-full rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-learnverse-accent" 
                          style={{ width: `${(skillStats.completedSkills / skillStats.totalSkills) * 100}%` }}
                        ></div>
                        <div 
                          className="h-full bg-learnverse-primary/60" 
                          style={{ width: `${(skillStats.inProgressSkills / skillStats.totalSkills) * 100}%` }}
                        ></div>
                        <div 
                          className="h-full bg-muted" 
                          style={{ width: `${(skillStats.lockedSkills / skillStats.totalSkills) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex text-xs text-muted-foreground justify-between">
                        <div>Completed</div>
                        <div>In Progress</div>
                        <div>Locked</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-learnverse-accent" />
                    Learning Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium mb-2">Recent Milestones</div>
                      <ul className="space-y-1">
                        {skillStats.recentMilestones.map((milestone, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-learnverse-accent" />
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium mb-2">Strengths</div>
                        <ul className="space-y-1">
                          {skillStats.strongAreas.map((area, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-learnverse-primary" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-medium mb-2">Areas to Improve</div>
                        <ul className="space-y-1">
                          {skillStats.weakAreas.map((area, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <HelpCircle className="h-4 w-4 text-amber-500" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Learning Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
