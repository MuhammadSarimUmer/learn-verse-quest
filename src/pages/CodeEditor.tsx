
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  RotateCcw, 
  Save, 
  Download, 
  Copy, 
  Settings, 
  Terminal,
  MessageSquare,
  Info,
  Lightbulb,
  FileCode,
  Check,
  BookOpen
} from "lucide-react";
import { Icon } from "@iconify/react";

export default function CodeEditor() {
  const [activeLanguage, setActiveLanguage] = useState("python");
  const [outputTab, setOutputTab] = useState("console");
  const [code, setCode] = useState({
    python: `def greet(name):
    return f"Hello, {name}!"

# Call the function
result = greet("World")
print(result)`,
    javascript: `function greet(name) {
    return \`Hello, \${name}!\`;
}

// Call the function
const result = greet("World");
console.log(result);`,
    java: `public class Greeting {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        // Call the function
        String result = greet("World");
        System.out.println(result);
    }
}`,
    cpp: `#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    // Call the function
    std::string result = greet("World");
    std::cout << result << std::endl;
    return 0;
}`,
    ruby: `def greet(name)
    "Hello, #{name}!"
end

# Call the function
result = greet("World")
puts result`,
  });

  const languages = [
    { id: "python", name: "Python", icon: "logos:python" },
    { id: "javascript", name: "JavaScript", icon: "logos:javascript" },
    { id: "java", name: "Java", icon: "logos:java" },
    { id: "cpp", name: "C++", icon: "logos:c-plusplus" },
    { id: "ruby", name: "Ruby", icon: "logos:ruby" },
  ];

  const [output, setOutput] = useState("Hello, World!");
  const [aiMentorVisible, setAiMentorVisible] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode({
      ...code,
      [activeLanguage]: e.target.value
    });
  };

  const runCode = () => {
    // Mock execution - in real app would connect to backend
    setOutput(`Running ${activeLanguage} code...\nOutput: Hello, World!\n\nExecution completed successfully.`);
    setOutputTab("console");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Header */}
          <div className="border-b p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLanguage(lang.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      activeLanguage === lang.id
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Icon icon={lang.icon} className="h-4 w-4" />
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setAiMentorVisible(!aiMentorVisible)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                AI Mentor
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" onClick={runCode}>
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor */}
            <div className={`flex-1 overflow-hidden ${aiMentorVisible ? 'border-r' : ''}`}>
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4 overflow-auto bg-card">
                  <textarea
                    className="w-full h-full bg-transparent resize-none outline-none font-mono text-sm"
                    value={code[activeLanguage]}
                    onChange={handleCodeChange}
                    spellCheck="false"
                  />
                </div>
                
                {/* Output Section */}
                <div className="h-60 border-t">
                  <Tabs defaultValue="console" value={outputTab} onValueChange={setOutputTab}>
                    <div className="border-b px-4">
                      <TabsList className="mt-2">
                        <TabsTrigger value="console" className="flex items-center gap-1.5">
                          <Terminal className="h-4 w-4" />
                          Console
                        </TabsTrigger>
                        <TabsTrigger value="help" className="flex items-center gap-1.5">
                          <Info className="h-4 w-4" />
                          Help
                        </TabsTrigger>
                        <TabsTrigger value="timemachine" className="flex items-center gap-1.5">
                          <RotateCcw className="h-4 w-4" />
                          Time Machine
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="console" className="p-4 font-mono text-sm overflow-auto h-[calc(100%-41px)]">
                      {output}
                    </TabsContent>
                    <TabsContent value="help" className="p-4 overflow-auto h-[calc(100%-41px)]">
                      <h3 className="font-medium mb-2">Code Editor Help</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Play className="h-4 w-4 mt-0.5 text-learnverse-accent" />
                          <span>Press Run to execute your code and see the output</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <RotateCcw className="h-4 w-4 mt-0.5 text-learnverse-accent" />
                          <span>Time Machine allows you to see step-by-step execution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 mt-0.5 text-learnverse-accent" />
                          <span>AI Mentor can help you improve your code and fix errors</span>
                        </li>
                      </ul>
                    </TabsContent>
                    <TabsContent value="timemachine" className="p-4 overflow-auto h-[calc(100%-41px)]">
                      <div className="text-center py-8">
                        <RotateCcw className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium mb-1">Code Time Machine</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Run your code to activate the time machine and watch your code execute step by step
                        </p>
                        <Button onClick={runCode}>
                          <Play className="h-4 w-4 mr-2" />
                          Run Code First
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            {/* AI Mentor Panel */}
            {aiMentorVisible && (
              <div className="w-96 flex flex-col border-l bg-card">
                <div className="border-b p-3 flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-learnverse-accent" />
                    AI Mentor
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setAiMentorVisible(false)}
                    className="h-8 w-8"
                  >
                    <span className="sr-only">Close</span>
                    <span aria-hidden="true">×</span>
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div className="ai-message bot">
                      <div className="font-medium text-sm mb-1">AI Mentor</div>
                      <div className="text-sm">
                        I see you're working with a simple greeting function in {
                          languages.find(lang => lang.id === activeLanguage)?.name
                        }. How can I help you today?
                      </div>
                    </div>
                    
                    <div className="ai-message bot">
                      <div className="font-medium text-sm mb-1">AI Mentor</div>
                      <div className="text-sm">
                        Your code looks good! Here are some suggestions:
                        <ul className="mt-2 space-y-1 pl-5 list-disc">
                          <li>Consider adding input validation</li>
                          <li>You could extend this to handle multiple names</li>
                          <li>Add documentation comments to explain the function</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="ai-message user">
                      <div className="text-sm">
                        How would I modify this to greet multiple people?
                      </div>
                    </div>
                    
                    <div className="ai-message bot">
                      <div className="font-medium text-sm mb-1">AI Mentor</div>
                      <div className="text-sm">
                        To greet multiple people, you can modify your function to accept a list of names. Here's how:
                        
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
{`def greet(names):
    if isinstance(names, str):
        return f"Hello, {names}!"
    elif isinstance(names, list):
        if len(names) == 0:
            return "Hello, everyone!"
        elif len(names) == 1:
            return f"Hello, {names[0]}!"
        else:
            formatted_names = ", ".join(names[:-1]) + " and " + names[-1]
            return f"Hello, {formatted_names}!"
    else:
        return "Hello, whoever you are!"

# Examples
print(greet("World"))
print(greet(["Alice", "Bob", "Charlie"]))`}
                        </pre>
                        
                        <div className="mt-2">
                          Would you like me to explain how this works in more detail?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t p-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask your AI mentor..."
                      className="w-full rounded-md border bg-background p-2 pl-3 pr-10 text-sm"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-1 right-1 h-6 w-6"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
