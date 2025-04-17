
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface LanguageTabProps {
  language: string;
  icon: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

function LanguageTab({ language, icon, color, isActive, onClick }: LanguageTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
        isActive
          ? `bg-${color} text-white`
          : "bg-muted hover:bg-muted/80"
      )}
    >
      <Icon icon={icon} className="h-5 w-5" />
      <span>{language}</span>
    </button>
  );
}

export function LanguagesSection() {
  const [activeLanguage, setActiveLanguage] = useState("python");

  const languages = [
    { 
      name: "Python", 
      id: "python", 
      icon: "logos:python", 
      color: "code-python",
      code: `def fibonacci(n):
    """Generate fibonacci sequence up to n"""
    a, b = 0, 1
    result = []
    while a < n:
        result.append(a)
        a, b = b, a + b
    return result

# Generate first 10 fibonacci numbers
print(fibonacci(100))
` 
    },
    { 
      name: "JavaScript", 
      id: "javascript", 
      icon: "logos:javascript", 
      color: "code-javascript",
      code: `function fibonacci(n) {
  // Generate fibonacci sequence up to n
  let a = 0, b = 1;
  const result = [];
  
  while (a < n) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  
  return result;
}

// Generate first 10 fibonacci numbers
console.log(fibonacci(100));
` 
    },
    { 
      name: "Java", 
      id: "java", 
      icon: "logos:java", 
      color: "code-java",
      code: `import java.util.ArrayList;
import java.util.List;

public class Fibonacci {
    public static List<Integer> fibonacci(int n) {
        // Generate fibonacci sequence up to n
        List<Integer> result = new ArrayList<>();
        int a = 0, b = 1;
        
        while (a < n) {
            result.add(a);
            int temp = a;
            a = b;
            b = temp + b;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        // Generate fibonacci numbers up to 100
        System.out.println(fibonacci(100));
    }
}
` 
    },
    { 
      name: "C++", 
      id: "cpp", 
      icon: "logos:c-plusplus", 
      color: "code-cpp",
      code: `#include <iostream>
#include <vector>

std::vector<int> fibonacci(int n) {
    // Generate fibonacci sequence up to n
    std::vector<int> result;
    int a = 0, b = 1;
    
    while (a < n) {
        result.push_back(a);
        int temp = a;
        a = b;
        b = temp + b;
    }
    
    return result;
}

int main() {
    // Generate fibonacci numbers up to 100
    std::vector<int> fib = fibonacci(100);
    
    std::cout << "Fibonacci sequence: ";
    for (int num : fib) {
        std::cout << num << " ";
    }
    
    return 0;
}
` 
    },
    { 
      name: "Ruby", 
      id: "ruby", 
      icon: "logos:ruby", 
      color: "code-ruby",
      code: `def fibonacci(n)
  # Generate fibonacci sequence up to n
  a, b = 0, 1
  result = []
  
  while a < n
    result << a
    a, b = b, a + b
  end
  
  result
end

# Generate fibonacci numbers up to 100
puts fibonacci(100).inspect
` 
    },
  ];

  const activeCode = languages.find(lang => lang.id === activeLanguage)?.code || "";

  return (
    <div className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Multiple Language Support
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            Learn and compare multiple programming languages side by side.
            Switch between languages to see how the same logic is expressed differently.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {languages.map((lang) => (
            <LanguageTab
              key={lang.id}
              language={lang.name}
              icon={lang.icon}
              color={lang.color}
              isActive={activeLanguage === lang.id}
              onClick={() => setActiveLanguage(lang.id)}
            />
          ))}
        </div>
        
        <div className="code-editor mx-auto max-w-3xl">
          <div className="code-editor-header">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-muted-foreground">
              {languages.find(lang => lang.id === activeLanguage)?.name} Example
            </div>
            <div></div>
          </div>
          <div className="code-editor-content overflow-x-auto">
            <pre className={`text-sm ${activeLanguage}-code`}>
              <code>{activeCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
