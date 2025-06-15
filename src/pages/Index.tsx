import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Brain, Download, FileText, MessageCircle, CheckCircle, Users, Youtube, Linkedin, Twitter, Quote } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const testimonials = [
    {
      quote: "Most constructive review we've ever received",
      author: "Dr. Kim",
      journal: "The DeSci Journal",
      rating: 5
    },
    {
      quote: "Finally, peer review that helps rather than hurts",
      author: "Prof. Martinez",
      journal: "TCC Journal",
      rating: 5
    },
    {
      quote: "Our authors love the actionable feedback",
      author: "Dr. Chen",
      journal: "Island Network Essentials",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FF] to-[#FCE4EC]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">
            Peer-Review Companion
          </div>
          <nav className="flex items-center space-x-8">
            <a href="#how" className="text-gray-700 hover:text-gray-900 transition-colors relative group">
              How to Do
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-semibold text-gray-800 leading-tight">
              AI-guided, kinder peer review for every editor and reviewer.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Upload a manuscript and receive a structured, constructive review that helps authors to improve their submissions and save you time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
                onClick={() => window.location.href = '/upload'}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Document
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Youtube className="mr-2 h-5 w-5" />
                Watch 60-sec demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-t from-[#FCE4EC]/30 to-[#E0F7FF]/30 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-3xl"></div>
              <FileText className="h-24 w-24 text-blue-400 animate-bounce" />
              <MessageCircle className="absolute top-8 right-8 h-12 w-12 text-pink-400 animate-pulse" />
              <MessageCircle className="absolute bottom-8 left-8 h-8 w-8 text-blue-300 animate-pulse delay-500" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Three simple steps to better peer reviews</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">①</span>
              </div>
              <CardTitle className="text-xl font-semibold">Upload</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Upload className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Doc, PDF, or LaTeX</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">②</span>
              </div>
              <CardTitle className="text-xl font-semibold">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <p className="text-gray-600">Reads, reasons, and drafts suggestions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">③</span>
              </div>
              <CardTitle className="text-xl font-semibold">Receive Review</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Download className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">Download friendly, journal-ready critique with action items</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Features</h2>
          <p className="text-xl text-gray-600">Everything you need for better peer reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Structured Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">IMRaD-aligned comments</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Tone-Adjust</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Suggestions phrased constructively</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Reference Checker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Flags outdated or retracted citations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Reproducibility Hints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Prompts for data & code sharing</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">What Editors Say</h2>
          <p className="text-xl text-gray-600">Real feedback from journal editors and reviewers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-400 mb-2" />
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.journal}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Starter</CardTitle>
              <div className="text-4xl font-bold text-gray-800">$0</div>
              <CardDescription>first manuscript</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>1 manuscript review</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic features</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl transform scale-105 border-2 border-blue-200">
            <CardHeader className="text-center">
              <Badge className="bg-blue-500 text-white mb-2">Most Popular</Badge>
              <CardTitle className="text-2xl font-semibold">Pro</CardTitle>
              <div className="text-4xl font-bold text-gray-800">$19</div>
              <CardDescription>per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Up to 20 manuscripts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>All features included</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Pro</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">Journal Plan</CardTitle>
              <div className="text-2xl font-bold text-gray-800">Custom</div>
              <CardDescription>contact us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited manuscripts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Team collaboration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Custom integrations</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">Contact Us</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call-out Banner */}
      <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-white/20">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center space-x-4">
            <Users className="h-8 w-8 text-blue-600" />
            <p className="text-xl font-medium text-gray-800">
              More than 5,000 helpful reviews delivered—join the kinder science movement.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '/upload'}
            >
              Get Started Free →
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#E0F7FF]/20 to-[#FCE4EC]/20 border-t border-white/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-800">Peer-Review Companion</span>
              <span className="text-gray-600">© 2025 Peer-Review Companion</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <a href="mailto:hello@peerreviewcompanion.ai" className="hover:text-gray-800">
                hello@peerreviewcompanion.ai
              </a>
              <span>|</span>
              <a href="/privacy" className="hover:text-gray-800">Privacy</a>
              <span>|</span>
              <a href="/terms" className="hover:text-gray-800">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Demo Video</h3>
              <Button variant="ghost" onClick={() => setIsVideoModalOpen(false)}>×</Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Video would load here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
