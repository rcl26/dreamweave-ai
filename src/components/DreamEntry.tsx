import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sparkles, ChevronRight } from "lucide-react";

interface DreamEntryProps {
  onSubmit: (dream: string) => void;
}

export const DreamEntry = ({ onSubmit }: DreamEntryProps) => {
  const [dream, setDream] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!dream.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate AI processing
    onSubmit(dream);
    setDream("");
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/60 backdrop-blur border-border/40">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Moon className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-light">Share Your Dream</CardTitle>
          <Sparkles className="h-6 w-6 text-accent" />
        </div>
        <p className="text-muted-foreground">
          Describe your dream in as much detail as you remember. 
          I'll help you explore its deeper meaning.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="I dreamed that I was walking through a misty forest..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          className="min-h-32 resize-none border-border/60 focus:border-primary/60 bg-background/50"
        />
        <Button 
          onClick={handleSubmit}
          disabled={!dream.trim() || isSubmitting}
          size="lg"
          className="w-full group"
        >
          {isSubmitting ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Dream...
            </>
          ) : (
            <>
              Begin Analysis
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};