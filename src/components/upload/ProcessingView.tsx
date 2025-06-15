
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, FileCheck, CheckCircle, Download } from "lucide-react";

interface ProcessingViewProps {
  progress: number;
  currentStage: string;
}

const ProcessingView = ({ progress, currentStage }: ProcessingViewProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">AI Review in Progress</h3>
          <p className="text-gray-600 mb-6">
            Our AI is carefully analyzing your manuscript and preparing constructive, actionable feedback
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{currentStage}</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <FileCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Structure Analysis</p>
            <p className="text-xs text-gray-600">IMRaD compliance check</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Constructive Feedback</p>
            <p className="text-xs text-gray-600">Helpful suggestions</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Ready to Download</p>
            <p className="text-xs text-gray-600">PDF & DOCX formats</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingView;
