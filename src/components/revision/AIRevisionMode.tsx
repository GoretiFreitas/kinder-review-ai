
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Brain, Key, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeSentences } from "@/services/openaiService";
import SentenceAnalysisComponent from "./SentenceAnalysis";

interface AIRevisionModeProps {
  reviewSections: Record<string, string>;
  onSectionUpdate: (section: string, newContent: string) => void;
}

interface SentenceAnalysis {
  originalSentence: string;
  suggestions: string[];
  issues: string[];
  improvedVersion: string;
  reasoning: string;
}

const AIRevisionMode = ({ reviewSections, onSectionUpdate }: AIRevisionModeProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analyses, setAnalyses] = useState<SentenceAnalysis[]>([]);
  const [revisedContent, setRevisedContent] = useState("");

  const sectionOptions = [
    { value: "abstract", label: "Abstract" },
    { value: "introduction", label: "Introduction" },
    { value: "methodology", label: "Methodology" },
    { value: "results", label: "Results" },
    { value: "discussion", label: "Discussion" },
    { value: "conclusion", label: "Conclusion" },
  ];

  const handleAnalyzeSection = async () => {
    if (!apiKey || !selectedSection) {
      toast({
        title: "Missing Information",
        description: "Please provide your OpenAI API key and select a section to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setAnalyses([]);

    try {
      const sectionContent = reviewSections[selectedSection];
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => prev < 90 ? prev + 10 : prev);
      }, 500);

      const analysisResults = await analyzeSentences({
        text: sectionContent,
        context: `This is from the ${selectedSection} section of an academic manuscript.`,
        sectionType: selectedSection
      }, apiKey);

      clearInterval(progressInterval);
      setProgress(100);
      setAnalyses(analysisResults);
      setRevisedContent(sectionContent);

      toast({
        title: "Analysis Complete",
        description: `Found ${analysisResults.length} sentences to review.`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze the section.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptSuggestion = (index: number, improvedSentence: string) => {
    const updatedAnalyses = [...analyses];
    const originalSentence = updatedAnalyses[index].originalSentence;
    
    // Update the revised content
    const newContent = revisedContent.replace(originalSentence, improvedSentence);
    setRevisedContent(newContent);
    
    // Remove this analysis from the list
    updatedAnalyses.splice(index, 1);
    setAnalyses(updatedAnalyses);

    toast({
      title: "Suggestion Applied",
      description: "The sentence has been updated with the AI suggestion.",
    });
  };

  const handleRejectSuggestion = (index: number) => {
    const updatedAnalyses = [...analyses];
    updatedAnalyses.splice(index, 1);
    setAnalyses(updatedAnalyses);

    toast({
      title: "Suggestion Rejected",
      description: "The original sentence has been kept as is.",
    });
  };

  const handleSaveRevisions = () => {
    if (selectedSection && revisedContent) {
      onSectionUpdate(selectedSection, revisedContent);
      toast({
        title: "Revisions Saved",
        description: "Your AI-revised content has been saved to the section.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Powered Sentence-by-Sentence Revision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">API Key Required</p>
              <p className="text-yellow-700">You'll need your OpenAI API key to use this feature. Your key is not stored and only used for this session.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section to Analyze</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sectionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalyzeSection}
            disabled={isAnalyzing || !apiKey || !selectedSection}
            className="w-full"
          >
            <Brain className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Start AI Analysis"}
          </Button>

          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-gray-600">
                Analyzing sentences with AI... {progress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {analyses.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sentence Analysis Results</CardTitle>
              <Button onClick={handleSaveRevisions} className="bg-green-600 hover:bg-green-700">
                Save All Revisions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Review each sentence suggestion below. Accept or reject individual suggestions, then save your revisions.
            </p>
            
            {analyses.map((analysis, index) => (
              <SentenceAnalysisComponent
                key={index}
                analysis={analysis}
                onAcceptSuggestion={(improvedSentence) => handleAcceptSuggestion(index, improvedSentence)}
                onRejectSuggestion={() => handleRejectSuggestion(index)}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIRevisionMode;
