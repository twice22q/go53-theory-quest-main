import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Trophy,
  Star,
  CheckCircle,
  Zap,
  Crown,
  Volume2,
  Settings,
  Mail,
  Phone,
  LogOut,
  RotateCcw
} from "lucide-react";
import { XPDisplay } from "@/components/gamification/XPDisplay";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { ProgressRing } from "@/components/gamification/ProgressRing";
import BottomNav from "@/components/BottomNav";
import { useSettings } from "@/hooks/useSettings";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first practice question',
    icon: '🎯',
    unlocked: true,
    unlockedAt: '2025-01-15',
    xpReward: 25
  },
  {
    id: '2',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    unlocked: true,
    unlockedAt: '2025-01-20',
    xpReward: 100
  },
  {
    id: '3',
    name: 'Perfect Score',
    description: 'Get 100% on a practice test',
    icon: '⭐',
    unlocked: true,
    unlockedAt: '2025-01-22',
    xpReward: 150
  },
  {
    id: '4',
    name: 'Speed Demon',
    description: 'Complete 50 questions in a day',
    icon: '⚡',
    unlocked: false,
    xpReward: 200
  },
  {
    id: '5',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    unlocked: false,
    xpReward: 500
  },
  {
    id: '6',
    name: 'Road Scholar',
    description: 'Complete all learning path lessons',
    icon: '🎓',
    unlocked: false,
    xpReward: 1000
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const { settings, toggleSound, toggleCommunication } = useSettings();
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState({
    name: "Sarah",
    email: "sarah@example.com",
    phone: "+27 82 123 4567",
    testDate: "2025-11-15"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);
  const [showOTPVerification, setShowOTPVerification] = useState<'email' | 'phone' | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [pendingChanges, setPendingChanges] = useState<typeof userInfo | null>(null);
  const [showResetStatsOTP, setShowResetStatsOTP] = useState(false);
  const [resetOtpValue, setResetOtpValue] = useState("");

  const handleSaveProfile = () => {
    // Check if email or phone changed
    const emailChanged = formData.email !== userInfo.email;
    const phoneChanged = formData.phone !== userInfo.phone;

    if (emailChanged || phoneChanged) {
      setPendingChanges(formData);
      setShowOTPVerification(emailChanged ? 'email' : 'phone');
      toast({
        title: "Verification required",
        description: `We've sent a verification code to your ${emailChanged ? 'new email' : 'new phone number'}.`,
      });
    } else {
      // Only name or test date changed, no verification needed
      setUserInfo(formData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    }
  };

  const handleVerifyOTP = () => {
    const DEMO_OTP = "1234";
    
    if (otpValue === DEMO_OTP) {
      if (pendingChanges) {
        setUserInfo(pendingChanges);
      }
      setIsEditing(false);
      setShowOTPVerification(null);
      setOtpValue("");
      setPendingChanges(null);
      toast({
        title: "Verification successful",
        description: "Your profile has been updated.",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
    }
  };

  const handleCancelOTP = () => {
    setShowOTPVerification(null);
    setOtpValue("");
    setPendingChanges(null);
  };

  const handleCancelEdit = () => {
    setFormData(userInfo);
    setIsEditing(false);
    setShowOTPVerification(null);
    setOtpValue("");
    setPendingChanges(null);
  };

  const handleSignOut = () => {
    // Clear any stored data and redirect to landing
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  const handleResetStatsRequest = () => {
    setShowResetStatsOTP(true);
    toast({
      title: "Verification code sent",
      description: "We've sent a verification code to your email.",
    });
  };

  const handleResetStatsConfirm = () => {
    if (resetOtpValue.length === 6) {
      // Reset all stats logic would go here
      toast({
        title: "Stats reset successful",
        description: "All your statistics have been reset.",
      });
      setShowResetStatsOTP(false);
      setResetOtpValue("");
      // Refresh page or update stats display
      window.location.reload();
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      });
    }
  };

  const userStats = {
    xp: 2847,
    dailyXP: 150,
    streak: 7,
    longestStreak: 12,
    level: 5,
    nextLevelXP: 3000,
    questionsCompleted: 1247,
    averageScore: 85,
    studyTime: 24,
    perfectScores: 8
  };

  const recentActivity = [
    { activity: "Completed Mock Test #12", score: "88%", xp: 50, time: "2 hours ago" },
    { activity: "Quick Practice: Road Signs", score: "92%", xp: 25, time: "1 day ago" },
    { activity: "Hazard Perception Practice", score: "85%", xp: 40, time: "2 days ago" },
  ];

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
              <h1 className="text-lg font-semibold text-foreground">Your Profile</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {userInfo.name}'s Progress
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg">
            Track your achievements and learning statistics
          </p>
        </div>

        {/* Profile Information */}
        <Card className="professional-card mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Profile Information
              </CardTitle>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {showOTPVerification ? (
              <div className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    {showOTPVerification === 'email' ? (
                      <Mail className="h-12 w-12 text-primary" />
                    ) : (
                      <Phone className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Verify your {showOTPVerification === 'email' ? 'email' : 'phone number'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter the 4-digit code sent to{' '}
                      {showOTPVerification === 'email' ? pendingChanges?.email : pendingChanges?.phone}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      value={otpValue}
                      onChange={(value) => setOtpValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Demo OTP: 1234
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleVerifyOTP} 
                    className="flex-1"
                    disabled={otpValue.length !== 4}
                  >
                    Verify
                  </Button>
                  <Button onClick={handleCancelOTP} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : !isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <p className="text-sm font-medium text-foreground">{userInfo.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email Address</Label>
                  <p className="text-sm font-medium text-foreground">{userInfo.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Phone Number</Label>
                  <p className="text-sm font-medium text-foreground">{userInfo.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Scheduled Test Date</Label>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(userInfo.testDate).toLocaleDateString('en-ZA', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Verification required for email changes
                  </p>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Verification required for phone changes
                  </p>
                </div>
                <div>
                  <Label htmlFor="testDate" className="text-sm">Scheduled Test Date</Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={formData.testDate}
                    onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSaveProfile} className="flex-1">
                    Save Changes
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* XP and Level Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="professional-card md:col-span-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Level {userStats.level}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {userStats.xp} / {userStats.nextLevelXP} XP
                  </p>
                </div>
                <XPDisplay currentXP={userStats.xp} dailyXP={userStats.dailyXP} size="md" />
              </div>
              <div className="w-full bg-muted rounded-full h-2 sm:h-3">
                <div 
                  className="h-2 sm:h-3 rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500"
                  style={{ width: `${(userStats.xp / userStats.nextLevelXP) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <StreakCounter 
            streakCount={userStats.streak}
            longestStreak={userStats.longestStreak}
            showLongest={true}
            size="md"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="professional-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-success mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-foreground">{userStats.questionsCompleted}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Questions</div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-foreground">{userStats.averageScore}%</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Avg Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-foreground">{userStats.perfectScores}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Perfect Scores</div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-foreground">{userStats.studyTime}h</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Study Time</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="professional-card mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`
                    p-3 sm:p-4 rounded-lg border transition-all duration-200
                    ${achievement.unlocked 
                      ? 'bg-primary/5 border-primary/20 cursor-pointer hover:shadow-md' 
                      : 'bg-muted/50 border-border opacity-50'
                    }
                  `}
                >
                  <div className="text-2xl sm:text-4xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <Badge variant={achievement.unlocked ? "default" : "secondary"} className="text-[10px] sm:text-xs">
                      {achievement.xpReward} XP
                    </Badge>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {new Date(achievement.unlockedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="professional-card mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="sound-toggle" className="text-sm font-medium text-foreground cursor-pointer">
                      Sound Effects
                    </Label>
                    <p className="text-xs text-muted-foreground">Play sounds for correct/incorrect answers</p>
                  </div>
                </div>
                <Switch
                  id="sound-toggle"
                  checked={settings.soundEnabled}
                  onCheckedChange={toggleSound}
                />
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="communication-toggle" className="text-sm font-medium text-foreground cursor-pointer">
                      Email Communications
                    </Label>
                    <p className="text-xs text-muted-foreground">Receive updates and tips via email</p>
                  </div>
                </div>
                <Switch
                  id="communication-toggle"
                  checked={settings.communicationEnabled}
                  onCheckedChange={toggleCommunication}
                />
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-5 w-5 text-muted-foreground" />
                    <Label className="text-sm font-medium text-foreground">
                      Reset Statistics
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reset all your progress and statistics. This action requires verification.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleResetStatsRequest}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Stats
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <Label className="text-sm font-medium text-foreground">
                      Sign Out
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sign out of your account
                  </p>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-border last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm sm:text-base">{item.activity}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge variant="secondary" className="text-primary font-medium text-xs sm:text-sm">
                      {item.score}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-current" />
                      <span>+{item.xp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />

      {/* Reset Stats OTP Dialog */}
      {showResetStatsOTP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Verify Reset Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit verification code sent to {userInfo.email}
              </p>
              
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={resetOtpValue}
                  onChange={(value) => setResetOtpValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowResetStatsOTP(false);
                    setResetOtpValue("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleResetStatsConfirm}
                  disabled={resetOtpValue.length !== 6}
                >
                  Confirm Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
