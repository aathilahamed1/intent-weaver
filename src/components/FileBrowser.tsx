import { FileMetadata } from "@/types";
import { FileRow } from "./FileRow";
import { mockFiles } from "@/data/mockFiles";
import { FolderOpen, HardDrive } from "lucide-react";
import { useState } from "react";

interface FileBrowserProps {
  onOpenFile: (file: FileMetadata) => void;
}

export const FileBrowser = ({ onOpenFile }: FileBrowserProps) => {
  const [sortBy, setSortBy] = useState<"name" | "date">("date");

  const sortedFiles = [...mockFiles].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">All Files</h2>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                {mockFiles.length} indexed files
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "date")}
              className="bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary"
            >
              <option value="date">Date Modified</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {sortedFiles.length > 0 ? (
          <div className="space-y-1">
            {sortedFiles.map((file) => (
              <FileRow key={file.path} file={file} onOpen={onOpenFile} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No files indexed
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Add folders to watch and files will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
