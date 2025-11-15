import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home,
  RotateCcw,
  ArrowRight,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Star,
  FileText
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get results from navigation state or use mock data
  const passedResults = location.state || null;
  
  // Mock results data for fallback
  const mockResults = {
    score: 88,
    correctAnswers: 44,
    totalQuestions: 50,
    timeSpent: "38:24",
    xpEarned: 150,
    newBadges: ['Perfect Score on Signs'],
    passStatus: true,
    passingScore: 43,
    accuracy: 88,
    averageTime: "46 seconds",
    weakTopics: [
      { topic: "Motorway Rules", correct: 5, total: 8 },
      { topic: "Road Signs", correct: 7, total: 10 }
    ],
    strongTopics: [
      { topic: "Speed Limits", correct: 10, total: 10 },
      { topic: "Traffic Signals", correct: 9, total: 10 }
    ]
  };

  // Use passed results or mock data
  const results = passedResults ? {
    score: passedResults.score,
    correctAnswers: passedResults.correctAnswers,
    totalQuestions: passedResults.totalQuestions,
    timeSpent: "15:30", // Could be tracked if needed
    xpEarned: passedResults.correctAnswers * 10,
    newBadges: passedResults.score >= 90 ? ['High Scorer'] : [],
    passStatus: passedResults.passStatus,
    passingScore: Math.ceil(passedResults.totalQuestions * 0.86),
    accuracy: passedResults.score,
    averageTime: "30 seconds",
    weakTopics: [
      { topic: "Road Rules", correct: 3, total: 5 },
      { topic: "Traffic Signs", correct: 4, total: 5 }
    ],
    strongTopics: [
      { topic: "Speed Limits", correct: 5, total: 5 },
      { topic: "Safety", correct: 5, total: 5 }
    ]
  } : mockResults;

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-semibold text-foreground">Test Results</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Pass/Fail Banner */}
        <Card className={`professional-card mb-6 sm:mb-8 ${results.passStatus ? 'bg-gradient-to-br from-success/10 to-success/5' : 'bg-gradient-to-br from-error/10 to-error/5'}`}>
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="mb-4">
              {results.passStatus ? (
                <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-success mx-auto" />
              ) : (
                <XCircle className="h-12 w-12 sm:h-16 sm:w-16 text-error mx-auto" />
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {results.passStatus ? 'Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg mb-4 sm:mb-6">
              {results.passStatus 
                ? `You passed with a score of ${results.score}%` 
                : `You need ${results.passingScore - results.correctAnswers} more correct answers to pass`
              }
            </p>
            
            {/* XP Earned */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 sm:px-6 py-2 sm:py-3">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-current" />
              <span className="text-xl sm:text-2xl font-bold text-foreground">+{results.xpEarned} XP</span>
            </div>
          </CardContent>
        </Card>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="professional-card">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Final Score</h3>
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-1">
                  {results.score}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {results.correctAnswers} out of {results.totalQuestions} correct
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{results.score}%</span>
                </div>
                <Progress 
                  value={results.score} 
                  className={`h-3 ${results.passStatus ? '[&>div]:bg-success' : '[&>div]:bg-error'}`}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3 sm:space-y-4">
            <Card className="professional-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{results.correctAnswers} / {results.totalQuestions}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Correct Answers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{results.timeSpent}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Time Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{results.averageTime}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Avg per Question</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Topic Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strong Topics */}
          <Card className="professional-card">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Strong Topics
              </h3>
              <div className="space-y-3">
                {results.strongTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground">{topic.topic}</span>
                      <span className="text-sm font-semibold text-success">
                        {topic.correct}/{topic.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-success transition-all duration-500"
                        style={{ width: `${(topic.correct / topic.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weak Topics */}
          <Card className="professional-card">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Areas to Improve
              </h3>
              <div className="space-y-3">
                {results.weakTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground">{topic.topic}</span>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {topic.correct}/{topic.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${(topic.correct / topic.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Badges */}
        {results.newBadges.length > 0 && (
          <Card className="professional-card mb-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                New Achievements Unlocked!
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.newBadges.map((badge, index) => (
                  <Badge key={index} className="px-4 py-2 text-sm">
                    🏆 {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {passedResults?.questions && passedResults?.answers && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/review-answers", { 
                state: { 
                  questions: passedResults.questions, 
                  answers: passedResults.answers,
                  score: results.score,
                  correctAnswers: results.correctAnswers,
                  totalQuestions: results.totalQuestions,
                  passStatus: results.passStatus
                } 
              })}
            >
              <FileText className="h-4 w-4 mr-2" />
              Review Answers
            </Button>
          )}
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/practice")}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button 
            className="flex-1"
            onClick={() => navigate("/learning-path")}
          >
            Continue Learning
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
