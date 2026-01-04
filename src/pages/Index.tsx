import { useState, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SpacesGrid } from "@/components/SpacesGrid";
import { SpaceView } from "@/components/SpaceView";
import { FileBrowser } from "@/components/FileBrowser";
import { SettingsView } from "@/components/SettingsView";
import { CreateSpaceModal } from "@/components/CreateSpaceModal";
import { SearchResults } from "@/components/SearchResults";
import { Space, DEFAULT_SPACES, FileMetadata } from "@/types";
import { getFilesByTags, searchFiles } from "@/data/mockFiles";
import { toast } from "sonner";

type View = "spaces" | "files" | "settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("spaces");
  const [spaces, setSpaces] = useState<Space[]>(DEFAULT_SPACES);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<FileMetadata[]>([]);

  const handleSelectSpace = useCallback((space: Space) => {
    setSelectedSpace(space);
    setSearchQuery(null);
  }, []);

  const handleBackToSpaces = useCallback(() => {
    setSelectedSpace(null);
    setSearchQuery(null);
  }, []);

  const handleSearch = useCallback((query: string) => {
    const results = searchFiles(query);
    setSearchQuery(query);
    setSearchResults(results);
    setSelectedSpace(null);
  }, []);

  const handleCreateSpace = useCallback(
    (newSpace: Omit<Space, "id">) => {
      const space: Space = {
        ...newSpace,
        id: `custom-${Date.now()}`,
      };
      setSpaces((prev) => [...prev, space]);
      toast.success(`Space "${space.name}" created`);
    },
    []
  );

  const handleOpenFile = useCallback((file: FileMetadata) => {
    toast.info(`Opening ${file.name}`, {
      description: "File would open in default application",
    });
  }, []);

  const renderMainContent = () => {
    // Search results view
    if (searchQuery) {
      return (
        <SearchResults
          query={searchQuery}
          files={searchResults}
          onBack={handleBackToSpaces}
          onOpenFile={handleOpenFile}
        />
      );
    }

    // Space detail view
    if (selectedSpace) {
      const files = getFilesByTags(selectedSpace.tags);
      return (
        <SpaceView
          space={selectedSpace}
          files={files}
          onBack={handleBackToSpaces}
          onOpenFile={handleOpenFile}
        />
      );
    }

    // Main views
    switch (currentView) {
      case "spaces":
        return (
          <SpacesGrid
            spaces={spaces}
            onSelectSpace={handleSelectSpace}
            onSearch={handleSearch}
          />
        );
      case "files":
        return <FileBrowser onOpenFile={handleOpenFile} />;
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
  <div className="flex h-screen w-screen bg-background text-foreground">
    
    {/* Sidebar Navigation */}
    <Sidebar
      currentView={currentView}
      onChangeView={setCurrentView}
      onCreateSpace={() => setIsCreateModalOpen(true)}
      onSearch={handleSearch}
      onBack={handleBackToSpaces}
    />

    {/* Main Content Area */}
    <main className="flex-1 overflow-auto">
      {renderMainContent()}
    </main>

    {/* Create Space Modal */}
    <CreateSpaceModal
      open={isCreateModalOpen}
      onOpenChange={setIsCreateModalOpen}
      onCreate={handleCreateSpace}
    />
  </div>
);

};

export default Index;
