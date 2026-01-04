import { FileMetadata, ValidTag } from "@/types";

export const mockFiles: FileMetadata[] = [
  {
    path: "C:/Users/Documents/Study/COA/computer_architecture_notes.pdf",
    name: "computer_architecture_notes.pdf",
    tags: ["study", "coa", "pdf", "recent"],
    lastModified: "2024-01-03T14:30:00Z",
    lastOpened: "2024-01-04T09:15:00Z",
    size: 2540000,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Study/OS/process_scheduling.pdf",
    name: "process_scheduling.pdf",
    tags: ["study", "os", "pdf"],
    lastModified: "2024-01-02T10:00:00Z",
    size: 1850000,
    type: "file",
  },
  {
    path: "C:/Users/Projects/Python/data_analysis.py",
    name: "data_analysis.py",
    tags: ["programming", "python", "recent"],
    lastModified: "2024-01-04T08:45:00Z",
    lastOpened: "2024-01-04T08:45:00Z",
    size: 15600,
    type: "file",
  },
  {
    path: "C:/Users/Projects/C/linked_list.c",
    name: "linked_list.c",
    tags: ["programming", "c"],
    lastModified: "2024-01-01T16:20:00Z",
    size: 8400,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Study/Maths/linear_algebra_formulas.pdf",
    name: "linear_algebra_formulas.pdf",
    tags: ["study", "maths", "pdf", "important"],
    lastModified: "2023-12-28T11:00:00Z",
    size: 980000,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Recipes/pasta_carbonara.md",
    name: "pasta_carbonara.md",
    tags: ["cooking", "recent"],
    lastModified: "2024-01-03T19:30:00Z",
    lastOpened: "2024-01-03T19:30:00Z",
    size: 2100,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Study/COA/cache_memory_lab.pdf",
    name: "cache_memory_lab.pdf",
    tags: ["study", "coa", "pdf"],
    lastModified: "2024-01-02T15:45:00Z",
    size: 1200000,
    type: "file",
  },
  {
    path: "C:/Users/Projects/Python/ml_model.py",
    name: "ml_model.py",
    tags: ["programming", "python", "important"],
    lastModified: "2023-12-30T20:00:00Z",
    size: 24500,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Study/OS/memory_management.pdf",
    name: "memory_management.pdf",
    tags: ["study", "os", "pdf", "recent"],
    lastModified: "2024-01-04T07:00:00Z",
    lastOpened: "2024-01-04T10:30:00Z",
    size: 3100000,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Recipes/thai_curry.md",
    name: "thai_curry.md",
    tags: ["cooking"],
    lastModified: "2023-12-25T12:00:00Z",
    size: 1800,
    type: "file",
  },
  {
    path: "C:/Users/Projects/C/binary_tree.c",
    name: "binary_tree.c",
    tags: ["programming", "c", "recent"],
    lastModified: "2024-01-04T06:30:00Z",
    lastOpened: "2024-01-04T06:30:00Z",
    size: 12300,
    type: "file",
  },
  {
    path: "C:/Users/Documents/Study/Maths/calculus_notes.pdf",
    name: "calculus_notes.pdf",
    tags: ["study", "maths", "pdf"],
    lastModified: "2023-12-20T14:00:00Z",
    size: 4500000,
    type: "file",
  },
];

export const getFilesByTags = (tags: ValidTag[]): FileMetadata[] => {
  return mockFiles.filter((file) =>
    tags.some((tag) => file.tags.includes(tag))
  );
};

export const getRecentFiles = (): FileMetadata[] => {
  return mockFiles
    .filter((file) => file.tags.includes("recent"))
    .sort((a, b) => {
      const aTime = a.lastOpened || a.lastModified;
      const bTime = b.lastOpened || b.lastModified;
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
};

export const searchFiles = (query: string): FileMetadata[] => {
  const lowerQuery = query.toLowerCase();
  return mockFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(lowerQuery) ||
      file.tags.some((tag) => tag.includes(lowerQuery))
  );
};
