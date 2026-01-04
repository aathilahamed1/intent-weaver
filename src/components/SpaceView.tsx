import { Space, FileMetadata } from "@/types";
import { FileRow } from "./FileRow";
import { TagPill } from "./TagPill";
import { ArrowLeft, Filter } from "lucide-react";

interface SpaceViewProps {
  space: Space;
  files: FileMetadata[];
  onBack: () => void;
  onOpenFile: (file: FileMetadata) => void;
}

export const SpaceView = ({
  space,
  files,
  onBack,
  onOpenFile,
}: SpaceViewProps) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{space.name}</h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {files.length} files matching
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
            {space.tags.map((tag) => (
              <TagPill key={tag} tag={tag} size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {files.length > 0 ? (
          <div className="space-y-1">
            {files.map((file) => (
              <FileRow key={file.path} file={file} onOpen={onOpenFile} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No files found
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              No files match the tags in this space. Files will appear here
              automatically as they're tagged.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
