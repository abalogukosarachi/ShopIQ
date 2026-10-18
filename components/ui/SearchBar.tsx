"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SearchSuggestion {
  id: string;
  label: string;
  category?: string;
}

interface SearchBarProps {
  placeholder?: string;
  /** Called on every keystroke so the parent can fetch/filter suggestions. */
  onQueryChange?: (query: string) => void;
  suggestions?: SearchSuggestion[];
  className?: string;
}

/**
 * The one SearchBar component reused across the homepage, category pages
 * and admin panel. Shows a live suggestion dropdown as the user types and
 * navigates to /shop?q=... on submit or suggestion click.
 */
export function SearchBar({
  placeholder = "Search products, brands, categories...",
  onQueryChange,
  suggestions = [],
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    setIsOpen(value.length > 0);
    onQueryChange?.(value);
  }

  function goToResults(q: string) {
    if (!q.trim()) return;
    setIsOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToResults(query);
        }}
        className="flex items-center gap-2 rounded-input border border-border bg-white px-4 h-11 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
      >
        <Search size={18} className="text-text-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleChange("")}
            aria-label="Clear search"
            className="text-text-muted hover:text-text"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-card border border-border bg-white shadow-card-hover">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goToResults(s.label)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-primary-light"
              >
                <span>{s.label}</span>
                {s.category && (
                  <span className="text-xs text-text-muted">
                    {s.category}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
