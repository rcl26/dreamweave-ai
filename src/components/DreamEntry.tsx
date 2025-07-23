import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sparkles, ChevronRight, Mic, MicOff } from "lucide-react";

interface DreamEntryProps {
  onSubmit: (dream: string) => void;
}

// Extend the Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export const DreamEntry = ({ onSubmit }: DreamEntryProps) => {
  const [dream, setDream] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setDream(prev => {
          // Only add final transcript to avoid duplication
          if (finalTranscript) {
            return prev + finalTranscript;
          }
          return prev;
        });
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

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
        <div className="relative">
          <Textarea
            placeholder="I dreamed that I was walking through a misty forest..."
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            className="min-h-32 resize-none border-border/60 focus:border-primary/60 bg-background/50 pr-12"
          />
          {isSupported && (
            <Button
              type="button"
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          )}
          {isRecording && (
            <div className="absolute -bottom-6 left-0 text-xs text-primary flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Recording... Speak your dream</span>
            </div>
          )}
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!dream.trim() || isSubmitting || isRecording}
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