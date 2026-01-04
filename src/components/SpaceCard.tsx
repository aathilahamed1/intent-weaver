import { Space } from "@/types";
import { TagPill } from "./TagPill";
import {
  Clock,
  GraduationCap,
  Code2,
  ChefHat,
  Folder,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  GraduationCap,
  Code2,
  ChefHat,
  Folder,
};

interface SpaceCardProps {
  space: Space;
  fileCount: number;
  onClick: () => void;
  isHighlighted?: boolean;
}

export const SpaceCard = ({
  space,
  fileCount,
  onClick,
  isHighlighted = false,
}: SpaceCardProps) => {
  const IconComponent = iconMap[space.icon] || Folder;

  return (
    <div
      onClick={onClick}
      className={cn(
        "space-card group",
        isHighlighted && "space-card-recent"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
          isHighlighted
            ? "bg-primary/20 text-primary"
            : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}
      >
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Title & Count */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{space.name}</h3>
        <span className="text-sm font-mono text-muted-foreground">
          {fileCount} files
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {space.tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} tag={tag} size="sm" />
        ))}
        {space.tags.length > 3 && (
          <span className="text-xs text-muted-foreground font-mono">
            +{space.tags.length - 3}
          </span>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="flex justify-end">
        <div className="p-2 rounded-lg bg-secondary/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Glow on hover for highlighted */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          style={{ boxShadow: "0 0 40px hsl(186 100% 50% / 0.2)" }} 
        />
      )}
    </div>
  );
};
