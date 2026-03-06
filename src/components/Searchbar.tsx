"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useToDoStore } from "@/stores/todo.store";
import { Search } from "lucide-react";

export const Searchbar = () => {
  const searchToDo = useToDoStore((state) => state.searchToDo);
  const setSearchToDo = useToDoStore((state) => state.setSearchToDo);
  const todos = useToDoStore((state) => state.todos);

  const resultsCount = todos.filter((item) =>
    item.todo.toLowerCase().includes(searchToDo.toLowerCase()),
  ).length;

  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        placeholder="Search..."
        className="placeholder:text-neutral-300 text-neutral-50"
        onChange={(e) => setSearchToDo(e.target.value)}
      />
      <InputGroupAddon className="text-neutral-300">
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="text-neutral-300">
        {resultsCount} results
      </InputGroupAddon>
    </InputGroup>
  );
};
