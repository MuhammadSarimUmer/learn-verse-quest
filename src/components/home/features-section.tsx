
import { 
  Code, 
  Brain, 
  Trophy, 
  Lightbulb, 
  Clock, 
  FileText, 
  Puzzle, 
  MessageSquare, 
  Target, 
  Smartphone,
  Palette,
  Users,
  Zap,
  Bug,
  Repeat
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor?: string;
}

function FeatureCard({ icon: Icon, title, description, iconColor = "text-learnverse-primary" }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className={`w-12 h-12 rounded-lg bg-muted grid place-items-center mb-4 ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: Code,
      title: "Multi-language Support",
      description: "Learn and compare syntax across Python, JavaScript, Java, C++, and more.",
      iconColor: "text-code-python",
    },
    {
      icon: Target,
      title: "Progressive Learning",
      description: "Personalized learning paths that adjust difficulty based on your progress.",
      iconColor: "text-learnverse-accent",
    },
    {
      icon: Zap,
      title: "Interactive Code Editor",
      description: "Run code in-browser with instant feedback, syntax highlighting, and debugging.",
      iconColor: "text-learnverse-primary",
    },
    {
      icon: Trophy,
      title: "Gamified Challenges",
      description: "Code puzzles, challenges and global leaderboards to spark competition.",
      iconColor: "text-amber-500",
    },
    {
      icon: Brain,
      title: "AI-Powered Mentor",
      description: "Personalized guidance, code review, and tips from your AI coding assistant.",
      iconColor: "text-violet-500",
    },
    {
      icon: Clock,
      title: "Code Time Machine",
      description: "Visualize how programs execute step-by-step to understand complex concepts.",
      iconColor: "text-sky-500",
    },
    {
      icon: FileText,
      title: "Real-World Projects",
      description: "AI-generated mini-projects based on your interests with step-by-step guidance.",
      iconColor: "text-emerald-500",
    },
    {
      icon: Puzzle,
      title: "Code-to-Game Engine",
      description: "Control game characters through code to learn programming with visual feedback.",
      iconColor: "text-rose-500",
    },
    {
      icon: MessageSquare,
      title: "Code + Chat Integration",
      description: "Discuss and collaborate on code with a built-in community platform.",
      iconColor: "text-blue-500",
    },
    {
      icon: Users,
      title: "Interview Simulation",
      description: "Practice technical interviews with AI-powered feedback and assessment.",
      iconColor: "text-indigo-500",
    },
    {
      icon: Target,
      title: "Skill Map Tracker",
      description: "Visual representation of your mastered concepts and skill progression.",
      iconColor: "text-learnverse-accent",
    },
    {
      icon: Smartphone,
      title: "Camera Code Scanner",
      description: "Scan code from textbooks or whiteboards to get explanations and translations.",
      iconColor: "text-fuchsia-500",
    },
    {
      icon: Lightbulb,
      title: "Code in the Wild",
      description: "Learn from real-world programming scenarios from popular applications.",
      iconColor: "text-amber-400",
    },
    {
      icon: Bug,
      title: "AI Bug Hunter",
      description: "Interactive debugging assistant that explains where and why your code fails.",
      iconColor: "text-red-500",
    },
    {
      icon: Repeat,
      title: "Code Switcher",
      description: "Write code in one language and see how it looks in another instantly.",
      iconColor: "text-teal-500",
    },
  ];

  return (
    <div className="py-20 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Mind-Blowing Features
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground">
          LearnVerse Quest combines innovative learning methods with cutting-edge technology
          to create the most engaging coding education platform.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconColor={feature.iconColor}
          />
        ))}
      </div>
    </div>
  );
}
