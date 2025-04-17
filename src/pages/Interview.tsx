
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
  MessageSquare,
  Clock,
  Video,
  Mic,
  Play,
  Pencil,
  FileText,
  ArrowUpRight,
  CheckCircle,
  BarChart2,
  Calendar,
  ChevronDown,
  Star,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function Interview() {
  const [interviewMode, setInterviewMode] = useState<string | null>(null);
  
  // Mock interview sessions
  const upcomingInterviews = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      date: "Tomorrow, 2:00 PM",
      duration: "45 minutes",
      type: "Technical",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Algorithms Practice",
      company: "AI Coach",
      date: "In 3 days",
      duration: "60 minutes",
      type: "Practice",
      status: "scheduled",
    },
  ];
  
  // Mock past interview data
  const pastInterviews = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      date: "2 days ago",
      duration: "30 minutes",
      score: 85,
      feedback: "Good understanding of core concepts. Need to work on async/await patterns.",
      type: "Practice",
    },
    {
      id: 2,
      title: "Python Developer",
      company: "Data Solutions",
      date: "1 week ago",
      duration: "45 minutes",
      score: 78,
      feedback: "Strong in data structures, could improve algorithm optimization.",
      type: "Technical",
    },
    {
      id: 3,
      title: "Data Structures Review",
      date: "2 weeks ago",
      duration: "60 minutes",
      score: 92,
      feedback: "Excellent understanding of linked lists and trees. Very good solution approaches.",
      type: "Practice",
    },
  ];
  
  // Mock practice topics
  const practiceTopics = [
    {
      id: 1,
      title: "JavaScript Interview Questions",
      questions: 42,
      difficulty: "Intermediate",
      category: "Frontend",
      popular: true,
    },
    {
      id: 2,
      title: "Python Algorithms & Data Structures",
      questions: 65,
      difficulty: "Advanced",
      category: "Algorithms",
      popular: true,
    },
    {
      id: 3,
      title: "System Design Basics",
      questions: 30,
      difficulty: "Intermediate",
      category: "Backend",
      popular: false,
    },
    {
      id: 4,
      title: "Frontend Concepts",
      questions: 55,
      difficulty: "Beginner",
      category: "Frontend",
      popular: true,
    },
    {
      id: 5,
      title: "SQL Database Questions",
      questions: 38,
      difficulty: "Intermediate",
      category: "Database",
      popular: false,
    },
    {
      id: 6,
      title: "React Framework Deep Dive",
      questions: 50,
      difficulty: "Advanced",
      category: "Frontend",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          {!interviewMode ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Interview Preparation</h1>
                <p className="text-muted-foreground">
                  Practice technical interviews with AI-powered feedback
                </p>
              </div>
              
              {/* Interview Modes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-learnverse-primary/50 hover:border-learnverse-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-learnverse-primary" />
                      AI Mock Interview
                    </CardTitle>
                    <CardDescription>
                      Practice with an AI interviewer that adapts to your responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>30-60 minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>Text or Voice interaction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Detailed feedback report</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => setInterviewMode("ai")}
                    >
                      Start AI Interview
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-learnverse-accent" />
                      Practice Questions
                    </CardTitle>
                    <CardDescription>
                      Practice with curated questions by topic and difficulty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>1000+ technical questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <span>Multiple choice & coding</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                        <span>Track progress over time</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setInterviewMode("practice")}
                    >
                      Practice Questions
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-red-500" />
                      Recorded Interview
                    </CardTitle>
                    <CardDescription>
                      Record your answers to common interview questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-muted-foreground" />
                        <span>Practice verbal responses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4 text-muted-foreground" />
                        <span>Review and improve</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>AI feedback on delivery</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setInterviewMode("recorded")}
                    >
                      Start Recording
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Upcoming Interviews */}
              {upcomingInterviews.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Upcoming Interviews</h2>
                  <div className="space-y-3">
                    {upcomingInterviews.map((interview) => (
                      <Card key={interview.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{interview.title}</CardTitle>
                              {interview.company && (
                                <CardDescription>{interview.company}</CardDescription>
                              )}
                            </div>
                            <Badge>{interview.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{interview.duration}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button size="sm">
                            Join Interview
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Interview History and Practice Topics */}
              <Tabs defaultValue="practice">
                <TabsList className="mb-4">
                  <TabsTrigger value="practice">Practice Topics</TabsTrigger>
                  <TabsTrigger value="history">Interview History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="practice">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {practiceTopics.map((topic) => (
                      <Card key={topic.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base flex items-center">
                              {topic.title}
                              {topic.popular && (
                                <Badge variant="secondary" className="ml-2 text-xs">Popular</Badge>
                              )}
                            </CardTitle>
                          </div>
                          <CardDescription>
                            {topic.category} • {topic.questions} questions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant={
                              topic.difficulty === "Beginner" ? "outline" :
                              topic.difficulty === "Intermediate" ? "secondary" : "default"
                            }>
                              {topic.difficulty}
                            </Badge>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= 4 ? "text-amber-500 fill-amber-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant="outline" size="sm">
                            Start Practice
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="space-y-4">
                    {pastInterviews.map((interview) => (
                      <Card key={interview.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{interview.title}</CardTitle>
                              {interview.company && (
                                <CardDescription>{interview.company}</CardDescription>
                              )}
                            </div>
                            <Badge>{interview.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-4 text-sm mb-2">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{interview.duration}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="font-medium">Score: </span>
                              <span className={`
                                ${interview.score >= 90 ? "text-emerald-500" : ""}
                                ${interview.score >= 70 && interview.score < 90 ? "text-amber-500" : ""}
                                ${interview.score < 70 ? "text-red-500" : ""}
                              `}>
                                {interview.score}/100
                              </span>
                            </div>
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full 
                                  ${interview.score >= 90 ? "bg-emerald-500" : ""}
                                  ${interview.score >= 70 && interview.score < 90 ? "bg-amber-500" : ""}
                                  ${interview.score < 70 ? "bg-red-500" : ""}
                                `}
                                style={{ width: `${interview.score}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <span className="font-medium">Feedback: </span>
                            {interview.feedback}
                          </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            // Interview mode interface
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setInterviewMode(null)}
                >
                  Back to Dashboard
                </Button>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    00:00
                  </Badge>
                  <Button variant="destructive" size="sm">
                    End Session
                  </Button>
                </div>
              </div>

              {interviewMode === "ai" && (
                <Card className="border-2 border-learnverse-primary overflow-hidden flex flex-col">
                  <CardHeader className="bg-muted/50 pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-learnverse-primary" />
                      AI Technical Interview - Frontend Developer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <div className="p-4 border-b bg-card">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-learnverse-accent grid place-items-center flex-shrink-0">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium mb-1">AI Interviewer</div>
                          <div className="text-sm">
                            Hello! I'll be conducting your technical interview today focusing on frontend development. Let's start with an introduction - can you tell me about yourself and your background in web development?
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64 flex items-center justify-center p-6 text-center">
                      <div>
                        <Button className="mb-4">
                          <Mic className="h-4 w-4 mr-2" />
                          Start Interview
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Choose how you want to interact with the AI interviewer
                        </p>
                        <div className="flex justify-center gap-3 mt-3">
                          <Button size="sm" variant="outline">
                            <Mic className="h-4 w-4 mr-2" />
                            Voice
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Text
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-3 flex flex-col gap-3">
                    <div className="w-full flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type your response..."
                        className="flex-1 rounded-md border p-2 bg-background"
                      />
                      <Button>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      The AI interviewer will adapt questions based on your responses and skill level.
                    </div>
                  </CardFooter>
                </Card>
              )}

              {interviewMode === "practice" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Questions</CardTitle>
                    <CardDescription>
                      Select a topic to begin practicing interview questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {practiceTopics.slice(0, 3).map((topic) => (
                        <Card key={topic.id} className="border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{topic.title}</CardTitle>
                            <CardDescription>
                              {topic.questions} questions • {topic.difficulty}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full" size="sm">
                              Start
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {interviewMode === "recorded" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-red-500" />
                      Recorded Interview Session
                    </CardTitle>
                    <CardDescription>
                      Practice answering common interview questions and review your responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 grid place-items-center mb-4">
                      <Video className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Ready to start recording?</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      You'll be asked a series of interview questions. Record your responses to each one and receive AI feedback on your answers.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline">
                        Choose Questions
                      </Button>
                      <Button>
                        <Video className="h-4 w-4 mr-2" />
                        Start Recording
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
