import { FileMetadata } from "@/types";
import { FileRow } from "./FileRow";
import { ArrowLeft, Search } from "lucide-react";

interface SearchResultsProps {
  query: string;
  files: FileMetadata[];
  onBack: () => void;
  onOpenFile: (file: FileMetadata) => void;
}

export const SearchResults = ({
  query,
  files,
  onBack,
  onOpenFile,
}: SearchResultsProps) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Results for "{query}"
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {files.length} files found
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
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
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No matches found
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Try searching for a different intent or check the available tags.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
