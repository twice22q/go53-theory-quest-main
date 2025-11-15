import React from 'react';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  streakCount: number;
  longestStreak?: number;
  showLongest?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  streakCount,
  longestStreak = 0,
  showLongest = false,
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-gold';
    if (streak >= 14) return 'text-accent';
    if (streak >= 7) return 'text-secondary';
    return 'text-primary';
  };

  const getFlameIntensity = (streak: number) => {
    if (streak >= 30) return 'animate-pulse-glow';
    if (streak >= 14) return 'animate-float';
    if (streak >= 7) return 'animate-pulse';
    return '';
  };

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2">
        <Flame 
          size={iconSize[size]} 
          className={`${getStreakColor(streakCount)} ${getFlameIntensity(streakCount)} fill-current`}
        />
        <span className={`font-bold ${sizeClasses[size]} ${getStreakColor(streakCount)}`}>
          {streakCount}
        </span>
      </div>
    );
  }

  return (
    <div className="professional-card bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Flame 
              size={iconSize[size]} 
              className="text-primary fill-current"
            />
          </div>
          <div>
            <div className={`font-bold ${sizeClasses[size]} text-foreground`}>
              {streakCount} Day Streak
            </div>
            <div className="text-sm text-muted-foreground">
              Keep it going!
            </div>
          </div>
        </div>

        {showLongest && longestStreak > 0 && (
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar size={14} />
              <span>Best: {longestStreak}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakCounter;