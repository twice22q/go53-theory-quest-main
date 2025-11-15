import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Lock,
  CheckCircle,
  Star,
  Target,
  AlertTriangle,
  Zap,
  MapPin
} from "lucide-react";
import { ProgressRing } from "@/components/gamification/ProgressRing";
import BottomNav from "@/components/BottomNav";

interface LessonNode {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  xpReward: number;
  category: string;
}

const learningPath: LessonNode[] = [
  {
    id: 1,
    title: "Road Signs",
    description: "Learn warning, regulatory, and information signs",
    progress: 100,
    status: 'completed',
    xpReward: 50,
    category: "Essential"
  },
  {
    id: 2,
    title: "Traffic Rules",
    description: "Master UK traffic laws and regulations",
    progress: 75,
    status: 'in-progress',
    xpReward: 75,
    category: "Essential"
  },
  {
    id: 3,
    title: "Speed Limits",
    description: "Understand speed limits for different road types",
    progress: 0,
    status: 'available',
    xpReward: 50,
    category: "Essential"
  },
  {
    id: 4,
    title: "Hazard Awareness",
    description: "Identify and respond to potential hazards",
    progress: 0,
    status: 'available',
    xpReward: 100,
    category: "Safety"
  },
  {
    id: 5,
    title: "Motorway Driving",
    description: "Learn motorway rules and safe driving practices",
    progress: 0,
    status: 'locked',
    xpReward: 100,
    category: "Advanced"
  },
  {
    id: 6,
    title: "Vehicle Handling",
    description: "Master vehicle control and handling techniques",
    progress: 0,
    status: 'locked',
    xpReward: 75,
    category: "Advanced"
  }
];

export default function LearningPath() {
  const navigate = useNavigate();

  // Find the next lesson to work on
  const nextLesson = learningPath.find(lesson => 
    lesson.status === 'in-progress' || lesson.status === 'available'
  );

  const overallProgress = Math.round(
    learningPath.reduce((acc, lesson) => acc + lesson.progress, 0) / learningPath.length
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'in-progress':
        return <Zap className="h-6 w-6 text-primary" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-muted-foreground" />;
      default:
        return <MapPin className="h-6 w-6 text-primary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Safety':
        return 'bg-success/10 text-success border-success/20';
      case 'Advanced':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleLessonClick = (lesson: LessonNode) => {
    if (lesson.status !== 'locked') {
      navigate(`/lesson?topic=${encodeURIComponent(lesson.title)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-lg font-semibold text-foreground">Learning Path</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Your Learning Journey
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg">
            Complete lessons to unlock new topics and earn XP
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="professional-card mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Overall Progress</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  1 of 6 lessons completed
                </p>
              </div>
              <ProgressRing 
                progress={17}
                size={80}
                strokeWidth={6}
                showPercentage={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning Path Grid */}
        <h3 className="text-xl font-bold mb-4">All Lessons</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {learningPath.map((lesson, index) => (
            <Card 
              key={lesson.id}
              className={`
                professional-card cursor-pointer transition-all duration-200
                ${lesson.status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}
                ${lesson.id === nextLesson?.id ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => handleLessonClick(lesson)}
            >
              <CardContent className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/10">
                      {getStatusIcon(lesson.status)}
                    </div>
                  </div>
                  <Badge className={getCategoryColor(lesson.category)}>
                    {lesson.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {lesson.description}
                  </p>
                </div>

                {/* Progress */}
                {lesson.status !== 'locked' && lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-bold text-foreground">{lesson.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* XP Reward */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-current" />
                    <span>{lesson.xpReward} XP</span>
                  </div>
                  {lesson.status === 'locked' && (
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      Complete previous
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
