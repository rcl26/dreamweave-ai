import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Brain, ArrowLeft } from "lucide-react";

interface DreamAnalysisProps {
  dream: string;
  onBack: () => void;
}

export const DreamAnalysis = ({ dream, onBack }: DreamAnalysisProps) => {
  // Mock AI analysis - in real app, this would come from GPT API
  const analysis = {
    themes: ["Transformation", "Journey", "Nature"],
    emotions: ["Curiosity", "Wonder", "Uncertainty"],
    symbols: [
      { symbol: "Forest", meaning: "The unconscious mind, growth, mystery" },
      { symbol: "Mist", meaning: "Confusion, transition, the unknown" },
      { symbol: "Walking", meaning: "Life journey, progress, exploration" }
    ],
    interpretation: "This dream suggests you're navigating a period of personal transformation. The misty forest represents your subconscious mind during a time of change, where clarity hasn't fully emerged yet. Walking through it shows your courage to explore unknown aspects of yourself."
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        New Dream
      </Button>

      <Card className="bg-card/60 backdrop-blur border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Your Dream</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 italic leading-relaxed">"{dream}"</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/60 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-accent" />
              <span>Emotional Themes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Core Themes</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.themes.map((theme) => (
                  <Badge key={theme} variant="secondary">{theme}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Emotions</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.emotions.map((emotion) => (
                  <Badge key={emotion} variant="outline">{emotion}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Symbol Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.symbols.map((item) => (
                <div key={item.symbol} className="border-l-2 border-primary/30 pl-3">
                  <h4 className="font-medium text-primary">{item.symbol}</h4>
                  <p className="text-sm text-muted-foreground">{item.meaning}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle>Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-foreground/90">{analysis.interpretation}</p>
        </CardContent>
      </Card>
    </div>
  );
};