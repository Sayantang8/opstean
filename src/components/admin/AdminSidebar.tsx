
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Tag, 
  Users,
  FileText,
  Menu,
  Bell,
  Briefcase,
  UserPlus,
  MessageSquare
} from 'lucide-react';

type ActiveView = 'products' | 'users' | 'jobs' | 'notifications' | 'job-applications' | 'general-applications' | 'contacts';

interface AdminSidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AdminSidebar = ({ activeView, setActiveView, collapsed, setCollapsed }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'products' as const, label: 'Products Management', icon: Tag },
    { id: 'users' as const, label: 'Users Management', icon: Users },
    { id: 'jobs' as const, label: 'Jobs Management', icon: FileText },
    { id: 'job-applications' as const, label: 'Job Applications', icon: Briefcase },
    { id: 'general-applications' as const, label: 'General Applications', icon: UserPlus },
    { id: 'contacts' as const, label: 'Contact Management', icon: MessageSquare },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h2 className="text-xl font-bold text-primary">Opstean Admin</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {!collapsed && (
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Management
          </div>
        )}
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                collapsed && "justify-center px-2"
              )}
              onClick={() => setActiveView(item.id)}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
