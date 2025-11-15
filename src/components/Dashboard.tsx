import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  TrendingUp,
  ArrowRight,
  FileText,
  Award,
  Map,
  Trophy
} from "lucide-react";
import { XPDisplay } from "@/components/gamification/XPDisplay";
import BottomNav from "@/components/BottomNav";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = React.useState(false);

  const userProgress = {
    xp: 2847,
    dailyXP: 150,
    streak: 7,
    longestStreak: 12,
    dailyGoal: 100,
    dailyProgress: 72,
    questionsCompleted: 1247,
    averageScore: 85,
    studyTime: "24h",
    goScore: 94 // Out of 100
  };

  const handleFlipCard = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setIsFlipped(false);
    }, 5000);
  };


  const practiceOptions = [
    {
      title: "Mock Theory Test",
      description: "Full 50-question practice test under timed conditions",
      icon: FileText,
      color: "bg-primary",
      textColor: "text-white",
      route: "/practice?mode=mock"
    },
    {
      title: "Hazard Perception",
      description: "Practice identifying developing hazards in video clips",
      icon: Target,
      color: "bg-white border-2 border-border",
      textColor: "text-foreground",
      route: "/practice?mode=hazard"
    },
    {
      title: "Quick Practice",
      description: "Short 10-question sessions on specific topics",
      icon: BookOpen,
      color: "bg-white border-2 border-border",
      textColor: "text-foreground",
      route: "/practice?mode=quick"
    },
    {
      title: "Weak Areas",
      description: "Focus on topics where you need improvement",
      icon: TrendingUp,
      color: "bg-white border-2 border-border",
      textColor: "text-foreground",
      route: "/practice?mode=weak"
    },
    {
      title: "King of the Hill",
      description: "Answer questions correctly 3 times in a row to master them",
      icon: Trophy,
      color: "bg-white border-2 border-border",
      textColor: "text-foreground",
      route: "/practice?mode=king-of-the-hill"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">GO53</h1>
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                South African K53 Prep
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={() => navigate('/')} className="nav-item-active text-sm lg:text-base">Dashboard</button>
              <button onClick={() => navigate('/learning-path')} className="nav-item text-sm lg:text-base">Learning Path</button>
              <button onClick={() => navigate('/profile')} className="nav-item text-sm lg:text-base">Profile</button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  localStorage.removeItem('go53_auth');
                  window.location.reload();
                }}
              >
                Sign Out
              </Button>
            </nav>
          </div>
          
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* GO Score Progress Bar - Flip Card */}
        <div 
          className="mb-6 sm:mb-8 perspective-1000 cursor-pointer"
          onClick={handleFlipCard}
        >
          <div className={`relative transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front of Card */}
            <Card className={`professional-card backface-hidden ${isFlipped ? 'invisible' : ''}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">GO Score</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Your overall readiness score</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-8 w-8 text-secondary" />
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-foreground leading-none">
                        {userProgress.goScore}
                      </div>
                      <div className="text-xs text-muted-foreground leading-none">of 100</div>
                    </div>
                  </div>
                </div>
                <Progress value={userProgress.goScore} className="h-3" />
              </CardContent>
            </Card>

            {/* Back of Card */}
            <Card className={`professional-card absolute inset-0 backface-hidden rotate-y-180 ${!isFlipped ? 'invisible' : ''}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Understanding GO Score</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Your GO Score shows how ready you are for your test. A score of {userProgress.goScore} means 
                      we're {userProgress.goScore}% confident you'll achieve {userProgress.goScore}% on your actual test.
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      We recommend aiming for a GO Score of 85 or higher before taking your test.
                    </p>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/practice?mode=mock');
                    }}
                    className="mt-auto w-full"
                  >
                    Improve GO Score
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Welcome back, Sarah
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Ready to continue your theory test preparation?
          </p>
        </div>

        {/* Practice Options */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Practice Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {practiceOptions.map((option, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${option.color}`}
                onClick={() => navigate(option.route)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${option.color === 'bg-primary' ? 'bg-white/20' : 'bg-muted/50'}`}>
                          <option.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${option.color === 'bg-primary' ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <h4 className={`text-base sm:text-lg font-semibold ${option.textColor}`}>
                          {option.title}
                        </h4>
                      </div>
                      <p className={`text-xs sm:text-sm ${option.color === 'bg-primary' ? 'text-white/80' : 'text-muted-foreground'} mb-4`}>
                        {option.description}
                      </p>
                      <Button 
                        variant={option.color === 'bg-primary' ? "secondary" : "default"}
                        size="sm"
                        className="group"
                      >
                        Start Practice
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* XP and Streak Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="professional-card">
            <CardContent className="p-4 sm:p-6">
              <XPDisplay 
                currentXP={userProgress.xp} 
                dailyXP={userProgress.dailyXP} 
                size="md"
              />
            </CardContent>
          </Card>
          
          <Card className="professional-card">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Quick Links</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">Explore more features</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/learning-path')} className="flex-1">
                  <Map className="h-4 w-4 mr-2" />
                  Learning Path
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/profile')} className="flex-1">
                  <Award className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "Completed Mock Test #12", score: "88%", time: "2 hours ago" },
                { activity: "Quick Practice: Road Signs", score: "92%", time: "1 day ago" },
                { activity: "Hazard Perception Practice", score: "85%", time: "2 days ago" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-border last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm sm:text-base">{item.activity}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-primary font-medium w-fit">
                    {item.score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}