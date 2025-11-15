import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Trophy, 
  Target, 
  TrendingUp,
  BookOpen,
  Award,
  Users,
  Star,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import iphoneMockup from "@/assets/iphone-real-dashboard.png";

export default function Landing() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo sign in - just set localStorage flag
    localStorage.setItem('go53_auth', 'true');
    window.location.reload();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo sign up - just set localStorage flag
    localStorage.setItem('go53_auth', 'true');
    window.location.reload();
  };

  const stats = [
    { label: "Success Rate", value: "94%", icon: Trophy },
    { label: "Active Users", value: "15K+", icon: Users },
    { label: "Questions Available", value: "2,500+", icon: BookOpen },
    { label: "Average Rating", value: "4.8/5", icon: Star },
  ];

  const features = [
    {
      title: "Mock Tests",
      description: "Full 50-question practice tests that simulate the actual K53 exam environment",
      icon: Target,
    },
    {
      title: "Hazard Perception",
      description: "Train your ability to spot developing hazards with our interactive video scenarios",
      icon: TrendingUp,
    },
    {
      title: "Personalized Learning",
      description: "AI-powered system tracks your progress and adapts to focus on your weak areas",
      icon: Award,
    },
    {
      title: "GO Score System",
      description: "Know exactly when you're ready with our proprietary readiness scoring algorithm",
      icon: CheckCircle2,
    },
  ];

  const benefits = [
    "Pass your K53 test on the first try",
    "Save time and money on retakes",
    "Study at your own pace, anytime, anywhere",
    "Track your progress with detailed analytics",
    "Get instant feedback on every answer",
    "Access thousands of practice questions",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">GO53</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                South African K53 Prep
              </Badge>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#benefits" className="text-foreground hover:text-primary transition-colors">Benefits</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
              <Button variant="ghost" onClick={() => setShowSignIn(true)}>Sign In</Button>
              <Button onClick={() => setShowSignUp(true)}>Get Started Free</Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#features" className="block text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#benefits" className="block text-foreground hover:text-primary transition-colors">Benefits</a>
              <a href="#pricing" className="block text-foreground hover:text-primary transition-colors">Pricing</a>
              <Button variant="ghost" className="w-full" onClick={() => setShowSignIn(true)}>Sign In</Button>
              <Button className="w-full" onClick={() => setShowSignUp(true)}>Get Started Free</Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="secondary">
              🏆 SOUTH AFRICA'S #1 K53 PREP APP
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Pass Your <span className="text-primary">K53 Test</span> with Confidence
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Join over 15,000 learners who have achieved a 94% first-time pass rate using our AI-powered K53 preparation platform.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
              Free to sign up. Start practicing immediately with our comprehensive question bank and personalized learning path.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" onClick={() => setShowSignUp(true)} className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowSignIn(true)}>
                Sign In
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">4.8 star rating</span>
              <span className="mx-2">•</span>
              <span>Over 15,000 successful learners</span>
            </div>
          </div>

          <div className="flex justify-center mb-12">
            <img 
              src={iphoneMockup} 
              alt="GO53 Dashboard on iPhone" 
              className="w-full max-w-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Pass
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need for K53 success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="professional-card hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Choose GO53?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8 group" onClick={() => setShowSignUp(true)}>
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative">
              <Card className="professional-card">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                      <div className="text-5xl font-bold text-foreground mb-2">94%</div>
                      <p className="text-lg text-muted-foreground">First-Time Pass Rate</p>
                    </div>
                    <div className="pt-6 border-t border-border">
                      <p className="text-center text-muted-foreground">
                        "GO53 helped me pass my K53 test on the first try! The GO Score feature gave me the confidence I needed."
                      </p>
                      <p className="text-center text-sm text-foreground font-semibold mt-2">
                        - Sarah M., Johannesburg
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade when you're ready. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="professional-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">Free</h4>
                <div className="text-3xl font-bold text-foreground mb-4">R0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">500 practice questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Basic progress tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Community support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setShowSignUp(true)}>Get Started</Button>
              </CardContent>
            </Card>

            <Card className="professional-card border-2 border-primary">
              <CardContent className="p-6">
                <Badge className="mb-2">Most Popular</Badge>
                <h4 className="text-xl font-semibold text-foreground mb-2">Premium</h4>
                <div className="text-3xl font-bold text-foreground mb-4">R199<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">2,500+ practice questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Unlimited mock tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Hazard perception training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">GO Score analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={() => setShowSignUp(true)}>Get Started</Button>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">Lifetime</h4>
                <div className="text-3xl font-bold text-foreground mb-4">R499<span className="text-lg font-normal text-muted-foreground">/once</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">All Premium features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Lifetime access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Future updates included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">VIP support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => setShowSignUp(true)}>Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Pass Your K53 Test?
          </h3>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of successful learners. Start your free trial today.
          </p>
          <Button size="lg" variant="secondary" onClick={() => setShowSignUp(true)} className="group">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 GO53. All rights reserved.</p>
            <p className="text-sm mt-2">Helping South Africans pass their K53 test with confidence.</p>
          </div>
        </div>
      </footer>

      {/* Sign In Dialog */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In to GO53</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="signin-email">Email</Label>
              <Input id="signin-email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="signin-password">Password</Label>
              <Input id="signin-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => {
                  setShowSignIn(false);
                  setShowSignUp(true);
                }}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Account</DialogTitle>
            <DialogDescription>
              Sign up free and start practicing immediately
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" type="text" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => {
                  setShowSignUp(false);
                  setShowSignIn(true);
                }}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
