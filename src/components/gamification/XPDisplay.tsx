import React from 'react';
import { Star, TrendingUp } from 'lucide-react';

interface XPDisplayProps {
  currentXP: number;
  dailyXP?: number;
  showDailyIncrease?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const XPDisplay: React.FC<XPDisplayProps> = ({
  currentXP,
  dailyXP = 0,
  showDailyIncrease = true,
  size = 'md',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-lg px-4 py-2',
    lg: 'text-xl px-6 py-3',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className="flex items-center gap-2">
      {/* Main XP Display */}
      <div className={`
        inline-flex items-center gap-2 
        bg-primary/10 border border-primary/20 rounded-lg
        ${sizeClasses[size]}
      `}>
        <Star 
          size={iconSize[size]} 
          className="text-primary fill-current" 
        />
        <span className="font-bold text-foreground">
          {currentXP.toLocaleString()} XP
        </span>
      </div>

      {/* Daily XP Increase */}
      {showDailyIncrease && dailyXP > 0 && (
        <div className="inline-flex items-center gap-1 text-success bg-success/10 px-3 py-1 rounded-lg border border-success/20">
          <TrendingUp size={14} />
          <span className="text-sm font-semibold">+{dailyXP}</span>
        </div>
      )}
    </div>
  );
};

export default XPDisplay;