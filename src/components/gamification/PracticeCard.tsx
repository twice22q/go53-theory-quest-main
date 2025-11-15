import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PracticeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  progress?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  color?: 'primary' | 'secondary' | 'accent' | 'warning';
  onClick?: () => void;
  locked?: boolean;
  className?: string;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  title,
  description,
  icon: Icon,
  progress = 0,
  difficulty = 'medium',
  color = 'primary',
  onClick,
  locked = false,
  className = "",
}) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/10 border-primary/30 text-primary',
    secondary: 'from-secondary/20 to-secondary/10 border-secondary/30 text-secondary',
    accent: 'from-accent/20 to-accent/10 border-accent/30 text-accent',
    warning: 'from-warning/20 to-warning/10 border-warning/30 text-warning',
  };

  const difficultyBadges = {
    easy: { text: 'Easy', class: 'bg-success/20 text-success border-success/30' },
    medium: { text: 'Medium', class: 'bg-warning/20 text-warning border-warning/30' },
    hard: { text: 'Hard', class: 'bg-error/20 text-error border-error/30' },
  };

  return (
    <div 
      className={`
        professional-card relative overflow-hidden cursor-pointer
        bg-gradient-to-br ${colorClasses[color]}
        ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        transition-all duration-200
        ${className}
      `}
      onClick={locked ? undefined : onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4">
          <Icon size={80} />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} border`}>
            <Icon size={24} className="text-current" />
          </div>
          
          {!locked && (
            <div className={`
              px-3 py-1 rounded-full text-xs font-semibold border
              ${difficultyBadges[difficulty].class}
            `}>
              {difficultyBadges[difficulty].text}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="font-bold text-lg text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Progress Bar */}
        {progress > 0 && !locked && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-muted-foreground">Progress</span>
              <span className="text-xs font-bold text-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Locked State */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm font-semibold text-muted-foreground">
                Complete previous lessons to unlock
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeCard;