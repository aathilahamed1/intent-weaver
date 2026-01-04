import { Space, FileMetadata, ValidTag } from "@/types";
import { SpaceCard } from "./SpaceCard";
import { IntentSearch } from "./IntentSearch";
import { getFilesByTags } from "@/data/mockFiles";

interface SpacesGridProps {
  spaces: Space[];
  onSelectSpace: (space: Space) => void;
  onSearch: (query: string) => void;
}

export const SpacesGrid = ({
  spaces,
  onSelectSpace,
  onSearch,
}: SpacesGridProps) => {
  const getFileCount = (tags: ValidTag[]): number => {
    return getFilesByTags(tags).length;
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header with Search */}
      <div className="px-8 pt-12 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            What do you need?
          </h1>
          <p className="text-muted-foreground text-lg">
            Find files by intent, not location
          </p>
        </div>
        
        <IntentSearch onSearch={onSearch} />
      </div>

      {/* Spaces Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-8 pb-8">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Your Spaces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                fileCount={getFileCount(space.tags)}
                onClick={() => onSelectSpace(space)}
                isHighlighted={space.id === "recent"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
