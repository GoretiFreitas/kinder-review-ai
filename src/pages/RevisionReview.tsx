import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Edit3, Save, ArrowLeft, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF, generateDOCX } from "@/utils/documentGenerator";

const RevisionReview = () => {
  const { toast } = useToast();
  const [editingSections, setEditingSections] = useState<Set<string>>(new Set());
  const [reviewSections, setReviewSections] = useState({
    abstract: "The abstract provides a clear overview of the study objectives and main findings. However, it could benefit from more specific quantitative results and a clearer statement of the study's significance. Consider adding specific effect sizes or statistical measures to strengthen the impact.",
    introduction: "The introduction effectively establishes the research context and identifies the knowledge gap. The literature review is comprehensive, though some recent studies (2023-2024) could be included to ensure currency. The research questions are well-formulated and clearly stated.",
    methodology: "The methodology is generally sound with appropriate statistical methods. However, the sample size justification needs strengthening - consider adding power analysis calculations. The data collection procedures are well-described, but potential sources of bias should be addressed more explicitly.",
    results: "Results are presented clearly with appropriate statistical analyses. Tables and figures effectively support the narrative. Consider reorganizing Table 2 for better readability, and ensure all statistical assumptions are reported. The effect sizes suggest meaningful practical significance.",
    discussion: "The discussion appropriately interprets findings within the broader research context. Limitations are acknowledged, though the section on generalizability could be expanded. The implications for practice are well-articulated, and suggestions for future research are constructive.",
    conclusion: "The conclusion effectively summarizes key findings and their implications. Consider strengthening the call-to-action for practitioners and researchers. The concluding statement could be more impactful by emphasizing the study's unique contribution to the field.",
    references: "Reference list follows appropriate formatting standards. Most sources are current and relevant. Consider adding 2-3 more recent systematic reviews or meta-analyses to strengthen the theoretical foundation. Ensure all in-text citations have corresponding reference entries.",
    overall: "This manuscript presents valuable research with solid methodology and clear presentation. The main strengths include comprehensive literature review, appropriate statistical methods, and practical implications. Areas for improvement focus on strengthening the sample size justification and expanding the discussion of limitations. Overall assessment: Accept with minor revisions."
  });

  const handleSectionEdit = (section: keyof typeof reviewSections, value: string) => {
    setReviewSections(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const toggleSectionEdit = (section: string) => {
    setEditingSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
        toast({
          title: "Section saved",
          description: "Your edits have been saved successfully.",
        });
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleDownload = async (format: 'pdf' | 'docx') => {
    try {
      toast({
        title: `Generating ${format.toUpperCase()} Review`,
        description: "Please wait while we prepare your document...",
      });

      if (format === 'pdf') {
        generatePDF(reviewSections);
      } else {
        await generateDOCX(reviewSections);
      }

      toast({
        title: `${format.toUpperCase()} Downloaded Successfully`,
        description: "Your comprehensive peer review has been downloaded.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sections = [
    { key: 'abstract', title: 'Abstract Review', description: 'Overall assessment of the abstract' },
    { key: 'introduction', title: 'Introduction Review', description: 'Literature review and research context' },
    { key: 'methodology', title: 'Methodology Review', description: 'Methods and statistical approaches' },
    { key: 'results', title: 'Results Review', description: 'Data presentation and analysis' },
    { key: 'discussion', title: 'Discussion Review', description: 'Interpretation and implications' },
    { key: 'conclusion', title: 'Conclusion Review', description: 'Summary and final recommendations' },
    { key: 'references', title: 'References Review', description: 'Citation quality and completeness' },
    { key: 'overall', title: 'Overall Assessment', description: 'Comprehensive evaluation and recommendation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FF] to-[#FCE4EC]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">
            <a href="/">Peer-Review Companion</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">
              Review & Edit AI Assessment
            </h1>
            <p className="text-xl text-gray-600">
              Click the edit button on any section to make changes
            </p>
          </div>

          <div className="space-y-6">
            {sections.map(({ key, title, description }) => {
              const isEditing = editingSections.has(key);
              
              return (
                <Card key={key} className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => toggleSectionEdit(key)}
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Label htmlFor={key}>Edit feedback:</Label>
                        <Textarea
                          id={key}
                          value={reviewSections[key as keyof typeof reviewSections]}
                          onChange={(e) => handleSectionEdit(key as keyof typeof reviewSections, e.target.value)}
                          rows={6}
                          className="min-h-[150px]"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {reviewSections[key as keyof typeof reviewSections]}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Download Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Download Your Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RevisionReview;
