import { useState } from "react";
import { ValidTag, VALID_TAGS, TAG_COLORS, Space } from "@/types";
import { X, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (space: Omit<Space, "id">) => void;
}

export const CreateSpaceModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateSpaceModalProps) => {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState<ValidTag[]>([]);

  if (!isOpen) return null;

  const toggleTag = (tag: ValidTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCreate = () => {
    if (name.trim() && selectedTags.length > 0) {
      onCreate({
        name: name.trim(),
        tags: selectedTags,
        icon: "Folder",
      });
      setName("");
      setSelectedTags([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Create Space</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Space Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Research Papers"
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Tag Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Select Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {VALID_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              const colorClasses = TAG_COLORS[tag];
              
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-sm font-mono transition-all",
                    isSelected
                      ? colorClasses
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || selectedTags.length === 0}
            className={cn(
              "px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all",
              name.trim() && selectedTags.length > 0
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            <Plus className="w-4 h-4" />
            Create Space
          </button>
        </div>
      </div>
    </div>
  );
};
