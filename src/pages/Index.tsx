import { useState } from "react";
import { DreamEntry } from "@/components/DreamEntry";
import { DreamAnalysis } from "@/components/DreamAnalysis";
import { Moon, Stars, Sparkles, Brain, Heart, BookOpen } from "lucide-react";

const Index = () => {
  const [currentDream, setCurrentDream] = useState<string | null>(null);

  const handleDreamSubmit = (dream: string) => {
    setCurrentDream(dream);
  };

  const handleBack = () => {
    setCurrentDream(null);
  };

  if (currentDream) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
        <div className="container mx-auto py-8">
          <DreamAnalysis dream={currentDream} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8 mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Stars className="h-8 w-8 text-accent animate-pulse" />
            <h1 className="text-5xl font-light tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Oneira
            </h1>
            <Moon className="h-8 w-8 text-primary" />
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Decode your dreams, discover yourself
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Your personal guide to the wisdom of sleep</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Dream Entry */}
        <DreamEntry onSubmit={handleDreamSubmit} />

        {/* Features Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">Deep symbolic interpretation of your dreams</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-medium">Emotional Insights</h3>
            <p className="text-sm text-muted-foreground">Uncover hidden feelings and patterns</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-medium">Dream Journal</h3>
            <p className="text-sm text-muted-foreground">Track your dreams and their meanings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
