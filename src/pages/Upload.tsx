import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import UploadZone from "@/components/upload/UploadZone";
import ProcessingView from "@/components/upload/ProcessingView";
import CompletionView from "@/components/upload/CompletionView";

const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const processingStages = [
    { stage: "Analyzing document structure...", progress: 15 },
    { stage: "Reviewing introduction and methodology...", progress: 30 },
    { stage: "Evaluating results and data presentation...", progress: 50 },
    { stage: "Assessing discussion and conclusions...", progress: 70 },
    { stage: "Checking references and citations...", progress: 85 },
    { stage: "Generating constructive feedback...", progress: 100 }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/x-latex'
    ];

    if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.tex')) {
      setFile(selectedFile);
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} is ready for review.`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, TXT, or LaTeX file.",
        variant: "destructive",
      });
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitForReview = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate AI processing stages
      for (let i = 0; i < processingStages.length; i++) {
        setCurrentStage(processingStages[i].stage);
        setProgress(processingStages[i].progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      setIsProcessing(false);
      setIsComplete(true);
      
      toast({
        title: "Comprehensive review complete!",
        description: "Your structured, constructive peer review is ready with actionable improvements.",
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Error processing file",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (format: 'pdf' | 'rtf') => {
    toast({
      title: `Downloading ${format.toUpperCase()} Review`,
      description: "Your comprehensive peer review includes structured feedback for each manuscript section.",
    });
    // In a real app, this would trigger the actual download
  };

  const handleReviewAnother = () => {
    setFile(null);
    setIsComplete(false);
    setProgress(0);
    setCurrentStage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FF] to-[#FCE4EC]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">
            <a href="/">Peer-Review Companion</a>
          </div>
          <Button variant="ghost" onClick={() => window.location.href = '/'}>
            ← Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">
              Upload Your Manuscript
            </h1>
            <p className="text-xl text-gray-600">
              Get AI-guided, constructive peer review in minutes
            </p>
          </div>

          {!isComplete && !isProcessing && (
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Document Upload</CardTitle>
                <CardDescription>
                  Support for PDF, DOC, DOCX, TXT, and LaTeX files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <UploadZone
                  isDragging={isDragging}
                  file={file}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onFileSelect={handleFileSelect}
                  onClearFile={handleClearFile}
                  onSubmit={handleSubmitForReview}
                />
              </CardContent>
            </Card>
          )}

          {isProcessing && (
            <ProcessingView progress={progress} currentStage={currentStage} />
          )}

          {isComplete && (
            <CompletionView
              onDownload={handleDownload}
              onReviewAnother={handleReviewAnother}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
