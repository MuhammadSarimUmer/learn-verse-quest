
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileCode,
  Layers,
  Plus,
  Sparkles,
  Clock,
  User,
  Tag,
  ArrowRight,
  Book,
  Heart,
  Share2,
  Bookmark,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Mock project data
  const projects = [
    {
      id: 1,
      title: "Weather App",
      description: "Create a weather application that fetches real-time data from an API",
      difficulty: "Beginner",
      time: "2-3 hours",
      topics: ["APIs", "Async/Await", "UI Design"],
      languages: ["JavaScript", "HTML", "CSS"],
      category: "web",
      popular: true,
      saved: false,
      path: "/editor?project=weather-app",
    },
    {
      id: 2,
      title: "Task Manager CLI",
      description: "Build a command-line task management system with persistence",
      difficulty: "Intermediate",
      time: "4-5 hours",
      topics: ["File I/O", "Data Structures", "CLI"],
      languages: ["Python"],
      category: "cli",
      popular: false,
      saved: true,
      path: "/editor?project=task-manager",
    },
    {
      id: 3,
      title: "Blog Platform",
      description: "Create a full-featured blog platform with authentication and post management",
      difficulty: "Advanced",
      time: "10-12 hours",
      topics: ["Authentication", "Database", "Frontend"],
      languages: ["JavaScript", "React", "Node.js"],
      category: "web",
      popular: true,
      saved: false,
      path: "/editor?project=blog-platform",
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description: "Create an interactive dashboard to visualize and analyze data",
      difficulty: "Intermediate",
      time: "6-8 hours",
      topics: ["Charts", "Data Processing", "UI Design"],
      languages: ["JavaScript", "React", "D3.js"],
      category: "data",
      popular: true,
      saved: false,
      path: "/editor?project=data-dashboard",
    },
    {
      id: 5,
      title: "Snake Game",
      description: "Build the classic Snake game with levels and score tracking",
      difficulty: "Beginner",
      time: "3-4 hours",
      topics: ["Game Logic", "Canvas", "Event Handling"],
      languages: ["JavaScript", "HTML", "CSS"],
      category: "games",
      popular: true,
      saved: true,
      path: "/editor?project=snake-game",
    },
    {
      id: 6,
      title: "Chat Application",
      description: "Create a real-time chat application with multiple rooms",
      difficulty: "Advanced",
      time: "8-10 hours",
      topics: ["Websockets", "Authentication", "UI/UX"],
      languages: ["JavaScript", "Node.js", "Socket.io"],
      category: "web",
      popular: false,
      saved: false,
      path: "/editor?project=chat-app",
    },
  ];

  // Filter projects based on search term and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filter === "all" ||
      (filter === "popular" && project.popular) ||
      (filter === "saved" && project.saved) ||
      project.category === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Real-World Projects</h1>
              <p className="text-muted-foreground">
                Build practical projects to reinforce your programming skills
              </p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, languages, or topics..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="web">Web</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="games">Games</TabsTrigger>
                  <TabsTrigger value="cli">CLI</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* AI Project Generator */}
            <Card className="bg-gradient-to-r from-learnverse-primary/20 to-learnverse-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-learnverse-accent" />
                  AI Project Generator
                </CardTitle>
                <CardDescription>
                  Let our AI create a personalized project based on your interests and skill level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-3">
                  <Button className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Beginner Project
                  </Button>
                  <Button className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Intermediate Project
                  </Button>
                  <Button className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Advanced Project
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Explore Projects</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
              
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge variant={
                            project.difficulty === "Beginner" ? "outline" :
                            project.difficulty === "Intermediate" ? "secondary" : "default"
                          }>
                            {project.difficulty}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-1">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.languages.map((lang, idx) => (
                            <Badge key={idx} variant="outline" className="bg-muted/50">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{project.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            <span>{project.topics.length} topics</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart className={`h-4 w-4 ${project.saved ? "fill-learnverse-accent text-learnverse-accent" : ""}`} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Link to={project.path}>
                          <Button size="sm" className="gap-1">
                            Start Project
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <div className="rounded-full w-12 h-12 grid place-items-center bg-muted mx-auto mb-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No projects found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
