import { Github, Star } from "lucide-react";
import { Searchbar } from "./Searchbar";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="w-full h-16 bg-neutral-900 grid grid-cols-[auto_1fr_auto] items-center px-4 justify-center sticky top-0 z-10">
      <span className="text-xl font-bold text-neutral-50">TaskFlow</span>
      <div className="flex justify-center">
        <Searchbar />
      </div>
      <Button variant="link" size="sm" asChild>
        <a
          href="https://github.com/developerleonardo/pt-taskflow-leonardo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Github className="mr-1" />
          Star on GitHub
          <Star className="ml-1" />
        </a>
      </Button>
    </header>
  );
};
