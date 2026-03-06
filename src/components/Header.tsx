"use client";

import { useState } from "react";
import { Github, Star, Search, X, Folder } from "lucide-react";
import { Searchbar } from "./Searchbar";
import { useToDoStore } from "@/stores/todo.store";

export const Header = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const setSearchToDo = useToDoStore((state) => state.setSearchToDo);

  const handleCloseMobileSearch = () => {
    setMobileSearchOpen(false);
    setSearchToDo("");
  };

  return (
    <header className="w-full sticky top-0 z-10 bg-neutral-900 border-b border-neutral-700/60">
      <div className="h-14 px-4 md:px-6 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-5 h-5 rounded-sm bg-indigo-500 flex items-center justify-center">
            <Folder className="w-3 h-3 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold tracking-tight text-neutral-50">
            TaskFlow
          </span>
        </div>
        <div className="hidden md:flex flex-1 justify-center px-8">
          <Searchbar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4" />
          </button>
          <a
            href="https://github.com/developerleonardo/pt-taskflow-leonardo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium text-neutral-300 hover:text-neutral-50 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Star on Github</span>
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          </a>
        </div>
      </div>
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 flex items-center gap-2 border-t border-neutral-800">
          <div className="flex-1 pt-3">
            <Searchbar autoFocus />
          </div>
          <button
            onClick={handleCloseMobileSearch}
            className="mt-3 flex items-center justify-center w-8 h-8 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
