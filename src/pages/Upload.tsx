import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, Download, CheckCircle, Eye, FileCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

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

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
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

  const handleDownload = (format: 'pdf' | 'docx') => {
    toast({
      title: `Downloading ${format.toUpperCase()} Review`,
      description: "Your comprehensive peer review includes structured feedback for each manuscript section.",
    });
    // In a real app, this would trigger the actual download
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
                {/* Drag and Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : file
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-4">
                      <FileText className="h-16 w-16 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        Choose Different File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Drag and drop your manuscript here
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse files
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.tex"
                  onChange={handleFileInputChange}
                />

                {file && (
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl"
                      onClick={handleSubmitForReview}
                    >
                      Start AI Review Process
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {isProcessing && (
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
          )}

          {isComplete && (
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

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDownload('pdf')}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF Review
                  </Button>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleDownload('docx')}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download DOCX Review
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setFile(null);
                      setIsComplete(false);
                      setProgress(0);
                      setCurrentStage("");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    Review Another Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
