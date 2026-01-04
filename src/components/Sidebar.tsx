import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  FolderOpen,
  Settings,
  Plus,
  Zap,
} from "lucide-react";

type View = "spaces" | "files" | "settings";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onCreateSpace: () => void;
}

export const Sidebar = ({
  currentView,
  onViewChange,
  onCreateSpace,
}: SidebarProps) => {
  const navItems = [
    { id: "spaces" as View, icon: LayoutGrid, label: "Spaces" },
    { id: "files" as View, icon: FolderOpen, label: "Files" },
    { id: "settings" as View, icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground tracking-tight">
              IntentFS
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Find by intent
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "nav-item w-full",
              currentView === item.id && "nav-item-active"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Create Space Button */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onCreateSpace}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Space</span>
        </button>
      </div>

      {/* Status */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono">Watching 12 files</span>
        </div>
      </div>
    </aside>
  );
};
