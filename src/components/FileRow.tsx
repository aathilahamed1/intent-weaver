import { FileMetadata } from "@/types";
import { TagPill } from "./TagPill";
import {
  FileText,
  FileCode,
  FileType,
  Folder,
  Star,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const getFileIcon = (name: string, type: string) => {
  if (type === "folder") return Folder;
  
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "py":
    case "c":
    case "js":
    case "ts":
      return FileCode;
    case "pdf":
      return FileType;
    default:
      return FileText;
  }
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface FileRowProps {
  file: FileMetadata;
  onOpen: (file: FileMetadata) => void;
}

export const FileRow = ({ file, onOpen }: FileRowProps) => {
  const IconComponent = getFileIcon(file.name, file.type);
  const isImportant = file.tags.includes("important");

  return (
    <div
      className="file-row group"
      onDoubleClick={() => onOpen(file)}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
        <IconComponent className="w-5 h-5" />
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-foreground truncate">
            {file.name}
          </span>
          {isImportant && (
            <Star className="w-3.5 h-3.5 text-tag-important fill-tag-important" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {file.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag} tag={tag} size="sm" />
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
        <span className="font-mono">{formatFileSize(file.size)}</span>
        <span>
          {formatDistanceToNow(new Date(file.lastModified), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};
