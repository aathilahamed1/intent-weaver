import { VALID_TAGS, TAG_COLORS } from "@/types";
import { Settings, FolderPlus, Tag, Info } from "lucide-react";

export const SettingsView = () => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Configure Intent Weaver
            </p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-8 space-y-8">
        {/* Watch Folders */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FolderPlus className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Watched Folders
            </h3>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Add folders to watch for automatic file indexing and tagging.
            </p>
            <button className="px-4 py-2 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-mono text-sm">
              + Add Folder
            </button>
          </div>
        </section>

        {/* Available Tags */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Available Tags
            </h3>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-4">
              These are the only tags that can be assigned to files. AI will map
              to these tags, never invent new ones.
            </p>
            <div className="flex flex-wrap gap-2">
              {VALID_TAGS.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-mono ${TAG_COLORS[tag]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">About</h3>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-mono text-foreground">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Engine</span>
                <span className="font-mono text-foreground">
                  Rule-Based + AI Fallback
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-mono text-foreground">Local JSON</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
