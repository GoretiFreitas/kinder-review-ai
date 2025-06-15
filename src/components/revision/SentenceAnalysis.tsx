
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface SentenceAnalysis {
  originalSentence: string;
  suggestions: string[];
  issues: string[];
  improvedVersion: string;
  reasoning: string;
}

interface SentenceAnalysisProps {
  analysis: SentenceAnalysis;
  onAcceptSuggestion: (improvedSentence: string) => void;
  onRejectSuggestion: () => void;
}

const SentenceAnalysisComponent = ({ 
  analysis, 
  onAcceptSuggestion, 
  onRejectSuggestion 
}: SentenceAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium">Original Sentence</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
          {analysis.originalSentence}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Issues */}
        {analysis.issues.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-red-700">Issues Identified:</h4>
            <div className="flex flex-wrap gap-1">
              {analysis.issues.map((issue, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {issue}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Improved Version */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-green-700">Improved Version:</h4>
          <p className="text-sm text-gray-700 bg-green-50 p-3 rounded border border-green-200">
            {analysis.improvedVersion}
          </p>
        </div>

        {/* Suggestions */}
        {isExpanded && analysis.suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Specific Suggestions:</h4>
            <ul className="list-disc list-inside space-y-1">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reasoning */}
        {isExpanded && analysis.reasoning && (
          <div>
            <h4 className="text-sm font-medium mb-2">Reasoning:</h4>
            <p className="text-sm text-gray-600 italic">
              {analysis.reasoning}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            onClick={() => onAcceptSuggestion(analysis.improvedVersion)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRejectSuggestion}
          >
            <XCircle className="mr-1 h-4 w-4" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentenceAnalysisComponent;
