import { Home, Plus, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/",
      isActive: location.pathname === "/"
    },
    { 
      icon: Plus, 
      label: "Report", 
      path: "/report",
      isActive: location.pathname === "/report"
    },
    { 
      icon: FileText, 
      label: "My Reports", 
      path: "/my-reports",
      isActive: location.pathname === "/my-reports"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav border-t border-border z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-accent/10 active:scale-95",
                item.isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-all duration-200",
                  item.isActive && "drop-shadow-[0_0_6px_hsl(var(--primary))]"
                )} 
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;