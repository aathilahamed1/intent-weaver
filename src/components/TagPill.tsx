import { ValidTag, TAG_COLORS } from "@/types";
import { cn } from "@/lib/utils";

interface TagPillProps {
  tag: ValidTag;
  size?: "sm" | "md";
  onClick?: () => void;
}

export const TagPill = ({ tag, size = "sm", onClick }: TagPillProps) => {
  const colorClasses = TAG_COLORS[tag] || "bg-secondary text-secondary-foreground";
  
  return (
    <span
      onClick={onClick}
      className={cn(
        "tag-pill border cursor-default",
        colorClasses,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
        onClick && "cursor-pointer hover:opacity-80"
      )}
    >
      {tag}
    </span>
  );
};
