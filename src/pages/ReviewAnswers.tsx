import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Question {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function ReviewAnswers() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { questions, answers } = location.state || { questions: [], answers: [] };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="professional-card max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No answers to review</p>
            <Button onClick={() => navigate("/")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/results", { state: location.state })}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">Review Answers</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Answer Review
          </h2>
          <p className="text-muted-foreground">
            Review all questions and see the correct answers
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((question: Question, index: number) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== null && userAnswer !== undefined;

            return (
              <Card 
                key={question.id} 
                className={`professional-card ${
                  !wasAnswered ? 'border-muted' :
                  isCorrect ? 'border-success/30 bg-success/5' : 'border-error/30 bg-error/5'
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Q{index + 1}
                      </Badge>
                      {wasAnswered && (
                        isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-error" />
                        )
                      )}
                    </div>
                    <Badge variant={wasAnswered ? (isCorrect ? "default" : "destructive") : "secondary"}>
                      {!wasAnswered ? "Not Answered" : isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 leading-relaxed">
                    {question.text}
                  </h3>

                  {/* Answer Options */}
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => {
                      const isUserAnswer = userAnswer === optionIndex;
                      const isCorrectAnswer = optionIndex === question.correctAnswer;

                      return (
                        <div
                          key={optionIndex}
                          className={`
                            p-3 rounded-lg border-2 transition-all
                            ${isCorrectAnswer ? 'border-success bg-success/5' : 'border-border'}
                            ${isUserAnswer && !isCorrectAnswer ? 'border-error bg-error/5' : ''}
                          `}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-sm sm:text-base ${isCorrectAnswer || isUserAnswer ? 'font-medium' : ''} text-foreground`}>
                              {option}
                            </span>
                            <div className="flex items-center gap-2">
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="text-xs text-error font-medium">Your answer</span>
                              )}
                              {isCorrectAnswer && (
                                <CheckCircle className="h-5 w-5 text-success" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="h-5 w-5 text-error" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Explanation</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/results", { state: location.state })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          <Button 
            className="flex-1"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
