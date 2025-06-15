
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Download, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompletionViewProps {
  onDownload: (format: 'pdf' | 'rtf') => void;
  onReviewAnother: () => void;
}

const CompletionView = ({ onDownload, onReviewAnother }: CompletionViewProps) => {
  const handleReviewAndEdit = () => {
    window.location.href = '/revision-review';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-semibold text-green-800">
          Comprehensive Review Complete!
        </CardTitle>
        <CardDescription className="text-lg">
          Your structured, constructive peer review is ready
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-3">Your review includes:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Section-by-section constructive feedback (Introduction, Methods, Results, Discussion)
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Actionable improvement suggestions for clarity and impact
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Reference and citation quality assessment
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Reproducibility and methodology recommendations
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Overall summary with prioritized action items
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white mb-4 w-full md:w-auto"
            onClick={handleReviewAndEdit}
          >
            <Edit3 className="mr-2 h-5 w-5" />
            Review & Edit AI Assessment
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onDownload('pdf')}
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF Review
          </Button>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onDownload('rtf')}
          >
            <Download className="mr-2 h-5 w-5" />
            Download RTF Review
          </Button>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline"
            onClick={onReviewAnother}
          >
            Review Another Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionView;
