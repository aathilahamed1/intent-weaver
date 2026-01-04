import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface IntentSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const IntentSearch = ({
  onSearch,
  placeholder = "What are you looking for?",
}: IntentSearchProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="intent-search w-full max-w-2xl mx-auto">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-[1.02]" : ""
        }`}
      >
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-card border border-border rounded-xl pl-14 pr-14 py-4 text-lg font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-300"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              isFocused
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: "0 0 30px hsl(186 100% 50% / 0.3)",
          }}
        />
      </div>
      
      {isFocused && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="font-mono">Try:</span>
          <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground font-mono">
            "files for internals"
          </span>
          <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground font-mono">
            "python projects"
          </span>
        </div>
      )}
    </form>
  );
};
