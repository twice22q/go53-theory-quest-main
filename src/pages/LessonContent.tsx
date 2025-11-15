import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import BottomNav from "@/components/BottomNav";

interface LessonData {
  id: number;
  title: string;
  category: string;
  duration: string;
  xpReward: number;
  sections: {
    title: string;
    content: string[];
  }[];
  keyPoints: string[];
}

const lessonContent: Record<string, LessonData> = {
  "Road Signs": {
    id: 1,
    title: "Road Signs",
    category: "Essential",
    duration: "15 min",
    xpReward: 50,
    sections: [
      {
        title: "Introduction to Road Signs",
        content: [
          "Road signs are essential for safe driving. They provide important information, warnings, and instructions to all road users.",
          "Understanding road signs is crucial for passing your theory test and becoming a safe driver on UK roads."
        ]
      },
      {
        title: "Types of Road Signs",
        content: [
          "Warning Signs (Triangular): These signs warn you of potential hazards ahead. They typically have a red border and are triangular in shape.",
          "Regulatory Signs (Circular): These signs give orders that must be followed. Red circles usually prohibit, while blue circles give mandatory instructions.",
          "Information Signs (Rectangular): These signs provide useful information about routes, distances, and facilities."
        ]
      },
      {
        title: "Common Warning Signs",
        content: [
          "Bend Ahead: Warns of a sharp bend in the road ahead. Reduce speed and prepare to steer.",
          "Road Narrows: Indicates the road is getting narrower. Be prepared to slow down and give way if necessary.",
          "Pedestrian Crossing: Warns of a pedestrian crossing ahead. Be ready to stop for pedestrians."
        ]
      },
      {
        title: "Common Regulatory Signs",
        content: [
          "Stop Sign: You MUST come to a complete stop at the line and give way to traffic on the main road.",
          "Give Way: You must give priority to traffic on the main road. Slow down and be prepared to stop.",
          "No Entry: You must not enter the road or area indicated by this sign."
        ]
      }
    ],
    keyPoints: [
      "Triangular signs with red borders are warnings",
      "Circular signs give orders - red means prohibition, blue means mandatory",
      "Rectangular signs provide information",
      "Always follow regulatory signs - they're legally enforceable",
      "Pay attention to warning signs and adjust your driving accordingly"
    ]
  },
  "Traffic Rules": {
    id: 2,
    title: "Traffic Rules",
    category: "Essential",
    duration: "20 min",
    xpReward: 75,
    sections: [
      {
        title: "Understanding UK Traffic Rules",
        content: [
          "Traffic rules are the foundation of safe driving. They ensure all road users can travel safely and efficiently.",
          "The Highway Code contains all the rules of the road in the UK. You must know and follow these rules."
        ]
      },
      {
        title: "Right of Way Rules",
        content: [
          "At roundabouts, give way to traffic from your right unless road markings indicate otherwise.",
          "At T-junctions, traffic on the main road has priority.",
          "Pedestrians have priority at zebra crossings once they have stepped onto the crossing."
        ]
      },
      {
        title: "Lane Discipline",
        content: [
          "Keep to the left unless overtaking or turning right.",
          "Only use the right-hand lane on motorways for overtaking.",
          "Choose the correct lane in good time when approaching junctions or roundabouts."
        ]
      },
      {
        title: "Following Distance",
        content: [
          "Leave at least a two-second gap between you and the vehicle in front in dry conditions.",
          "Double this gap in wet conditions, and multiply by 10 in icy conditions.",
          "The 'two-second rule' helps ensure you have enough time to react and stop safely."
        ]
      }
    ],
    keyPoints: [
      "Always follow the Highway Code",
      "Give way to traffic from the right at roundabouts",
      "Keep to the left except when overtaking",
      "Maintain a safe following distance - at least 2 seconds",
      "Pedestrians have priority at zebra crossings"
    ]
  },
  "Speed Limits": {
    id: 3,
    title: "Speed Limits",
    category: "Essential",
    duration: "12 min",
    xpReward: 50,
    sections: [
      {
        title: "UK Speed Limits Overview",
        content: [
          "Speed limits are maximum speeds - you should always drive at a speed appropriate for the conditions.",
          "Different types of roads have different speed limits, and these can vary based on vehicle type."
        ]
      },
      {
        title: "Built-up Areas",
        content: [
          "30 mph is the default speed limit in built-up areas with street lighting.",
          "20 mph zones are increasingly common near schools and residential areas.",
          "Always look for speed limit signs as limits can vary."
        ]
      },
      {
        title: "Single Carriageways",
        content: [
          "60 mph is the national speed limit for cars on single carriageway roads.",
          "This applies unless signs indicate otherwise.",
          "Consider road conditions, weather, and visibility when deciding your actual speed."
        ]
      },
      {
        title: "Dual Carriageways and Motorways",
        content: [
          "70 mph is the national speed limit for cars on dual carriageways and motorways.",
          "Variable speed limits may be displayed on motorways to manage traffic flow.",
          "Always obey variable speed limit signs - they're legally enforceable."
        ]
      }
    ],
    keyPoints: [
      "30 mph in built-up areas with street lighting",
      "60 mph on single carriageway roads",
      "70 mph on dual carriageways and motorways",
      "Speed limits are maximums - drive to conditions",
      "Always look for and obey speed limit signs"
    ]
  },
  "Hazard Awareness": {
    id: 4,
    title: "Hazard Awareness",
    category: "Safety",
    duration: "18 min",
    xpReward: 100,
    sections: [
      {
        title: "What is a Hazard?",
        content: [
          "A hazard is anything that could cause you to change speed, change direction, or stop.",
          "Hazards can be static (like parked cars) or dynamic (like pedestrians crossing).",
          "Good hazard awareness is key to safe driving and passing the hazard perception test."
        ]
      },
      {
        title: "Scanning the Road",
        content: [
          "Look well ahead - scan 12-15 seconds down the road.",
          "Check your mirrors regularly to be aware of what's behind you.",
          "Look for clues like signs, road markings, and the behavior of other road users."
        ]
      },
      {
        title: "Common Hazards",
        content: [
          "Pedestrians near or at crossings, especially children and elderly people.",
          "Cyclists and motorcyclists who may be harder to see.",
          "Vehicles emerging from junctions or driveways.",
          "Changes in road surface or weather conditions."
        ]
      },
      {
        title: "Responding to Hazards",
        content: [
          "Slow down early when you spot a potential hazard.",
          "Position your vehicle to give yourself the best view and space.",
          "Be prepared to stop if necessary.",
          "Never rely on other road users doing what you expect."
        ]
      }
    ],
    keyPoints: [
      "A hazard is anything that may cause you to change speed or direction",
      "Scan 12-15 seconds ahead to spot hazards early",
      "Watch for vulnerable road users like pedestrians and cyclists",
      "Slow down and be prepared when you spot a hazard",
      "Never assume what other road users will do"
    ]
  },
  "Motorway Driving": {
    id: 5,
    title: "Motorway Driving",
    category: "Advanced",
    duration: "25 min",
    xpReward: 100,
    sections: [
      {
        title: "Motorway Basics",
        content: [
          "Motorways are high-speed roads designed for faster travel over long distances.",
          "Only certain vehicles are allowed on motorways - learner drivers, pedestrians, and some slow vehicles are prohibited.",
          "The speed limit is 70 mph unless otherwise indicated."
        ]
      },
      {
        title: "Joining a Motorway",
        content: [
          "Use the slip road to build up speed to match motorway traffic.",
          "Use your mirrors and signal to merge safely.",
          "Give way to traffic already on the motorway.",
          "Adjust your speed and look for a safe gap to join."
        ]
      },
      {
        title: "Lane Discipline",
        content: [
          "Keep to the left lane unless overtaking.",
          "Only use the right-hand lanes for overtaking.",
          "Return to the left lane after overtaking.",
          "Don't middle-lane hog - it's poor lane discipline and can be dangerous."
        ]
      },
      {
        title: "Leaving a Motorway",
        content: [
          "Watch for advance warning signs for your junction.",
          "Move to the left lane in good time.",
          "Signal left as you approach the exit slip road.",
          "Reduce your speed on the slip road, not on the motorway."
        ]
      }
    ],
    keyPoints: [
      "Keep to the left lane except when overtaking",
      "Match your speed when joining from a slip road",
      "Watch for signs - plan your exit in advance",
      "Maintain safe following distances at high speeds",
      "Be aware of speed limits and variable speed signs"
    ]
  },
  "Vehicle Handling": {
    id: 6,
    title: "Vehicle Handling",
    category: "Advanced",
    duration: "22 min",
    xpReward: 75,
    sections: [
      {
        title: "Basic Vehicle Control",
        content: [
          "Good vehicle handling starts with proper posture and control setup.",
          "Adjust your seat, mirrors, and steering wheel before starting any journey.",
          "Smooth, progressive movements are key to good vehicle control."
        ]
      },
      {
        title: "Steering Techniques",
        content: [
          "Use the 'pull-push' method for normal driving - smoother and safer than hand-over-hand.",
          "Keep both hands on the wheel at the '10 and 2' or '9 and 3' positions.",
          "Look where you want to go - your hands will naturally follow.",
          "Avoid crossing your hands except when maneuvering at very low speeds."
        ]
      },
      {
        title: "Braking Safely",
        content: [
          "Apply brakes progressively - firm but not harsh.",
          "Leave enough distance to brake smoothly without emergency stops.",
          "In wet conditions, brake earlier and more gently.",
          "Avoid braking in a bend if possible - brake before the turn."
        ]
      },
      {
        title: "Cornering Safely",
        content: [
          "Slow down before the corner - 'slow in, fast out'.",
          "Position your vehicle correctly for the turn.",
          "Look through the corner to where you want to go.",
          "Accelerate gently as you exit the corner once straightened up."
        ]
      }
    ],
    keyPoints: [
      "Adjust your position and mirrors before driving",
      "Use smooth, progressive steering inputs",
      "Brake before corners, not in them",
      "Look where you want to go",
      "Practice makes perfect - smooth is fast and safe"
    ]
  }
};

export default function LessonContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const topicName = searchParams.get('topic') || '';
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  
  const lesson = lessonContent[topicName];

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const markSectionComplete = (index: number) => {
    setCompletedSections(prev => new Set(prev).add(index));
  };

  const progressPercentage = lesson ? (completedSections.size / lesson.sections.length) * 100 : 0;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="professional-card max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Lesson content not found</p>
            <Button onClick={() => navigate('/learning-path')}>
              Back to Learning Path
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
                onClick={() => navigate("/learning-path")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Learning Path
              </Button>
              <div className="h-6 w-px bg-border" />
              <Badge variant="secondary" className="text-xs">
                {lesson.category}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Lesson Header */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary fill-current" />
              <span>{lesson.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{completedSections.size} / {lesson.sections.length} sections</span>
            </div>
          </div>
          
          {/* Lesson Progress */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Your Progress</span>
              <span className="text-xs text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Lesson Content - Interactive Sections */}
        <div className="space-y-4 mb-8">
          {lesson.sections.map((section, index) => {
            const isExpanded = expandedSections.has(index);
            const isCompleted = completedSections.has(index);
            
            return (
              <Card key={index} className={`professional-card transition-all ${isCompleted ? 'border-success/30 bg-success/5' : ''}`}>
                <Collapsible open={isExpanded} onOpenChange={() => toggleSection(index)}>
                  <CardHeader className="cursor-pointer" onClick={() => toggleSection(index)}>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-primary" />
                          )}
                          <span className="flex-1">{section.title}</span>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={isCompleted ? "default" : "secondary"} className="text-xs">
                            {index + 1}/{lesson.sections.length}
                          </Badge>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </CardHeader>
                  
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-4 mb-6">
                        {section.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        {!isCompleted ? (
                          <Button
                            onClick={() => markSectionComplete(index)}
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Complete
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setCompletedSections(prev => {
                              const newSet = new Set(prev);
                              newSet.delete(index);
                              return newSet;
                            })}
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Retake Section
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {/* Key Points */}
        <Card className="professional-card mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Key Points to Remember
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-foreground leading-relaxed flex-1">{point}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 btn-primary"
            onClick={() => navigate(`/practice?mode=lesson&lessonId=${lesson.id}&topic=${encodeURIComponent(lesson.title)}`)}
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            Start Practice Questions
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/learning-path')}
          >
            Back to Learning Path
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}