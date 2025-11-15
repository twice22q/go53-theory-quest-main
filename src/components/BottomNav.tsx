import { useNavigate, useLocation } from "react-router-dom";
import { Home, Map, User } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom">
      <div className="grid grid-cols-3 h-16">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>
        
        <button
          onClick={() => navigate('/learning-path')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors border-l border-r border-border ${
            isActive('/learning-path') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Map className="h-5 w-5" />
          <span className="text-xs font-medium">Learning</span>
        </button>
        
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
}
