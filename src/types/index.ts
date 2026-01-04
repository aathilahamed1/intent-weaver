export type ValidTag =
  | "study"
  | "coa"
  | "os"
  | "maths"
  | "programming"
  | "python"
  | "c"
  | "pdf"
  | "recent"
  | "cooking"
  | "important";

export const VALID_TAGS: ValidTag[] = [
  "study",
  "coa",
  "os",
  "maths",
  "programming",
  "python",
  "c",
  "pdf",
  "recent",
  "cooking",
  "important",
];

export interface FileMetadata {
  path: string;
  name: string;
  tags: ValidTag[];
  lastModified: string;
  lastOpened?: string;
  size?: number;
  type: "file" | "folder";
}

export interface Space {
  id: string;
  name: string;
  tags: ValidTag[];
  icon: string;
  isDefault?: boolean;
  fileCount?: number;
}

export const DEFAULT_SPACES: Space[] = [
  {
    id: "recent",
    name: "Recent",
    tags: ["recent"],
    icon: "Clock",
    isDefault: true,
  },
  {
    id: "study",
    name: "Study",
    tags: ["study", "coa", "maths", "os"],
    icon: "GraduationCap",
    isDefault: true,
  },
  {
    id: "programming",
    name: "Programming",
    tags: ["programming", "python", "c"],
    icon: "Code2",
    isDefault: true,
  },
  {
    id: "cooking",
    name: "Cooking",
    tags: ["cooking"],
    icon: "ChefHat",
    isDefault: true,
  },
];

export const TAG_COLORS: Record<ValidTag, string> = {
  study: "bg-tag-study/20 text-tag-study border-tag-study/30",
  coa: "bg-tag-coa/20 text-tag-coa border-tag-coa/30",
  os: "bg-tag-os/20 text-tag-os border-tag-os/30",
  maths: "bg-tag-maths/20 text-tag-maths border-tag-maths/30",
  programming: "bg-tag-programming/20 text-tag-programming border-tag-programming/30",
  python: "bg-tag-python/20 text-tag-python border-tag-python/30",
  c: "bg-tag-c/20 text-tag-c border-tag-c/30",
  pdf: "bg-tag-pdf/20 text-tag-pdf border-tag-pdf/30",
  recent: "bg-tag-recent/20 text-tag-recent border-tag-recent/30",
  cooking: "bg-tag-cooking/20 text-tag-cooking border-tag-cooking/30",
  important: "bg-tag-important/20 text-tag-important border-tag-important/30",
};
