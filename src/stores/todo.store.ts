import { create } from "zustand";
import { ToDoTypes } from "../types";

interface todoStore {
  todos: ToDoTypes[];
  setTodos: (todos: ToDoTypes[]) => void;
  addToDo: (todo: ToDoTypes) => void;
  deleteToDo: (id: number) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  searchToDo: string;
  setSearchToDo: (search: string) => void;
}

export const useToDoStore = create<todoStore>()((set) => ({
  todos: [],
  setTodos: (todos: ToDoTypes[]) =>
    set(() => ({
      todos,
    })),
  searchToDo: "",
  setSearchToDo: (search: string) =>
    set(() => ({
      searchToDo: search,
    })),
  addToDo: (todo: ToDoTypes) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  deleteToDo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  isEditDialogOpen: false,
  setIsEditDialogOpen: (isOpen: boolean) =>
    set(() => ({
      isEditDialogOpen: isOpen,
    })),
}));
