import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BottomNav from "@/components/BottomNav";
import { useSettings } from "@/hooks/useSettings";
import { playCorrectSound, playIncorrectSound } from "@/utils/sounds";

interface Question {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "What is the national speed limit on a single carriageway road for cars?",
    options: ["50 mph", "60 mph", "70 mph", "40 mph"],
    correctAnswer: 1,
    explanation: "The national speed limit for cars on single carriageway roads is 60 mph, unless signs show otherwise."
  },
  {
    id: 2,
    text: "When should you use hazard warning lights?",
    options: [
      "When parking illegally",
      "When your vehicle has broken down",
      "When driving slowly in heavy traffic",
      "When reversing into a parking space"
    ],
    correctAnswer: 1,
    explanation: "Hazard warning lights should be used when your vehicle has broken down and is causing an obstruction."
  }
];

interface QuestionInterfaceProps {
  mode?: string;
}

export default function QuestionInterface({ mode = "quick" }: QuestionInterfaceProps) {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuestions.length).fill(null));
  const [shakeWrong, setShakeWrong] = useState(false);
  const [showFinishWarning, setShowFinishWarning] = useState(false);
  
  // Timer for mock test (57 minutes = 3420 seconds)
  const totalTime = 3420; // 57 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(mode === "mock" ? totalTime : 0);

  // Simulate loading questions from database
  useEffect(() => {
    const loadQuestions = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    loadQuestions();
  }, []);

  // Timer countdown for mock test
  useEffect(() => {
    if (mode !== "mock" || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit when time runs out
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [mode, timeRemaining]);

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const answeredCount = answers.filter(answer => answer !== null).length;
  const progress = (answeredCount / sampleQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswer(answerIndex);
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answerIndex;
      setAnswers(newAnswers);
      
      // Auto-advance to next question after selection
      setTimeout(() => {
        handleSubmitAnswer();
      }, 300);
    }
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    
    // Play sound effect
    if (settings.soundEnabled && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      if (isCorrect) {
        playCorrectSound();
      } else {
        playIncorrectSound();
        // Trigger shake animation
        setShakeWrong(true);
        setTimeout(() => setShakeWrong(false), 500);
      }
    }
  };

  const handleTimeUp = () => {
    // Calculate results and navigate when time is up
    const correctAnswers = answers.filter((answer, index) => answer === sampleQuestions[index].correctAnswer).length;
    const totalQuestions = sampleQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passStatus = correctAnswers >= Math.ceil(totalQuestions * 0.86);
    
    navigate("/results", { 
      state: { 
        score,
        correctAnswers,
        totalQuestions,
        passStatus,
        answers,
        questions: sampleQuestions,
        timeExpired: true
      } 
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setShowAnswer(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const unansweredCount = answers.filter(answer => answer === null).length;
    
    if (unansweredCount > 0) {
      setShowFinishWarning(true);
      return;
    }
    
    submitTest();
  };

  const submitTest = () => {
    // Calculate results and navigate
    const correctAnswers = answers.filter((answer, index) => answer === sampleQuestions[index].correctAnswer).length;
    const totalQuestions = sampleQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passStatus = correctAnswers >= Math.ceil(totalQuestions * 0.86); // 86% pass rate
    
    navigate("/results", { 
      state: { 
        score,
        correctAnswers,
        totalQuestions,
        passStatus,
        answers,
        questions: sampleQuestions
      } 
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
      setShowAnswer(false);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setShowAnswer(false);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(answers[index]);
    setShowAnswer(false);
  };

  const getModeTitle = () => {
    switch (mode) {
      case "mock": return "Mock Theory Test";
      case "hazard": return "Hazard Perception";
      case "weak": return "Weak Areas Practice";
      case "king-of-the-hill": return "King of the Hill";
      default: 
        if (mode?.startsWith("lesson")) return "Lesson Practice";
        return "Quick Practice";
    }
  };

  const getTimerColor = () => {
    const percentage = (timeRemaining / totalTime) * 100;
    if (percentage > 70) return "bg-success";
    if (percentage > 30) return "bg-primary";
    return "bg-destructive";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">{getModeTitle()}</h1>
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Timer for Mock Test */}
        {mode === "mock" && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium text-foreground">Time Remaining</span>
              </div>
              <span className={`text-sm sm:text-base font-bold ${timeRemaining < totalTime * 0.3 ? 'text-destructive' : 'text-foreground'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${getTimerColor()}`}
                style={{ width: `${(timeRemaining / totalTime) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Question Navigator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-medium text-foreground">Questions</span>
            <span className="text-xs sm:text-sm text-muted-foreground">{answeredCount} of {sampleQuestions.length} answered</span>
          </div>
          <div className="grid grid-cols-10 gap-1 sm:gap-2 mb-2">
            {sampleQuestions.map((_, index) => {
              const isAnswered = answers[index] !== null;
              const isCurrent = index === currentQuestionIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleJumpToQuestion(index)}
                  className={`
                    aspect-square rounded text-xs font-medium transition-all
                    ${isCurrent ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : ''}
                    ${!isCurrent && isAnswered ? 'bg-primary/70 text-white' : ''}
                    ${!isCurrent && !isAnswered ? 'bg-muted text-muted-foreground hover:bg-muted/80' : ''}
                  `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="professional-card mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-2 sm:space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isIncorrect = showAnswer && isSelected && !isCorrect;
                const shouldHighlightCorrect = showAnswer && isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                    className={`
                      w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200
                      ${isSelected && !showAnswer ? 'border-primary bg-primary/5' : 'border-border'}
                      ${shouldHighlightCorrect ? 'border-success bg-success/5' : ''}
                      ${isIncorrect ? 'border-error bg-error/5' : ''}
                      ${!showAnswer ? 'hover:border-primary/50 cursor-pointer' : 'cursor-default'}
                      ${shakeWrong && isIncorrect ? 'animate-shake' : ''}
                      disabled:opacity-75
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground text-sm sm:text-base">{option}</span>
                      {showAnswer && (
                        <div className="flex-shrink-0">
                          {shouldHighlightCorrect && (
                            <CheckCircle className="h-5 w-5 text-success" />
                          )}
                          {isIncorrect && (
                            <XCircle className="h-5 w-5 text-error" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showAnswer && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Explanation</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="sm:size-default"
          >
            <ArrowLeft className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex gap-2 sm:gap-3">
            {!showAnswer && selectedAnswer === null && (
              <Button onClick={handleSkipQuestion} variant="outline" size="sm" className="sm:size-default">
                <span className="text-xs sm:text-sm">Skip</span>
              </Button>
            )}
            
            {showAnswer && (
              <Button onClick={handleNextQuestion} size="sm" className="btn-primary sm:size-default">
                <span className="text-xs sm:text-sm">{currentQuestionIndex === sampleQuestions.length - 1 ? 'Finish' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Finish Warning Dialog */}
      <AlertDialog open={showFinishWarning} onOpenChange={setShowFinishWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Unanswered Questions
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have {answers.filter(a => a === null).length} unanswered question(s). 
              Are you sure you want to finish the test?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Questions</AlertDialogCancel>
            <AlertDialogAction onClick={submitTest}>Finish Test</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <BottomNav />
    </div>
  );
}